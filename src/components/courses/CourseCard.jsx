import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import conf from '../../conf/conf'
import { useAuthCompany } from '../../services/AppServices'
import defaultInstructorImage from '../../assets/img/default-instructor-image.png'
import defaultThumbnail from '../../assets/img/deafult-course-thumbnail.png'
import icon01 from "../../assets/img/icon/icon-01.svg";
import icon02 from "../../assets/img/icon/icon-02.svg";
import user from "../../assets/img/user/user.jpg";
import { minuteToHrs } from '../../utils/dynamic.util'
import AuthStudent, { AddToWishlist, GetWishlistIdsList, RemoveFromWishlist } from '../../services/StudentServices'
import { toast } from 'react-toastify'

const CourseCard = ({ course, index }) => {
    const [wishlistIds, setWishlistIds] = useState([]);
    const { companyData } = useAuthCompany();
    const { student } = AuthStudent();
    const [urlPrefix, setUrlPrefix] = useState(
        `${conf.apiAssetUrl}/${companyData?.frontFolder}/thumbnail`
    );

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

    return (<div
        key={index}
        className="course-box trend-box"
        style={{ minHeight: "545px" }}
    >
        <div
            className="product trend-product rounded-0"
            style={{ minHeight: "545px" }}
        >
            <div className="product-img">
                <Link target="_blank"  to={`/course-details/${course?.courseCode}/${course?.courseSlug}`}>
                    <img
                        className="img-fluid"
                        alt="Img"
                        src={`${urlPrefix}/${course.courseThumbnail}`}
                        onError={(e) => e.target.src = defaultThumbnail}  // Set fallback image if error
                    />
                </Link>
                {course.courseDiscountedPrice != 0 ? (
                    <div className="price">
                        <h3>
                            ₹{course.courseDiscountedPrice}{" "}
                            <span>₹{course.coursePrice}</span>
                        </h3>{" "}
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
                        <Link
                            to={`/instructor-details/${course?.instructorCode}`}
                        >
                            <img
                                src={`${conf.apiAssetUrl}/${companyData?.frontFolder}/kyc/${JSON.parse(`${course?.instructorNames}`)[0]?.employeeImage}`}
                                alt="Instructor"
                                className="img-fluid"
                                onError={(e) => e.target.src = defaultInstructorImage}  // Set fallback image if error
                            />
                        </Link>
                        <div className="course-name">
                            <h4>
                                <Link
                                    to={`/instructor-details/${course?.instructorCode}`}
                                >
                                    {
                                        JSON.parse(course?.instructorNames)[0]
                                            ?.name
                                    }
                                </Link>
                            </h4>
                            <p>Instructor</p>
                        </div>
                    </div>
                    <div className="course-share d-flex align-items-center justify-content-center">
                        {course?.isPurchased === "NO" && <Link to="">
                            {wishlistIds?.includes(course?.courseId) ? <i className='fa-solid fa-heart' onClick={() => onRemoveFromWishlist(course?.courseId)}></i> :
                                <i className='fa-regular fa-heart' onClick={() => OnAddToWishlist(course?.courseId)}></i>
                            }
                        </Link>
                        }

                    </div>
                </div>
                <h3 className="title">
                    <Link target="_blank" to={`/course-details/${course?.courseCode}/${course?.courseSlug}`}>
                        {course.courseTitle}
                    </Link>
                </h3>
                <div className="course-info d-flex align-items-center">
                    <div className="rating-img d-flex align-items-center">
                        <img
                            src={icon01}
                            alt="Img"
                            className="img-fluid"
                            style={{ width: "18px" }}
                        />
                        <p>{course?.lessonCount}+ Lesson</p>
                    </div>
                    <div className="course-view d-flex align-items-center">
                        <img
                            src={icon02}
                            alt="Img"
                            className="img-fluid"
                            style={{ width: "20px" }}
                        />
                        <p>{minuteToHrs(course?.lessonDuration)}</p>
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    {course?.rating == 0 || course?.rating == 5 ? (
                        <div className="rating m-0">
                            <i className="fas fa-star filled"  style={{color:'#FFD43B'}}></i>
                            <i className="fas fa-star filled"  style={{color:'#FFD43B'}}></i>
                            <i className="fas fa-star filled"  style={{color:'#FFD43B'}}></i>
                            <i className="fas fa-star filled"  style={{color:'#FFD43B'}}></i>
                            <i className="fas fa-star filled"  style={{color:'#FFD43B'}}></i>
                            <span className="d-inline-block average-rating">
                                <span>(5.0)</span>
                            </span>
                        </div>
                    ) : (
                        <div className="rating m-0">
                            <i className="fas fa-star filled" style={{color:'#FFD43B'}}></i>
                            {course?.rating >= 2 ? (
                                <i className="fas fa-star filled" style={{color:'#FFD43B'}}></i>
                            ) :
                            course?.rating < 2 && course.rating > 1 ?
                                <i className="fas fa-star-half-alt" style={{color:'#FFD43B'}}></i>
                            : <i className="fas fa-star" ></i>}
                            {course?.rating >= 3 ? (
                                <i className="fas fa-star filled" style={{color:'#FFD43B'}}></i>
                            ) :
                            course?.rating < 3 && course.rating > 2 ?
                            (
                                <i className="fas fa-star-half-alt" style={{color:'#FFD43B'}}></i>
                            ) : <i className="fas fa-star"></i>}
                            {course?.rating >= 4 ? (
                                <i className="fas fa-star filled" style={{color:'#FFD43B'}}></i>
                            ) :
                            course?.rating < 4 && course.rating > 3 ?
                            (
                                <i className="fas fa-star-half-alt" style={{color:'#FFD43B'}}></i>
                            ) : <i className="fas fa-star"></i>}
                            {course?.rating >= 5 ? (
                                <i className="fas fa-star filled" ></i>
                            ) :
                            course?.rating < 5 && course.rating > 4 ?
                            (
                                <i className="fas fa-star-half-alt" style={{color:'#FFD43B'}}></i>
                            ) : <i className="fas fa-star"></i>}

                            <span className="d-inline-block average-rating">
                                <span>({course?.rating ?? 5.0})</span>
                            </span>
                        </div>
                    )}

                    <div className="all-btn all-category d-flex align-items-center">
                        <Link
                        target="_blank"
                            to={
                                course?.isPurchased === "YES"
                                    ? `/student/course-read/${course?.courseCode}`
                                    : `/course-details/${course?.courseCode}/${course?.courseSlug}`
                            }
                            className="btn btn-primary"
                        >
                            {course?.isPurchased === "YES"
                                ? "View Course"
                                : "BUY NOW"}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default CourseCard