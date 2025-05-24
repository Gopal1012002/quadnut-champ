import React from 'react'
import SyllabusIcon from '../../../../assets/img/quad-champs/classes/checklist.png'
import foundationalIcon from '../../../../assets/img/quad-champs/classes/learning.png'
import PerformanceIcon from '../../../../assets/img/quad-champs/classes/performance.png'
import SectiontittleImg from '../../../../assets/img/quad-champs/about/section-tittle-img.png'
import LiveclassesImg from '../../../../assets/img/quad-champs/IIT-JEE/live-calsses.png'


function LiveRecorded() {
    return (
        <>
            <section className='py-5'>
                <div className="container  mocktest primary-grade">
                    <div className="row align-items-center gy-3">
                        <div className="col-lg-7 mb-4 mb-lg-0 order-2 order-lg-1">
                            <div className='d-flex flex-column align-items-center align-items-lg-start'>
                                <div><span><img src={SectiontittleImg} alt="book-icon" className='img-fluid me-1' /></span><span className='about-txt'>Live & Recorded Learning</span></div>
                                <h1 className='mt-3 text-center text-lg-start lh-base'>Students enrolled in our IIT JEE and NEET tracks will have full access to</h1>
                            </div>

                            {/* Feature List */}
                            <ul className="list-unstyled mt-4">
                                <li className="item mb-2 d-flex justify-content-start align-items-center">
                                    <div class="icon-box">
                                        <img src={SyllabusIcon} alt="icon" />
                                    </div>
                                    <div class="item-content">
                                        <h6 className='mb-0'>Live Interactive Classes by top-tier educators with deep subject expertise</h6>
                                    </div>
                                </li>
                                <li className="item mb-2 d-flex justify-content-start align-items-center">
                                    <div class="icon-box">
                                        <img src={PerformanceIcon} alt="icon" />
                                    </div>
                                    <div class="item-content">
                                        <h6 className='mb-0'>Recorded Lectures available on our platform for flexible revision and self-paced catch-up</h6>
                                    </div>
                                </li>
                                <li className="item mb-2 d-flex justify-content-start align-items-center">
                                    <div class="icon-box">
                                        <img src={foundationalIcon} alt="icon" />
                                    </div>
                                    <div class="item-content">
                                        <h6 className='mb-0'>Smart class modules aligned with the latest JEE/NEET syllabus and trends</h6>
                                    </div>
                                </li>

                            </ul>
                            <p className='fw-bold mt-md-3 text-center text-lg-start'>Whether the student attends live or revisits recorded lessons, every lecture is optimized for concept clarity, problem-solving, and exam application</p>
                        </div>
                        <div className="col-lg-5 text-center hover-img-box order-1 order-lg-2">
                            <div className="hover-effect-img competitions-box">
                                <img src={LiveclassesImg} alt="image" className="img-fluid"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default LiveRecorded