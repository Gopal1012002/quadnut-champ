import React from 'react'
import DecorationImg from "../../../assets/img/landing-page/shape.png";
import CallIcon from '../../../assets/img/landing-page/call-icon.png'
import CallArrow from '../../../assets/img/landing-page/call-arrow.png'

function Collaborate() {
    return (
        <>
            <section className='py-5'>
                <div className="container">
                    <div className="row py-md-5 gy-md-4 gy-3">
                        <div className="col-xl-12">
                            <div className="row align-items-center call-to-bg gy-5 gy-lg-0  py-4 px-3">
                                <div className='col-xl-5 col-lg-4'>
                                    <div className='call-to-title text-center text-lg-start'>
                                        <h3> Let's Collaborate</h3>
                                        <h3> For Colleges & Universities</h3>

                                    </div>

                                </div>
                                <div className='col-xl-4 col-lg-4'>
                                    <div className='call-to-wrapper'>
                                        <div className='call-to-box'>
                                            <div className='call-to-icon'>
                                                <img src={CallIcon} alt="icon" />

                                            </div>
                                            <div className='call-to-content'>
                                                <h6 className='mb-2'>Call Anytime</h6>
                                                <h4 className='mb-1'>+91 8887888294</h4>
                                                <h4>+91 8175051739</h4>
                                            </div>
                                            <div className='call-to-arrow'>
                                                <img src={CallArrow} alt="icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-xl-3 col-lg-4'>
                                    <div className="card border-0 py-4 px-2 text-center mb-0">
                                        <h6 className=''>Ready to Upskill Your Students?</h6>
                                        <h6 className='mb-2'>Let’s Build the Future, Together</h6>
                                        <p className='mb-2'><span><i class="fa-solid fa-envelope me-2" style={{
                                            fontSize:"19px"
                                        }}></i></span><a href="mailto:info@quadnut.org ">info@quadnut.org</a></p>
                                        <p className='mb-0'><span><i class="fa-solid fa-globe me-2" style={{
                                            fontSize:"20px"
                                        }}></i></span><a href="https://quadnut.org/" target='_blank'> www.quadnut.org</a></p>

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

export default Collaborate