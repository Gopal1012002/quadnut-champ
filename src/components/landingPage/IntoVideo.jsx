import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BtnImg from '../../../src/assets/img/quad-champs/button-img/book-icon.png'
import IntroImg from '../../assets/img/quad-champs/into-video/intro-video-1.png'
import SectiontittleImg from '../../assets/img/quad-champs/about/section-tittle-img.png'
import AboutcheckIcon from '../../assets/img/quad-champs/about/about-icon.png'
import IntoshapeImg1 from '../../assets/img/quad-champs/into-video/activite-shape3.png'



function IntoVideo() {
    return (
        <>
            <section className='pt-5'>
                <div className="container pt-5">
                    <div className="row gy-4 ">
                        <div className="col-lg-6 pt-md-4 position-relative">
                            <div className='into-shap1'>
                                <img src={IntoshapeImg1} alt="image" className='img-fluid left-right' />

                            </div>
                            <div className='d-flex flex-column align-items-center align-items-lg-start'>
                                <div><span><img src={SectiontittleImg} alt="book-icon" className='img-fluid me-1' /></span><span className='about-txt'>Introductory Video</span></div>
                                <h1 className='mt-3 text-center text-lg-start'>Upgrade Your Skills with the
                                    Newest Trends</h1>
                                <p className='mt-md-3 text-center text-lg-start'>Empowering learners through a blend of tradition and technology. Explore interactive tools, smart classrooms, and personalized learning paths.</p>
                                <h3 className='mt-2 text-center text-lg-start'>Learning with Multimedia & Interactivity</h3>
                                <ul className='mt-lg-2'>
                                    <li className='pb-3 d-flex gap-1'><div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>Video-based lessons</div></li>
                                    <li className='pb-3 d-flex gap-1'><div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>Interactive whiteboards</div></li>
                                    <li className='pb-3 d-flex gap-1'><div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>Collaborative virtual classrooms</div></li>
                                </ul>
                            </div>
                            {/* common btn start */}
                            <div className='w-100  d-flex justify-content-center justify-content-lg-start'>
                                <div className='champ-common-btn mt-3'>
                                    <Link to="/course-list">
                                        <span><img src={BtnImg} alt="immage" className='me-2' /></span><span className='btn-txt'>Get Started</span>
                                    </Link>
                                </div>
                            </div>
                            {/* common btn end */}
                        </div>
                        <div className="col-lg-6 position-relative d-flex  justify-content-center align-items-center hover-img-box">
                            <div className='about-video-icon'>
                                <a class="video-vemo-icon venobox vbox-item" target='_blank' data-vbtype="youtube" data-autoplay="true" href="https://www.youtube.com/watch?v=Wx48y_fOfiY">Play</a>
                            </div>
                            <div className='hover-effect-img'>
                                <img src={IntroImg} alt="about-img" className='img-fluid' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default IntoVideo