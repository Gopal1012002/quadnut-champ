import React, { useEffect, useState } from "react";
import { GetStudentEnrolledCourseList } from "../../../services/StudentServices";
import { useAuthCompany } from "../../../services/AppServices";
import conf from "../../../conf/conf";
import { minuteToHrs } from "../../../utils/dynamic.util";
import user2 from "../../../assets/img/user/user2.jpg";
import icon01 from "../../../assets/img/icon/icon-01.svg";
import icon02 from "../../../assets/img/icon/icon-02.svg";
import Pagination from "../../common/Pagination";
import { Link } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";
import defaultThumbnail from '../../../assets/img/deafult-course-thumbnail.png'

const EnrolledCourses = () => {
  const { companyData } = useAuthCompany();
  const [courseList, setCourseList] = useState([]);
  const [paginateData, setPaginateData] = useState();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEnrolledCourses, setTotalEnrolledCourses] = useState(0);
  const [urlPrefix, setUrlPrefix] = useState(
    `${conf.apiAssetUrl}/${companyData?.frontFolder}/thumbnail`
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    setLoading(true);
    const data = {
      limit: 9,
      page: currentPage,
    };
    GetStudentEnrolledCourseList(data)
      .then((res) => {
        setCourseList(res?.data?.data);
        setTotalEnrolledCourses(res?.data?.totalItemCount)
        setPaginateData(res?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const paginationCourseList = (limit, page) => {
    const data = {
      limit,
      page,
    };
    GetStudentEnrolledCourseList(data)
      .then((res) => {
        setCourseList(res?.data?.data);
        setPaginateData(res?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="col-xl-9 col-lg-9">
      <div className="row justify-content-start">
        <div className="col-lg-4 col-md-6 d-flex">
          <div className="card dash-info flex-fill">
            <div className="card-body">
              <h5>Enrolled Courses</h5>
              <h2> {totalEnrolledCourses > 10 ? `${totalEnrolledCourses}` : `0${totalEnrolledCourses}`} </h2>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 d-flex">
          <div className="card dash-info flex-fill">
            <div className="card-body">
              <h5>Active Courses</h5>
              <h2> {totalEnrolledCourses > 10 ? `${totalEnrolledCourses}` : `0${totalEnrolledCourses}`} </h2>
            </div>
          </div>
        </div>
        {/* <div className="col-lg-4 col-md-6 d-flex">
          <div className="card dash-info flex-fill">
            <div className="card-body">
              <h5>Completed Courses</h5>
              <h2>0</h2>
            </div>
          </div>
        </div> */}
      </div>
      <div className="dashboard-title">
        <h4>Recently Enrolled Courses</h4>
      </div>
      <div className="row">
        {/* <!-- Course Grid --> */}
        {/* <div className="col-xxl-4 col-md-6 d-flex"> */}
        {courseList?.length > 0 &&
          courseList?.map((course, index) => {
            return (
              <div key={index} className="col-xxl-4 col-md-6 d-flex">
                <div className="course-box flex-fill">
                  <div className="product">
                    <div className="product-img">
                      <Link to={`/course-details/${course?.courseCode}/${course?.courseSlug}`}>
                        <img
                          className="img-fluid"
                          alt="Img"
                          src={`${urlPrefix}/${course?.courseThumbnail}`}
                          onError={(e) => e.target.src = defaultThumbnail}
                        />
                      </Link>
                      {course?.courseDiscountedPrice > 0 ? (
                        <div className="price">
                          <h3>
                            ₹{course?.courseDiscountedPrice}{" "}
                            <span>₹{course?.coursePrice}</span>
                          </h3>
                        </div>
                      ) : (
                        <div className="price combo">
                          <h3>FREE</h3>
                        </div>
                      )}
                    </div>
                    <div className="product-content">
                      <div className="course-group d-flex">
                        <div className="course-group-img d-flex">
                          <Link to={`/instructor-details/${course?.instructorCode}`}>
                            <img src={user2} alt="Img" className="img-fluid" />
                          </Link>
                          <div className="course-name">
                            <h4>
                              <Link
                                to={`/instructor-details/${course?.instructorCode}`}
                              >
                                {course?.instructorNames &&
                                  JSON.parse(course?.instructorNames)[0]
                                    ?.name}
                              </Link>
                            </h4>
                            <p>Instructor</p>
                          </div>
                        </div>
                        <div className="course-share d-flex align-items-center justify-content-center">
                          {/* <Link to="">
                            <i className="fa-regular fa-heart"></i>
                          </Link> */}
                        </div>
                      </div>
                      <h3 className="title instructor-text">
                        <Link to={`/course-details/${course?.courseCode}/${course?.courseSlug}`}>
                          {course?.courseTitle}
                        </Link>
                      </h3>
                      <div className="course-info d-flex align-items-center">
                        <div className="rating-img d-flex align-items-center">
                          <img src={icon01} alt="Img" />
                          <p>{course?.lessonCount}+ Lesson</p>
                        </div>
                        <div className="course-view d-flex align-items-center">
                          <img src={icon02} alt="Img" />
                          <p>{minuteToHrs(course?.lessonDuration)}</p>
                        </div>
                      </div>
                      <div className="row grid-course-bottom-row">
                        {course?.rating == 0 || course?.rating == 5 ? (
                          <div className="rating m-0 col-sm-5 ps-2">
                            <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                            <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                            <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                            <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                            <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                            <span className="d-inline-block average-rating">
                              <span>(5.0)</span>
                            </span>
                          </div>
                        ) : (
                          <div className="rating m-0 col-sm-5 ps-2">
                            <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                            {course?.rating >= 2 ? (
                              <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                            ) :
                              course?.rating < 2 && course.rating > 1 ?
                                <i className="fas fa-star-half-alt" style={{ color: '#FFD43B' }}></i>
                                : <i className="fas fa-star" ></i>}
                            {course?.rating >= 3 ? (
                              <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                            ) :
                              course?.rating < 3 && course.rating > 2 ?
                                (
                                  <i className="fas fa-star-half-alt" style={{ color: '#FFD43B' }}></i>
                                ) : <i className="fas fa-star"></i>}
                            {course?.rating >= 4 ? (
                              <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                            ) :
                              course?.rating < 4 && course.rating > 3 ?
                                (
                                  <i className="fas fa-star-half-alt" style={{ color: '#FFD43B' }}></i>
                                ) : <i className="fas fa-star"></i>}
                            {course?.rating >= 5 ? (
                              <i className="fas fa-star filled" ></i>
                            ) :
                              course?.rating < 5 && course.rating > 4 ?
                                (
                                  <i className="fas fa-star-half-alt" style={{ color: '#FFD43B' }}></i>
                                ) : <i className="fas fa-star"></i>}

                            <span className="d-inline-block average-rating">
                              <span>({course?.rating ?? 5.0})</span>
                            </span>
                          </div>
                        )}
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        {
          courseList?.length > 0 && <Pagination
            runFunction={paginationCourseList}
            itemPerPage={9}
            totalItems={paginateData?.totalItemCount || 0}
            paginate={paginate}
            currentPage={Number(paginateData?.currentPageNumber)}
            pageStartCount={paginateData?.pageStartCount}
            pageEndCount={paginateData?.pageEndCount}
          />
        }

      </div>
      {/* </div> */}
    </div>
  );
};

export default EnrolledCourses;
