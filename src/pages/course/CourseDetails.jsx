import React, { useEffect, useState } from "react";
import dummyUser from "../../assets/img/dummyUser.png";
import icon01 from "../../assets/img/icon/icon-01.svg";
import icon02 from "../../assets/img/icon/icon-02.svg";
import timerIcon from "../../assets/img/icon/timer-icon.svg";
import people from "../../assets/img/icon/people.svg";
import play from "../../assets/img/icon/play.svg";
import readIcon from "../../assets/img/icon/read.png";
import quiz from "../../assets/img/quiz.png";
import videoThumbnail from "../../assets/img/video.jpg";
import importIcon from "../../assets/img/icon/import.svg";
import keyIcon from "../../assets/img/icon/key.svg";
import mobile from "../../assets/img/icon/mobile.svg";
import cloudIcon from "../../assets/img/icon/cloud.svg";
import users from "../../assets/img/icon/users.svg";
import timer from "../../assets/img/icon/timer.svg";
import chapter from "../../assets/img/icon/chapter.svg";
import video from "../../assets/img/icon/video.svg";
import chart from "../../assets/img/icon/chart.svg";
import teacherIcon from "../../assets/img/icon/teacher.svg";
import Head from "../../layouts/main-layout/head/Head";
import "react-pdf/dist/Page/TextLayer.css";
import {
  GetCourseDetailsById,
  GetFeaturedReviewByCourse,
  useAuthCompany,
} from "../../services/AppServices";
import { pdfjs } from "react-pdf";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  minutesToTime,
  minuteToHrs,
  minuteToHrsOnly,
  toFirstUpperCase,
} from "../../utils/dynamic.util";
import conf from "../../conf/conf";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import { Modal, Tab, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";
import AuthStudent, {
  AddToWishlist,
  CourseAddToCartService,
  GetWishlistIdsList,
  RemoveFromWishlist,
} from "../../services/StudentServices";
import { FaRegStar, FaStar, FaStarHalfStroke } from "react-icons/fa6";
import InnerBannerIcon from '../../assets/img/inner-banner.jpg'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url
// ).toString();
const CourseDetails = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const { id } = useParams();
  const { companyData } = useAuthCompany();
  const [featuredReview, setFeaturedReview] = useState({});
  const { student } = AuthStudent();
  const [wishlistIds, setWishlistIds] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState("");
  const [instructorData, setInstructorData] = useState("");
  const [isPurchased, setPurchased] = useState(false);
  const [heights, setHeights] = React.useState([]);
  const [isLoading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(true);
  const [urlPrefix, setUrlPrefix] = useState(
    `${conf.apiAssetUrl}/${companyData?.frontFolder}/thumbnail`
  );
  const [videoUrlPrefix, setVideoUrlPrefix] = useState(
    `${conf.apiAssetUrl}/${companyData?.frontFolder}/content`
  );
  const [coverImage, setCoverImage] = useState('')
  const [isCoverImage, setIsCoverImage] = useState(true);
  const [showCourse, setShowCourse] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [previewDuration, setPreviewDuration] = useState(-1);
  const [isPdfLoaded, setIdPdfLoaded] = useState(false);
  const [tabType, setTabType] = useState('description');
  const onChangeTabType = (value) => {
    setTabType(value)
  }
  const onLoadSuccess = () => {
    setIdPdfLoaded(true);
    setNumPages(1);
  };
  const setPreview = (lesson) => {
    setPreviewDuration(lesson?.previewDuration);
    setModalShow(true);
    setVideoTitle(lesson?.lessonTitle);
    setVideoUrl(`${videoUrlPrefix}/${lesson?.lessonResourceName}`);
  };
  const closePreview = () => {
    setModalShow(false);
    setVideoTitle(null);
    setVideoUrl(null);
  };
  useEffect(() => {
    setLoading(true);
    GetCourseDetailsById(id, student?.studentCode)
      .then((res) => {
        setCourseData(res?.data?.courseDetails);
        setInstructorData(res?.data?.instructorDetails);
        setPurchased(res?.data?.isPurchased === "YES");
        const chapterLength = res?.data?.chapterList?.length;
        let chapterListShowArray = [];
        for (const i = 0; i < chapterLength; i++) {
          chapterListShowArray.push(false);
        }
        setShowCourse(chapterListShowArray);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [companyData]);

  const onRemoveFromWishlist = (courseId) => {
    if (student) {
      setWishlistLoading(true)
      RemoveFromWishlist(courseId).then((res) => {
        toast.error(res?.message)
        refreshWishlist();
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setWishlistLoading(false)
      })
    }
  }

  const refreshWishlist = () => {
    if (student) {
      setWishlistLoading(true)
      GetWishlistIdsList().then((res) => {
        setWishlistIds(res?.data?.wishlist)
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setWishlistLoading(false)
      })
    }
  }
  const OnAddToWishlist = (courseId) => {
    let courseArray = [courseId];
    let data = JSON.stringify(courseArray)
    if (student) {
      setWishlistLoading(true)
      AddToWishlist({ courseIdArray: data }).then((res) => {
        toast.success(res?.message);
        refreshWishlist();
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setWishlistLoading(false)
      })
    } else {
      toast.info('Kindly login first !!!')
    }
  }
  useEffect(() => {
    refreshWishlist();
  }, [])
  const toggleShowCourse = (index, contentElement) => {
    if (!contentElement) return;
    const currentHeight = showCourse[index] ? 0 : contentElement.scrollHeight;

    let show_course_array = [...showCourse];
    show_course_array[index] = !show_course_array[index];
    setShowCourse(show_course_array);

    setHeights((prev) =>
      prev.map((height, i) => (i === index ? currentHeight : height))
    );
  };

  useEffect(() => {
    setLoading(true);
    GetFeaturedReviewByCourse(id)
      .then((res) => {
        setFeaturedReview(res?.data?.featuredReview);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    const initialHeights = courseData?.chapterList?.map(() => 0) || [];
    setHeights(initialHeights);
  }, [courseData]);

  const onAddToCart = () => {
    if (isPurchased) {
      // navigate("/student-login");
      navigate(`/student/course-read/${id}`);
      return;
    }
    if (!courseData?.courseId) {
      toast.error("Course not found !!");
      return;
    }
    if (!student?.studentId) {
      localStorage.setItem("ccode", courseData?.courseCode);
      navigate("/student-login");
      window.location.reload();
      return;
    }

    setLoading(true);
    CourseAddToCartService(courseData?.courseId)
      .then((res) => {
        toast.success(res?.message);
        navigate("/student/cart");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCopyUrl = () => {
    // Get the current URL
    const currentUrl = window.location.href;

    // Use the Clipboard API to copy the URL to the clipboard
    navigator.clipboard.writeText(currentUrl).then(() => {
      // Optional: Show a success message to the user
      // alert("Current URL copied to clipboard: " + currentUrl);
      toast.info("URL copied to clipboard");
    }).catch((error) => {
      console.error("Failed to copy the URL: ", error);
    });
  };

  return (
    <>
      <Head title={`${courseData?.courseTitle}`} />
      <div className="main-wrapper footer-separate">
        {/* <!-- Inner Banner --> */}
        <img
          src={courseData?.courseCoverImage}
          alt="Course Cover"
          style={{ display: 'none' }} // Hide the image element
          onError={() => {
            setIsCoverImage(false)
          }}
        />
        <div className="inner-banner"
          style={{ backgroundImage: `url(${isCoverImage ? courseData?.courseCoverImage : InnerBannerIcon})` }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="instructor-wrap border-bottom-0 m-0">
                  <div className="about-instructor align-items-center">
                    <div className="abt-instructor-img">
                      <Link to="">
                        <img src={dummyUser} alt="img" className="img-fluid" />
                      </Link>
                    </div>
                    <div className="instructor-detail me-3">

                      <h5>
                        <Link to="">
                          {courseData?.assignedInstructorsName?.length > 0 &&
                            courseData?.assignedInstructorsName[0]?.name}
                        </Link>
                      </h5>
                      <p>{instructorData?.instructorTitle}</p>
                    </div>
                    <div className="rating mb-0 me-2">
                      {
                        courseData?.rating == 0 ? <>
                          <FaStar color="#ffb931" size="14" />
                          <FaStar color="#ffb931" size="14" />
                          <FaStar color="#ffb931" size="14" />
                          <FaStar color="#ffb931" size="14" />
                          <FaStar color="#ffb931" size="14" />
                        </> : <>
                          {courseData?.rating >= 1 ? (
                            <FaStar color="#ffb931" size="14" />
                          ) : courseData?.rating == 0.5 ? (
                            <FaStarHalfStroke color="#ffb931" size="14" />
                          ) : (
                            <FaRegStar color="#ffb931" size="14" />
                          )}
                          {courseData?.rating >= 2 ? (
                            <FaStar color="#ffb931" size="14" />
                          ) : courseData?.rating == 1.5 ? (
                            <FaStarHalfStroke color="#ffb931" size="14" />
                          ) : (
                            <FaRegStar color="#ffb931" size="14" />
                          )}
                          {courseData?.rating >= 3 ? (
                            <FaStar color="#ffb931" size="14" />
                          ) : courseData?.rating == 2.5 ? (
                            <FaStarHalfStroke color="#ffb931" size="14" />
                          ) : (
                            <FaRegStar color="#ffb931" size="14" />
                          )}
                          {courseData?.rating >= 4 ? (
                            <FaStar color="#ffb931" size="14" />
                          ) : courseData?.rating == 3.5 ? (
                            <FaStarHalfStroke color="#ffb931" size="14" />
                          ) : (
                            <FaRegStar color="#ffb931" size="14" />
                          )}
                          {courseData?.rating === 5 ? (
                            <FaStar color="#ffb931" size="14" />
                          ) : courseData?.rating == 4.5 ? (
                            <FaStarHalfStroke color="#ffb931" size="14" />
                          ) : (
                            <FaRegStar color="#ffb931" size="14" />
                          )}
                        </>
                      }

                      <span className="d-inline-block average-rating">
                        {/* <span>{courseData?.rating}.0</span> */}
                      </span>
                    </div>
                  </div>
                  <span className="web-badge mb-3">
                    {courseData?.subCategoryName}
                  </span>
                </div>
                <h2>{courseData?.courseTitle}</h2>
                <div>{courseData?.courseShortDescridivtion}</div>
                <div className="course-info d-flex align-items-center border-bottom-0 m-0 p-0">
                  <div className="cou-info">
                    <img src={icon01} alt="Img" />
                    <p>{courseData?.lessonCount}+ Lesson</p>
                  </div>
                  <div className="cou-info">
                    <img src={timerIcon} alt="Img" />
                    <p> {minuteToHrs(courseData?.lessonDuration)} </p>
                  </div>
                  <div className="cou-info">
                    <img src={people} alt="Img" />
                    <p>{courseData?.enrolledStudents} students enrolled</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /Inner Banner --> */}

        {/* <!-- Course Content --> */}
        <section className="page-content course-sec">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <Tabs
                  defaultActiveKey="description"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                  onSelect={(key) => onChangeTabType(key)}
                >
                  <Tab eventKey="description" title="Description">
                  </Tab>
                  <Tab eventKey="outcome" title="Outcomes">
                  </Tab>
                  <Tab eventKey="requirement" title="Requirements">
                  </Tab>
                </Tabs>
                {/* <!-- Overview --> */}
                <div className="card overview-sec">
                  {
                    tabType === 'description' && <>

                    </>
                  }
                  <div className="card-body">
                    {tabType === 'description' && <>
                      <h5 className="subs-title">Overview</h5>
                      <h6>Course Description</h6>
                      {isLoading ? (
                        <div>
                          <div className="long-box-shimmer shine"></div>
                        </div>
                      ) : <div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: courseData?.courseDescription,
                          }}
                        />
                      </div>}
                    </>}
                    {tabType === 'outcome' &&
                      <>
                        <h6>What you'll learn</h6>
                        {isLoading ? (
                          <div>
                            <div className="long-box-shimmer shine"></div>
                          </div>
                        ) :
                          <div
                            dangerouslySetInnerHTML={{
                              __html: courseData?.courseOutcomes,
                            }}
                          />}
                      </>}
                    {tabType === 'requirement' &&
                      <>
                        <h6>Requirements</h6>
                        {isLoading ? (
                          <div>
                            <div className="long-box-shimmer shine"></div>
                          </div>
                        ) :
                          <div
                            dangerouslySetInnerHTML={{
                              __html: courseData?.courseRequirements,
                            }}
                          />}</>}
                  </div>
                </div>
                {/* <!-- /Overview --> */}

                {/* <!-- Course Content --> */}
                <div className="card content-sec">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-6">
                        <h5 className="subs-title">Course Content</h5>
                      </div>
                      <div className="col-sm-6 text-sm-end">
                        {isLoading ? (
                          <div>
                            <div className="categories-list-blocks shine"></div>
                          </div>
                        ) :
                          <h6>
                            {courseData?.lessonCount} Lectures{" "}
                            {minutesToTime(courseData?.lessonDuration)}
                          </h6>}
                      </div>
                    </div>
                    {isLoading ?
                      <div>
                        <div className="course-block-long-right-top shine"></div>
                        <div className="course-block-long-right-top shine"></div>
                        <div className="course-block-long-right-top shine"></div>
                        <div className="course-block-long-right-top shine"></div>
                      </div>
                      :
                      courseData?.chapterList?.map((chapter, chapterIndex) => (
                        <div className="course-card" key={chapterIndex}>
                          <h6
                            className="cou-title clickable-btn"
                            onClick={() =>
                              toggleShowCourse(
                                chapterIndex,
                                document.getElementById(`collapse${chapterIndex}`)
                              )
                            }
                          >
                            <a
                              className={
                                showCourse[chapterIndex] ? "" : "collapsed"
                              }
                              data-bs-toggle="collapse"
                              aria-expanded={
                                showCourse[chapterIndex] ? "true" : "false"
                              }
                            >
                              {chapter?.chapterTitle}
                            </a>
                          </h6>
                          <div
                            id={`collapse${chapterIndex}`}
                            className={`card-collapse ${showCourse[chapterIndex] ? "show" : ""
                              }`}
                            style={{
                              height: `${heights[chapterIndex] || 0}px`,
                              overflow: "hidden",
                              transition: `height 0.5s ease`,
                            }}
                          >
                            <ul>
                              {chapter?.lessons?.map((lesson, lessonIndex) => (
                                <li key={lessonIndex}>
                                  <p>
                                    {lesson?.lessonType === "READ" ? (
                                      <svg
                                        className="me-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                        width="23"
                                        height="23"
                                      >
                                        <defs>
                                          <linearGradient
                                            id="gradient"
                                            x1="0%"
                                            y1="0%"
                                            x2="100%"
                                            y2="100%"
                                          >
                                            <stop
                                              offset="0%"
                                              style={{
                                                stopColor: "green",
                                                stopOpacity: "1",
                                              }}
                                            />
                                            <stop
                                              offset="100%"
                                              style={{
                                                stopColor: "blue",
                                                stopOpacity: "1",
                                              }}
                                            />
                                          </linearGradient>
                                        </defs>
                                        <path
                                          d="M96 0C43 0 0 43 0 96L0 416c0 53 43 96 96 96l288 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64c17.7 0 32-14.3 32-32l0-320c0-17.7-14.3-32-32-32L384 0 96 0zm0 384l256 0 0 64L96 448c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16zm16 48l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
                                          fill="url(#gradient)"
                                        />
                                      </svg>
                                    ) : lesson?.lessonType === "QUIZ" ? (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        height="23"
                                        width="23"
                                        className="me-2"
                                      >
                                        <defs>
                                          <linearGradient
                                            id="purpleWhiteGradient"
                                            x1="0%"
                                            y1="0%"
                                            x2="100%"
                                            y2="100%"
                                          >
                                            <stop
                                              offset="0%"
                                              style={{
                                                stopColor: "purple",
                                                stopOpacity: 1,
                                              }}
                                            />
                                            <stop
                                              offset="100%"
                                              style={{
                                                stopColor: "white",
                                                stopOpacity: 1,
                                              }}
                                            />
                                          </linearGradient>
                                        </defs>
                                        <path
                                          d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                                          fill="url(#purpleWhiteGradient)"
                                        />
                                      </svg>
                                    ) : lesson?.lessonType === "TEXT" ? (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 384 512"
                                        width="22"
                                        height="22"
                                        className="me-2"
                                      >
                                        <defs>
                                          <linearGradient
                                            id="blueSkyBlueGradient"
                                            x1="0%"
                                            y1="0%"
                                            x2="100%"
                                            y2="100%"
                                          >
                                            <stop offset="0%" stopColor="blue" />
                                            <stop
                                              offset="100%"
                                              stopColor="skyblue"
                                            />
                                          </linearGradient>
                                        </defs>
                                        <path
                                          d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM112 256l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
                                          fill="url(#blueSkyBlueGradient)"
                                        />
                                      </svg>
                                    ) : (
                                      <img
                                        src={
                                          lesson?.lessonType === "QUIZ"
                                            ? quiz
                                            : lesson?.lessonType === "READ"
                                              ? readIcon
                                              : lesson?.lessonType === "TEXT"
                                                ? play
                                                : play
                                        }
                                        alt="Img"
                                        className="me-2"
                                      />
                                    )}
                                    Lecture {chapterIndex + 1}.{lessonIndex + 1}{" "}
                                    {lesson?.lessonTitle}
                                  </p>
                                  <div>
                                    {lesson?.isPreview === "YES" &&
                                      lesson?.lessonType === "VIDEO" &&
                                      // lesson?.lessonType !== "TEXT" && 
                                      (
                                        <span className="clickable-btn preview-text">
                                          {" "}
                                          <u onClick={() => setPreview(lesson)}>
                                            Preview
                                          </u>{" "}
                                        </span>
                                      )}
                                    <span>
                                      {minuteToHrs(lesson?.lessonDuration)}
                                    </span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                {/* <!-- /Course Content --> */}

                {/* <!-- Instructor --> */}
                <div className="card instructor-sec">
                  <div className="card-body">
                    {isLoading ? (
                      <div>
                        <div className="course-block-long-right-top shine"></div>
                        <div className="course-block-long-right-top shine"></div>
                        <div className="course-block-long-right-top shine"></div>
                        <div className="course-block-long-right-top shine"></div>
                      </div>
                    ) : <>
                      <h5 className="subs-title">About the instructor</h5>
                      <div className="instructor-wrap">
                        <div className="about-instructor">
                          <div className="abt-instructor-img">
                            <Link to="">
                              <img
                                src={dummyUser}
                                alt="img"
                                className="img-fluid"
                              />
                            </Link>
                          </div>
                          <div className="instructor-detail">
                            <h5>
                              <Link to="">{instructorData?.name}</Link>
                            </h5>
                            <p>{instructorData?.instructorTitle}</p>
                          </div>
                        </div>
                        <div className="rating d-none">
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star"></i>
                          <span className="d-inline-block average-rating">
                            4.5 Instructor Rating
                          </span>
                        </div>
                      </div>
                      <div className="course-info d-flex align-items-center">
                        <div className="cou-info">
                          <img src={play} alt="Img" />
                          <p>{instructorData?.courseCount} Courses</p>
                        </div>
                        <div className="cou-info">
                          <img src={icon01} alt="Img" />
                          <p>{instructorData?.lessonCount}+ Lesson</p>
                        </div>
                        <div className="cou-info">
                          <img src={icon02} alt="Img" />
                          <p>{minuteToHrs(instructorData?.lessonDuration)}</p>
                        </div>
                        {/* <div className="cou-info">
                        <img src={people} alt="Img" />
                        <p>270,866 students enrolled</p>
                      </div> */}
                      </div>
                      <div>
                        <p className="mb-0">
                          <b>Education:</b>
                        </p>
                        <ul className="experience-list">
                          {instructorData?.experience &&
                            JSON.parse(instructorData?.education)?.map(
                              (exp, index) => (
                                <li className="experience-item" key={index}>
                                  <span className="experience-icon">✔</span>
                                  {exp}
                                </li>
                              )
                            )}
                        </ul>
                      </div>
                      <div>
                        <p className="mb-0">
                          <b>Experience:</b>
                        </p>
                        <ul className="experience-list">
                          {instructorData?.experience &&
                            JSON.parse(instructorData?.experience)?.map(
                              (exp, index) => (
                                <li className="experience-item" key={index}>
                                  <span className="experience-icon">✔</span>
                                  {exp}
                                </li>
                              )
                            )}
                        </ul>
                      </div>
                      <p>
                        <b>Skills: </b>
                        {instructorData?.experience &&
                          JSON.parse(instructorData?.skills)?.map(
                            (skill, index) => {
                              if (
                                index !==
                                JSON.parse(instructorData?.skills)?.length - 1
                              ) {
                                return `${skill} ,`;
                              } else return skill;
                            }
                          )}
                        and much more.
                      </p>
                    </>
                    }

                  </div>
                </div>
                {/* <!-- /Instructor --> */}

                {/* <!-- Reviews --> */}
                {
                  featuredReview?.studentName && <div className="card review-sec">
                    <div className="card-body">
                      <h5 className="subs-title">Reviews</h5>
                      <div className="instructor-wrap">
                        <div className="about-instructor">
                          <div className="abt-instructor-img">
                            <Link to="">
                              <img
                                src={dummyUser}
                                alt="img"
                                className="img-fluid"
                              />
                            </Link>
                          </div>
                          <div className="instructor-detail">
                            <Link to="">
                              <h5>{featuredReview?.studentName}</h5>
                            </Link>
                            <p>
                              {featuredReview?.studentTitle ?? "Skill Explorer"}
                            </p>
                          </div>
                        </div>
                        <div className="rating">
                          {featuredReview?.ratingPoint >= 1 ? (
                            <FaStar color="#ffb931" size="20" />
                          ) : featuredReview?.ratingPoint == 0.5 ? (
                            <FaStarHalfStroke color="#ffb931" size="20" />
                          ) : (
                            <FaRegStar color="#ffb931" size="20" />
                          )}
                          {featuredReview?.ratingPoint >= 2 ? (
                            <FaStar color="#ffb931" size="20" />
                          ) : featuredReview?.ratingPoint == 1.5 ? (
                            <FaStarHalfStroke color="#ffb931" size="20" />
                          ) : (
                            <FaRegStar color="#ffb931" size="20" />
                          )}
                          {featuredReview?.ratingPoint >= 3 ? (
                            <FaStar color="#ffb931" size="20" />
                          ) : featuredReview?.ratingPoint == 2.5 ? (
                            <FaStarHalfStroke color="#ffb931" size="20" />
                          ) : (
                            <FaRegStar color="#ffb931" size="20" />
                          )}
                          {featuredReview?.ratingPoint >= 4 ? (
                            <FaStar color="#ffb931" size="20" />
                          ) : featuredReview?.ratingPoint == 3.5 ? (
                            <FaStarHalfStroke color="#ffb931" size="20" />
                          ) : (
                            <FaRegStar color="#ffb931" size="20" />
                          )}
                          {featuredReview?.ratingPoint === 5 ? (
                            <FaStar color="#ffb931" size="20" />
                          ) : featuredReview?.ratingPoint == 4.5 ? (
                            <FaStarHalfStroke color="#ffb931" size="20" />
                          ) : (
                            <FaRegStar color="#ffb931" size="20" />
                          )}
                          <span className="d-inline-block average-rating ps-1">
                            {/* {featuredReview?.ratingPoint}  */}
                          </span>
                        </div>
                      </div>
                      <p className="rev-info">“ {featuredReview?.reviewText} “</p>
                      {/* <i className="feather-corner-up-left"></i> Reply */}
                    </div>
                  </div>
                }
              </div>

              <div className="col-lg-4">
                <div className="sidebar-sec">
                  {/* <!-- Video --> */}
                  <div className="video-sec vid-bg">
                    <div className="card">
                      <div className="card-body">
                        <Link
                          to=""
                          className="video-thumbnail"
                          data-fancybox=""
                        >
                          <div className="play-icon">
                            <i className="fa-solid fa-play"></i>
                          </div>
                          {isLoading ? (
                            <img className="" src={videoThumbnail} alt="Img" />
                          ) : (
                            <img
                              className=""
                              src={
                                thumbnail
                                  ? `${urlPrefix}/${courseData?.courseThumbnail}`
                                  : videoThumbnail
                              }
                              onError={() => setThumbnail(false)}
                              alt="Img"
                            />
                          )}
                        </Link>
                        {
                          isLoading ?
                            <div className="course-block-long-right-top shine mt-2"></div> :

                            <div className="video-details">
                              <div className="course-fee">
                                <h2>
                                  {courseData?.courseDiscountedPrice == 0
                                    ? "FREE"
                                    : `₹${courseData?.courseDiscountedPrice}`}{" "}
                                </h2>
                                <p>
                                  <span>₹{courseData?.coursePrice}</span>
                                  {courseData?.courseDiscountedPrice == 0
                                    ? "100% off"
                                    : `(${(
                                      (100 *
                                        (courseData?.coursePrice -
                                          courseData?.courseDiscountedPrice)) /
                                      courseData?.coursePrice
                                    )?.toFixed(2)}% off)`}
                                </p>
                              </div>
                              <div className="row gx-2">
                                <div className="col-md-6">
                                  <Link to="" className="btn btn-wish w-100" >
                                    {
                                      wishlistIds?.includes(courseData?.courseId) ?
                                        (
                                          !wishlistLoading ?
                                            <span onClick={() => onRemoveFromWishlist(courseData?.courseId)}>
                                              <i class="fa-regular fa-trash-can me-1"></i> Remove
                                            </span> : <span>Removing...</span>
                                        ) :
                                        !wishlistLoading ?
                                          <span onClick={() => OnAddToWishlist(courseData?.courseId)}>
                                            <i className="feather-heart me-1"></i> Add to Wishlist
                                          </span> : <span>Adding...</span>
                                    }

                                  </Link>
                                </div>
                                <div className="col-md-6">
                                  <Link to="" className="btn btn-wish w-100" onClick={handleCopyUrl}>
                                    <i className="feather-share-2"></i> Share
                                  </Link>
                                </div>
                              </div>
                              {isPurchased ? (
                                <Link
                                  to={`/student/course-read/${id}`}
                                  className="btn btn-enroll w-100"
                                >
                                  {" "}
                                  View Course{" "}
                                </Link>
                              ) : (
                                <Link
                                  onClick={onAddToCart}
                                  className="btn btn-enroll w-100"
                                >
                                  Enroll Now
                                </Link>
                              )}
                            </div>}
                      </div>
                    </div>
                  </div>
                  {/* <!-- /Video --> */}

                  {/* <!-- Include --> */}
                  <div className="card include-sec">
                    <div className="card-body">
                      <div className="cat-title">
                        <h4>Includes</h4>
                      </div>
                      {
                        isLoading ? (
                          <div>
                            <div className="course-block-long-right-top shine"></div>
                            <div className="course-block-long-right-top shine"></div>
                            <div className="course-block-long-right-top shine"></div>
                            <div className="course-block-long-right-top shine"></div>
                          </div>
                        ) :

                          <ul>
                            {minuteToHrsOnly(courseData?.videoLessonDuration) >
                              0 && (
                                <li>
                                  <img src={importIcon} className="me-2" alt="Img" />{" "}
                                  {minuteToHrsOnly(courseData?.videoLessonDuration)}{" "}
                                  hours on-demand video
                                </li>
                              )}
                            {courseData?.downloadableContent > 0 && (
                              <li>
                                <img src={play} className="me-2" alt="Img" />{" "}
                                {courseData?.downloadableContent} downloadable
                                resources
                              </li>
                            )}

                            <li>
                              <img src={keyIcon} className="me-2" alt="Img" />
                              {courseData?.courseAccessLimit == 0
                                ? "Full lifetime access"
                                : `Full access for ${courseData?.courseAccessLimit} months`}
                            </li>
                            <li>
                              <img src={mobile} className="me-2" alt="Img" /> Access
                              on mobile and TV
                            </li>
                            <li>
                              <img src={cloudIcon} className="me-2" alt="Img" />{" "}
                              Assignments
                            </li>
                            {courseData?.isCertificate === "YES" && (
                              <li>
                                <img src={teacherIcon} className="me-2" alt="Img" />{" "}
                                Certificate of Completion
                              </li>
                            )}
                          </ul>}
                    </div>
                  </div>
                  {/* <!-- /Include --> */}

                  {/* <!-- Features --> */}
                  <div className="card feature-sec">
                    <div className="card-body">
                      <div className="cat-title">
                        <h4>Includes</h4>
                      </div>
                      {
                        isLoading ? (
                          <div>
                            <div className="course-block-long-right-top shine"></div>
                            <div className="course-block-long-right-top shine"></div>
                            <div className="course-block-long-right-top shine"></div>
                            <div className="course-block-long-right-top shine"></div>
                          </div>
                        ) :

                          <ul>
                            <li>
                              <img src={users} className="me-2" alt="Img" />{" "}
                              Enrolled:{" "}
                              <span>{courseData?.enrolledStudents} students</span>
                            </li>
                            <li>
                              <img src={timer} className="me-2" alt="Img" />{" "}
                              Duration:{" "}
                              <span>
                                {minuteToHrsOnly(courseData?.lessonDuration)} hours
                              </span>
                            </li>
                            <li>
                              <img src={chapter} className="me-2" alt="Img" />{" "}
                              Chapters: <span>{courseData?.chapterCount}</span>
                            </li>
                            <li>
                              <img src={video} className="me-2" alt="Img" />
                              Video:{" "}
                              <span>
                                {" "}
                                {minuteToHrsOnly(courseData?.lessonDuration)} hours
                              </span>
                            </li>
                            <li>
                              <img src={chart} className="me-2" alt="Img" />
                              Level:{" "}
                              <span>
                                {toFirstUpperCase(courseData?.courseLevel)}
                              </span>
                            </li>
                          </ul>}
                    </div>
                  </div>
                  {/* <!-- /Features --> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- /Pricing Plan --> */}
      </div>

      <Modal
        show={modalShow}
        onHide={closePreview}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <p className="modal-subtitle">Course Preview</p>
            <h4 className="modal-title">{videoTitle}</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="video-container">
            <VideoPlayer video={videoUrl} previewDuration={previewDuration} />
          </div>
        </Modal.Body>
      </Modal>

      {/* <Modal show={true} onHide={() => {}} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>PDF Viewer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            <Document
            file={
              "http://localhost:5300/storage/Cour128/content/content-1734337580704-121563140.pdf"
              // testPdf
            }
            onLoadSuccess={onLoadSuccess}
          >
            <Page pageNumber={1} />
          </Document>
          }
          
        </Modal.Body>
      </Modal> */}
    </>
  );
};
// ReactPDF.render(<MyDocument />, `http://localhost:5300/storage/Cour128/content/content-1734337580704-121563140.pdf`);
export default CourseDetails;
