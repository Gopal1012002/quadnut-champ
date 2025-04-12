import React, { useEffect, useState } from "react";
import icon01 from "../../assets/img/icon/icon-01.svg";
import icon02 from "../../assets/img/icon/icon-02.svg";
import user from "../../assets/img/user/user.jpg";
import OwlCarousel from "react-owl-carousel";
import AOS from "aos";
import "aos/dist/aos.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { GetTrendingCourses, useAuthCompany } from "../../services/AppServices";
import defaultInstructorImage from '../../assets/img/default-instructor-image.png'
import defaultThumbnail from '../../assets/img/deafult-course-thumbnail.png'
import conf from "../../conf/conf";
import { minuteToHrs } from "../../utils/dynamic.util";
import { Link } from "react-router-dom";
import AuthStudent from "../../services/StudentServices";
import CourseCard from "./CourseCard";
const TrendingCoursesGrid = () => {
    const { companyData } = useAuthCompany();
    const { student } = AuthStudent();
    const [trendingList, setTrendingList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [urlPrefix, setUrlPrefix] = useState(
        `${conf.apiAssetUrl}/${companyData?.frontFolder}/thumbnail`
    );
    useEffect(() => {
        console.log(student?.studentCode)
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
            <section className="section p-0 mt-3">
                <div className="container p-0">
                    <div className="section-header mb-0">
                        <div className="section-sub-head p-0 pt-2">
                            <h5><span className="fs-4 ps-2" style={{ marginBottom: "-53px" }}>Trending Courses</span></h5>
                        </div>
                    </div>
                    {/* <h5><span className="fs-4 ps-2" style={{marginBottom:'-20px'}}>Trending Courses</span></h5> */}
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
                                className="owl-theme mentoring-course pt-0 mt-0"
                                loop
                                margin={10}
                                nav
                                smartSpeed={500}
                                // data-aos="fade-up"
                                responsive={{
                                    0: { items: 1 },
                                    600: { items: 2 },
                                    1000: { items: 3 },
                                }}
                            >
                                {trendingList?.length > 0 &&
                                    trendingList?.map((course, index) => {
                                        return (
                                            <CourseCard key={index} course={course} index={index} />
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

export default TrendingCoursesGrid;
