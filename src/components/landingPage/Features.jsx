import React, { useEffect } from 'react'
import ClassRoom from '../../assets/img/landing-page/classroom.png'
import Exm from '../../assets/img/landing-page/exam (1).png'
import Ai from '../../assets/img/landing-page/artificial-intelligence.png'
import StudyMaterial from '../../assets/img/landing-page/book (1).png'
import DecorationImg from '../../assets/img/landing-page/shape.png'
import FeaturesImg from '../../assets/img/landing-page/leadership.png'
import VirtuallabIcon from '../../assets/img/landing-page/Virtual-Labs.png'
import AiIcon from '../../assets/img/landing-page/artificial-intelligence.png'
import SemtIcon from '../../assets/img/landing-page/STEM-Based-Learning.png'
import ClassIcon from '../../assets/img/landing-page/classroom.png'
import MentorshipIcon from '../../assets/img/landing-page/Mentorship.png'
import ServiceIcon from '../../assets/img/landing-page/24.png'
import OwlCarousel from "react-owl-carousel";
import AOS from "aos";
import "aos/dist/aos.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function Features() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <>

            <section className='sec-to-sec-py'>
                <div className="container">
                    <div className="row gy-3">
                        {/* heading tittle start */}
                        <div className="col-xl-12 text-center d-flex justify-content-center align-items-center flex-column">
                            <div className='tittle-box'>
                                <div className='deco-img'>
                                    <img src={DecorationImg} alt="icon" />
                                </div>
                                <h1 className='mb-2 fw-bold'>Key Features</h1>
                            </div>

                            <p>Smart Solutions for Your Needs</p>
                        </div>
                        {/* heading tittle end */}

                        {/* keyfeature card */}
                        <div className="col-xl-12">
                            <div className="row g-3">
                                <div className="col-md-6 col-lg-4">
                                    <div className="card p-3  features-card border-0 rounded-0  ">
                                        <div className="row gy-2 ">
                                            <div className="col-xl-12 d-flex justify-content-center align-items-center">

                                                <div className='key-features-img-box'>
                                                    <img src={VirtuallabIcon} alt="image" />
                                                </div>

                                            </div>
                                            <div className="col-xl-12 text-center">
                                                <h4 className='mb-0 lh-base'>Virtual <br /> Labs</h4>
                                            </div>
                                            <div className="col-xl-12">
                                                <p className='mb-0 fs-14  features-card-txt text-center '>
                                                    Experience real-world experiments in a virtual environment. Our state-of-the-art virtual labs provide an immersive learning experience without the limitations of physical infrastructure.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="card p-3  features-card border-0 rounded-0">
                                        <div className="row gy-2 px-md-4">
                                            <div className="col-xl-12 d-flex justify-content-center align-items-center">
                                                <div className='key-features-img-box'>
                                                    <img src={AiIcon} alt="image" />
                                                </div>

                                            </div>
                                            <div className="col-xl-12 text-center">
                                                <h4 className='mb-0 lh-base'>AI <br /> Based Learning</h4>
                                            </div>
                                            <div className="col-xl-12">
                                                <p className='mb-0 fs-14  features-card-txt text-center'>
                                                    Leverage the power of Artificial Intelligence to personalize learning experiences. Our AI-driven platform adapts to each student's needs, ensuring effective and customized education.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="card p-3  features-card border-0 rounded-0  ">
                                        <div className="row gy-2 px-md-4">
                                            <div className="col-xl-12 d-flex justify-content-center align-items-center">
                                                <div className='key-features-img-box'>
                                                    <img src={SemtIcon} alt="image" />
                                                </div>

                                            </div>
                                            <div className="col-xl-12 text-center">
                                                <h4 className='mb-0 lh-base'>STEM <br /> Based Learning</h4>
                                            </div>
                                            <div className="col-xl-12 text-center">
                                                <p className='mb-0 fs-14  features-card-txt text-center'>
                                                    QuadNut focuses on Science, Technology, Engineering, and Mathematics (STEM) education, encouraging critical thinking and problem-solving skills through interactive and practical-based learning modules.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="card p-3  features-card border-0 rounded-0  ">
                                        <div className="row gy-2 px-md-4">
                                            <div className="col-xl-12 d-flex justify-content-center align-items-center">
                                                <div className='key-features-img-box'>
                                                    <img src={ClassIcon} alt="image" />
                                                </div>

                                            </div>
                                            <div className="col-xl-12 text-center">
                                                <h4 className='mb-0'> Interactive & Tech-Enabled Classrooms</h4>
                                            </div>
                                            <div className="col-xl-12 text-center">
                                                <p className='mb-0 fs-14  features-card-txt text-center'>
                                                    Say goodbye to traditional learning methods! Our classrooms are equipped with the latest technology, including AR/VR and interactive content, to make learning more dynamic and fun.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="card p-3  features-card border-0 rounded-0  ">
                                        <div className="row gy-2 ">
                                            <div className="col-xl-12 d-flex justify-content-center align-items-center">

                                                <div className='key-features-img-box'>
                                                    <img src={MentorshipIcon} alt="image" />
                                                </div>

                                            </div>
                                            <div className="col-xl-12 text-center">
                                                <h4 className='mb-0 lh-base'>Mentorship <br /> Sessions</h4>
                                            </div>
                                            <div className="col-xl-12">
                                                <p className='mb-0 fs-14  features-card-txt text-center '>
                                                    Experience real-world experiments in a virtual environment. Our state-of-the-art virtual labs provide an immersive learning experience without the limitations of physical infrastructure.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="card p-3  features-card border-0 rounded-0  ">
                                        <div className="row gy-2">
                                            <div className="col-xl-12 d-flex justify-content-center align-items-center">
                                                <div className='key-features-img-box'>
                                                    <img src={ServiceIcon} alt="image" />
                                                </div>

                                            </div>
                                            <div className="col-xl-12 text-center">
                                                <h4 className='mb-0 lh-base'>24*7 <br/>  Student  Support</h4>
                                            </div>
                                            <div className="col-xl-12">
                                                <p className='mb-0 fs-14  features-card-txt text-center'>
                                                    We ensure that no student is left behind. Our dedicated support team is available around the clock to assist students with their queries, providing guidance whenever they need it.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
         


                            </div>
                        </div>

                    </div>
                </div>

            </section>
        </>
    )
}

export default Features