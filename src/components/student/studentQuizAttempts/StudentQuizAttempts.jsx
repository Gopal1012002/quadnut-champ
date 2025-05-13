import React, { useEffect, useState } from "react";
import { useAuthCompany } from "../../../services/AppServices";
import AuthStudent, {
  GetAllQuizAttempts,
} from "../../../services/StudentServices";
import conf from "../../../conf/conf";
import { formatDate } from "../../../utils/dynamic.util";
import { Modal, ModalBody, ModalHeader, Tab, Tabs } from "react-bootstrap";
import QuizAttemptResult from "./StudentQuizResult";
import { Link } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import Pagination from "../../common/Pagination";
import StudentMockResult from "./StudentMockResult";


const StudentQuizAttempts = () => {
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
  const [resultData, setResultData] = useState({});
  const [show, setShow] = useState(false);
  const [quizType, setQuizType] = useState('quiz');




  const onChangeQuizType = (type) => {
    setQuizType(type);
    setFilters({
      limit: 10,
      page: 1,
      type: type === 'quiz' ? 'QUIZ' : 'MOCK'
    })
  }
  const onClose = () => {
    setShow(false);
    setResultData({});
  }
  const onOpen = (result) => {
    setResultData(result)
    setShow(true);
  }
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [filters, setFilters] = useState({
    limit: 10,
    page: 1,
    type: quizType === 'quiz' ? 'QUIZ' : 'MOCK'
  });

  const paginationCourseList = (limit, page) => {
    const data = {
      limit,
      page,
      type: quizType === 'quiz' ? 'QUIZ' : 'MOCK'
    };
    GetAllQuizAttempts(data)
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
    GetAllQuizAttempts(filters)
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
  }, [filters]);
  return (
    <div className="col-xl-9 col-lg-9">
      <div className="settings-widget card-details">
        <div className="settings-menu p-0">
          <div className="profile-heading">
            <Tabs
              defaultActiveKey="quiz"
              id="uncontrolled-tab-example"
              className="mb-3"
              onSelect={(key) => onChangeQuizType(key)}
            >
              <Tab eventKey="quiz" title="Quiz Attempts">
              </Tab>
              <Tab eventKey="mock" title="Mock  Attempts">
              </Tab>
            </Tabs>
          </div>
          <div className="checkout-form">
            <div className="table-responsive custom-table">
              {/* <!-- Referred Users--> */}
              {
                <table className="table table-nowrap mb-0">
                <thead>
                  <tr>
                    <th>S no.</th>
                    <th>Quiz Info</th>
                    <th>Question</th>
                    <th>Correct Answers</th>
                    <th>Incorrect Answers</th>
                    <th>Passing Marks</th>
                    <th>Earned Marks</th>
                    <th>Result</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <>
                      <tr>
                        <td colSpan={9}><div className="table-line shine"></div></td>
                      </tr>
                      <tr>
                        <td colSpan={9}><div className="table-line shine"></div></td>
                      </tr>
                      <tr>
                        <td colSpan={9}><div className="table-line shine"></div></td>
                      </tr>
                      <tr>
                        <td colSpan={9}><div className="table-line shine"></div></td>
                      </tr>
                      <tr>
                        <td colSpan={9}><div className="table-line shine"></div></td>
                      </tr>
                    </>
                  ) : reviewList?.length > 0 ?
                    reviewList?.map((attempt, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {Number(paginateData?.pageStartCount) + index}
                          </td>
                          <td>
                            <div className="quiz-table">
                              <p>{quizType === 'quiz' ? formatDate(attempt?.updatedAt) : attempt?.mockTestTitle}</p>
                            </div>
                          </td>
                          <td> {attempt?.quizResult == 'NO_RESULT' ? '--' : attempt?.totalQuestionCount} </td>
                          <td>
                            {attempt?.quizResult == 'NO_RESULT' ? '--' : attempt?.correctQuestionCount}
                          </td>
                          <td>{attempt?.quizResult == 'NO_RESULT' ? '--' : attempt?.totalQuestionCount - attempt?.correctQuestionCount}</td>
                          <td>{attempt?.quizResult == 'NO_RESULT' ? '--' : `${attempt?.passingPercent}%`} </td>
                          <td>{attempt?.quizResult == 'NO_RESULT' ? '--' : `${attempt?.percentObtained}%`}</td>
                          <td>
                            <span class={`resut-badge ${attempt?.quizResult === 'PASS' ? 'badge-light-success' : 'badge-light-danger'}`}>
                              {attempt?.quizResult == 'NO_RESULT' ? 'Not Attempted'
                                : attempt?.quizResult == 'PASS' ? 'Pass' :
                                  'Fail'}
                            </span>
                          </td>
                          <td>

                            <button
                              to=""
                              className="btn btn-light-danger quiz-view"
                              disabled={attempt?.quizResult == 'NO_RESULT'}
                              onClick={() => { onOpen(attempt) }}
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      );
                    }
                    ) : (
                      <td colSpan={8} className="text-center my-2">
                        <p className="w-100 text-center text-soft">{quizType === 'quiz' ? 'No Quiz Attempted' : 'No Mock Attempted'}</p>
                      </td>
                    )}
                </tbody>
              </table>
              }
              
            </div>
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

      <Modal show={show} onHide={onClose} size="lg" centered backdrop="static">
        <ModalHeader className="d-flex justify-content-end pb-3" >
          <AiFillCloseCircle size={20} onClick={onClose} className="clickable-btn"/>
        </ModalHeader>
        <ModalBody>
          {
            quizType !== 'quiz' ? 
            <StudentMockResult data={resultData} /> :
            <QuizAttemptResult data={resultData} />
          }
          
        </ModalBody>
      </Modal>
    </div>
  );
};

export default StudentQuizAttempts;
