import React, { useEffect, useRef, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { useAuthCompany } from "../../../services/AppServices";
import AuthStudent, { GenerateInvoiceOrder, GetOrderList, StudentMockTestRegistrationList } from "../../../services/StudentServices";
import conf from "../../../conf/conf";
import { formatDate, formatDateAndTime, getDaysDifference } from "../../../utils/dynamic.util";
import Pagination from "../../common/Pagination";
import html2pdf from 'html2pdf.js'
import { Link } from "react-router-dom";

const StudentMockTest = () => {
  const { companyData } = useAuthCompany();
  const { student } = AuthStudent();
  const [urlPrefix, setUrlPrefix] = useState(
    `${conf.apiAssetUrl}/${companyData?.frontFolder}/kyc`
  );
  const hiddenDivRef = useRef(null);
  const [isImage, setImage] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [paginateData, setPaginateData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [generatingLoad, setGeneratingLoad] = useState([]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [filters, setFilters] = useState({
    limit: 8,
    page: 1,
  });

  const downloadInvoice = (order) => {
    let orderId = order?.orderId
    // Example to show loading state (optional)
    // Call the backend to get the invoice HTML
    GenerateInvoiceOrder(orderId)
      .then((res) => {
        const htmlContent = res.data?.invoice; // Assuming the backend sends the HTML string

        // Render the HTML into a hidden div
        if (hiddenDivRef.current) {
          hiddenDivRef.current.innerHTML = htmlContent;
          
          // Generate the PDF
          const options = {
            margin: 1,
            filename: `Invoice-${order?.txnId}.pdf`,
            image: { type: "pdf", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
          };

          html2pdf().set(options).from(hiddenDivRef.current.innerHTML).save();
          
          hiddenDivRef.current.style.display = "none";
        }
      })
      .catch((err) => {
        console.error("Error generating invoice:", err);
      });
  };


  const paginationCourseList = (limit, page) => {
    const data = {
      limit,
      page,
    };
    StudentMockTestRegistrationList(data)
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
    StudentMockTestRegistrationList(filters)
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
  return (
    <div className="col-xl-9 col-lg-9">
      <div className="settings-widget card-details">
        <div className="settings-menu p-0">
          <div className="profile-heading">
            <h3>Enrolled Tests</h3>
          </div>
          <div className="checkout-form">
            {/* <!-- Order Tabs --> */}
            {/* <!-- /Order Tabs --> */}

            {/* <!-- Tab Content --> */}
            <div className="tab-content">
              {/* <!-- Today --> */}
              <div ref={hiddenDivRef}></div>
              <div className="tab-pane show active" id="today">
                <div className="table-responsive custom-table">
                  <table className="table table-nowrap mb-0">
                    <thead>
                      <tr>
                        <th>Test Code</th>
                        <th>Test Title</th>
                        <th>Date</th>
                        <th>Price</th>
                        {/* <th>Status</th> */}
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Action</th>
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
                        reviewList?.map((order) => {
                          return (
                            <tr>
                              <td>#{order?.mockTestCode}</td>
                              <td>
                                <span className="title-course">
                                  {order?.mockTestTitle}
                                </span>
                              </td>
                              <td>{formatDate(order?.createdAt)}</td>
                              <td>{order?.mockSellingPrice == 0 ? 'Free' : `₹${order?.mockSellingPrice}`}</td>
                              {/* <td>Order {order?.buyStatus?.toLowerCase()}</td> */}
                              <td>{order?.isTimeOriented === 'YES' ? formatDateAndTime(order?.mockTestStartTime) : '--'}</td>
                              <td>{order?.isTimeOriented === 'YES' ? formatDateAndTime(order?.mockTestEndTime) : '--'}</td>
                              {/* <td>
                                <a
                                  className="action-icon"
                                  onClick={()=>downloadInvoice(order)}
                                >
                                  <FaDownload />
                                </a>
                              </td> */}
                              <td>
                                <Link
                                  className="action-icon"
                                  target="_blank"
                                //   onClick={()=>downloadInvoice(order)}
                                to={`/mock-details/${order?.mockTestSlug}`}
                                >
                                  <i className="fa-solid fa-up-right-from-square"></i>
                                </Link>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <td colSpan={8} className="text-center my-2">
                          <p className="w-100 text-center text-soft"> No Order History Found</p>
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
  );
};

export default StudentMockTest;
