import React, { useEffect, useState } from 'react'
import Head from '../../layouts/main-layout/head/Head';
import { Link } from 'react-router-dom';
import { GetNotificationList, ReadAllNotifications } from '../../services/StudentServices';
import { set } from 'react-hook-form';
import { NotificationShimmer } from '../../components/shimmer/Shimmer';
import noDataIcon from '../../assets/img/noDataFound.jpg'
import { formatDateAndTime, getDateType } from '../../utils/dynamic.util';
import NotificationList from './NotificationList';
import { ColorRing } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const Notification = () => {
    const [isLoading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [notificationList, setNotificationList] = useState([]);
    const [isNextExists, setNextExists] = useState(false);
    const [isNotificationLoading, setNotificationLoading] = useState(false);
    // const { limit, page } = 
    const onHandleMore = () => {
        if (isNextExists) {
            setLoading(true)
            const data = { limit: 10, page: currentPage + 1 }
            GetNotificationList(data).then((res) => {
                setNotificationList([...notificationList, ...res.data.data])
                setNextExists(res?.data?.isNext);
                setCurrentPage(parseInt(res?.data?.currentPageNumber))
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    const onRefreshPage = () => {
        const data = { limit: currentPage*10, page: 1 }
        GetNotificationList(data).then((res) => {
            setNotificationList(res.data.data)
            setNextExists(res?.data?.isNext);
            // setCurrentPage(parseInt(res?.data?.currentPageNumber))
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
        })
    }

    const onMarkAllAsRead = () => {
        setNotificationLoading(true)
        ReadAllNotifications().then((res) => {
            onRefreshPage();
            toast.success(res?.message)
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setNotificationLoading(false)
        })
    }
    useEffect(() => {
        setLoading(true)
        const data = { limit: 10, page: 1 }
        GetNotificationList(data).then((res) => {
            setNotificationList(res.data.data)
            setNextExists(res?.data?.isNext);
            setCurrentPage(parseInt(res?.data?.currentPageNumber))
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }, [])
    return (<>
        <Head title="Notification" />
        <div className="page-content">
            <section className="course-content">
                <div className="container">
                    <div className="title-sec">
                        <div className="row">
                            <div className="col-sm-6 col-lg-5">
                                <h2>Notifications</h2>
                                <p>Improve the way your work, discover a brand new tool and drop the hassle once and for all.</p>
                            </div>
                            <div className="col-sm-6 col-lg-7">
                                <div className="text-end">
                                    {/* <Link to="" className="btn btn-mark" onClick={onMarkAllAsRead}>
                                    
                                    Mark All as Read</Link> */}
                                    <button className='btn btn-mark' disabled={isNotificationLoading} onClick={onMarkAllAsRead}>{isNotificationLoading ? 'Marking...' : 'Mark All as Read'}</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Notifications List -->	*/}
                    <NotificationList refreshPage={onRefreshPage} isLoading={isLoading} notificationList={notificationList} />
                    {/* <!-- /Notifications List -->	 */}
                    {isNextExists && <div className="text-center">
                        <button onClick={onHandleMore} className="btn btn-primary">{isLoading ?
                            <ColorRing
                                visible={true}
                                height="25"
                                width="25"
                                wrapperStyle={{}}
                                colors={['white']}
                            /> : 'Load More'
                        }</button>
                    </div>}
                </div>
            </section>
        </div>
    </>)
}

export default Notification