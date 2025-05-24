import React from 'react'
import SectiontittleImg from '../../../../assets/img/quad-champs/about/section-tittle-img.png'
import KeyShape1 from '../../../../../src/assets/img/quad-champs/into-video/activite-shape2.png'
import styles from '../SchoolPreparation/EducationMindMap.module.css';
import Seminar from '../../../../assets/img/landing-page/seminar.png'
import WorkShop from '../../../../assets/img/landing-page/workshop.png'
import TranningProg from '../../../../assets/img/landing-page/training-program.png'

const StrategicLearning = () => {
    return (
        <section className='py-5'>
            <div className="container">
                <div className="row">
                    <div className="col-xl-12 d-flex justify-content-center position-relative ">
                        <div className='key-shape1'>
                            <img src={KeyShape1} alt="shape" className='img-fluid zoom' />
                        </div>
                        <div className='px-4 d-flex justify-content-center flex-column align-items-center'>
                            <div>
                                <span><img src={SectiontittleImg} alt="book-icon" className='img-fluid me-1' /></span><span className='about-txt'>Strategic Learning Components</span>
                            </div>
                            <h2 className='text-center mt-2'>Focused. Strategic. Effective.</h2>
                        </div>
                    </div>
                    <div className="col-xl-12 pt-4">
                            <div class="row gy-3 gy-xl-0 justify-content-center">
                                <div class="col-xl-4  col-md-6 ">
                                    <div class="single-feature-box box-1 h-100">
                                        <div class="feature-icon">
                                            <img src={Seminar} alt="feature-icon"/>
                                        </div>
                                        <div class="feature-content">
                                            <h4 class="feature-title text-center">Expert Lectures + Best-in-Class Notes</h4>
                                            <p class="feature-desc text-center "> Every topic is covered in depth with curated resources and educator-driven notes to simplify complex topics</p>
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
                                            <h4 class="feature-title text-center">Massive Practice Bank</h4>
                                            <p class="feature-desc text-center ">Students get access to our QuadNut portal featuring thousands of questions for self-paced mastery</p>
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
                                            <h4 class="feature-title text-center">Printed & Digital Study Material</h4>
                                            <p class="feature-desc text-center">Comprehensive workbooks and subject-wise question banks mapped to exam formats</p>
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
    )
}

export default StrategicLearning