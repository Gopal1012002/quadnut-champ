import { Link } from "react-router-dom";
import { NotificationShimmer } from "../../components/shimmer/Shimmer";
import { formatDateAndTime, getDateType } from "../../utils/dynamic.util";
import noDataIcon from '../../assets/img/noDataFound.jpg'
import { ToggleNotificationStatus } from "../../services/StudentServices";
import { toast } from "react-toastify";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";

const NotificationList = ({ isLoading, notificationList, refreshPage }) => {
    const [loadingList, setLoadingList] = useState([]);
    const groupedNotifications = notificationList?.reduce((acc, notification) => {
        const dateType = getDateType(notification?.createdAt);
        if (!acc[dateType]) {
            acc[dateType] = [];
        }
        acc[dateType].push(notification);
        return acc;
    }, {});

    const onToggleStatus = (id) => {
        setLoadingList([...loadingList, id]);
        ToggleNotificationStatus(id)
            .then((res) => {
                toast.success(res.message);
                refreshPage()
            })
            .catch((err) => { })
            .finally(() => {
                setLoadingList(loadingList.filter((item) => item !== id));
            });
    }

    return (
        <div className="notify-sec">
            <div className="row">
                <div className="col-md-12">
                    {isLoading ? (
                        <NotificationShimmer />
                    ) : notificationList?.length > 0 ? (
                        Object.entries(groupedNotifications).map(([dateType, notifications], index) => (
                            <div key={index}>
                                <h5 className="mb-0">{dateType}</h5>
                                {notifications.map((notification, idx) => (
                                    <div className="notify-item" key={idx}>
                                        <div className="row align-items-center">
                                            <div className="col-md-9">
                                                <div className="notify-content">
                                                    <div className="notify-detail ps-0 ms-0">
                                                        <h6 className="ps-0 ms-0">
                                                            {notification?.notificationHeading}{" "}
                                                            <span>{formatDateAndTime(notification?.createdAt)}</span>
                                                        </h6>
                                                        <p>{notification?.notificationMessage}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="text-md-end">
                                                    {notification?.notificationStatus === "UNREAD" ? (
                                                        <Link to="" aria-disabled={loadingList.includes(notification?.notificationId)} className="btn"  onClick={() => onToggleStatus(notification?.notificationId)}>
                                                            {loadingList.includes(notification?.notificationId) ? (
                                                                 "Marking..."
                                                            ) : (
                                                                "Mark as Read"
                                                            )}
                                                        </Link>
                                                    ) : (
                                                        <Link to="" className="btn" onClick={() => onToggleStatus(notification?.notificationId)}>
                                                            {loadingList.includes(notification?.notificationId) ? (
                                                                "Marking..."
                                                            ) : (
                                                                "Mark as Unread"
                                                            )}
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <div className="text-center w-100">
                            <img src={noDataIcon} alt="" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationList;