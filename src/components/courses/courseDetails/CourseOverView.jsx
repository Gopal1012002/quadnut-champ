import React, { useState } from "react";
import users from "../../../assets/img/icon/users.svg";
import timer from "../../../assets/img/icon/timer.svg";
import chapter from "../../../assets/img/icon/chapter.svg";
import video from "../../../assets/img/icon/video.svg";
import user1 from "../../../assets/img/user/user1.jpg";
import icon01 from "../../../assets/img/icon/icon-01.svg";
import icon02 from "../../../assets/img/icon/icon-02.svg";
import play from "../../../assets/img/icon/play.svg";
import chart from "../../../assets/img/icon/chart.svg";
import { BsPatchExclamation, BsPatchExclamationFill } from "react-icons/bs";
import { IoGlobeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

import {
  formatDateOnly,
  minuteToHrs,
  minuteToHrsOnly,
  toFirstUpperCase,
} from "../../../utils/dynamic.util";
import { GetCertificateStatusService } from "../../../services/StudentServices";
import { toast } from "react-toastify";
import conf from "../../../conf/conf";

const CourseOverView = ({ courseData, instructorData }) => {
  const [isLoading, setLoading] = useState(false);
  const [certificateId, setCertificateId] = useState('');
  const handleCertificate = () => {
    setLoading(true);
    GetCertificateStatusService(courseData?.courseCode)
      .then((res) => {
        setCertificateId(res?.data?.certificateId)
        toast.success(res?.message);
        window.open(`${conf.baseUrl}${conf.basename}/certificate-status/${res?.data?.certificateId}`, "_blank");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <div className="card-body course-read-overview">
        <h5 className="heading">{courseData?.courseTitle}</h5>
        <p className="chapter-time-data">
          <BsPatchExclamationFill /> Last Updated at{" "}
          {formatDateOnly(courseData.courseLastUpdated)}
        </p>
        <p className="chapter-time-data">
          <IoGlobeSharp /> {courseData?.courseLanguage}
        </p>
        {/* <h6>Course Includes</h6> */}
        <div className="card feature-sec">
          <div className="card-body">
            <ul>
              <li className="">
                <img src={users} className="me-2" alt="Img" /> Enrolled:{" "}
                <span>{courseData?.enrolledStudents} students</span>
              </li>
              <li>
                <img src={timer} className="me-2" alt="Img" /> Duration:{" "}
                <span>{minuteToHrsOnly(courseData?.lessonDuration)} hours</span>
              </li>
              <li>
                <img src={chapter} className="me-2" alt="Img" /> Chapters:{" "}
                <span>{courseData?.chapterCount}</span>
              </li>
              <li>
                <img src={video} className="me-2" alt="Img" />
                Video:{" "}
                <span>
                  {" "}
                  {minuteToHrsOnly(courseData?.videoLessonDuration)} hours
                </span>
              </li>
              <li>
                <img src={chart} className="me-2" alt="Img" />
                Level: <span>{toFirstUpperCase(courseData?.courseLevel)}</span>
              </li>
            </ul>
          </div>
        </div>
        {/* <h5 className="subs-title">Overview</h5> */}
        <h6>Course Description</h6>
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: courseData?.courseDescription,
            }}
          />
        </div>

        <h6>What you'll learn</h6>
        <div
          dangerouslySetInnerHTML={{
            __html: courseData?.courseOutcomes,
          }}
        />
        <h6 className="mt-2">Requirements</h6>
        <div
          dangerouslySetInnerHTML={{
            __html: courseData?.courseRequirements,
          }}
        />
        {courseData?.isCertificate === "YES" && (
          <>
            <hr />
            <h6 className="mt-2">Certification Status</h6>
            <p>
              {" "}
              Get certified in {courseData?.courseTitle} and get a certificate
              of completion
            </p>

            <p
              className="btn btn-primary rounded-0"
              onClick={handleCertificate}
            >
              {isLoading ? "Checking..." : "Check Certification Status"}
            </p>
            <hr />
          </>
        )}

        {/* <!-- Instructor --> */}
        <div className="card instructor-sec mt-4">
          <div className="card-body">
            <h5 className="subs-title">About the instructor</h5>
            <div className="instructor-wrap">
              <div className="about-instructor">
                <div className="abt-instructor-img">
                  <Link to="">
                    <img src={user1} alt="img" className="img-fluid" />
                  </Link>
                </div>
                <div className="instructor-detail">
                  <h5>
                    <Link to="">{instructorData?.name}</Link>
                  </h5>
                  <p>{instructorData?.instructorTitle}</p>
                </div>
              </div>
              <div className="rating">
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
                  JSON.parse(instructorData?.education)?.map((exp, index) => (
                    <li className="experience-item" key={index}>
                      <span className="experience-icon">✔</span>
                      {exp}
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <p className="mb-0">
                <b>Experience:</b>
              </p>
              <ul className="experience-list">
                {instructorData?.experience &&
                  JSON.parse(instructorData?.experience)?.map((exp, index) => (
                    <li className="experience-item" key={index}>
                      <span className="experience-icon">✔</span>
                      {exp}
                    </li>
                  ))}
              </ul>
            </div>
            <p>
              <b>Skills: </b>
              {instructorData?.experience &&
                JSON.parse(instructorData?.skills)?.map((skill, index) => {
                  if (
                    index !==
                    JSON.parse(instructorData?.skills)?.length - 1
                  ) {
                    return `${skill} ,`;
                  } else return skill;
                })}
              and much more.
            </p>
          </div>
        </div>
        {/* <!-- /Instructor --> */}
      </div>
    </>
  );
};

export default CourseOverView;
