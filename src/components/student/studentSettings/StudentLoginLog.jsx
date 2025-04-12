import React, { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { useAuthCompany } from "../../../services/AppServices";
import AuthStudent, { GetCertificateListByStudent, GetOrderList, StudentLoginLogHistory } from "../../../services/StudentServices";
import conf from "../../../conf/conf";
import { formatDate, formatDateAndTime, getDaysDifference } from "../../../utils/dynamic.util";
import Pagination from "../../common/Pagination";
import { Link } from "react-router-dom";

const StudentLoginLog = () => {
    const { companyData } = useAuthCompany();

    const { student } = AuthStudent();
    const [urlPrefix, setUrlPrefix] = useState(
        `${conf.apiAssetUrl}/${companyData?.frontFolder}/kyc`
    );
    const [isImage, setImage] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [reviewList, setReviewList] = useState([]);
    const [paginateData, setPaginateData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const [filters, setFilters] = useState({
        limit: 8,
        page: 1,
    });

    const paginationCourseList = (limit, page) => {
        const data = {
            limit,
            page,
        };
        StudentLoginLogHistory(data)
            .then((res) => {
                setReviewList(res.data?.data);
                setPaginateData(res?.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        setLoading(true);
        StudentLoginLogHistory(filters)
            .then((res) => {
                setReviewList(res.data?.data);
                setPaginateData(res?.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    return (<>
        <div class="">
            <div class=" p-0">
                <div class="checkout-form">
                    {/* <!-- Order Tabs --> */}
                    {/* <!-- /Order Tabs --> */}

                    {/* <!-- Tab Content --> */}
                    <div class="tab-content">
                        {/* <!-- Today --> */}
                        <div class="tab-pane show active" id="today">
                            <div class="table-responsive custom-table">
                                <table class="table table-nowrap mb-0">
                                    <thead>
                                        <tr>
                                            <th>Browser</th>
                                            <th>IP</th>
                                            <th>Login At</th>
                                            <th>Device Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isLoading ? (
                                            <>
                                                <tr>
                                                    <td colSpan={8}>
                                                        <div className="table-line shine"></div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={8}>
                                                        <div className="table-line shine"></div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={8}>
                                                        <div className="table-line shine"></div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={8}>
                                                        <div className="table-line shine"></div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={8}>
                                                        <div className="table-line shine"></div>
                                                    </td>
                                                </tr>
                                            </>
                                        ) : reviewList?.length > 0 ? (
                                            reviewList?.map((order, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{order?.browser}</td>
                                                        <td>{order?.loginFromIp}</td>
                                                        <td>{formatDateAndTime(order?.loginAt)}</td>
                                                        <td>{order?.deviceType}</td>
                                                        
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <td colSpan={8} className="text-center my-2">
                                                <p className="w-100 text-center text-soft"> No Certification found </p>
                                            </td>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="pb-3 ps-4">
            {
                reviewList?.length > 0 && <Pagination
                    runFunction={paginationCourseList}
                    itemPerPage={8}
                    totalItems={paginateData?.totalItemCount || 0}
                    paginate={paginate}
                    currentPage={Number(paginateData?.currentPageNumber)}
                    pageStartCount={paginateData?.pageStartCount}
                    pageEndCount={paginateData?.pageEndCount}

                />
            }
        </div>

    </>
    );
};

export default StudentLoginLog;
