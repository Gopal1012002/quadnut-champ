import React, { useEffect, useState } from "react";
import AuthStudent, { GetStudentReviewList } from "../../../services/StudentServices";
import Pagination from "../../common/Pagination";
import { formatDate } from "../../../utils/dynamic.util";
import { useAuthCompany } from "../../../services/AppServices";
import conf from "../../../conf/conf";
import dummYUser from '../../../assets/img/dummyUser.png';
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";
import { Link } from "react-router-dom";

const StudentReviews = () => {
    const {companyData} = useAuthCompany();
    const {student} = AuthStudent();
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
        limit:8,
        page:1
    })

    const paginationCourseList = (limit, page) => {
        const data = {
          limit,
          page,
        };
        GetStudentReviewList(data).then((res)=>{
            setReviewList(res.data?.data)
            setPaginateData(res?.data);
        }).catch((err)=>{
            console.log(err);
        }).finally(()=>{
            setLoading(false)
        })
      };

    useEffect(()=>{
        setLoading(true);
        GetStudentReviewList(filters).then((res)=>{
            setReviewList(res.data?.data)
            setPaginateData(res?.data);
        }).catch((err)=>{
            console.log(err);
        }).finally(()=>{
            setLoading(false)
        })
    },[])
  return (
    <>
      <div className="col-xl-9 col-lg-9">
        <div className="settings-widget card-details">
          <div className="settings-menu p-0">
            <div className="profile-heading">
              <h3>Reviews</h3>
            </div>
            <div className="checkout-form">
            {
                isLoading ? 
                <>
                <div className="course-block-long shine">
                </div>
                <div className="course-block-long shine">
                </div>
                <div className="course-block-long shine">
                </div>
                <div className="course-block-long shine">
                </div>
                <div className="course-block-long shine">
                </div>
                </>
                 :
                 reviewList?.length > 0 ? reviewList?.map((review, index)=>{
                    return <div className="review-wrap" key={index}>
                    <div className="review-user-info">
                      <div className="reviewer">
                        <div className="review-img">
                          <Link to="">
                            {
                                isImage ?
                                <img src={`${urlPrefix}/${student?.image}`} 
                                    onError={()=>setImage(false)}
                                alt="img" /> :
                                <img src={dummYUser} alt="img" />
                            }
                            
                          </Link>
                        </div>
                        <div className="reviewer-info">
                          <h6>
                            <Link to={`/course-details/${review?.courseCode}`}>{review?.courseName}</Link>
                          </h6>
                          <p>{formatDate(review?.updatedAt)}</p>
                        </div>
                      </div>
                      <div className="reviewer-rating">
                        <FaStar color="#ffb931" size="14" />
                        {review?.ratingPoint >= 2 ? (
                        <FaStar color="#ffb931" size="14" />
                      ) : review?.ratingPoint == 1.5 ? (
                        <FaStarHalfStroke color="#ffb931" size="14" />
                      ) : (
                        <FaRegStar color="#ffb931" size="14" />
                      )}
                      {review?.ratingPoint >= 3 ? (
                        <FaStar color="#ffb931" size="14" />
                      ) : review?.ratingPoint == 2.5 ? (
                        <FaStarHalfStroke color="#ffb931" size="14" />
                      ) : (
                        <FaRegStar color="#ffb931" size="14" />
                      )}
                      {review?.ratingPoint >= 4 ? (
                        <FaStar color="#ffb931" size="14" />
                      ) : review?.ratingPoint == 3.5 ? (
                        <FaStarHalfStroke color="#ffb931" size="14" />
                      ) : (
                        <FaRegStar color="#ffb931" size="14" />
                      )}
                      {review?.ratingPoint === 5 ? (
                        <FaStar color="#ffb931" size="14" />
                      ) : review?.ratingPoint == 4.5 ? (
                        <FaStarHalfStroke color="#ffb931" size="14" />
                      ) : (
                        <FaRegStar color="#ffb931" size="14" />
                      )}
                      </div>
                    </div>
                    <div className="review-content">
                      <p>
                        {review?.reviewText}
                      </p>
                      {/* <div className="review-action">
                        <Link to="">View Course</Link>
                      </div> */}
                    </div>
                  </div>
                 }) :
                      <p className="w-100 text-center text-soft"> No Review Found</p>

            }
              {/* <!-- Review --> */}
              
              {/* <!-- /Review --> */}
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
    </>
  );
};

export default StudentReviews;
