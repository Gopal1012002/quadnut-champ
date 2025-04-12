import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import AOS from "aos";
import "aos/dist/aos.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { GetTrendingCourses, useAuthCompany } from "../../services/AppServices";
import conf from "../../conf/conf";
import { minuteToHrs } from "../../utils/dynamic.util";
import { Link } from "react-router-dom";
import AuthStudent from "../../services/StudentServices";
import CourseCard from "./CourseCard";
const TrendingCourses = () => {
  const { companyData } = useAuthCompany();
  const { student } = AuthStudent();
  const [trendingList, setTrendingList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [urlPrefix, setUrlPrefix] = useState(
    `${conf.apiAssetUrl}/${companyData?.frontFolder}/thumbnail`
  );
  useEffect(() => {
    if (companyData) {
      setLoading(true);
      GetTrendingCourses(student?.studentCode)
        .then((res) => {
          setTrendingList(res?.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [companyData]);
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <section className="section trend-course">
        <div className="container">
          <div className="section-header aos" data-aos="fade-up">
            <div className="section-sub-head">
              <span>What’s New</span>
              <h2>TRENDING COURSES</h2>
            </div>
            <div className="all-btn all-category d-flex align-items-center">
              <Link to={"/course-list"} className="btn btn-primary">
                All Courses
              </Link>
            </div>
          </div>
          <div className="section-text aos" data-aos="fade-up">
            <p className="mb-0">
            Tredning courses are specially curated learning programs designed to provide high-quality education and skill development in various fields. These courses stand out due to their comprehensive content, expert instructors, and practical approach to learning.
          
            </p>
          </div>

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
                    {trendingList?.length > 0 &&           
                      trendingList?.map((course, index) => {
                        return (
                          <CourseCard key={index} index={index} course={course} />
                        );
                      })}
                  </OwlCarousel>
            )
          )}
          {/* <!-- Feature Instructors --> */}

          {/* <!-- /Feature Instructors --> */}
        </div>
      </section>
    </>
  );
};

export default TrendingCourses;
