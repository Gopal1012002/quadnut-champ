import React, { useEffect, useRef, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { useAuthCompany } from "../../../services/AppServices";
import AuthStudent, { GenerateInvoiceOrder, GetOrderList } from "../../../services/StudentServices";
import conf from "../../../conf/conf";
import { formatDate, getDaysDifference } from "../../../utils/dynamic.util";
import Pagination from "../../common/Pagination";
import html2pdf from 'html2pdf.js'

const StudentOrderList = () => {
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
    GetOrderList(data)
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
    GetOrderList(filters)
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
    <div class="col-xl-9 col-lg-9">
      <div class="settings-widget card-details">
        <div class="settings-menu p-0">
          <div class="profile-heading">
            <h3>Order History</h3>
          </div>
          <div class="checkout-form">
            {/* <!-- Order Tabs --> */}
            {/* <!-- /Order Tabs --> */}

            {/* <!-- Tab Content --> */}
            <div class="tab-content">
              {/* <!-- Today --> */}
              <div ref={hiddenDivRef} className="d-none"></div>
              <div class="tab-pane show active" id="today">
                <div class="table-responsive custom-table">
                  <table class="table table-nowrap mb-0">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Course Name</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Validity</th>
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
                        reviewList?.map((order, index) => {
                          return (
                            <tr key={index}>
                              <td>#AW{order?.orderId}</td>
                              <td>
                                <span class="title-course">
                                  {order?.courseTitle}
                                </span>
                              </td>
                              <td>{formatDate(order?.createdAt)}</td>
                              <td>₹{order?.courseDiscountedPrice}</td>
                              <td>Order {order?.buyStatus?.toLowerCase()}</td>
                              <td>{order?.expiryDate ? ` ${getDaysDifference(order?.expiryDate) >= 0 ? `${getDaysDifference(order?.expiryDate)} days left` : 'Expired'}` : 'Lifetime'}</td>
                              <td>
                                <a
                                  class="action-icon"
                                  onClick={()=>downloadInvoice(order)}
                                >
                                  <FaDownload />
                                </a>
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

export default StudentOrderList;
