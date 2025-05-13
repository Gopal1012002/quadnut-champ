import React from 'react'
import bannerImg from "../../../assets/img/landing-page/banner-shap-2.png";
import nextImg from "../../../assets/img/landing-page/next.png";
// import founderImg from "../../../assets/img/landing-page/founder.jpg";
import founderImg from "../../../assets/img/landing-page/profile-photo.jpg";
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";

function CoFounder() {
    return (
        <>
            <section className="py-5 p-sm-5 ">
                <div className="container">
                    <div className="row gy-3">

                        <div className="col-md-12 col-lg-7 pt-md-4 ">


                            <div className="mt-3">
                                <h1>Mr.Rahul Singh</h1>
                                <h5>
                                    <span className="color-grey">Co-Founder of QuadNut</span>
                                </h5>
                            </div>

                            <div className="para-align-justify">
                                <p className="mb-2">
                                    As a co-founder of QUADNUT, it’s an absolute privilege to be part of an organization that is at the forefront of shaping the future of education and skill development. Our mission is to redefine how learning is approached and delivered, focusing on practical, industry-relevant skills that are essential for career advancement.
                                </p>


                                <p className="mb-2">
                                    At QUADNUT, we are not just providing courses; we are cultivating an ecosystem where students from diverse backgrounds and at various stages of their careers can learn, grow, and prepare for the challenges of tomorrow. Whether you're a student preparing for the professional world or a seasoned professional looking to upgrade your skills, QUADNUT is here to help you every step of the way.
                                </p>
                                <p className="mb-2">
                                    Our focus is on delivering an interactive, hands-on learning experience that bridges the gap between theoretical knowledge and real-world application. We collaborate with industry experts to ensure that our curriculum is always aligned with current trends and future needs, giving our learners a competitive edge.
                                </p>
                                <p className="mb-2">
                                    I am excited about the journey ahead and the opportunity to positively impact the lives of individuals by equipping them with the skills needed to succeed in today’s rapidly evolving job market. With a strong commitment to innovation, quality, and excellence, we continue to build an inclusive learning environment that empowers individuals to realize their fullest potential.ge.
                                </p>

                                <p className="fs-18">
                                    <FaQuoteLeft color="grey" className="me-1" />
                                    Thank you for choosing to be a part of this exciting journey with us. We are committed to your growth, success, and continuous learning.
                                    <FaQuoteRight color="grey" className="ms-1" />
                                </p>

                            </div>

                        </div>

                        <div className="col-lg-5 col-md-12  d-flex align-items-center">
                            <img
                                src={founderImg}
                                alt="founder"
                                className="img-fluid rounded "
                            />
                        </div>
                        <div>
                            <a
                                className="btn btn-box text-white border-0   mt-0 fs-18"
                                href="#"
                                role="button"
                            >
                                Meet Our Team
                                <img src={nextImg} className="img-fluid btn-img ms-1" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}

export default CoFounder