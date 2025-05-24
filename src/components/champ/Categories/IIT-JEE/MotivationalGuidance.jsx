import React from 'react'
import SectiontittleImg from '../../../../assets/img/quad-champs/about/section-tittle-img.png'
import GuideImg from '../../../../assets/img/quad-champs/IIT-JEE/guide-image.png'
import CheckImg1 from '../../../../assets/img/quad-champs/IIT-JEE/iit-icon1.png'
import CheckImg2 from '../../../../assets/img/quad-champs/IIT-JEE/iit-icon2.png'
import CheckImg3 from '../../../../assets/img/quad-champs/IIT-JEE/iit-icon3.png'
import CheckImg4 from '../../../../assets/img/quad-champs/IIT-JEE/iit-icon4.png'


function MotivationalGuidance() {
    return (
        <>
            <section className='py-5'>
                <div className="container py-md-5">
                    <div className="row align-items-center">
                        <div className="col-lg-7 mb-4 mb-lg-0">
                            <div className='d-flex flex-column align-items-center align-items-lg-start'>
                                <div><span><img src={SectiontittleImg} alt="book-icon" className='img-fluid me-1' /></span><span className='about-txt'>Motivational Guidance</span></div>
                                <h1 className='mt-3 text-center text-lg-start lh-base'>Emotional & Motivational Guidance</h1>
                                <p>We understand the emotional journey that accompanies intense competitive preparation. That’s why we provide:</p>
                            </div>
                            <div className="row gy-3">
                                <div className="col-md-6">
                                    <div className='guidance-item guide-bg-1'>
                                        <img src={CheckImg1} alt="check-icon" className='me-1' />
                                        <span className=''>Mentorship for Mental Wellness</span>

                                    </div>
                                </div>
                                 <div className="col-md-6">
                                    <div className='guidance-item guide-bg-2'>
                                        <img src={CheckImg2} alt="check-icon" className='me-1' />
                                        <span className=''>Goal-Oriented Motivation Sessions</span>

                                    </div>
                                </div>
                                 <div className="col-md-6">
                                    <div className='guidance-item guide-bg-3'>
                                        <img src={CheckImg3} alt="check-icon" className='me-1' />
                                        <span className=''>Stress-Management</span>

                                    </div>
                                </div>
                                 <div className="col-md-6 ">
                                    <div className='guidance-item guide-bg-4'>
                                        <img src={CheckImg4} alt="check-icon" className='me-1' />
                                        <span className=''> Focus Strategies</span>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 text-center hover-img-box">
                            <div className="hover-effect-img competitions-box w-100 d-flex align-items-center justify-content-center">
                                <img src={GuideImg} alt="image" className="img-fluid"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default MotivationalGuidance