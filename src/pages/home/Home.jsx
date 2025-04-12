import React, { useEffect, useState } from "react";
import icon1 from "../../assets/img/icon/icon-1.svg";
import icon2 from "../../assets/img/icon/icon-2.svg";
import icon3 from "../../assets/img/icon/icon-3.svg";
import icon4 from "../../assets/img/icon/icon-4.svg";
import icon07 from "../../assets/img/icon/icon-07.svg";
import icon08 from "../../assets/img/icon/icon-08.svg";
import icon09 from "../../assets/img/icon/icon-09.svg";
import icon10 from "../../assets/img/icon/icon-10.svg";
import icon12 from "../../assets/img/icon/icon-12.svg";
import icon13 from "../../assets/img/icon/icon-13.svg";
import icon14 from "../../assets/img/icon/icon-14.svg";
import icon15 from "../../assets/img/icon/icon-15.svg";
import icon16 from "../../assets/img/icon/icon-16.svg";
import icon17 from "../../assets/img/icon/icon-17.svg";
import icon18 from "../../assets/img/icon/icon-18.svg";
import join from "../../assets/img/join.png";
import lead01 from "../../assets/img/lead-01.png";
import lead02 from "../../assets/img/lead-02.png";
import lead03 from "../../assets/img/lead-03.png";
import lead04 from "../../assets/img/lead-04.png";
import lead05 from "../../assets/img/lead-05.png";
import lead06 from "../../assets/img/lead-06.png";
import share from "../../assets/img/share.png";
import become02 from "../../assets/img/icon/become-02.svg";
import become01 from "../../assets/img/icon/become-01.svg";
import blog1 from "../../assets/img/blog/blog-01.jpg";
import blog02 from "../../assets/img/blog/blog-02.jpg";
import blog03 from "../../assets/img/blog/blog-03.jpg";
import blog04 from "../../assets/img/blog/blog-04.jpg";
import Head from "../../layouts/main-layout/head/Head";
import qute from "../../assets/img/qute.png"
import qute1 from "../../assets/img/qute-01.png"
import user1 from "../../assets/img/user/user1.jpg"
import dummyUser from "../../assets/img/dummyUser.png"
import { GetFeaturedReviews, GetFrontDynamicDetails, useAuthCompany } from "../../services/AppServices";
import Header from "../../layouts/main-layout/head/Header";
import HomeBanner from "../../components/banner/HomeBanner";
// import TopCategories from "../../components/Category/TopCategories";
import TopCategories from "../../components/category/TopCategories";
import FeaturedCourses from "../../components/courses/FeaturedCourses";
import TrendingCourses from "../../components/courses/TrendingCourses";
import FeaturedInstructors from "../../components/instructor/FeaturedInstructors";
import { Button, Modal } from "react-bootstrap";
import Slider from "react-slick"
import conf from "../../conf/conf";
import { Link } from "react-router-dom";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [featuredReview, setFeaturedReview] = useState([]);
  const [dynamicData, setDynamicData] = useState();
  const imageUrl =
    "https://appworkstechnologies.in/assets/promotion-modal/promotion.jpg";

  useEffect(()=>{
    GetFeaturedReviews().then((res)=>{
      setFeaturedReview(res.data?.featuredReviewList)
    }).catch((err)=>{
      console.log(err);
    }).finally(()=>{
      setLoading(false)
    })
  },[])

  useEffect(()=>{
    setLoading(true);
    GetFrontDynamicDetails().then((res)=>{
      setDynamicData(res?.data?.data);
    }).catch((err)=>{
      console.log(err);
    }).finally(()=>{
      setLoading(false)
    })
  },[])
  const { companyData } = useAuthCompany();
  return (
    <>
      <Head title={" Home Page "} />
      <div className="main-wrapper">
        <HomeBanner data={dynamicData} />
        <TopCategories />
        <FeaturedCourses />
        <section className="section master-skill">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12">
                <div className="section-header aos" data-aos="fade-up">
                  <div className="section-sub-head">
                    <span>What’s New</span>
                    <h2>Master the skills to drive your career</h2>
                  </div>
                </div>
                <div className="section-text aos" data-aos="fade-up">
                  <p>
                    Get certified, master modern tech skills, and level up your
                    career — whether you’re starting out or a seasoned pro. 95%
                    of eLearning learners report our hands-on content directly
                    helped their careers.
                  </p>
                </div>
                <div className="career-group aos" data-aos="fade-up">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 d-flex">
                      <div className="certified-group blur-border d-flex">
                        <div className="get-certified d-flex align-items-center">
                          <div className="blur-box">
                            <div className="certified-img ">
                              <img
                                src={icon1}
                                alt="Img"
                                className="img-fluid"
                              />
                            </div>
                          </div>
                          <p>Stay motivated with engaging instructors</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 d-flex">
                      <div className="certified-group blur-border d-flex">
                        <div className="get-certified d-flex align-items-center">
                          <div className="blur-box">
                            <div className="certified-img ">
                              <img
                                src={icon2}
                                alt="Img"
                                className="img-fluid"
                              />
                            </div>
                          </div>
                          <p>Keep up with in the latest in cloud</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 d-flex">
                      <div className="certified-group blur-border d-flex">
                        <div className="get-certified d-flex align-items-center">
                          <div className="blur-box">
                            <div className="certified-img ">
                              <img
                                src={icon3}
                                alt="Img"
                                className="img-fluid"
                              />
                            </div>
                          </div>
                          <p>Get certified with 100+ certification courses</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 d-flex">
                      <div className="certified-group blur-border d-flex">
                        <div className="get-certified d-flex align-items-center">
                          <div className="blur-box">
                            <div className="certified-img ">
                              <img
                                src={icon4}
                                alt="Img"
                                className="img-fluid"
                              />
                            </div>
                          </div>
                          <p>Build skills your way, from labs to courses</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-12 d-flex align-items-end">
                <div className="career-img aos" data-aos="fade-up">
                  <img src={join} alt="Img" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- /Master Skill --> */}
        <FeaturedInstructors />
        <TrendingCourses />
        {/* <!-- Leading Companies --> */}
        <section className="section lead-companies">
          <div className="container">
            <div className="section-header aos" data-aos="fade-up">
              <div className="section-sub-head feature-head text-center">
                <span>Trusted By</span>
                <h2>500+ Leading Universities And Companies</h2>
              </div>
            </div>
            <div className="lead-group aos" data-aos="fade-up">
              <div className="lead-group-slider owl-carousel owl-theme">
                <div className="item">
                  <div className="lead-img">
                    <img className="img-fluid" alt="Img" src={lead01} />
                  </div>
                </div>
                <div className="item">
                  <div className="lead-img">
                    <img className="img-fluid" alt="Img" src={lead02} />
                  </div>
                </div>
                <div className="item">
                  <div className="lead-img">
                    <img className="img-fluid" alt="Img" src={lead03} />
                  </div>
                </div>
                <div className="item">
                  <div className="lead-img">
                    <img className="img-fluid" alt="Img" src={lead04} />
                  </div>
                </div>
                <div className="item">
                  <div className="lead-img">
                    <img className="img-fluid" alt="Img" src={lead05} />
                  </div>
                </div>
                <div className="item">
                  <div className="lead-img">
                    <img className="img-fluid" alt="Img" src={lead06} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Share Knowledge --> */}
        <section className="section share-knowledge">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="knowledge-img aos" data-aos="fade-up">
                  <img src={share} alt="Img" className="img-fluid" />
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <div className="join-mentor aos" data-aos="fade-up">
                  <h2>Want to share your knowledge? Join us a Mentor</h2>
                  <p>
                    High-definition video is video of higher resolution and
                    quality than standard-definition. While there is no
                    standardized meaning for high-definition, generally any
                    video.
                  </p>
                  <ul className="course-list">
                    <li>
                      <i className="fa-solid fa-circle-check"></i>Best Courses
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check"></i>Top rated
                      Instructors
                    </li>
                  </ul>
                  <div className="all-btn all-category d-flex align-items-center">
                    <Link to="" className="btn btn-primary">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- /Share Knowledge --> */}

        {/* <!-- Users Love --> */}
        {/* <section className="section user-love">
          <div className="container">
            <div className="section-header white-header aos" data-aos="fade-up">
              <div className="section-sub-head feature-head text-center">
                <span>Check out these real reviews</span>
                <h2>Users-love-us Don't take it from us.</h2>
              </div>
            </div>
          </div>
        </section>
        <section className="testimonial-four">
          {
            featuredReview?.length > 0  ? <>
            <div className="review">
            <div className="container">
              <div className="testi-quotes">
                <img src={qute} alt="Img" />
              </div>
              <div
                className="mentor-testimonial lazy slider aos"
                data-aos="fade-up"
                data-sizes="50vw "
              >
                <div className="d-flex justify-content-center">
                  <div className="testimonial-all d-flex justify-content-center"  style={{border:'10px solid #e2dfdf', borderRadius:'20px'}}>
                    <div className="testimonial-two-head text-center align-items-center d-flex">
                      <div className="mentor-testimonial lazy slider aos slick-initialized slick-slider aos-init aos-animate">
                        <div className="testi-right">
                          <img src={qute1} alt="Img" />
                        </div>
                        <p>
                          {featuredReview[0]?.reviewText}
                        </p>
                        <div className="four-testimonial-founder">
                          <div className="fount-about-img">
                            <a href="">
                              <img
                                src={dummyUser}
                                alt="Img"
                                className="img-fluid"
                              />
                            </a>
                          </div>
                          <h3>
                            <a href="">{featuredReview[0]?.studentName}</a>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </> : <>
            <div className="review">
            <div className="container">
              <div className="testi-quotes">
                <img src={qute} alt="Img" />
              </div>
              <div
                className="mentor-testimonial lazy slider aos"
                data-aos="fade-up"
                data-sizes="50vw "
              >
                <div className="d-flex justify-content-center">
                  <div className="testimonial-all d-flex justify-content-center"  style={{border:'10px solid #e2dfdf', borderRadius:'20px'}}>
                    <div className="testimonial-two-head text-center align-items-center d-flex">
                      <div className="mentor-testimonial lazy slider aos slick-initialized slick-slider aos-init aos-animate">
                        <div className="testi-right">
                          <img src={qute1} alt="Img" />
                        </div>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book.
                        </p>
                        <div className="four-testimonial-founder">
                          <div className="fount-about-img">
                            <a href="">
                              <img
                                src={user1}
                                alt="Img"
                                className="img-fluid"
                              />
                            </a>
                          </div>
                          <h3>
                            <a href="">Daziy Millar</a>
                          </h3>
                          <span>Founder of Awesomeux Technology</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </>
          }
          
        </section> */}

        <section className="section become-instructors aos" data-aos="fade-up">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 d-flex">
                <div className="student-mentor cube-instuctor ">
                  <h4>Become An Instructor</h4>
                  <div className="row">
                    <div className="col-lg-7 col-md-12">
                      <div className="top-instructors">
                        <p>
                          Top instructors from around the world teach millions
                          of students on Mentoring.
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-5 col-md-12">
                      <div className="mentor-img">
                        <img className="img-fluid" alt="Img" src={become02} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 d-flex">
                <div className="student-mentor yellow-mentor">
                  <h4>Transform Access To Education</h4>
                  <div className="row">
                    <div className="col-lg-8 col-md-12">
                      <div className="top-instructors">
                        <p>
                          Create an account to receive our newsletter, course
                          recommendations and promotions.
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                      <div className="mentor-img">
                        <img className="img-fluid" alt="Img" src={become01} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Latest Blog --> */}
        <section className="section latest-blog">
          <div className="container">
            <div className="section-header aos" data-aos="fade-up">
              <div className="section-sub-head feature-head text-center mb-0">
                <h2>{conf?.projectName === 'AWLMS' ? 'AW Learning Management System' : 'Quadnut (powered by MultiVentrix Global) '}</h2>
                <div className="section-text aos" data-aos="fade-up">
                  <p className="mb-0">
                  {conf?.projectName === 'AWLMS' ? 'AW LMS' : 'QuadNut'} is a comprehensive LMS designed to streamline online education and training. It provides a user-friendly platform for organizations, institutions, and businesses to create, manage, and deliver courses efficiently.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="owl-carousel blogs-slide owl-theme aos"
              data-aos="fade-up"
            >
              <div className="instructors-widget blog-widget">
                <div className="instructors-img">
                  <a href="blog-list.html">
                    <img className="img-fluid" alt="Img" src={blog1} />
                  </a>
                </div>
                <div className="instructors-content text-center">
                  <h5>
                    <a href="blog-list.html">
                      Attract More Attention Sales And Profits
                    </a>
                  </h5>
                  <p>Marketing</p>
                  <div className="student-count d-flex justify-content-center">
                    <i className="fa-solid fa-calendar-days"></i>
                    <span>Jun 15, 2024</span>
                  </div>
                </div>
              </div>
              <div className="instructors-widget blog-widget">
                <div className="instructors-img">
                  <a href="blog-list.html">
                    <img className="img-fluid" alt="Img" src={blog02} />
                  </a>
                </div>
                <div className="instructors-content text-center">
                  <h5>
                    <a href="blog-list.html">
                      11 Tips to Help You Get New Clients
                    </a>
                  </h5>
                  <p>Sales Order</p>
                  <div className="student-count d-flex justify-content-center">
                    <i className="fa-solid fa-calendar-days"></i>
                    <span>May 20, 2024</span>
                  </div>
                </div>
              </div>
              <div className="instructors-widget blog-widget">
                <div className="instructors-img">
                  <a href="blog-list.html">
                    <img className="img-fluid" alt="Img" src={blog03} />
                  </a>
                </div>
                <div className="instructors-content text-center">
                  <h5>
                    <a href="blog-list.html">An Overworked Newspaper Editor</a>
                  </h5>
                  <p>Design</p>
                  <div className="student-count d-flex justify-content-center">
                    <i className="fa-solid fa-calendar-days"></i>
                    <span>May 25, 2024</span>
                  </div>
                </div>
              </div>
              <div className="instructors-widget blog-widget">
                <div className="instructors-img">
                  <a href="blog-list.html">
                    <img className="img-fluid" alt="Img" src={blog04} />
                  </a>
                </div>
                <div className="instructors-content text-center">
                  <h5>
                    <a href="blog-list.html">A Solution Built for Teachers</a>
                  </h5>
                  <p>Seo</p>
                  <div className="student-count d-flex justify-content-center">
                    <i className="fa-solid fa-calendar-days"></i>
                    <span>Jul 15, 2024</span>
                  </div>
                </div>
              </div>
              <div className="instructors-widget blog-widget">
                <div className="instructors-img">
                  <a href="blog-list.html">
                    <img className="img-fluid" alt="Img" src={blog02} />
                  </a>
                </div>
                <div className="instructors-content text-center">
                  <h5>
                    <a href="blog-list.html">
                      Attract More Attention Sales And Profits
                    </a>
                  </h5>
                  <p>Marketing</p>
                  <div className="student-count d-flex justify-content-center">
                    <i className="fa-solid fa-calendar-days"></i>
                    <span>Sep 25, 2024</span>
                  </div>
                </div>
              </div>
              <div className="instructors-widget blog-widget">
                <div className="instructors-img">
                  <a href="blog-list.html">
                    <img className="img-fluid" alt="Img" src={blog03} />
                  </a>
                </div>
                <div className="instructors-content text-center">
                  <h5>
                    <a href="blog-list.html">An Overworked Newspaper Editor</a>
                  </h5>
                  <p>Marketing</p>
                  <div className="student-count d-flex justify-content-center">
                    <i className="fa-solid fa-calendar-days"></i>
                    <span>May 25, 2024</span>
                  </div>
                </div>
              </div>
              <div className="instructors-widget blog-widget">
                <div className="instructors-img">
                  <a href="blog-list.html">
                    <img className="img-fluid" alt="Img" src={blog04} />
                  </a>
                </div>
                <div className="instructors-content text-center">
                  <h5>
                    <a href="blog-list.html">A Solution Built for Teachers</a>
                  </h5>
                  <p>Analysis</p>
                  <div className="student-count d-flex justify-content-center">
                    <i className="fa-solid fa-calendar-days"></i>
                    <span>May 15, 2024</span>
                  </div>
                </div>
              </div>
              <div className="instructors-widget blog-widget">
                <div className="instructors-img">
                  <a href="blog-list.html">
                    <img className="img-fluid" alt="Img" src={blog02} />
                  </a>
                </div>
                <div className="instructors-content text-center">
                  <h5>
                    <a href="blog-list.html">
                      11 Tips to Help You Get New Clients
                    </a>
                  </h5>
                  <p>Development</p>
                  <div className="student-count d-flex justify-content-center">
                    <i className="fa-solid fa-calendar-days"></i>
                    <span>Jun 20, 2024</span>
                  </div>
                </div>
              </div>
              <div className="instructors-widget blog-widget">
                <div className="instructors-img">
                  <a href="blog-list.html">
                    <img className="img-fluid" alt="Img" src={blog03} />
                  </a>
                </div>
                <div className="instructors-content text-center">
                  <h5>
                    <a href="blog-list.html">An Overworked Newspaper Editor</a>
                  </h5>
                  <p>Sales</p>
                  <div className="student-count d-flex justify-content-center">
                    <i className="fa-solid fa-calendar-days"></i>
                    <span>May 25, 2024</span>
                  </div>
                </div>
              </div>
              <div className="instructors-widget blog-widget">
                <div className="instructors-img">
                  <a href="blog-list.html">
                    <img className="img-fluid" alt="Img" src={blog04} />
                  </a>
                </div>
                <div className="instructors-content text-center">
                  <h5>
                    <a href="blog-list.html">A Solution Built for Teachers</a>
                  </h5>
                  <p>Marketing</p>
                  <div className="student-count d-flex justify-content-center">
                    <i className="fa-solid fa-calendar-days"></i>
                    <span>April 15, 2024</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="enroll-group aos" data-aos="fade-up">
              <div className="row ">
                <div className="col-lg-4 col-md-6">
                  <div className="total-course d-flex align-items-center">
                    <div className="blur-border">
                      <div className="enroll-img ">
                        <img src={icon07} alt="Img" className="img-fluid" />
                      </div>
                    </div>
                    <div className="course-count">
                      <h3>
                        <span className="counterUp">{dynamicData?.studentCount}</span>
                      </h3>
                      <p>STUDENTS ENROLLED</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="total-course d-flex align-items-center">
                    <div className="blur-border">
                      <div className="enroll-img ">
                        <img src={icon08} alt="Img" className="img-fluid" />
                      </div>
                    </div>
                    <div className="course-count">
                      <h3>
                        <span className="counterUp">{dynamicData?.courseCount}</span>
                      </h3>
                      <p>TOTAL COURSES</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="total-course d-flex align-items-center">
                    <div className="blur-border">
                      <div className="enroll-img ">
                        <img src={icon09} alt="Img" className="img-fluid" />
                      </div>
                    </div>
                    <div className="course-count">
                      <h3>
                        <span className="counterUp">127</span>
                      </h3>
                      <p>COUNTRIES</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lab-course">
              {/* <div className="section-header aos" data-aos="fade-up">
                <div className="section-sub-head feature-head text-center">
                  <h2>
                    Unlimited access to 360+ courses <br />
                    and 1,600+ hands-on labs
                  </h2>
                </div>
              </div> */}
              <div className="icon-group aos" data-aos="fade-up">
                <div className="offset-lg-1 col-lg-12">
                  <div className="row">
                    <div className="col-lg-1 col-3">
                      <div className="total-course d-flex align-items-center">
                        <div className="blur-border">
                          <div className="enroll-img ">
                            <img src={icon09} alt="Img" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-1 col-3">
                      <div className="total-course d-flex align-items-center">
                        <div className="blur-border">
                          <div className="enroll-img ">
                            <img src={icon10} alt="Img" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-1 col-3">
                      <div className="total-course d-flex align-items-center">
                        <div className="blur-border">
                          <div className="enroll-img ">
                            <img src={icon16} alt="Img" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-1 col-3">
                      <div className="total-course d-flex align-items-center">
                        <div className="blur-border">
                          <div className="enroll-img ">
                            <img src={icon12} alt="Img" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-1 col-3">
                      <div className="total-course d-flex align-items-center">
                        <div className="blur-border">
                          <div className="enroll-img ">
                            <img src={icon13} alt="Img" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-1 col-3">
                      <div className="total-course d-flex align-items-center">
                        <div className="blur-border">
                          <div className="enroll-img ">
                            <img src={icon14} alt="Img" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-1 col-3">
                      <div className="total-course d-flex align-items-center">
                        <div className="blur-border">
                          <div className="enroll-img ">
                            <img src={icon15} alt="Img" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-1 col-3">
                      <div className="total-course d-flex align-items-center">
                        <div className="blur-border">
                          <div className="enroll-img ">
                            <img src={icon16} alt="Img" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-1 col-3">
                      <div className="total-course d-flex align-items-center">
                        <div className="blur-border">
                          <div className="enroll-img ">
                            <img src={icon17} alt="Img" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-1 col-3">
                      <div className="total-course d-flex align-items-center">
                        <div className="blur-border">
                          <div className="enroll-img ">
                            <img src={icon18} alt="Img" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        dialogClassName="modal-lg"
        closeButton
      >
        <Modal.Body className="p-0">
          <Button
            // variant="none"
            className="btn-close "
            onClick={() => setShowModal(false)}
            aria-label="Close"
            style={{ position: "absolute", right: "30px", top: "15px" }}
          />
          <img
            id="prmo-image"
            src={imageUrl}
            alt="promotion"
            title="promotion modal image"
            width="100%"
            className="border10"
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Home;
