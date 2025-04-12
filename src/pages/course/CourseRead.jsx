import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GetCompletedLessons,
  GetCourseCompletePercentage,
  GetStudentEnrolledCourseDetailsByCode,
  ToggleCompletedLesson,
} from "../../services/StudentServices";
import "../../assets/css/course-read.css";
import Head from "../../layouts/main-layout/head/Head";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import { minutesToTime, minuteToHrs } from "../../utils/dynamic.util";
import { PiClockFill } from "react-icons/pi";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";
import { MdOndemandVideo, MdQuiz } from "react-icons/md";
import CourseOverView from "../../components/courses/courseDetails/CourseOverView";
import conf from "../../conf/conf";
import { useAuthCompany } from "../../services/AppServices";
import { BsFileEarmarkText } from "react-icons/bs";
import PdfReader from "../../components/pdfReader/PdfReader";
import TextReader from "../../components/textReader/TextReader";
import QuizComponent from "../../components/quizComponent/QuizComponent";
import { toast } from "react-toastify";
import CourseReview from "./CourseReview";
import { IoCheckboxSharp } from "react-icons/io5";

const CourseRead = () => {
  const [isLoading, setLoading] = useState(false);
  const { companyData } = useAuthCompany();
  const [heights, setHeights] = useState([]);
  // const [sideHeight, setSideHeight] = useState(window.innerHeight - 70);
  const [activeLesson, setActiveLesson] = useState({ c_index: 0, l_index: 0 });
  const [courseDetails, setCourseDetails] = useState({});
  const [instructorData, setInstructorData] = useState({});
  const [textData, setTextData] = useState("");
  const [play, setPlay] = useState(false);
  const [video, setVideo] = useState("");
  const [pdf, setPdf] = useState("");
  const [lessonType, setLessonType] = useState("");
  const [showCourse, setShowCourse] = useState([]);
  const { id } = useParams();
  const [currentLessonId, setCurrentLessonId] = useState("");
  const [urlPrefix, setUrlPrefix] = useState(
    `${conf.apiAssetUrl}/${companyData?.frontFolder}/content/`
  );
  const [currentChapter, setCurrentChapter] = useState("");
  const [currentLesson, setCurrentLesson] = useState("");
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [isPrevExists, setIsPrevExists] = useState(false);
  const [isNewExists, setIsNewExists] = useState(false);
  const [currentChapterLength, setCurrentChapterLength] = useState();
  const [completedLessons, setCompletedLessons] = useState([]);
  const [courseCompletePercentage, setCourseCompletePercentage] = useState(0);
  const [currentTab, setCurrentTab] = useState("overview");
  const [completedChapterIdx, setCompletedChapterIdx] = useState();
  const [completedLessonIdx, setCompletedLessonIdx] = useState();
  const [isCertificate, setIsCertificate] = useState(false);

  const refreshCompletedLessons = () => {
    GetCompletedLessons(id)
      .then((res) => {
        setCompletedLessons(res?.data?.completedLessons || []);
        let lastCompleteIdx =
          res?.data?.completeIdx[res?.data?.completeIdx?.length - 1];
        let lastChapterIdx = lastCompleteIdx?.split("-")[0];
        let lastLessonIdx = lastCompleteIdx?.split("-")[1];
        setCompletedLessonIdx(lastLessonIdx);
        setCompletedChapterIdx(lastChapterIdx);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  const refreshCourseCompletionPercentage = () => {
    GetCourseCompletePercentage(id)
      .then((res) => {
        setCourseCompletePercentage(res?.data?.completedPercentage);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    setLoading(true);
    refreshCompletedLessons();
    refreshCourseCompletionPercentage();
  }, []);
  useEffect(() => {
    setLoading(true);
    GetStudentEnrolledCourseDetailsByCode(id)
      .then((res) => {
        setCourseDetails(res?.data?.courseData);
        setInstructorData(res?.data?.instructorData);
        setIsCertificate(res?.isCertificate === 'YES')
        setLessonType(
          res?.data?.courseData?.chapterList[0]?.lessons[0]?.lessonType
        );
        if (
          res?.data?.courseData?.chapterList[0]?.lessons[0]?.lessonType ===
          "VIDEO"
        ) {
          setVideo(
            `${urlPrefix}${res?.data?.courseData?.chapterList[0]?.lessons[0]?.lessonResourceName}`
          );
        }
        setCurrentLessonId(
          res?.data?.courseData?.chapterList[0]?.lessons[0]?.lessonId
        );
        setCurrentChapterIdx(0);
        setCurrentLessonIdx(0);
        setCurrentChapter(res?.data?.courseData?.chapterList[0]);
        setCurrentLesson(res?.data?.courseData?.chapterList[0]?.lessons[0]);
        setIsPrevExists(false);
        setIsNewExists(
          res?.data?.courseData?.chapterList?.length > 1 ||
            res?.data?.courseData?.chapterList[0]?.lessons?.length > 1
        );
        setCurrentChapterLength(
          res?.data?.courseData?.chapterList[0]?.lessons?.length
        );
          GetCompletedLessons(id).then((res1) => {
            setCompletedLessons(res1?.data?.completedLessons || []);
            if (res1?.data?.completeIdx?.length > 0) {
              let lastCompleteIdx =
                res1?.data?.completeIdx[res1?.data?.completeIdx?.length - 1];
              let lastChapterIdx = lastCompleteIdx?.split("-")[0];
              let lastLessonIdx = lastCompleteIdx?.split("-")[1];
                toggleShowCourse(
                  lastChapterIdx,
                  document.getElementById(`collapse${lastChapterIdx}`, true)
                );
                const eleme = document.getElementById(`collapse${lastChapterIdx}`);
                eleme.style.height= '64.67px';
                eleme.style.height = `${res?.data?.courseData?.chapterList[lastChapterIdx]?.lessons?.length * 64.67}px`
              
              
            }
          });
        
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  const toggleShowCourse = (index, contentElement, onlyOpen = false) => {
    if (!contentElement) return;
    const currentHeight = showCourse[index] ? 0 : contentElement.scrollHeight;
    let show_course_array = [...showCourse];
    if (!onlyOpen) {
      show_course_array[index] = !show_course_array[index];
    } else {
      show_course_array[index] = false;
    }
    setShowCourse(show_course_array);
    setHeights((prev) =>
      prev.map((height, i) => (i === index ? currentHeight : height))
    );
  };

  const toggleLessonCompletion = (lessonId, lessonIndex, chapterIndex) => {
    const lessonData = {
      lessonId: lessonId,
      lessonIndex: lessonIndex,
      chapterIndex: chapterIndex,
    };
    ToggleCompletedLesson(lessonData).then((res) => {
      refreshCompletedLessons();
      refreshCourseCompletionPercentage();
    });
  };

  const setLesson = (lesson, chapterIndex, lessonIndex) => {
    console.log(chapterIndex, lessonIndex)
    setCurrentLessonIdx(lessonIndex);
    setCurrentChapterIdx(chapterIndex);
    setLessonType(lesson?.lessonType);
    setCurrentLesson(lesson);
    setCurrentChapter(courseDetails?.chapterList[chapterIndex]);
    if (lesson?.lessonType === "VIDEO") {
      setVideo(`${urlPrefix}${lesson?.lessonResourceName}`);
    } else if (lesson?.lessonType === "READ") {
      setVideo("");
      setPdf(`${urlPrefix}${lesson?.lessonResourceName}`);
    } else if (lesson?.lessonType === "TEXT") {
      setTextData(lesson?.lessonText);
    } else if (
      lesson?.lessonType === "QUIZ" ||
      lesson?.lessonType === "FINAL_QUIZ"
    ) {
      setCurrentLessonId(lesson?.lessonId);
    }
    setActiveLesson({
      c_index: chapterIndex,
      l_index: lessonIndex,
    });
  };

  const playPrevVideo = () => {
    if (!isPrevExists) {
      toast.error("No previous lesson available");
    } else if (currentChapterIdx === 0 && currentLessonIdx === 0) {
      setIsPrevExists(false);
    } else if (currentChapterIdx === 0 && currentLessonIdx !== 0) {
      setLesson(
        courseDetails?.chapterList[currentChapterIdx]?.lessons[
          currentLessonIdx - 1
        ],
        currentChapterIdx,
        currentLessonIdx - 1
      );
    } else if (currentChapterIdx !== 0 && currentLessonIdx === 0) {
      setLesson(
        courseDetails?.chapterList[currentChapterIdx - 1]?.lessons[
          courseDetails?.chapterList[currentChapterIdx - 1]?.lessons.length - 1
        ],
        currentChapterIdx - 1,
        courseDetails?.chapterList[currentChapterIdx - 1]?.lessons.length - 1
      );
      toggleShowCourse(
        currentChapterIdx - 1,
        document.getElementById(`collapse${currentChapterIdx - 1}`),
        true
      );
    } else if (currentChapterIdx !== 0 && currentLessonIdx !== 0) {
      setLesson(
        courseDetails?.chapterList[currentChapterIdx]?.lessons[
          currentLessonIdx - 1
        ],
        currentChapterIdx,
        currentLessonIdx - 1
      );
    }
  };
  const playNextVideo = () => {
    if (!isNewExists) {
      toast.error("No next lesson available");
    } else if (
      currentChapterIdx === courseDetails?.chapterList?.length - 1 &&
      currentLessonIdx === currentChapterLength - 1
    ) {
      setIsNewExists(false);
    } else if (
      currentChapterIdx === courseDetails?.chapterList?.length - 1 &&
      currentLessonIdx !== currentChapterLength - 1
    ) {
      setLesson(
        courseDetails?.chapterList[currentChapterIdx]?.lessons[
          currentLessonIdx + 1
        ],
        currentChapterIdx,
        currentLessonIdx + 1
      );
      setIsPrevExists(true);
    } else if (
      currentChapterIdx !== courseDetails?.chapterList?.length - 1 &&
      currentLessonIdx === currentChapterLength - 1
    ) {
      setLesson(
        courseDetails?.chapterList[currentChapterIdx + 1]?.lessons[0],
        currentChapterIdx + 1,
        0
      );
      toggleShowCourse(
        currentChapterIdx + 1,
        document.getElementById(`collapse${currentChapterIdx + 1}`),
        true
      );
      const contentElement = document.getElementById(
        `lesson-${currentChapterIdx + 1}-${0}`
      );
      if (contentElement) {
        contentElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
      setIsPrevExists(true);
    } else if (
      currentChapterIdx !== courseDetails?.chapterList?.length - 1 &&
      currentLessonIdx !== currentChapterLength - 1
    ) {
      setLesson(
        courseDetails?.chapterList[currentChapterIdx]?.lessons[
          currentLessonIdx + 1
        ],
        currentChapterIdx,
        currentLessonIdx + 1
      );
      setIsPrevExists(true);
    }
  };
  const thisLessonCompleted = () => {
    if (!completedLessons?.includes(String(currentLesson?.lessonId))) {
      toggleLessonCompletion(
        currentLesson?.lessonId,
        currentLessonIdx,
        currentChapterIdx
      );
    }
    playNextVideo();
  };
  useEffect(() => {
    const initialHeights = courseDetails?.chapterList?.map(() => 0) || [];
    setHeights(initialHeights);
  }, [courseDetails]);
  // useEffect(() => {
  //   setSideHeight(window.innerHeight);
  // });
  return (
    <>
      <Head title={`${courseDetails?.courseTitle}`} />
      <div className="container-fluid course-read-page row">
        <div className="course-read-left col-md-8 pe-0">
          {lessonType === "VIDEO" && (
            <VideoPlayer
              video={video}
              playNextVideo={playNextVideo}
              playPrevVideo={playPrevVideo}
              videoComplete={thisLessonCompleted}
            />
          )}
          {lessonType === "READ" && (
            <PdfReader
              src={pdf}
              playNextVideo={playNextVideo}
              playPrevVideo={playPrevVideo}
            />
          )}
          {lessonType === "TEXT" && (
            <TextReader
              text={textData}
              playNextVideo={playNextVideo}
              playPrevVideo={playPrevVideo}
            />
          )}
          {(lessonType === "QUIZ" || lessonType === "FINAL_QUIZ") && (
            <QuizComponent lessonId={currentLessonId} />
          )}

          <div className="course-read-left-bottom">
            <div className="course-read-tab-list ">
              <div
                className={`course-read-tab-list-1 course-content-tab ${
                  currentTab === "course-content" ? "active" : ""
                } `}
                onClick={() => setCurrentTab("course-content")}
              >
                Course Content
              </div>
              <div
                className={`course-read-tab-list-1 ${
                  currentTab === "overview" ? "active" : ""
                } `}
                onClick={() => setCurrentTab("overview")}
              >
                Overview
              </div>
              {/* <div
                className={`course-read-tab-list-1 ${
                  currentTab === "notes" ? "active" : ""
                } `}
                onClick={() => setCurrentTab("notes")}
              >
                Notes
              </div>
              <div
                className={`course-read-tab-list-1 ${
                  currentTab === "announcement" ? "active" : ""
                }`}
                onClick={() => setCurrentTab("announcement")}
              >
                Announcements
              </div> */}
              <div
                className={`course-read-tab-list-1 ${
                  currentTab === "reviews" ? "active" : ""
                } `}
                onClick={() => setCurrentTab("reviews")}
              >
                Reviews
              </div>
              <div
                className={`course-read-tab-list-1 ${
                  currentTab === "dummy" ? "active" : ""
                } `}
              ></div>
            </div>
            <div className="w-100 course-read-tab-view">
              {currentTab === "overview" && (
                <CourseOverView
                  courseData={courseDetails}
                  instructorData={instructorData}
                />
              )}
              {currentTab === "reviews" && (
                <CourseReview courseData={courseDetails} />
              )}
              {currentTab === "course-content" && (
                <div className="card content-sec user-course-read-content-sec w-100">
                  <div className="card-body p-0">
                    <div className="row pt-3 px-3 mb-2  d-flex align-items-center">
                      <div className="col-sm-9 pt-3">
                        <h5 className="subs-title ">Course Content</h5>
                      </div>
                      <div className="col-sm-3">
                        <div className="row">
                          <div className="col-sm-12 d-flex justify-content-end">
                            <div style={{ width: "35px", height: "35px" }}>
                              <CircularProgressbar
                                value={courseCompletePercentage}
                                text={`${courseCompletePercentage}%`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {courseDetails?.chapterList?.map(
                      (chapter, chapterIndex) => (
                        <div
                          className="course-read-course-card"
                          key={chapterIndex}
                        >
                          <div
                            className="cou-title clickable-btn border"
                            onClick={() =>
                              toggleShowCourse(
                                chapterIndex,
                                document.getElementById(
                                  `collapse${chapterIndex}`
                                ),
                                false
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
                              <div
                                className="d-flex flex-column justify-start chapter-side-course-read"
                                style={{ backgroundColor: "#F7F9FA" }}
                              >
                                <h6>
                                  {`Section ${chapterIndex + 1} : ` +
                                    chapter?.chapterTitle}
                                </h6>
                                <span className="chapter-time-data">
                                  {chapter?.lessonCount} |{" "}
                                  {minuteToHrs(chapter?.chapterDuration)}
                                </span>
                              </div>
                            </a>
                          </div>
                          <div
                            id={`collapse${chapterIndex}`}
                            className={`card-collapse ${
                              showCourse[chapterIndex] ? "show" : ""
                            }`}
                            style={{
                              height: `${heights[chapterIndex] || 0}px`,
                              overflow: "hidden",
                              transition: `height 0.5s ease`,
                            }}
                          >
                            <ul>
                              {chapter?.lessons?.map((lesson, lessonIndex) => (
                                <li
                                  key={lessonIndex}
                                  id={`lesson-${chapterIndex}-${lessonIndex}`}
                                >
                                  <div
                                    className={`lesson-side-course-read 
                            ${
                              activeLesson?.c_index === chapterIndex &&
                              activeLesson?.l_index === lessonIndex &&
                              "active"
                            }
                            py-1`}
                                  >
                                    <span className="lesson-side-course-read-right-top">
                                      <span className="checkbox-icon">
                                        {completedLessons?.includes(
                                          String(lesson?.lessonId)
                                        ) ? (
                                          <IoCheckboxSharp
                                            size={19}
                                            color="#2d2f31"
                                            className="me-3 clickable-btn"
                                            onClick={(e) => {
                                              toggleLessonCompletion(
                                                lesson?.lessonId,
                                                lessonIndex,
                                                chapterIndex
                                              );
                                            }}
                                          />
                                        ) : (
                                          <GrCheckbox
                                            size={19}
                                            color="#2d2f31"
                                            className="me-3 clickable-btn"
                                            onClick={(e) => {
                                              toggleLessonCompletion(
                                                lesson?.lessonId,
                                                lessonIndex,
                                                chapterIndex
                                              );
                                            }}
                                          />
                                        )}
                                      </span>
                                      <span
                                        className="lesson-title clickable-btn"
                                        onClick={() =>
                                          setLesson(
                                            lesson,
                                            chapterIndex,
                                            lessonIndex
                                          )
                                        }
                                      >
                                        {lessonIndex + 1}. {lesson.lessonTitle}
                                      </span>
                                    </span>
                                    <span className="lesson-side-course-read-right-bottom">
                                      {lesson?.lessonType === "VIDEO" ? (
                                        <MdOndemandVideo
                                          size={20}
                                          color="#2D2F31"
                                          className="me-2"
                                        />
                                      ) : lesson?.lessonType === "QUIZ" ||
                                        lesson?.lessonType === "FINAL_QUIZ" ? (
                                        <MdQuiz
                                          size={20}
                                          color="#2D2F31"
                                          className="me-2"
                                        />
                                      ) : (
                                        <BsFileEarmarkText
                                          size={20}
                                          color="#2D2F31"
                                          className="me-2"
                                        />
                                      )}{" "}
                                      {lesson?.lessonDuration < 60
                                        ? `${lesson?.lessonDuration}min`
                                        : minuteToHrs(lesson?.lessonDuration)}
                                    </span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className="col-md-4 course-read-right"
          // style={{ height: window.innerHeight }}
        >
          <div className="card content-sec user-course-read-content-sec w-100">
            <div className="card-body p-0">
              <div className="row pt-3 px-3 mb-2  d-flex align-items-center">
                <div className="col-sm-9 pt-3">
                  <h5 className="subs-title ">Course Content</h5>
                </div>
                <div className="col-sm-3">
                  <div className="row">
                    <div className="col-sm-12 d-flex justify-content-end">
                      <div style={{ width: "35px", height: "35px" }}>
                        <CircularProgressbar
                          value={courseCompletePercentage}
                          text={`${courseCompletePercentage}%`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {courseDetails?.chapterList?.map((chapter, chapterIndex) => (
                <div className="course-read-course-card" key={chapterIndex}>
                  <div
                    className="cou-title clickable-btn border"
                    onClick={() =>
                      toggleShowCourse(
                        chapterIndex,
                        document.getElementById(`collapse${chapterIndex}`),
                        false
                      )
                    }
                  >
                    <a
                      className={showCourse[chapterIndex] ? "" : "collapsed"}
                      data-bs-toggle="collapse"
                      aria-expanded={
                        showCourse[chapterIndex] ? "true" : "false"
                      }
                    >
                      <div
                        className="d-flex flex-column justify-start chapter-side-course-read"
                        style={{ backgroundColor: "#F7F9FA" }}
                      >
                        <h6>
                          {`Section ${chapterIndex + 1} : ` +
                            chapter?.chapterTitle}
                        </h6>
                        <span className="chapter-time-data">
                          {chapter?.lessonCount} |{" "}
                          {minuteToHrs(chapter?.chapterDuration)}
                        </span>
                      </div>
                    </a>
                  </div>
                  <div
                    id={`collapse${chapterIndex}`}
                    className={`card-collapse ${
                      showCourse[chapterIndex] ? "show" : ""
                    }`}
                    style={{
                      height: `${heights[chapterIndex] || 0}px`,
                      overflow: "hidden",
                      transition: `height 0.5s ease`,
                    }}
                  >
                    <ul>
                      {chapter?.lessons?.map((lesson, lessonIndex) => (
                        <li
                          key={lessonIndex}
                          id={`lesson-${chapterIndex}-${lessonIndex}`}
                        >
                          <div
                            className={`lesson-side-course-read 
                            ${
                              activeLesson?.c_index === chapterIndex &&
                              activeLesson?.l_index === lessonIndex &&
                              "active"
                            }
                            py-1`}
                          >
                            <span className="lesson-side-course-read-right-top">
                              <span className="checkbox-icon">
                                {completedLessons?.includes(
                                  String(lesson?.lessonId)
                                ) ? (
                                  <IoCheckboxSharp
                                    size={19}
                                    color="#2d2f31"
                                    className="me-3 clickable-btn"
                                    onClick={(e) => {
                                      toggleLessonCompletion(
                                        lesson?.lessonId,
                                        lessonIndex,
                                        chapterIndex
                                      );
                                    }}
                                  />
                                ) : (
                                  <GrCheckbox
                                    size={19}
                                    color="#2d2f31"
                                    className="me-3 clickable-btn"
                                    onClick={(e) => {
                                      toggleLessonCompletion(
                                        lesson?.lessonId,
                                        lessonIndex,
                                        chapterIndex
                                      );
                                    }}
                                  />
                                )}
                              </span>
                              <span
                                className="lesson-title clickable-btn"
                                onClick={() =>
                                  setLesson(lesson, chapterIndex, lessonIndex)
                                }
                              >
                                {lessonIndex + 1}. {lesson.lessonTitle}
                              </span>
                            </span>
                            <span className="lesson-side-course-read-right-bottom">
                              {lesson?.lessonType === "VIDEO" ? (
                                <MdOndemandVideo
                                  size={20}
                                  color="#2D2F31"
                                  className="me-2"
                                />
                              ) : lesson?.lessonType === "QUIZ" ||
                                lesson?.lessonType === "FINAL_QUIZ" ? (
                                <MdQuiz
                                  size={20}
                                  color="#2D2F31"
                                  className="me-2"
                                />
                              ) : (
                                <BsFileEarmarkText
                                  size={20}
                                  color="#2D2F31"
                                  className="me-2"
                                />
                              )}{" "}
                              {lesson?.lessonDuration < 60
                                ? `${lesson?.lessonDuration}min`
                                : minuteToHrs(lesson?.lessonDuration)}
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
        </div>
      </div>
    </>
  );
};

export default CourseRead;
