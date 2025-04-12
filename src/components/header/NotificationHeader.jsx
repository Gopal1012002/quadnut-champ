import React, { useEffect, useState } from 'react'
import { GetNotificationList, ReadAllNotifications, ToggleNotificationStatus } from '../../services/StudentServices';
import { Link, useNavigate } from 'react-router-dom';
import { formatDateAndTime, formatGetDateType, getDateType } from '../../utils/dynamic.util';
import { toast } from 'react-toastify';
import noDataIcon from '../../assets/img/noDataFound.jpg'

const NotificationHeader = () => {
    const navigate = useNavigate();
    const [loadingList, setLoadingList] = useState([]);
    const [isLoading, setLoading] = useState(false)
    const [notificationList, setNotificationList] = useState([]);
    const [type, setType] = useState('ALL');
    const onToggleNotification = (id) => {
        setLoadingList([...loadingList, id]);
        ToggleNotificationStatus(id).then((res) => {  
            toast.success(res?.message);  
            refreshNotificationList();
        }).catch((err) => { 
        }).finally(() => {
            setLoadingList(loadingList.filter((item) => item !== id));
        })
    }
    const refreshNotificationList = () => {
        const data = { limit: 5, page: 1, type }
        GetNotificationList(data).then((res) => {
            setNotificationList(res?.data?.data)
        }).catch((err) => {
        }).finally(() => {
        })
    }
    useEffect(() => {
        // Initial call to fetch notifications
        refreshNotificationList();
    
        // Set up the interval to refresh notifications every 10 seconds
        const intervalId = setInterval(() => {
          refreshNotificationList();
        }, 10000);
    
        // Clean up the interval on component unmount
        return () => {
          clearInterval(intervalId);
        };
      }, [type]); // Empty dependency array ensures the effect runs only once
    
    const onMarkAllRead = () => {
        setLoading(true);
        ReadAllNotifications().then((res) => {
            toast.success(res?.message);
            refreshNotificationList();
        }).catch((err) => {
        }).finally(() => {
            setLoading(false);
        })
    }
    return (<>
        <div className="topnav-dropdown-header">
            <span className="notification-title"> <Link to={`/student/notification`}> Notifications </Link>
                <select className="ms-1  clickable-btn" onChange={(e) =>{setType(e.target.value)}}>
                    <option value={'ALL'}>All</option>
                    <option value={'UNREAD'}>Unread</option>
                </select>
            </span>
            <Link to="" className="clear-noti" onClick={onMarkAllRead}>{ !isLoading ? 'Mark all as read' : 'Marking ...' }<i
                className="fa-solid fa-circle-check ms-1"></i></Link>
        </div>
        <div className="noti-content">
            <ul className="notification-list">
                {
                    notificationList?.length > 0 ?
                        notificationList?.map((notification, index) => {
                            return (
                                <li className="notification-message" key={index}>
                                    <div className="media d-flex">
                                        <div className="media-body w-100">
                                            <h6 className='clickable-btn' onClick={()=>navigate('/student/notification')}>{notification?.notificationHeading} </h6>
                                            <div className='w-100 d-flex flex-row justify-content-between align-items-center'>
                                                <p className='float-start'>{formatGetDateType(notification?.createdAt)}</p>
                                                <span>
                                                    {
                                                        notification?.notificationStatus === 'UNREAD' ? <button className="btn btn-accept rounded-0 btn-sm float-end" disabled={loadingList?.includes(notification?.notificationId)} onClick={()=> onToggleNotification(notification?.notificationId)}>{ loadingList?.includes(notification?.notificationId) ? 'Marking...' : 'Mark as Read'} </button> : ''
                                                    }
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                            )
                        }) :<div className="text-center-no-data">
                        <img src={noDataIcon} alt="" />
                    </div>
                }

            </ul>
        </div>
    </>)
}

export default NotificationHeader