import React, { useEffect, useState } from "react";
import course02 from "../../assets/img/course/course-02.jpg";
import user2 from "../../assets/img/user/user2.jpg";
import icon01 from "../../assets/img/icon/icon-01.svg";
import icon02 from "../../assets/img/icon/icon-02.svg";
import Pagination from "../common/Pagination";
import {
  GetInstructorCourseList,
  useAuthCompany,
} from "../../services/AppServices";
import conf from "../../conf/conf";
import { minuteToHrs } from "../../utils/dynamic.util";
import AuthStudent, { AddToWishlist, GetWishlistIdsList, RemoveFromWishlist } from "../../services/StudentServices";
import { toast } from "react-toastify";
import defaultThumbnailImg from '../../assets/img/deafult-course-thumbnail.png'
import defaultInstructorImg from '../../assets/img/default-instructor-image.png'
import { Link } from "react-router-dom";


const InstructorCourses = ({ instructorData }) => {
  const { companyData } = useAuthCompany();
  const [courseList, setCourseList] = useState([]);
  const [paginateData, setPaginateData] = useState();
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { student } = AuthStudent();
  const [urlPrefix, setUrlPrefix] = useState(
    `${conf.apiAssetUrl}/${companyData?.frontFolder}/thumbnail`
  );
  const [insImagePrefix, setInsImagePrefix] = useState(`${conf.apiAssetUrl}/${companyData?.frontFolder}/kyc`)
  const refreshWishlist = () => {
    if (student) {
      GetWishlistIdsList().then((res) => {
        setWishlistIds(res?.data?.wishlist)
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  const onRemoveFromWishlist = (courseId) => {
    if (student) {
      RemoveFromWishlist(courseId).then((res) => {
        toast.error(res?.message)
        refreshWishlist();
      }).catch((err) => {
        console.log(err);
      })
    }
  }
  const OnAddToWishlist = (courseId) => {
    let courseArray = [courseId];
    let data = JSON.stringify(courseArray)
    if (student) {
      AddToWishlist({ courseIdArray: data }).then((res) => {
        toast.success(res?.message);
        refreshWishlist();
      }).catch((err) => {
        console.log(err);
      })
    }
  }
  useEffect(() => {
    refreshWishlist();
  }, [])
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    setLoading(true);
    const data = {
      id: instructorData?.instructorCode,
      page: 1,
    };
    GetInstructorCourseList(data)
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
  }, []);

  const paginationCourseList = (limit, page) => {
    const data = {
      id: instructorData?.instructorCode,
      page,
    };
    GetInstructorCourseList(data)
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
    <>
      <div className="col-xl-9 col-lg-9">
        <div className="settings-widget card-info">
          <div className="settings-menu p-0">
            <div className="profile-heading">
              <h3>
                {" "}
                {instructorData?.name} -{" "}
                <span className="instructor-title">
                  {" "}
                  {instructorData?.instructorTitle}{" "}
                </span>{" "}
              </h3>
            </div>
            <div className="checkout-form pb-0">
              <div className="tab-content">
                <div className="tab-pane fade show active" id="enroll-courses">
                  <div className="row">
                    {/* <!-- Course Grid --> */}
                    {courseList?.length > 0 &&
                      courseList?.map((course) => {
                        return (
                          <>
                            <div className="col-xxl-4 col-md-6 d-flex">
                              <div className="course-box flex-fill">
                                <div className="product">
                                  <div className="product-img">
                                    <Link target="_blank" to={`/course-details/${course?.c_courseCode}/${course?.c_courseSlug}`}>
                                      <img
                                        className="img-fluid"
                                        alt="Img"
                                        src={`${urlPrefix}/${course?.c_courseThumbnail}`}
                                        onError={(e) => e.target.src = defaultThumbnailImg}
                                      />
                                    </Link>
                                    {course?.c_courseTotalPrice > 0 ? (
                                      <div className="price">
                                        <h3>
                                          ₹{course?.c_courseTotalPrice}{" "}
                                          <span>₹{course?.c_coursePrice}</span>
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
                                        <Link to="">
                                          <img
                                            src={`${insImagePrefix}/${instructorData?.employeeImage}`}
                                            alt="Img"
                                            className="img-fluid"
                                            onError={(e) => e.target.src = defaultInstructorImg}
                                          />
                                        </Link>
                                        <div className="course-name">
                                          <h4>
                                            <Link to="">
                                              {course?.c_assignedInstructorsName &&
                                                JSON.parse(
                                                  course?.c_assignedInstructorsName
                                                )[0]?.name}
                                            </Link>
                                          </h4>
                                          <p>Instructor</p>
                                        </div>
                                      </div>
                                      <div className="course-share d-flex align-items-center justify-content-center">
                                        {<Link to="">
                                          {wishlistIds?.includes(course?.c_courseId) ? <i className='fa-solid fa-heart' onClick={() => onRemoveFromWishlist(course?.c_courseId)}></i> :
                                            <i className='fa-regular fa-heart' onClick={() => OnAddToWishlist(course?.c_courseId)}></i>
                                          }</Link>
                                        }
                                      </div>
                                    </div>
                                    <h3 className="title instructor-text">
                                      <Link target="_blank" to={`/course-details/${course?.c_courseCode}/${course?.c_courseSlug}`}>
                                        {course?.c_courseTitle}
                                      </Link>
                                    </h3>
                                    <div className="course-info d-flex align-items-center">
                                      <div className="rating-img d-flex align-items-center">
                                        <img src={icon01} alt="Img" />
                                        <p>{course?.c_lessonCount}+ Lesson</p>
                                      </div>
                                      <div className="course-view d-flex align-items-center">
                                        <img src={icon02} alt="Img" />
                                        <p>
                                          {minuteToHrs(
                                            course?.c_lessonDuration
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                    {course?.c_rating == 0 || course?.c_rating == 5 ? (
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
                                          {course?.c_rating >= 2 ? (
                                            <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                                          ) :
                                            course?.c_rating < 2 && course.c_rating > 1 ?
                                              <i className="fas fa-star-half-alt" style={{ color: '#FFD43B' }}></i>
                                              : <i className="fas fa-star" ></i>}
                                          {course.c_rating >= 3 ? (
                                            <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                                          ) :
                                            course.c_rating < 3 && course.c_rating > 2 ?
                                              (
                                                <i className="fas fa-star-half-alt" style={{ color: '#FFD43B' }}></i>
                                              ) : <i className="fas fa-star"></i>}
                                          {course.c_rating >= 4 ? (
                                            <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                                          ) :
                                            course.c_rating < 4 && course.c_rating > 3 ?
                                              (
                                                <i className="fas fa-star-half-alt" style={{ color: '#FFD43B' }}></i>
                                              ) : <i className="fas fa-star"></i>}
                                          {course.c_rating >= 5 ? (
                                            <i className="fas fa-star filled" ></i>
                                          ) :
                                            course.c_rating < 5 && course.c_rating > 4 ?
                                              (
                                                <i className="fas fa-star-half-alt" style={{ color: '#FFD43B' }}></i>
                                              ) : <i className="fas fa-star"></i>}

                                          <span className="d-inline-block average-rating">
                                            <span>({course.c_rating ?? 5.0})</span>
                                          </span>
                                        </div>
                                      )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}

                    {/* <!-- /Course Grid --> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Pagination
          runFunction={paginationCourseList}
          itemPerPage={6}
          totalItems={paginateData?.totalItemCount || 0}
          paginate={paginate}
          currentPage={Number(paginateData?.currentPageNumber)}
          pageStartCount={paginateData?.pageStartCount}
          pageEndCount={paginateData?.pageEndCount}
        />
      </div>
    </>
  );
};

export default InstructorCourses;
