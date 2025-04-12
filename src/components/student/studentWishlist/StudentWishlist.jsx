import React, { useEffect, useState } from "react";
import { GetWishlistData, MoveWishlistToCart, RemoveFromWishlist } from "../../../services/StudentServices";
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
import { CourseSmallBoxShimmer } from "../../shimmer/Shimmer";
import { toast } from "react-toastify";
import defaultThumbnail from '../../../assets/img/deafult-course-thumbnail.png'

const StudentWishList = () => {
    const { companyData } = useAuthCompany();
    const [courseList, setCourseList] = useState([]);
    const [paginateData, setPaginateData] = useState();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalEnrolledCourses, setTotalEnrolledCourses] = useState(0);
    const [urlPrefix, setUrlPrefix] = useState(
        `${conf.apiAssetUrl}/${companyData?.frontFolder}/thumbnail`
    );
    const [buttonText, setButtonText] = useState({});
    const onRemoveFromWishlist = (courseId) => {
        RemoveFromWishlist(courseId).then((res) => {
            toast.error(res?.message)
            refreshWishlist();
        }).catch((err) => {
            console.log(err);
        })
    }

    const onMoveWishlistToCart = (courseId) => {
        setButtonText((prev) => ({ ...prev, [courseId]: "Moving..." }));
        MoveWishlistToCart(courseId).then((res) => {
            toast.success(res?.message)
            refreshWishlist();
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setButtonText((prev) => ({ ...prev, [courseId]: "Move To Cart" }));
        })
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const refreshWishlist = () => {
        setLoading(true);
        const data = {
            limit: 6,
            page: currentPage,
        };
        GetWishlistData(data)
            .then((res) => {
                setCourseList(res?.data?.wishlistData?.data);
                setTotalEnrolledCourses(res?.data?.wishlistData?.totalItemCount)
                setPaginateData(res?.data?.wishlistData);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    useEffect(() => {
        refreshWishlist()
    }, []);

    const paginationCourseList = (limit, page) => {
        const data = {
            limit,
            page,
        };
        GetWishlistData(data)
            .then((res) => {
                setCourseList(res?.data?.wishlistData?.data);
                setPaginateData(res?.data?.wishlistData);
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
                            <h3>My Wishlist</h3>
                        </div>
                        <div className="checkout-form">
                            <div className="row">
                                {
                                    loading ?
                                        <CourseSmallBoxShimmer /> :
                                        courseList?.length > 0 ?
                                            courseList?.map((course, index) => {
                                                return (
                                                    <div key={index} className="col-xxl-4 col-md-6 d-flex">
                                                        <div className="course-box flex-fill">
                                                            <div className="product">
                                                                <div className="product-img">
                                                                    <Link to={`/course-details/${course?.courseCode}`}>
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
                                                                            <Link to={`/course-details/${course?.courseCode}`}>
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
                                                                            <Link to="">
                                                                                <i className="fa-solid fa-heart" onClick={() => onRemoveFromWishlist(course?.courseId)}></i>
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                    <h3 className="title instructor-text">
                                                                        <Link to={`/course-details/${course?.courseCode}`}>
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
                                                                    <div className="row">
                                                                        <div className="col-lg-6 col-sm-6 col-xs-6 w-50">
                                                                            {course?.rating == 0 || course?.rating == 5 ? (
                                                                                <div className="rating m-0 col-sm-5 ps-2">
                                                                                    <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                                                                                    <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                                                                                    <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                                                                                    <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                                                                                    <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                                                                                    <span className="d-inline-block average-rating">
                                                                                        {/* <span>(5.0)</span> */}
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
                                                                                        {/* <span>({course?.rating ?? 5.0})</span> */}
                                                                                    </span>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <div className="col-lg-6 col-sm-6 col-xs-6 w-50 d-flex justify-content-end">
                                                                            <Link to={''} className="btn btn-sm btn-primary fs-6" onClick={(e) => onMoveWishlistToCart(course?.courseId)}>
                                                                                <span className="" style={{ fontSize: '13px' }}> {buttonText[course?.courseId] || "Move To Cart"}  </span>
                                                                            </Link>
                                                                        </div>
                                                                    </div>


                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }) :
                                            <p className="text-center text-soft"> Wishlist is Empty</p>
                                }
                                {
                                    courseList?.length > 0 && !loading &&
                                    <Pagination
                                        runFunction={paginationCourseList}
                                        itemPerPage={6}
                                        totalItems={paginateData?.totalItemCount || 0}
                                        paginate={paginate}
                                        currentPage={Number(paginateData?.currentPageNumber)}
                                        pageStartCount={paginateData?.pageStartCount}
                                        pageEndCount={paginateData?.pageEndCount}
                                    />
                                }

                            </div></div>
                    </div></div> </div>
        </>
    );
};

export default StudentWishList;
