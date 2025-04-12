import React, { useEffect, useState } from "react";
import {
  AddUpdateCourseReview,
  GeAllReviewListByCourseCode,
  GetParticularStudentReviewByCourseCode,
} from "../../services/StudentServices";
import { Comment } from "react-loader-spinner";
import {
  Col,
  Row,
  ProgressBar,
  ModalBody,
  ModalHeader,
  Modal,
  Button,
} from "react-bootstrap";
import "../../assets/css/course-review.css";
import { FaRegStar, FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { formatDate, formatDateOnly } from "../../utils/dynamic.util";
import { FaEdit } from "react-icons/fa";
import { IoMdAddCircle, IoMdCloseCircle } from "react-icons/io";
import { toast } from "react-toastify";

const CourseReview = ({ courseData }) => {
  const [totalRatings, setTotalRatings] = useState(0);
  const [myReview, setMyReview] = useState({});
  const [ratingDetails, setRatingDetails] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [ratingStats, setRatingStats] = useState({});
  const [show, setShow] = useState(false);
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [expandedReviews, setExpandedReviews] = useState({});
  const toggleReview = (index) => {
    setExpandedReviews((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle expanded state for the selected review
    }));
  };
  const onHandleChangeRate = (value) => {
    setRate(value);
  };
  const onHandleChangeReview = (e) => {
    setReview(e.target.value);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setRate(myReview?.review?.ratingPoint);
    setReview(myReview?.review?.reviewText);
  };

  const onSubmitRating = () => {
    const data = {
      courseCode: courseData.courseCode,
      reviewText: review,
      ratingPoint: rate,
    };
    setLoading(true);
    AddUpdateCourseReview(data)
      .then((res) => {
        toast.success(res?.message);
        refreshStudentReview();
        refreshReviewList();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);

        handleClose();
      });
  };

  const refreshReviewList = () => {
    setLoading(true);
    GeAllReviewListByCourseCode(courseData.courseCode)
      .then((res) => {
        setRatingDetails(res.data);
        let ratingStats = {
          fiveStar: 0,
          fourStar: 0,
          threeStar: 0,
          twoStar: 0,
          oneStar: 0,
        };
        res?.data?.reviewStats?.map((item) => {
          if (item?.rating == 5) {
            ratingStats.fiveStar = item?.count;
          } else if (item?.rating == 4) {
            ratingStats.fourStar = item?.count;
          } else if (item?.rating == 3) {
            ratingStats.threeStar = item?.count;
          } else if (item?.rating == 2) {
            ratingStats.twoStar = item?.count;
          } else if (item?.rating == 1) {
            ratingStats.oneStar = item?.count;
          }
        });
        setRatingStats(ratingStats);
        setTotalRatings(res?.data?.reviewList?.length);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const refreshStudentReview = () => {
    setLoading(true);
    GetParticularStudentReviewByCourseCode(courseData?.courseCode)
      .then((res) => {
        setMyReview(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    refreshReviewList();
    refreshStudentReview();
  }, []);

  return (
    <div className="" style={{ minHeight: "200px", width: "100%" }}>
      {isLoading ? (
        <>
          <div className="loader-div">
            <Comment
              visible={true}
              height="50"
              width="50"
              ariaLabel="comment-loading"
              wrapperStyle={{}}
              wrapperClass=""
              color="#fff"
              backgroundColor="#F4442E"
            />
          </div>
        </>
      ) : (
        <>
          <div className="row  w-100 p-4">
            <div className="review-info-block-left">
              <h5 className="">Student Feedback</h5>
              <div lg={3} md={3} className="rating-block">
                <div className="rating-points my-2">
                  {Number.isInteger(ratingDetails?.rating)
                    ? `${ratingDetails?.rating}.0`
                    : ratingDetails?.rating?.toFixed(1)}
                </div>
                <div className="rating-stars">
                  {ratingDetails?.rating >= 1 ? (
                    <FaStar color="#b4690e" size="20" />
                  ) : ratingDetails?.rating == 0.5 ? (
                    <FaStarHalfStroke color="#b4690e" size="20" />
                  ) : (
                    <FaRegStar color="#b4690e" size="20" />
                  )}
                  {ratingDetails?.rating >= 2 ? (
                    <FaStar color="#b4690e" size="20" />
                  ) : ratingDetails?.rating == 1.5 ? (
                    <FaStarHalfStroke color="#b4690e" size="20" />
                  ) : (
                    <FaRegStar color="#b4690e" size="20" />
                  )}
                  {ratingDetails?.rating >= 3 ? (
                    <FaStar color="#b4690e" size="20" />
                  ) : ratingDetails?.rating == 2.5 ? (
                    <FaStarHalfStroke color="#b4690e" size="20" />
                  ) : (
                    <FaRegStar color="#b4690e" size="20" />
                  )}
                  {ratingDetails?.rating >= 4 ? (
                    <FaStar color="#b4690e" size="20" />
                  ) : ratingDetails?.rating == 3.5 ? (
                    <FaStarHalfStroke color="#b4690e" size="20" />
                  ) : (
                    <FaRegStar color="#b4690e" size="20" />
                  )}
                  {ratingDetails?.rating === 5 ? (
                    <FaStar color="#b4690e" size="20" />
                  ) : ratingDetails?.rating == 4.5 ? (
                    <FaStarHalfStroke color="#b4690e" size="20" />
                  ) : (
                    <FaRegStar color="#b4690e" size="20" />
                  )}
                </div>
                <div className="text-soft my-2">Average Rating</div>
              </div>
              <div className="review-info-block-right">
                <div className="review-stars-list-1 my-2">
                  <div className="rating-bar">
                    <ProgressBar
                      variant="secondary"
                      now={((ratingStats?.fiveStar ?? 0) / totalRatings) * 100}
                      className="rating-slider"
                    />
                  </div>
                  <div className="rating-star-list">
                    <FaStar color="#b4690e" size="14" />
                    <FaStar color="#b4690e" size="14" />
                    <FaStar color="#b4690e" size="14" />
                    <FaStar color="#b4690e" size="14" />
                    <FaStar color="#b4690e" size="14" />
                  </div>
                  <div className="text-soft rating-student-count ps-2">
                    ({ratingStats?.fiveStar ?? 0})
                  </div>
                </div>
                <div className="review-stars-list-1 my-2">
                  <div className="rating-bar">
                    <ProgressBar
                      variant="secondary"
                      now={((ratingStats?.fourStar ?? 0) / totalRatings) * 100}
                      className="rating-slider"
                    />
                  </div>
                  <div className="rating-star-list">
                    <FaStar color="#b4690e" size="14" />
                    <FaStar color="#b4690e" size="14" />
                    <FaStar color="#b4690e" size="14" />
                    <FaStar color="#b4690e" size="14" />
                    <FaRegStar color="#b4690e" size="14" />
                  </div>
                  <div className="text-soft rating-student-count ps-2">
                    ({ratingStats?.fourStar ?? 0})
                  </div>
                </div>
                <div className="review-stars-list-1 my-2">
                  <div className="rating-bar">
                    <ProgressBar
                      variant="secondary"
                      now={((ratingStats?.threeStar ?? 0) / totalRatings) * 100}
                      className="rating-slider"
                    />
                  </div>
                  <div className="rating-star-list">
                    <FaStar color="#b4690e" size="14" />
                    <FaStar color="#b4690e" size="14" />
                    <FaStar color="#b4690e" size="14" />
                    <FaRegStar color="#b4690e" size="14" />
                    <FaRegStar color="#b4690e" size="14" />
                  </div>
                  <div className="text-soft rating-student-count ps-2">
                    ({ratingStats?.threeStar ?? 0})
                  </div>
                </div>
                <div className="review-stars-list-1 my-2">
                  <div className="rating-bar">
                    <ProgressBar
                      variant="secondary"
                      now={((ratingStats?.twoStar ?? 0) / totalRatings) * 100}
                      className="rating-slider"
                    />
                  </div>
                  <div className="rating-star-list">
                    <FaStar color="#b4690e" size="14" />
                    <FaStar color="#b4690e" size="14" />
                    <FaRegStar color="#b4690e" size="14" />
                    <FaRegStar color="#b4690e" size="14" />
                    <FaRegStar color="#b4690e" size="14" />
                  </div>
                  <div className="text-soft rating-student-count ps-2">
                    ({ratingStats?.twoStar ?? 0})
                  </div>
                </div>
                <div className="review-stars-list-1 my-2">
                  <div className="rating-bar">
                    <ProgressBar
                      variant="secondary"
                      now={((ratingStats?.oneStar ?? 0) / totalRatings) * 100}
                      className="rating-slider"
                    />
                  </div>
                  <div className="rating-star-list">
                    <FaStar color="#b4690e" size="14" />
                    <FaRegStar color="#b4690e" size="14" />
                    <FaRegStar color="#b4690e" size="14" />
                    <FaRegStar color="#b4690e" size="14" />
                    <FaRegStar color="#b4690e" size="14" />
                  </div>
                  <div className="text-soft rating-student-count ps-2">
                    ({ratingStats?.oneStar ?? 0})
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="review-list px-0 px-md-4">
            {/* My Review */}
            {myReview && myReview?.review?.ratingPoint > 0 ? (
              <>
                <h5 className="student-review-heading"> My Review </h5>
                <div className="main-review mt-2 mb-4">
                  <Row className="border-bottom">
                    <Col xl={1} lg={2} md={2} className="d-none d-md-block">
                      <div className="reviewer-image">
                        {myReview?.review?.studentName
                          ?.split(" ")[0]
                          .charAt(0) +
                          myReview?.review?.studentName
                            ?.split(" ")[1]
                            ?.charAt(0)}
                      </div>
                    </Col>

                    <Col lg={10} md={12}>
                      <div className="review-details">
                        <div className="reviewer-name">
                          {myReview?.review?.studentName}{" "}
                          <FaEdit
                            onClick={handleShow}
                            className="clickable-btn ms-2"
                            size={20}
                          />{" "}
                        </div>
                        <div className="review-rating my-1">
                          <div className="rating-star-list">
                            {myReview?.review?.ratingPoint >= 1 ? (
                              <FaStar color="#b4690e" size="18" />
                            ) : (
                              <FaRegStar color="#b4690e" size="18" />
                            )}
                            {myReview?.review?.ratingPoint >= 2 ? (
                              <FaStar color="#b4690e" size="18" />
                            ) : (
                              <FaRegStar color="#b4690e" size="18" />
                            )}
                            {myReview?.review?.ratingPoint >= 3 ? (
                              <FaStar color="#b4690e" size="18" />
                            ) : (
                              <FaRegStar color="#b4690e" size="18" />
                            )}
                            {myReview?.review?.ratingPoint >= 4 ? (
                              <FaStar color="#b4690e" size="18" />
                            ) : (
                              <FaRegStar color="#b4690e" size="18" />
                            )}
                            {myReview?.review?.ratingPoint === 5 ? (
                              <FaStar color="#b4690e" size="18" />
                            ) : (
                              <FaRegStar color="#b4690e" size="18" />
                            )}
                          </div>
                          <div className="review-date ms-2">
                            {formatDate(myReview?.review?.updatedAt)}
                          </div>
                        </div>
                        <div className="review-content my-1">
                          <p className="text-soft">
                            {myReview?.review?.reviewText}
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </>
            ) : (
              <Button className="btn btn-sm mb-3" onClick={handleShow}>
                <IoMdAddCircle className="clickable-btn me-2" size={20} />
                Add Review
              </Button>
            )}

            {/* Student Review */}
            <h5 className="student-review-heading">Student Reviews</h5>
            {ratingDetails?.reviewList?.map((item, index) => {
              const isExpanded = expandedReviews[index]; // Check if the review is expanded
              const reviewText = item?.reviewText;
              const isLongReview = reviewText.split(" ").length > 20; // Example condition for long reviews

              return (
                <div className="main-review mt-2" key={index}>
                  <Row className="border-bottom">
                    <Col xl={1} lg={2} md={2} className="d-none d-md-block">
                      <div className="reviewer-image">
                        {item?.studentName?.split(" ")[1]?.charAt(0) ? 
                        item?.studentName?.split(" ")[0].charAt(0) +
                        item?.studentName?.split(" ")[1]?.charAt(0) :
                        item?.studentName?.split(" ")[0].charAt(0)}
                      </div>
                    </Col>

                    <Col lg={10} md={12}>
                      <div className="review-details">
                        <div className="reviewer-name">{item?.studentName}</div>
                        <div className="review-rating my-1">
                          <div className="rating-star-list">
                            {[...Array(5)].map((_, i) => (
                              <React.Fragment key={i}>
                                {item?.ratingPoint >= i + 1 ? (
                                  <FaStar color="#b4690e" size="18" />
                                ) : (
                                  <FaRegStar color="#b4690e" size="18" />
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                          <div className="review-date ms-2">
                            {formatDate(item?.updatedAt)}
                          </div>
                        </div>
                        <div className="review-content my-1">
                          <p className="text-soft">
                            {isExpanded || !isLongReview
                              ? reviewText
                              : `${reviewText
                                  .split(" ")
                                  .slice(0, 20)
                                  .join(" ")}...`}
                          </p>
                          {isLongReview && (
                            <button
                              className="btn btn-primary btn-sm rounded-0"
                              onClick={() => toggleReview(index)}
                            >
                              {isExpanded ? "View Less" : "View More"}
                            </button>
                          )}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              );
            })}
          </div>

          <Modal
            show={show}
            onHide={handleClose}
            centered
            backdrop="static"
            size="lg"
          >
            {/* <ModalHeader className="d-flex justify-content-end pb-3">
              <IoMdCloseCircle size={23} className="clickable-btn" onClick={handleClose} />
            </ModalHeader> */}
            <ModalBody>
              <div className="rating-page">
                <h5 className="text-soft mb-2">
                  Your feedback is precious to us
                </h5>
                <div className="rate-component mb-2">
                  <FaStar
                    size={40}
                    onClick={() => onHandleChangeRate(1)}
                    color={rate > 0 ? "#b4690e" : "#dee2e6"}
                  />
                  <FaStar
                    size={40}
                    onClick={() => onHandleChangeRate(2)}
                    color={rate > 1 ? "#b4690e" : "#dee2e6"}
                  />
                  <FaStar
                    size={40}
                    onClick={() => onHandleChangeRate(3)}
                    color={rate > 2 ? "#b4690e" : "#dee2e6"}
                  />
                  <FaStar
                    size={40}
                    onClick={() => onHandleChangeRate(4)}
                    color={rate > 3 ? "#b4690e" : "#dee2e6"}
                  />
                  <FaStar
                    size={40}
                    onClick={() => onHandleChangeRate(5)}
                    color={rate > 4 ? "#b4690e" : "#dee2e6"}
                  />
                </div>
                <div className="review-component my-2">
                  <div>Tell us more (optional)</div>
                  <textarea
                    type="text"
                    placeholder="Why this rating?"
                    value={review}
                    onChange={onHandleChangeReview}
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <div
                    className="btn btn-primary btn-sm me-1 border-none"
                    onClick={onSubmitRating}
                  >
                    Submit
                  </div>
                  <div
                    className="btn btn-warning btn-sm ms-1 border-none text-white"
                    onClick={handleClose}
                  >
                    Cancel
                  </div>
                </div>
              </div>
            </ModalBody>
          </Modal>
        </>
      )}
    </div>
  );
};

export default CourseReview;
