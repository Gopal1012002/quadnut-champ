import React, { useEffect, useState } from "react";
import user7 from "../../assets/img/user/user7.jpg";
import {
  GetFeaturedInstructors,
  useAuthCompany,
} from "../../services/AppServices";
import OwlCarousel from "react-owl-carousel";
import AOS from "aos";
import "aos/dist/aos.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import conf from "../../conf/conf";
import { Link } from "react-router-dom";
const FeaturedInstructors = () => {
  const { companyData } = useAuthCompany();
  const [insList, setInsList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [urlPrefix, setUrlPrefix] = useState(
    `${conf.apiAssetUrl}/${companyData?.frontFolder}/kyc`
  );
  useEffect(() => {
    setLoading(true);
    if (companyData) {
      GetFeaturedInstructors()
        .then((res) => {
          setInsList(res.data);
        })
        .catch((err) => {
          console.log(err);
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
      <div className="container">
        <div className="feature-instructors">
          <div className="section-header aos" data-aos="fade-up">
            <div className="section-sub-head feature-head text-center">
              <h2>Featured Instructor</h2>
              <div className="section-text aos" data-aos="fade-up">
                <p className="mb-0">
                A featured instructor is a distinguished educator recognized for their expertise, teaching excellence, and significant contributions to their field. These instructors bring a wealth of knowledge and practical experience, making learning engaging and impactful.
                </p>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="course-box-div course-md-row mb-3">
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
                autoplay={true}  // Enable auto-rotation
                autoplayTimeout={2000}  // Set interval in milliseconds (3 seconds)
                autoplayHoverPause={true} 
                data-aos="fade-up"
                responsive={{
                  0: { items: 1 },
                  600: { items: 2 },
                  1000: { items: 4 },
                }}
              >
                {!isLoading &&
                  insList?.map((ins, index) => {
                    return (
                        <div key={index} className="instructors-widget">
                          <div className="instructors-img ">
                            <Link
                              to={`instructor-details/${ins?.instructorCode}`}
                            >
                              <img
                                className="img-fluid"
                                alt="Img"
                                src={`${urlPrefix}/${ins?.instructorImage}`}
                              />
                            </Link>
                          </div>
                          <div className="instructors-content text-center">
                            <h5>
                              <Link
                                to={`instructor-details/${ins?.instructorCode}`}
                              >
                                {ins?.instructorName}
                              </Link>
                            </h5>
                            <p> {ins?.instructorTitle} </p>
                            <div className="student-count d-flex justify-content-center">
                              <i className="fa-solid fa-user-group"></i>
                              <span>{ins?.totalCourses} Courses</span>
                            </div>
                          </div>
                        </div>
                    );
                  })}
              </OwlCarousel>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default FeaturedInstructors;
