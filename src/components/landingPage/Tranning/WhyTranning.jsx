import React from 'react'
import DecorationImg from '../../../assets/img/landing-page/shape.png'
import AboutImg from '../../../assets/img/landing-page/tr-about.png'
import Seminar from '../../../assets/img/landing-page/seminar.png'
import WorkShop from '../../../assets/img/landing-page/workshop.png'
import TranningProg from '../../../assets/img/landing-page/training-program.png'

function WhyTranning() {
    return (
        <>
            <section>
                <div className="container py-md-5 py-4">
                    <div className="row gy-md-4 gy-3">
                        {/* heading tittle start */}
                        <div className="col-xl-12 text-center d-flex justify-content-center align-items-center flex-column">
                            <div className='tittle-box'>
                                <div className='deco-img d-none d-md-block'>
                                    <img src={DecorationImg} alt="icon" />
                                </div>
                                <h1 className='mb-2 fw-bold '>Why Training with QuadNut?</h1>
                            </div>

                            <p className='section-heading'>Unlock Your Potential – Train Smart, Train QuadNut</p>
                        </div>
                        {/* heading tittle end */}
                        <div className="col-md-6 d-flex justify-content-center align-items-center">
                            <img src={AboutImg} alt="image" className='img-fluid' />
                        </div>
                        <div className="col-md-6 d-flex align-items-center">
                            <div>
                                <p className='mb-3 para-align-justify'>
                                    <b>At QuadNut</b>, we believe that the classroom should go beyond the textbook. Our Offline Training Programs are crafted especially for Colleges and Universities to help students bridge the gap between academic learning and real-world industry expectations.
                                </p>
                                <p className='mb-2 para-align-justify'>
                                    <b>We deliver impactful</b> 1-Day Seminars, 3-Day Hands-On Workshops, and Long-Term Training Programs (30–45 days) to equip learners with the tools, confidence, and skills they need to thrive in today’s job market. Whether you're looking to explore cutting-edge technologies or develop essential soft skills, we’ve got you covered.
                                </p>

                            </div>

                        </div>
                        <div className="col-xl-12">
                            <div class="row gy-3 gy-xl-0 justify-content-center">
                                <div class="col-xl-4  col-md-6 ">
                                    <div class="single-feature-box box-1 h-100">
                                        <div class="feature-icon">
                                            <img src={Seminar} alt="feature-icon"/>
                                        </div>
                                        <div class="feature-content">
                                            <h4 class="feature-title text-center">1-Day Seminars</h4>
                                            <p class="feature-desc text-center fw-bold"> Free of cost , 2 Hours , Ideal for large student groups</p>
                                        </div>
                                        <div class="educate-hover-box hover-bx"></div>
                                        <div class="educate-hover-box hover-bx2"></div>
                                        <div class="educate-hover-box hover-bx3"></div>
                                        <div class="educate-hover-box hover-bx4"></div>
                                    </div>
                                </div>
                                <div class="col-xl-4  col-md-6 ">
                                    <div class="single-feature-box box-2 h-100">
                                        <div class="feature-icon">
                                        <img src={WorkShop} alt="feature-icon"/>
                                        </div>
                                        <div class="feature-content">
                                            <h4 class="feature-title text-center">3-Day Hands-On Workshops</h4>
                                            <p class="feature-desc text-center fw-bold"> Hands-on Training , Portfolio-Ready Projects , Industry Interaction</p>
                                        </div>
                                        <div class="educate-hover-box hover-bx"></div>
                                        <div class="educate-hover-box hover-bx2"></div>
                                        <div class="educate-hover-box hover-bx3"></div>
                                        <div class="educate-hover-box hover-bx4"></div>
                                    </div>
                                </div>
                                <div class="col-xl-4  col-md-6 ">
                                    <div class="single-feature-box box-3 h-100">
                                        <div class="feature-icon">
                                        <img src={TranningProg} alt="feature-icon"/>
                                        </div>
                                        <div class="feature-content">
                                            <h4 class="feature-title text-center">Long-Term Training Programs (30–45 days)</h4>
                                            <p class="feature-desc text-center fw-bold"> Career Building,  Real-World Projects,  Certification & Placement Assistance</p>
                                        </div>
                                        <div class="educate-hover-box hover-bx"></div>
                                        <div class="educate-hover-box hover-bx2"></div>
                                        <div class="educate-hover-box hover-bx3"></div>
                                        <div class="educate-hover-box hover-bx4"></div>
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

export default WhyTranning