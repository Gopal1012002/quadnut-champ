import React, { useEffect, useRef, useState } from 'react'
import user12Icon from '../../../assets/img/user/user12.jpg'
import chatVoiceIcon from '../../../assets/img/icon/voice.svg';
import chatImgIcon from '../../../assets/img/chat-img-01.jpg'
import user16 from "../../../assets/img/user/user16.png";
import AuthStudent, { CloseSupportTicket, GetStudentChatReplies, GetStudentNextChatReplies, PostStudentSupportTicket, PostStudentSupportTicketReply } from '../../../services/StudentServices';
import { formatDate, formatDateAndTime, formatTimeOnly, isPdfOrImage } from '../../../utils/dynamic.util';
import { useAuthCompany } from '../../../services/AppServices';
import conf from '../../../conf/conf';
import defaultSupportIcon from '../../../assets/img/supportDefault.png'
import Swal from 'sweetalert2';
import { Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TiTick } from "react-icons/ti";
import { toast } from 'react-toastify';

const StudentSupportChat = ({ id }) => {
    const { student } = AuthStudent();
    const [chatReplies, setChatReplies] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isMessageSending, setMessageSending] = useState(false);
    const [isPreviousMessageLoading, setPreviousMessageLoading] = useState(false);
    const { companyData } = useAuthCompany();
    const [urlPrefix, setUrlPrefix] = useState(`${conf.apiAssetUrl}/${companyData?.frontFolder}`)
    const [favicon, setFavicon] = useState(`${urlPrefix}/favicon/${companyData?.favicon}`)
    const [userImage, setUserImage] = useState(`${urlPrefix}/kyc/${student?.image}`)
    const [paginatedData, setPaginatedData] = useState();
    const [attachment, setAttachment] = useState('');
    const [currentMessage, setCurrentMessage] = useState('');
    const chatContainerRef = useRef(null);
    const [isClosed, setClosed] = useState(false);
    const [isMessageClosing, setMessageClosing] = useState(false);

    const onSendMessage = (e) => {
        e.preventDefault();
        if (currentMessage?.trim() || attachment) {
            setMessageSending(true);
            let formData = new FormData();
            formData.append('message', currentMessage);
            if (attachment && attachment[0]) {
                formData.append('supportAttachment', attachment[0])
            }
            PostStudentSupportTicketReply(id, formData).then((res) => {
                getReplyFunction()
            }).catch((err) => {

            }).finally(() => {
                setCurrentMessage('');
                setAttachment('');
                setMessageSending(false)
            })
        }

    }

    const scrollToLatestMessage = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollIntoView({
                block: 'end',
                behavior: 'smooth',
            });
        }
    };

    const onHandleCloseTicket = () => {
        if(!isClosed){
            setMessageClosing(true);
            CloseSupportTicket(id).then((res)=>{
                toast.success(res?.message);
                setClosed(true)
            }).catch((err)=>{
                console.log(err);
            }).finally(()=>{
                setMessageClosing(false)
            })
        }
    }

    const onHandleAttachment = (e) => {
        if (e.target.files && e.target.files[0]) {
            if (e.target.files[0]?.type !== 'image/jpeg' &&
                e.target.files[0]?.type !== 'image/jpg' &&
                e.target.files[0]?.type !== 'image/png' &&
                e.target.files[0]?.type !== 'image/gif' &&
                e.target.files[0]?.type !== 'application/pdf'
            ) {
                Swal.fire({
                    title: "Choose only preferred file types !!",
                    icon: "warning",
                    confirmButtonText: 'Ok'
                })
            } else {
                setAttachment(e.target.files);
            }

        }
    }
    const onDeleteAttachment = (e) => {
        setAttachment('');
    }
    useEffect(() => {
        setLoading(true);
        if (id) {
            const data = {
                limit: 10,
                page: 1
            }
            GetStudentChatReplies(id, data).then((res) => {
                setChatReplies(res?.data?.replyList?.data?.slice()?.reverse());
                setPaginatedData(res?.data?.replyList);
                setClosed(res?.data?.ticketDetails?.ticketStatus === 'CLOSED')
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [])

    const previousMessages = () => {
        if (paginatedData?.isNext) {
            const data = {
                limit: 10,
                page: parseInt(paginatedData?.currentPageNumber) + 1
            }
            setPreviousMessageLoading(true);
            GetStudentChatReplies(id, data).then((res) => {
                let previouse_message_list = res?.data?.replyList?.data?.slice()?.reverse();
                setChatReplies([...previouse_message_list, ...chatReplies])
                // setChatReplies();
                setPaginatedData(res?.data?.replyList)
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                setPreviousMessageLoading(false);
            })
        }
    }
    const getReplyFunction = () => {
        if (chatReplies && chatReplies.length > 0) {
            const lastMessageId = chatReplies[chatReplies.length - 1]?.ticketReplyId;
            if (lastMessageId) {
                const data = {
                    id,
                    lId: lastMessageId,
                };
                GetStudentNextChatReplies(data)
                    .then((res) => {
                        const newMessages = res?.data?.newMessages || [];
                        if (newMessages.length > 0) {
                            setChatReplies((prevReplies) => [...prevReplies, ...newMessages]);
                            scrollToLatestMessage();
                        }
                    })
                    .catch((err) => console.error(err));
            }
        }
    }
    // Fetch new messages periodically
    useEffect(() => {
        const interval = setInterval(getReplyFunction, 10000);
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [chatReplies, isMessageSending]);

    // Automatically scroll when chatReplies change
    useEffect(() => {
        scrollToLatestMessage();
    }, [chatReplies]);
    return (
        <div className="col-xl-9 col-lg-9 theiaStickySidebar main-chat-blk">
            <div className="settings-widget card-details mb-0">
                <div className="settings-menu p-0">
                    <div className="profile-heading d-flex justify-content-between">
                        <h3>Message</h3>
                        <span>
                            {
                                isClosed ? <Button className='btn btn-sm btn-secondary' disabled>
                                    <TiTick /> Closed
                                </Button> :
                                    <Button onClick={onHandleCloseTicket} className='btn btn-sm btn-secondary'>
                                        {isMessageClosing ? <><TiTick /> Marking... </> :
                                        <><TiTick /> Mark as Closed </> }
                                    </Button>
                            }

                        </span>
                    </div>
                    <div className="checkout-form">
                        <div className="content"></div>
                        <div className="chat chat-messages" id="middle">
                            <div className="h-100">
                                <div id="chat-msg-container" className="chat-body chat-page-group slimscroll">
                                    <div className="messages" ref={chatContainerRef}>
                                        <div class="chat-line">
                                            <span class="chat-date clickable-btn" onClick={previousMessages}>{!isPreviousMessageLoading ? 'Load More' : 'Loading...'}</span>
                                        </div>
                                        {chatReplies?.length > 0 &&
                                            chatReplies.map((chat, index) => (
                                                <div
                                                    key={index}
                                                    className={`chats ${chat?.messageFromType !== 'STUDENT' ? '' : 'chats-right'
                                                        }`}
                                                >
                                                    <div className="chat-avatar">
                                                        <img
                                                            src={chat?.messageFromType === 'STUDENT' ? userImage : favicon}
                                                            onError={(e) => {
                                                                e.target.src =
                                                                    chat?.messageFromType !== 'STUDENT'
                                                                        ? defaultSupportIcon
                                                                        : user16;
                                                            }}
                                                            className="rounded-circle dreams_chat"
                                                            alt="image"
                                                        />
                                                    </div>
                                                    <div className="chat-content">
                                                        <div className="chat-profile-name" >
                                                            <h6 style={{ minWidth: '213px' }}>
                                                                <span className='text-small'>
                                                                    {chat?.messageFromType !== 'STUDENT'
                                                                        ? 'Support Team'
                                                                        : chat?.messageFromName}
                                                                </span>
                                                                <span className='text-small' style={{ fontSize: '10px', width: '180px' }}>{formatDateAndTime(chat?.createdAt)}</span>
                                                            </h6>
                                                            <div className="chat-action-btns">
                                                                <div className="chat-action-col">

                                                                    <div
                                                                        className="dropdown-menu chat-drop-menu dropdown-menu-end"
                                                                    ></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="message-content">{chat?.message}</div>
                                                        {
                                                            chat?.attachment && isPdfOrImage(chat?.attachment) === 'pdf' ?
                                                                <div className="message-content-attachment-pdf">
                                                                    <a target='_blank' href={`${urlPrefix}/support/${chat?.attachment}`} >
                                                                        {/* <span>Open</span> */}
                                                                        <i className="fa-solid fa-up-right-from-square me-1"></i>
                                                                        <span >{chat?.attachment}</span>
                                                                    </a>
                                                                </div> :
                                                                isPdfOrImage(chat?.attachment) === 'image' ?
                                                                    <div className="message-content-attachment-img">
                                                                        <img src={`${urlPrefix}/support/${chat?.attachment}`} alt="Attachment" />
                                                                    </div> :
                                                                    <div></div>
                                                        }
                                                    </div>
                                                </div>
                                            ))}
                                        {
                                            attachment && attachment?.length > 0 && <div className={`chats`} >
                                                <div className="chat-content">
                                                    <div className="chat-profile-name">
                                                    </div>
                                                    <div className="message-content">
                                                        <code className='float-end' onClick={onDeleteAttachment}><i class="fa-solid fa-xmark clickable-btn"></i></code>
                                                        <span className='float-start'>{attachment[0]?.name}</span>
                                                    </div>

                                                </div>
                                            </div>
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="chat-footer">

                                <form onSubmit={onSendMessage}>
                                    <div className="smile-foot">
                                        <Link
                                            to=""
                                            className="action-circle"
                                            onClick={() => {
                                                document.getElementById('attachment').click();
                                            }}
                                        >
                                            <i className="fa-solid fa-paperclip"></i>
                                        </Link>
                                    </div>
                                    <input
                                        id="attachment"
                                        type="file"
                                        name="attachment"
                                        accept="image/jpeg, image/png, image/gif, application/pdf"
                                        style={{ display: 'none' }}
                                        onChange={(e) => {
                                            onHandleAttachment(e);
                                        }}
                                    />
                                    <div className="replay-forms">
                                        <input
                                            type="text"
                                            className="form-control chat_form"
                                            placeholder="Type your message here..."
                                            value={currentMessage}
                                            onChange={(e) => setCurrentMessage(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-buttons">
                                        {
                                            !isMessageSending ? <button className="btn send-btn" disabled={isClosed} type="submit">
                                                <i className="fa-brands fa-telegram"></i>
                                            </button> :
                                                <button className="btn send-btn" disabled>
                                                    <Spinner animation="border" role="status" >
                                                        <span className="visually-hidden">Loading...</span>
                                                    </Spinner>
                                                </button>
                                        }

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentSupportChat