import React from 'react'
import SyllabusIcon from '../../../../assets/img/quad-champs/classes/checklist.png'
import foundationalIcon from '../../../../assets/img/quad-champs/classes/learning.png'
import PerformanceIcon from '../../../../assets/img/quad-champs/classes/performance.png'
import SectiontittleImg from '../../../../assets/img/quad-champs/about/section-tittle-img.png'
import CompetitionsImg from '../../../../assets/img/quad-champs/foundation/Competitions-image.jpg'


function DualfocusCurriculum() {
    return (
        <>
            <section className='py-5'>
                <div className="container  mocktest primary-grade">
                    <div className="row align-items-center">
                        <div className="col-lg-7 mb-4 mb-lg-0">
                            <div className='d-flex flex-column align-items-center align-items-lg-start'>
                                <div><span><img src={SectiontittleImg} alt="book-icon" className='img-fluid me-1' /></span><span className='about-txt'>Dual-Focus Curriculum</span></div>
                                <h1 className='mt-3 text-center text-lg-start lh-base'>Dual-Focus Curriculum: Boards +Competitions</h1>
                            </div>
                            <p className=" description">
                               Our Foundation batches are designed to ensure that students not only excel in their board exams but also gain early exposure to the rigor of competitive exams. The curriculum is aligned with CBSE/ICSE syllabi while integrating higher-order thinking and problem-solving techniques..
                            </p>

                            {/* Feature List */}
                            <ul className="list-unstyled mt-4">
                                <li className="item mb-2 d-flex justify-content-start">
                                    <div class="icon-box">
                                        <img src={SyllabusIcon} alt="icon" />
                                    </div>
                                    <div class="item-content">
                                        <h6>Strengthened board exam preparation</h6>
                                    </div>
                                </li>
                                <li className="item mb-2 d-flex justify-content-start">
                                    <div class="icon-box">
                                        <img src={foundationalIcon} alt="icon" />
                                    </div>
                                    <div class="item-content">
                                        <h6>Integrated early exposure to JEE/NEET/CUET pattern</h6>
                                    </div>
                                </li>
                                <li className="item mb-2 d-flex justify-content-start">
                                    <div class="icon-box">
                                        <img src={PerformanceIcon} alt="icon" />
                                    </div>
                                    <div class="item-content">
                                        <h6>Concept clarity with long-term academic vision</h6>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-5 text-center hover-img-box">
                            <div className="hover-effect-img competitions-box">
                                <img src={CompetitionsImg} alt="image" className="img-fluid"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default DualfocusCurriculum