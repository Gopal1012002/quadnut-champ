import React from 'react'
import DecorationImg from '../../../assets/img/landing-page/shape.png'
import TrMark from '../../../assets/img/landing-page/tr-mark.png'

function ExpertiseApproach() {
    return (
        <>
            <section>
                <div className="container">
                    <div className="row py-4 gy-md-4 gy-3">
                        {/* heading tittle start */}
                        <div className="col-xl-12 text-center d-flex justify-content-center align-items-center flex-column">
                            <div className='tittle-box'>
                                <div className='deco-img d-none d-md-block'>
                                    <img src={DecorationImg} alt="icon" />
                                </div>
                                <h1 className='mb-2 fw-bold '>Our Expertise & Approach</h1>
                            </div>
                            <p className='section-heading'>We Cover Both Tech & Non-Tech Verticals</p>
                        </div>
                        {/* heading tittle end */}
                        <div className="col-xl-12 mt-1">
                            <h5 className='text-center'>Our curriculum is carefully curated by experts from IITs, IIMs, NITs, and top MNCs, ensuring it meets current industry needs.</h5>
                        </div>
                        <div className="col-xl-12">
                            <div className="row gy-3 gy-md-0">
                                <div className="col-md-6">
                                    <div className="card border-0 h-100" style={{backgroundColor:"#f1f9fc"}}>
                                        <div className="card-body pb-0">
                                            <h4>Technical Tracks Include</h4>
                                            <div className='mt-4'>
                                                <ul className='technical-tracks'>
                                                    <li className='d-flex align-items-center gap-2'><span><img src={TrMark} alt="image" className='img-fluid' /></span><span> Web Development (MERN, MEAN)</span></li>
                                                    <li className='d-flex align-items-center gap-2'><span><img src={TrMark} alt="image" className='img-fluid' /></span><span> Cybersecurity Fundamentals</span></li>
                                                    <li className='d-flex align-items-center gap-2'><span><img src={TrMark} alt="image" className='img-fluid' /></span><span> Data Analytics & AI/ML</span></li>
                                                    <li className='d-flex align-items-center gap-2'><span><img src={TrMark} alt="image" className='img-fluid' /></span><span>  Cloud Computing, and more</span></li>
                                                    <li className='d-flex align-items-center gap-2'><span><img src={TrMark} alt="image" className='img-fluid' /></span><span> IoT</span></li>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                
                                </div>
                                <div className="col-md-6">
                                <div className="card border-0 h-100" style={{
                                        backgroundColor:"#fdf7f3"
                                    }}>
                                             <div className="card-body pb-0">
                                            <h4>Non-Technical Tracks Include</h4>
                                            <div className='mt-4'>
                                                <ul className='technical-tracks'>
                                                    <li className='d-flex align-items-center gap-2'><span><img src={TrMark} alt="image" className='img-fluid' /></span><span> Soft Skills & Communication</span></li>
                                                    <li className='d-flex align-items-center gap-2'><span><img src={TrMark} alt="image" className='img-fluid' /></span><span>  Digital Tools (MS Office, Google Workspace)</span></li>
                                                    <li className='d-flex align-items-center gap-2'><span><img src={TrMark} alt="image" className='img-fluid' /></span><span> Social Media Management & Branding</span></li>
                                                    <li className='d-flex align-items-center gap-2'><span><img src={TrMark} alt="image" className='img-fluid' /></span><span>  Entrepreneurship & Business Basics</span></li>
                                                
                                                </ul>
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

export default ExpertiseApproach