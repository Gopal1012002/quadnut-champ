import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Line, Pie } from 'react-chartjs-2';
import AuthStudent, { StudentDashboardService, StudenStreakDataService } from "../../../services/StudentServices";
import StreakCalendar from './StreakCalendar'
import {CourseSmallBoxShimmer} from '../../shimmer/Shimmer'
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import { Col, Row } from "react-bootstrap";
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Student Login Active Record',
    },
  },
};
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.register(ArcElement, Tooltip, Legend);
const StudentDashboardComponent = () => {
  const { student } = AuthStudent();
  const [isLoading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState()
  const [formData, setFormData] = useState({
    type: 'This Year',
    fromDate: '',
    toDate: ''
  })


  const refreshPage = () => {
    setLoading(true);
    StudentDashboardService(formData).then((res) => {
      let newDashboardData = {};
      if (res?.data?.dashboardData?.purchasedAndCompletedCourses) {
        newDashboardData.courseEnrolledDetails = {
          labels: ['Courses Pending', 'Courses Completed'],
          datasets: [
            {
              label: ' Courses',
              data: [(res?.data?.dashboardData?.purchasedAndCompletedCourses?.totalEnrolledCourses ?? 0) - (res?.data?.dashboardData?.purchasedAndCompletedCourses?.totalCompletedCourses ?? 0), res?.data?.dashboardData?.purchasedAndCompletedCourses?.totalCompletedCourses],
              backgroundColor: [
                '#7B16FF',
                'rgb(54, 163, 235)',
              ],
              borderWidth: 1,
              borderColor: [
                'rgb(255, 255, 255)',
                'rgb(255, 255, 255)',
              ],
            },

          ],
        };
        newDashboardData.mockEngagementDetails = {
          labels: ['Mocks Qualified', 'Mocks Not Qualified'],
          datasets: [
            {
              label: ' Mock Tests',
              data: [(res?.data?.dashboardData?.mockEngagementDetails?.totalMockTests ?? 0) - (res?.data?.dashboardData?.purchasedAndCompletedCourses?.totalCompletedCourses ?? 0), res?.data?.dashboardData?.purchasedAndCompletedCourses?.totalCompletedCourses ?? 0],
              backgroundColor: [
                'rgb(255, 99, 133)',
                'rgb(54, 163, 235)',
              ],
              borderWidth: 1,
              borderColor: [
                'rgb(255, 255, 255)',
                'rgb(255, 255, 255)',
              ],
            },

          ],
        };
        newDashboardData.lessonTypeCountsArray = {
          labels: res?.data?.dashboardData?.lessonTypeCountsArray?.labels,
          datasets: [
            {
              label: 'Lessons',
              data: [...res?.data?.dashboardData?.lessonTypeCountsArray?.data],
              backgroundColor: [
                "#816BFF", "#13C9F2", "#FF82B7", "#FF4500", "#800080"
              ],
              borderWidth: 1,
              borderColor: [
                'rgb(255, 255, 255)',
                'rgb(255, 255, 255)',
              ],
            },
          ],
        };
        newDashboardData.avgQuizMarks = res?.data?.dashboardData?.avgQuizMarks?.average;
        newDashboardData.avgMockMarks = res?.data?.dashboardData?.avgMockMarks?.avgQuizMarks;
        newDashboardData.completedCourses = res?.data?.dashboardData?.purchasedAndCompletedCourses?.totalCompletedCourses;
        newDashboardData.topMocksAttempts = res?.data?.dashboardData?.topMocksAttempt;
        newDashboardData.loginRecordData = {
          labels: res?.data?.dashboardData?.loginLogData?.categories,
          datasets: [{
            label: 'Login Count',
            data: res?.data?.dashboardData?.loginLogData?.data,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }]
        }
      }
      setDashboardData(newDashboardData)
    }).catch((err) => {

    }).finally(() => {
      setLoading(false);
    })
  }
  useEffect(refreshPage, [])
  return (
    <><div className="col-xl-9 col-lg-9">
      <div className="row justify-content-start">
        <div className="col-lg-12 col-md-12 d-flex">
          <div className="card dash-info flex-fill">
            <div className="card-body">
              <h4> {student?.name ?? 'User'}'s Analytics </h4>
              <h2></h2>
            </div>
          </div>
        </div>
        <div className="col-xl-12 col-lg-12">
          <Row>
            <Col lg={4}>
              <div className="card dash-info flex-fill">
                <div className="card-body text-center">
                  <h5> Avg. Quiz Marks </h5>
                  <h2> {parseInt(dashboardData?.avgQuizMarks ?? 0)?.toFixed(2) ?? 0} </h2>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="card dash-info flex-fill">
                <div className="card-body text-center">
                  <h5> Avg. Mock Test Marks </h5>
                  <h2> {parseInt(dashboardData?.avgMockMarks ?? 0)?.toFixed(2) ?? 0} </h2>
                </div>
              </div>
            </Col>

            <Col lg={4}>
              <div className="card dash-info flex-fill">
                <div className="card-body text-center">
                  <h5> Completed Courses </h5>
                  <h2> {dashboardData?.completedCourses ?? 0} </h2>
                </div>
              </div>
            </Col>

          </Row>
          <StreakCalendar />
          <div className="card dash-info flex-fill">
            <Row>
              {
                dashboardData?.courseEnrolledDetails && <div className="col-sm-11 mx-auto">
                  <Line options={options}
                    data={dashboardData?.loginRecordData} />
                  <h6 className="text-center w-100 mt-2">Student Login Report</h6>
                </div>
              }
            </Row>
            <Row className="p-2 d-flex justify-content-evenly">
              {
                dashboardData?.courseEnrolledDetails && <div className="col-sm-3 p-2">
                  <Doughnut data={dashboardData?.courseEnrolledDetails} />
                  <h6 className="text-center w-100 mt-2">Courses Enrolled</h6>
                </div>
              }
              {
                dashboardData?.mockEngagementDetails && <div className="col-sm-3 p-2">
                  <Doughnut data={dashboardData?.mockEngagementDetails} />
                  <h6 className="text-center w-100 mt-2">Mocks Enrolled</h6>
                </div>
              }
              {
                dashboardData?.lessonTypeCountsArray && <div className="col-sm-3 p-2">
                  <Doughnut data={dashboardData?.lessonTypeCountsArray} />
                  <h6 className="text-center w-100 mt-2">Lessons Consumed</h6>
                </div>
              }

            </Row>

            <Row>
              {
                dashboardData?.topMocksAttempts?.length > 0 &&
                <>
                  <h5 className="text-center mt-5 mb-0">Top Mock Attempts</h5>
                  <div className="checkout-form col-11 mx-auto">
                    <div className="table-responsive custom-table">
                      {/* <!-- Referred Users--> */}
                      {
                        <table className="table table-nowrap mb-0">
                          <thead>
                            <tr>
                              <th>Quiz Info</th>
                              <th>Passing Marks</th>
                              <th>Earned Marks</th>
                              <th>Result</th>
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
                            ) : dashboardData?.topMocksAttempts?.length > 0 &&
                            dashboardData?.topMocksAttempts?.map((attempt, index) => {
                              return (
                                <tr key={index}>
                                  <td>
                                    <div className="quiz-table">
                                      <p>{attempt?.mockTitle}</p>
                                    </div>
                                  </td>
                                  <td>{attempt?.quizResult == 'NO_RESULT' ? '--' : `${attempt?.passingPercent}%`} </td>
                                  <td>{attempt?.quizResult == 'NO_RESULT' ? '--' : `${attempt?.percentObtained}%`}</td>
                                  <td>
                                    <span className={`resut-badge ${attempt?.quizResult === 'PASS' ? 'badge-light-success' : 'badge-light-danger'}`}>
                                      {attempt?.quizResult == 'NO_RESULT' ? 'Not Attempted'
                                        : attempt?.quizResult == 'PASS' ? 'Pass' :
                                          'Fail'}
                                    </span>
                                  </td>
                                </tr>
                              );
                            }
                            )}
                          </tbody>
                        </table>
                      }

                    </div>
                  </div>
                </>
              }
            </Row>

          </div>

        </div>
      </div>
    </div>
    </>
  );
};

export default StudentDashboardComponent;
