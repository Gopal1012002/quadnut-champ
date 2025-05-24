import React from 'react'
import SectiontittleImg from '../../../../assets/img/quad-champs/about/section-tittle-img.png'
import LiveclassesImg from '../../../../assets/img/quad-champs/IIT-JEE/live-calsses.png'
import SuperChargedImg from '../../../../assets/img/quad-champs/IIT-JEE/super-charged.png'
import AboutcheckIcon from '../../../../assets/img/quad-champs/about/about-icon.png'

function EverythingFoundation() {
    return (
        <>
            <section className='py-md-5'>
                <div className="container  mocktest primary-grade">
                    <div className="row align-items-center gy-3">
                        <div className="col-lg-6 text-center hover-img-box">
                            <div className="hover-effect-img competitions-box">
                                <img src={SuperChargedImg} alt="image" className="img-fluid"
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <div className='d-flex flex-column align-items-center align-items-lg-start'>
                                <div><span><img src={SectiontittleImg} alt="book-icon" className='img-fluid me-1' /></span><span className='about-txt'>Supercharged for Competitive Edge</span></div>
                                <h5 className='mt-3 text-center text-lg-start lh-base'>Everything from Foundation – Supercharged for Competitive Edge</h5>
                                <p className='fw-bold text-center text-lg-start'>All the benefits of our Foundation program are carried forward with deeper intensity and subject precision:</p>
                            </div>

                            {/* Feature List */}
                            <ul className=''>
                                <li className='pb-2 d-flex gap-1'>
                                    <div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>Expert-Curated Notes & Study Material — digital + printable formatss</div>
                                </li>
                                <li className='pb-2 d-flex gap-1'>
                                    <div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>Massive Practice Sets via the QuadNut Portal, focusing on NEET & JEE formats</div>
                                </li>
                                <li className='pb-2 d-flex gap-1'>
                                    <div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>Dedicated Practice Mentor — a faculty member focused solely on solving advanced-level problems and refining strategy</div>
                                </li>
                                <li className='pb-2 d-flex gap-1'>
                                    <div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>One-to-One Doubt Sessions for resolving roadblocks in real time</div>
                                </li>
                                <li className='pb-2 d-flex gap-1'>
                                    <div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>Daily Practice Papers (DPPs) to strengthen consistency and speed</div>
                                </li>
                                <li className='pb-2 d-flex gap-1'>
                                    <div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>Monthly AITS (All India Test Series) to benchmark against national peers</div>
                                </li>
                                <li className='pb-2 d-flex gap-1'>
                                    <div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>Weekly QuadNut Booster Tests to maintain sharpness and track micro-progress</div>
                                </li>
                            </ul>

                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default EverythingFoundation