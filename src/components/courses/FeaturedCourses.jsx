import React, { useEffect, useState } from "react";
import { GetFeaturedCourses, useAuthCompany } from "../../services/AppServices";
import { Link } from "react-router-dom";
import AuthStudent from "../../services/StudentServices";
import CourseCard from "./CourseCard";
import OwlCarousel from "react-owl-carousel";
import AOS from "aos";
import "aos/dist/aos.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const FeaturedCourses = () => {
  const { student } = AuthStudent();
  const [isLoading, setLoading] = useState(false);
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    setLoading(true)
    let studentCode = student.studentCode ?? -1;
    GetFeaturedCourses(studentCode)
      .then((res) => {
        setCourseList(res?.data);
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoading(false)
      })
  }, []);
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <section className="section new-course">
        <div className="container">
          <div className="section-header aos" data-aos="fade-up">
            <div className="section-sub-head">
              <span>What’s New</span>
              <h2>Featured Courses</h2>
            </div>
            <div className="all-btn all-category d-flex align-items-center">
              <Link target="_blank" to="/course-list" className="btn btn-primary">
                All Courses
              </Link>
            </div>
          </div>
          <div className="section-text aos" data-aos="fade-up">
            <p className="mb-0">
              Featured courses are specially curated learning programs designed to provide high-quality education and skill development in various fields. These courses stand out due to their comprehensive content, expert instructors, and practical approach to learning.
            </p>
          </div>
          <div className="course-feature">
            <div className="row">
              {isLoading ? (
                <div className="course-box-div course-md-row">
                  <div className="course-box-shimmer shine "></div>
                  <div className="course-box-shimmer shine  d-none d-sm-block"></div>
                  <div className="course-box-shimmer shine  d-none d-md-block"></div>
                  <div className="course-box-shimmer shine d-none d-lg-block"></div>
                </div>
              ) : (
                !isLoading && (
                  <OwlCarousel
                    className="owl-theme mentoring-course"
                    loop
                    margin={10}
                    nav
                    smartSpeed={500}
                    data-aos="fade-up"
                    autoplay={true}  // Enable auto-rotation
                    autoplayTimeout={3000}  // Set interval in milliseconds (3 seconds)
                    autoplayHoverPause={true}  // Pause on hover
                    responsive={{
                      0: { items: 1 },
                      600: { items: 2 },
                      1000: { items: 3 },
                    }}
                  >
                    {courseList?.length > 0 &&           
                      courseList?.map((course, index) => {
                        return (
                          <CourseCard key={index} index={index} course={course} />
                        );
                      })}
                  </OwlCarousel>
                )
              )}
              {/* {isLoading ?
                <div className="course-box-div course-md-row">
                  <div className="course-box-shimmer shine ">

                  </div>
                  <div className="course-box-shimmer shine  d-none d-sm-block">

                  </div>
                  <div className="course-box-shimmer shine  d-none d-md-block">

                  </div>
                  <div className="course-box-shimmer shine d-none d-lg-block">

                  </div>
                </div>
                : courseList?.length > 0 &&
                courseList.map((course, index) => {
                  return (
                    <div key={index} className="col-lg-4 col-md-6 d-flex">
                      
                    <CourseCard key={index} course={course} index={index} />
                    </div>
                  );
                })} */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedCourses;
