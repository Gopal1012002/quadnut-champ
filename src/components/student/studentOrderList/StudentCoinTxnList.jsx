import React, { useEffect, useRef, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { useAuthCompany } from "../../../services/AppServices";
import AuthStudent, { CoinsTxnListService, GenerateInvoiceOrder, GetOrderList } from "../../../services/StudentServices";
import conf from "../../../conf/conf";
import { formatDate, getDaysDifference } from "../../../utils/dynamic.util";
import Pagination from "../../common/Pagination";
import html2pdf from 'html2pdf.js'
import { Tab, Tabs } from "react-bootstrap";

const StudentCoinTxnList = ({change}) => {
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

  const paginationCourseList = (limit, page) => {
    const data = {
      limit,
      page,
    };
    CoinsTxnListService(data)
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
    CoinsTxnListService(filters)
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
        <div className="profile-heading">
            <Tabs
              defaultActiveKey="coin"
              id="uncontrolled-tab-example"
              className="mb-3"
              onSelect={(key) => change(key)}
            >
              <Tab eventKey="order" title="Orders List">
              </Tab>
              <Tab eventKey="coin" title="Coins Txn List">
              </Tab>
            </Tabs>
          </div>
          <div class="checkout-form">
            {/* <!-- Tab Content --> */}
            <div class="tab-content">
              {/* <!-- Today --> */}
              <div ref={hiddenDivRef} className="d-none"></div>
              <div class="tab-pane show active" id="today">
                <div class="table-responsive custom-table">
                  <table class="table table-nowrap mb-0">
                    <thead>
                      <tr>
                        <th>S no.</th>
                        <th>Txn Type</th>
                        <th>Amount</th>
                        <th>Source</th>
                        <th>Date</th>
                        <th>Description</th>
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
                        </>
                      ) : reviewList?.length > 0 ? (
                        reviewList?.map((order, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + paginateData?.pageStartCount}</td>
                              <td>
                                <span className={order?.transactionType === "CREDIT" ? "text-success" : "text-primary"}>
                                    {order?.transactionType}
                                </span>
                              </td>
                              <td>{order?.transactionType === "CREDIT" ? order?.creditAmount : order?.debitAmount}</td>
                              <td>{order?.ledgerType}</td>
                              <td>{formatDate(order?.createdAt)}</td>
                              <td>{order?.ledgerDescription}</td>
                              
                            </tr>
                          );
                        })
                      ) : (
                        <td colSpan={8} className="text-center my-2">
                          <p className="w-100 text-center text-soft"> No Coins Transactions Found</p>
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

export default StudentCoinTxnList;
