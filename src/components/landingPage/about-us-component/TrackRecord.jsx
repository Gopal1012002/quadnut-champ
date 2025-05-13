import React from 'react'
import TrackImg from '../../../assets/img/landing-page/track-record.png'
import DecorationImg from '../../../assets/img/landing-page/shape.png'
import TrackImg1 from '../../../assets/img/landing-page/megaphone.png'
import TrackImg2 from '../../../assets/img/landing-page/diversity.png'
import TrackImg3 from '../../../assets/img/landing-page/online-course.png'
import TrackImg4 from '../../../assets/img/landing-page/placement.png'
import TrackImg5 from '../../../assets/img/landing-page/partnership.png'
import TrackddImg1 from '../../../assets/img/landing-page/reach.png'
import TrackddImg2 from '../../../assets/img/landing-page/job.png'
import TrackddImg3 from '../../../assets/img/landing-page/student-gathering.png'
import TrackddImg4 from '../../../assets/img/landing-page/courses.png'
import TrackddImg5 from '../../../assets/img/landing-page/patner.png'
import "bootstrap/dist/js/bootstrap.bundle.min";
import Head from '../../../layouts/main-layout/head/Head'

function TrackRecord() {
    return (
        <>
        <Head title="Our Track Record" />
            <section className='p-4 py-5'>
                <div className="container commit-sec">
                    <div className="row gy-5 commit-quality commit-sec">
                        {/* heading tittle start */}
                        <div className="col-xl-12 text-center d-flex justify-content-center align-items-center flex-column">
                            <div className='tittle-box'>
                                <div className='deco-img'>
                                    <img src={DecorationImg} alt="icon" />
                                </div>
                                <h1 className='mb-2 fw-bold'>Our Track Record</h1>
                            </div>

                            <p>Results That Speak</p>
                        </div>
                        {/* heading tittle end */}
                        <div className="col-lg-6 d-flex justify-content-center">
                            <img src={TrackImg} alt="image" className='img-fluid' style={{ width: "500px" }} />
                        </div>
                        <div className="col-lg-6 d-flex flex-column  justify-content-center">
                            <div className=''>
                                <p className='mb-2 para-align-justify'>At QUADNUT, we take pride in our proven track record of success and impact. Over the years, we have consistently demonstrated our commitment to transforming lives through skill development and training, reaching a wide audience across diverse sectors</p>

                            </div>
                            <div className='about-list d-flex flex-column flex-md-row gap-md-5 gap-3 pt-3'>
                                <ul className=''>
                                    <li className='fw-bold'>Extensive Reach</li>
                                    <li className='fw-bold mt-3'>Catering to All Age Groups</li>
                                    <li className='fw-bold mt-3'>Diverse Course Portfolio</li>
                                </ul>
                                <ul className=''>
                                    <li className='fw-bold'>Career Placement</li>
                                    <li className='fw-bold mt-3'>Impactful Partnerships</li>
                                </ul>
                            </div>
                            <div className='mt-4'>
                                <button type="submit" class="btn px-4 schedule-btn py-2 border-0">Let's Start</button>
                            </div>
                        </div>


                        <div className="col-xl-12 ">
                            <div class="mt-3 tab-session ">
                                <ul class="nav nav-pills justify-content-lg-between gap-3 gap-md-2  mb-4" role="tablist">
                                    <li class="nav-item tab-item-set" role="presentation">
                                        <a class="nav-link active p-0" data-bs-toggle="pill" href="#menu1">
                                            <div class="tab-box active-tab">
                                                <img src={TrackImg1} alt="" className="w-36" />
                                                <h6 className="mb-0 mt-2">Extensive Reach</h6>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="nav-item tab-item-set " role="presentation">
                                        <a class="nav-link p-0" data-bs-toggle="pill" href="#menu2">
                                            <div class="tab-box ">
                                                <img src={TrackImg2} alt="" className="w-36" />
                                                <h6 className="mb-0 mt-2">Catering to All Age Groups</h6>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="nav-item tab-item-set" role="presentation">
                                        <a class="nav-link p-0" data-bs-toggle="pill" href="#menu3">
                                            <div class="tab-box ">
                                                <img src={TrackImg3} alt="" className="w-36" />
                                                <h6 className="mb-0 mt-2">Diverse Course Portfolio</h6>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="nav-item tab-item-set " role="presentation">
                                        <a class="nav-link p-0" data-bs-toggle="pill" href="#menu4">
                                            <div class="tab-box ">
                                                <img src={TrackImg4} alt="" className="w-36" />
                                                <h6 className="mb-0 mt-2">Career Placement</h6>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="nav-item tab-item-set" role="presentation">
                                        <a class="nav-link p-0" data-bs-toggle="pill" href="#menu5">
                                            <div class="tab-box ">
                                                <img src={TrackImg5} alt="" className="w-36" />
                                                <h6 className="mb-0 mt-2">Impactful Partnerships</h6>
                                            </div>
                                        </a>
                                    </li>
                                </ul>

                                {/* {/ tab content section html /} */}

                                <div class="tab-content pt-md-2">
                                    <div id="menu1" class="tab-pane tab-dd-box container active show fade">
                                        <div className="row">
                                            <div className="col-lg-8 d-flex flex-column align-item-center justify-content-center">
                                                <h3 class="fw-bold">Extensive Reach</h3>
                                                <p className='para-align-justify'>
                                                    At QuadNut, we take pride in our widespread impact across
                                                    Government Departments, Corporate Sectors, and Educational
                                                    Institutions. Our Training Programs have been successfully
                                                    implemented in key Government and Public Sector Organizations
                                                    such as the Uttar Pradesh Police Department, Police Training
                                                    Centres, Uttar Pradesh Power Corporation Limited, Transport
                                                    Commissioner Office (Uttar Pradesh), Rajkiya Nirman Nigam
                                                    Limited (Lucknow), Social Welfare Department (Uttar Pradesh),
                                                    and Urban Development Department (Uttar Pradesh).
                                                </p>
                                                <p className='para-align-justify'>
                                                    Additionally, we have collaborated with Leading Educational
                                                    Institutions to equip students with Industry-Relevant Skills,
                                                    ensuring their Professional Growth and Career Readiness. Our
                                                    commitment to Delivering High-Quality Training continues to
                                                    drive our expansion, reaching Diverse Sectors and transforming
                                                    Skill Development on a large scale.
                                                </p>
                                            </div>
                                            <div className="col-lg-4">
                                                <img src={TrackddImg1} alt="image" className='img-fluid' />
                                            </div>
                                        </div>
                                    </div>
                                    <div id="menu2" class="tab-pane tab-dd-box container fade">
                                        <div className="row">
                                            <div className="col-md-8 d-flex flex-column align-item-center justify-content-center">
                                                <h3 class="fw-bold">Catering to All Age Groups</h3>
                                                <p className='para-align-justify'>
                                                    From young learners in the K-8 to K-12 segments to professionals seeking upskilling opportunities, we have catered to the needs of many students across varying age groups.
                                                </p>

                                            </div>
                                            <div className="col-md-4">
                                                <img src={TrackddImg3} alt="image" className='img-fluid' />
                                            </div>
                                        </div>
                                    </div>
                                    <div id="menu3" class="tab-pane tab-dd-box container fade">
                                        <div className="row">
                                            <div className="col-md-8 d-flex flex-column align-item-center justify-content-center">
                                                <h3 class="fw-bold">Diverse Course Portfolio</h3>
                                                <p className='para-align-justify'>
                                                With a robust infrastructure and expertise, we have created an impressive catalog of 400+ courses, encompassing IT, Non-IT, STEM education, and professional skill development.
                                                </p>
                                              
                                            </div>
                                            <div className="col-md-4">
                                                <img src={TrackddImg4} alt="image" className='img-fluid' />
                                            </div>
                                        </div>
                                    </div>
                                    <div id="menu4" class="tab-pane tab-dd-box container fade">
                                        <div className="row">
                                            <div className="col-md-8 d-flex flex-column align-item-center justify-content-center">
                                                <h3 class="fw-bold">Career Placement</h3>
                                                <p className='para-align-justify'>
                                                Our alumni have gone on to secure positions in leading organizations across industries, thanks to the hands-on learning experience and personalized mentorship provided during their time with us.
                                                </p>
                                              
                                            </div>
                                            <div className="col-md-4">
                                                <img src={TrackddImg2} alt="image" className='img-fluid' />
                                            </div>
                                        </div>
                                    </div>
                                    <div id="menu5" class="tab-pane tab-dd-box container fade">
                                        <div className="row">
                                            <div className="col-md-8 d-flex flex-column align-item-center justify-content-center">
                                                <h3 class="fw-bold">Impactful Partnerships</h3>
                                                <p className='para-align-justify'>
                                                By collaborating with government bodies, institutions, and industry leaders, we have expanded our ability to deliver training programs that address both local and global needs.
                                                </p>
                                            </div>
                                            <div className="col-md-4">
                                                <img src={TrackddImg5} alt="image" className='img-fluid' />
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

export default TrackRecord