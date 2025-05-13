import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import AOS from "aos";
import "aos/dist/aos.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { GetFeaturedCourses, GetTrendingCourses, useAuthCompany } from "../../services/AppServices";
import conf from "../../conf/conf";
import { minuteToHrs } from "../../utils/dynamic.util";
import { Link } from "react-router-dom";
import AuthStudent from "../../services/StudentServices";
import DecorationImg from '../../assets/img/landing-page/shape.png'
import CourseCard from "../courses/CourseCard";
const TrendsCourse = () => {
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
            GetFeaturedCourses(student?.studentCode)
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
            <section className="section py-5">
                <div className="container">
                    <div className="row gy-3">
                        {/* heading tittle start */}
                        <div className="col-xl-12 text-center d-flex justify-content-center align-items-center flex-column">
                            <div className='tittle-box'>
                                <div className='deco-img d-none d-md-block'>
                                    <img src={DecorationImg} alt="icon" />
                                </div>
                                <h1 className='mb-2 fw-bold'>Trending Courses</h1>
                            </div>
                            <p>Upgrade Your Skills with the Latest Trends</p>

                        </div>
                        {/* heading tittle end */}

                    </div>
                    <div className="col-xl-12">
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

                    </div>
                    {/* <div className="col-xl-12 d-flex justify-content-center">

                        <div className="all-category d-flex align-items-center pt-3">
                            <Link to={"/course-list"} className="btn btn-primary">
                                All Courses
                            </Link>
                        </div>

                    </div> */}



                </div>
            </section>
        </>
    );
};

export default TrendsCourse;
