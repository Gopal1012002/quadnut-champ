import React from 'react'
import HeroImg from '../../../assets/img/quad-champs/classes/hero.png'
import Shape1 from '../../../assets/img/landing-page/tr-hero-shape1.png'
import Shape2 from '../../../assets/img/landing-page/tr-hero-shape2.png'

const LiveTuitionHeroSection = () => {
    return (
        <section>
            <div className="container-fluid px-0">
                <div className="tranning-bg">
                    <div className="row">
                        <div className="col-lg-7 d-flex flex-column  justify-content-center">
                           
                            <div className='mt-md-3 fw-boldm tr-hero-heading'>
                                <h1>Focused Academic Support
                                    <br /> for Grades 3 to 12</h1>
                            </div>
                            <div>
                                <p><b>At QuadNut Champs,</b>our School Preparation program is designed to help students achieve academic excellence through structured, curriculum-aligned support across all major subjects. Spanning Grades 3 to 12, this program ensures that every learner receives targeted guidance to build strong subject knowledge and score higher in school assessments and board exams.</p>
                            </div>
                            

                        </div>
                        <div className="col-lg-5  d-flex justify-content-center">
                            <div className='tr-hero-box'>
                                <div className='tr-hero-shape-box hero-shape1'>
                                    <img src={Shape1} alt="shape-icon" className='img-fluid' />
                                </div>
                                <div className='tr-hero-shape-box hero-shape2'>
                                    <img src={Shape2} alt="shape-icon" className='img-fluid' />
                                </div>
                                <img src={HeroImg} alt="image" className='img-fluid' style={{ width: "470px" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LiveTuitionHeroSection