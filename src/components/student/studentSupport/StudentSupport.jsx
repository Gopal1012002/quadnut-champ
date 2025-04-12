import React, { useEffect, useState } from 'react'
import conf from '../../../conf/conf';
import AuthStudent, { GetStudentSupportTicketList } from '../../../services/StudentServices';
import { useAuthCompany } from '../../../services/AppServices';
import Pagination from '../../common/Pagination';
import { formatDateOnly } from '../../../utils/dynamic.util';
import { Link } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap';
import AddSupportTicket from './AddSupportTicket';
import StudentSupportChat from './StudentSupportChat';

const StudentSupport = () => {
    const [show, setShow] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [reviewList, setReviewList] = useState([]);
    const [paginateData, setPaginateData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [currentTab, setCurrentTab] = useState('ALL');
    const [listData, setListData] = useState();
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const [isChat, setChat] = useState('');
    const onCLoseChat = () => {
        setChat('')
    }
    const onSetChat = (id) => {
        setChat(id);
    }
    const [filters, setFilters] = useState({
        limit: 10,
        page: 1,
        status: ''
    });
    const onOpenModal = () => {
        setShow(true);
    }
    const onCloseModal = () => {
        setShow(false);
    }
    const refreshList = () => {
        onCloseModal();
        refreshSupportList();
    }
    const paginationCourseList = (limit, page) => {
        const data = {
            limit,
            page,
        };
        GetStudentSupportTicketList(data)
            .then((res) => {
                setReviewList(res.data?.ticketList?.data);
                setListData(res?.data?.supportListData)
                setPaginateData(res.data?.ticketList);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const refreshSupportList = () => {
        setLoading(true);
        GetStudentSupportTicketList(filters)
            .then((res) => {
                setReviewList(res.data?.ticketList?.data);
                setPaginateData(res.data?.ticketList);
                setListData(res?.data?.supportListData)
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    const onSetOpen = () => {
        setFilters({
            limit: 10,
            page: 1,
            status: 'OPEN'
        })
        setCurrentTab('OPEN')
    }

    const onSetAll = () => {
        setFilters({
            limit: 10,
            page: 1,
            status: ''
        })
        setCurrentTab('ALL')
    }

    const onInProgress = () => {
        setFilters({
            limit: 10,
            page: 1,
            status: 'IN PROGRESS'
        })
        setCurrentTab('INPROGRESS')
    }

    const onSetClose = () => {
        setFilters({
            limit: 10,
            page: 1,
            status: 'CLOSED'
        })
        setCurrentTab('CLOSED')
    }
    useEffect(() => {
        refreshSupportList();
    }, [filters]);
    return ( isChat ? <StudentSupportChat id={isChat} /> :
        <div className="col-xl-9 col-lg-9">
            <div className="settings-widget card-details">
                <div className="settings-menu p-0">
                    <div className="profile-heading">
                        <h3>Support Tickets</h3>
                    </div>
                    <div className="checkout-form">

                        {/* <!-- Support Information --> */}
                        <div className="row">
                            <div className="col-md-4 col-sm-6">
                                <div className="card support-box">
                                    <div className="card-body">
                                        <h3>{listData?.totalCount}</h3>
                                        <p>Total Tickets</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="card support-box">
                                    <div className="card-body">
                                        <h3>{listData?.openCount}</h3>
                                        <p>Opened Tickets</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className="card support-box">
                                    <div className="card-body">
                                        <h3>{listData?.closedCount}</h3>
                                        <p>Closed Tickets</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- /Support Information --> */}

                        <div className="filter-grp ticket-grp d-flex align-items-center justify-content-between">
                            <div>
                                <h3>Support Tickets</h3>
                                <p>You can find all of your order Invoices.</p>
                            </div>
                            <div className="ticket-btn-grp">
                                <Link to="" data-bs-toggle="modal" data-bs-target="#add-tickets" onClick={onOpenModal}>Add New Ticket</Link>
                            </div>
                        </div>

                        <div className="wishlist-tab">
                            <ul className="nav">
                                <li className="nav-item">
                                    <Link to="" className={`${currentTab === 'ALL' && 'active'}`} data-bs-toggle="tab" data-bs-target="#all" onClick={onSetAll}>All({listData?.totalCount})</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="" className={`${currentTab === 'OPEN' && 'active'}`} data-bs-toggle="tab" data-bs-target="#open" onClick={onSetOpen}>Open({listData?.openCount})</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="" className={`${currentTab === 'INPROGRESS' && 'active'}`} data-bs-toggle="tab" data-bs-target="#closed" onClick={onInProgress}>In Progress({listData?.inProgressCount})</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="" className={`${currentTab === 'CLOSED' && 'active'}`} data-bs-toggle="tab" data-bs-target="#closed" onClick={onSetClose}>Closed({listData?.closedCount})</Link>
                                </li>
                            </ul>
                        </div>

                        {/* <!-- Tab Contant --> */}
                        <div className="tab-content">

                            {/* <!-- All --> */}
                            <div className="tab-pane show active" id="all">
                                <div className="table-responsive custom-table">

                                    {/* <!-- Referred Users--> */}
                                    <table className="table table-nowrap mb-0">
                                        <thead>
                                            <tr>
                                                <th>Ticket ID</th>
                                                <th>Date</th>
                                                <th>Subject</th>
                                                <th>Priority</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                isLoading ? <><tr>
                                                <td colSpan={8}><div className="table-line shine"></div></td>
                                              </tr>
                                              <tr>
                                                <td colSpan={8}><div className="table-line shine"></div></td>
                                              </tr>
                                              <tr>
                                                <td colSpan={8}><div className="table-line shine"></div></td>
                                              </tr>
                                              <tr>
                                                <td colSpan={8}><div className="table-line shine"></div></td>
                                              </tr>
                                              <tr>
                                                <td colSpan={8}><div className="table-line shine"></div></td>
                                              </tr></> :
                                                reviewList?.length > 0 ? reviewList?.map((review, index) => {
                                                    return (<tr key={index}>
                                                        <td>{review?.ticketReferenceId}</td>
                                                        <td>{formatDateOnly(review?.createdAt)}</td>
                                                        <td>{review?.ticketSubject}</td>
                                                        <td>
                                                            <span className={`resut-badge ${review?.ticketPriority === 'LOW' ? 'badge-light-success' : review?.ticketPriority === 'HIGH' ? 'badge-light-danger' : 'badge-soft-warning'}`}>
                                                                {review?.ticketPriority}
                                                            </span>
                                                        </td>
                                                        <td><span className={`status-badge ${review?.ticketStatus === 'OPEN' ? 'badge-soft-danger' : review?.ticketStatus === 'CLOSED' ? 'badge-soft-warning' : 'badge-soft-success'} `}>
                                                            {review?.ticketStatus === 'OPEN' ? 'Opened' : review?.ticketStatus === 'CLOSED' ? 'Closed' : 'In Progress'}
                                                        </span></td>
                                                        <td>
                                                            <button className='btn btn-sm btn-round-0 btn-primary' onClick={()=>onSetChat(review?.ticketReferenceId)}>
                                                                Details
                                                            </button>
                                                        </td>
                                                    </tr>)
                                                }) :
                                                <td colSpan={8} className="text-center my-2">
                                                <p className="w-100 text-center text-soft"> No Support Ticket Raised</p>
                                              </td>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                        {/* <!-- Tab Contant --> */}

                    </div>
                </div>
            </div>

            {
                reviewList?.length > 0 && <Pagination
                    runFunction={paginationCourseList}
                    itemPerPage={10}
                    totalItems={paginateData?.totalItemCount || 0}
                    paginate={paginate}
                    currentPage={Number(paginateData?.currentPageNumber)}
                    pageStartCount={paginateData?.pageStartCount}
                    pageEndCount={paginateData?.pageEndCount}
                />
            }
            <Modal show={show} onHide={onCloseModal} centered size='lg' backdrop="static">
                <ModalBody>
                    <AddSupportTicket refreshList={refreshList} close={onCloseModal} />
                </ModalBody>
            </Modal>
        </div>
    )}

export default StudentSupport;