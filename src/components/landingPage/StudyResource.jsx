import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import share from "../../assets/img/share.png";
import DecorationImg from '../../assets/img/landing-page/shape.png'
import StudyImg from '../../assets/img/landing-page/notes2.png'
import NotesIcon from '../../assets/img/landing-page/notes.png'
import MockImg from '../../assets/img/landing-page/mock-test.png'
import Book from '../../assets/img/landing-page/book.png'
import Blogging from '../../assets/img/landing-page/e-blogging.png'
import OwlCarousel from "react-owl-carousel";
import AOS from "aos";
import "aos/dist/aos.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function StudyResource() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <>
            {/* <!-- Share Knowledge --> */}
            <section className="mt-4">
                <div className="container">
                    <div className="row gy-4">
                        {/* heading tittle start */}
                        <div className="col-xl-12 text-center d-flex justify-content-center align-items-center flex-column">
                            <div className='tittle-box'>
                                <div className='deco-img d-none d-md-block'>
                                    <img src={DecorationImg} alt="icon" />
                                </div>
                                <h1 className='mb-2 fw-bold'>Study Resources</h1>
                            </div>
                            <p>Smart Solutions for Your Needs</p>
                        </div>
                        {/* heading tittle end */}

                        <OwlCarousel
                            className="owl-theme mentoring-course mt-0"
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
                            <div className="col-md-4">
                                <div className="card rounded-0 h-100 study-res-card study-bg-white p-4 d-flex flex-column align-items-center justify-content-center mx-auto">
                                    <div className='d-flex justify-content-center mt-3 study-img-box'>
                                        <img src={NotesIcon} alt="study-img" className='img-fluid' />
                                    </div>

                                    <h4 className='mt-3'>Notes</h4>
                                    <p className='fs-13 text-center'> Crisp, clear, and exam-ready notes that make even the toughest topics easy to grasp.</p>


                                </div>
                            </div>





                            <div className="col-md-4 ">
                                <div className="card rounded-0 h-100 study-res-card study-bg-white p-4 d-flex flex-column align-items-center justify-content-center mx-auto">
                                    <div className='d-flex justify-content-center mt-3 study-img-box '>
                                        <img src={MockImg} alt="study-img" className='img-fluid ' />
                                    </div>

                                    <h4 className='mt-3 '>Mock Test</h4>
                                    <p className='fs-13 text-center'> Practice with expert-designed tests that mirror real exams and help master tricky concepts with ease.</p>


                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card rounded-0 h-100 study-res-card study-bg-white p-4 d-flex flex-column align-items-center justify-content-center mx-auto">
                                    <div className='d-flex justify-content-center mt-3 study-img-box'>
                                        <img src={Book} alt="study-img" className='img-fluid' />
                                    </div>

                                    <h4 className='mt-3'>Reference Books</h4>
                                    <p className='fs-13 text-center'>Curated textbooks and guides designed to deepen understanding and boost exam readiness with simplified explanations</p>
                                </div>
                            </div>
                            <div className="col-md-4 ">
                                <div className="card rounded-0 h-100 study-res-card study-bg-white p-4 d-flex flex-column align-items-center justify-content-center mx-auto">
                                    <div className='d-flex justify-content-center mt-3 study-img-box'>
                                        <img src={Blogging} alt="study-img" className='img-fluid' />
                                    </div>

                                    <h4 className='mt-3'>E-Blogging</h4>
                                    <p className='fs-13 text-center'> Learn through insightful blogs that break down trending topics, key concepts, and real-world applications.</p>
                                </div>
                            </div>
                        </OwlCarousel>



                    </div>
                </div>


            </section>
            {/* <!-- /Share Knowledge --> */}

        </>
    )
}

export default StudyResource