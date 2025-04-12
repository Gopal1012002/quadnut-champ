import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import quadNutLogo from '../../assets/img/quadnut.png'
import quadNutYellow from '../../assets/img/QuadNut-yellow.png'

function Footer({ companyData }) {
    return (<section className='footer-bg'>
        <div className="container-fluid px-3">
            <div className="row gy-3  px-3 pt-4">
                <div className="col-lg-3 col-md-6 ">
                    <div className='d-flex justify-content-start align-items-center mb-3'>
                        <div className="logo-home-2">
                            <img src={quadNutYellow} alt="QuadNut Logo" />
                        </div>
                        <p className="quadnut-title mb-0 clickable-btn text-white"> {companyData?.websiteName} </p>
                    </div> 
                    {/* about description */}
                    <div className='mb-3'>
                        <p className='mb-0 fs-14 para-align-justify text-white'> {companyData?.description} </p>
                    </div>
                    <div>
                        <h5 className='fw-bold mb-3 text-white'>Let Get Social</h5>
                        <div className='d-flex gap-3'>
                            <a className='social-media-box clickable-btn' target='_blank' href={`https://${companyData?.linkedin}`}><i className="fa-brands fa-linkedin"></i></a>
                            <a className='social-media-box clickable-btn' target='_blank' href={`https://${companyData?.twitter}`}><i className="fa-brands fa-twitter"></i></a>
                            <a className='social-media-box clickable-btn' target='_blank' href={`https://${companyData?.instagram}`}><i className="fa-brands fa-instagram"></i></a>
                            <a className='social-media-box clickable-btn' target='_blank' href={`https://${companyData?.youtube}`}><i className="fa-brands fa-youtube"></i></a>
                        </div> 
                    </div>
                </div> 
                <div className="col-lg-3 col-md-6 d-flex justify-content-md-center ">
                    <ul className='footer-links'>
                        <li><h5 className='fw-bold'>Company</h5></li>
                        <li><Link to={'/about-us'}><span><i className="fa-solid fa-arrow-right me-1"></i></span>About Us</Link></li>
                        <li><Link to={'/career-page'}><span><i className="fa-solid fa-arrow-right me-1"></i></span>Career</Link></li>
                        <li><Link to={'/updates'}><span><i className="fa-solid fa-arrow-right me-1"></i></span>Updates</Link></li>
                        <li><Link to={'/contact-us'}><span><i className="fa-solid fa-arrow-right me-1"></i></span>Contact Us</Link></li>
                        <li><Link to={'/account-deletion-policy'}><span><i className="fa-solid fa-arrow-right me-1"></i></span>Account Deletion</Link></li>
                    </ul>
                </div>
                <div className="col-lg-3 col-md-6 d-flex justify-content-lg-center">
                    <ul className='footer-links'>
                        <li><h5 className='fw-bold'>Quick Links</h5></li>
                        <li><Link  to={'/quadnut-store'}><span><i className="fa-solid fa-arrow-right me-1"></i></span>Store</Link></li>
                        <li><Link  to={'/live-classes'}><span><i className="fa-solid fa-arrow-right me-1"></i></span>Lives Classes</Link></li>
                        <li><Link  to={'/course-list'}><span><i className="fa-solid fa-arrow-right me-1"></i></span>Video Courses</Link></li>
                        <li><Link  to={'/upcoming-batches'}><span><i className="fa-solid fa-arrow-right me-1"></i></span>Upcoming Batches</Link></li>
                        <li><Link  to={'/faq'}><span><i className="fa-solid fa-arrow-right me-1"></i></span>FAQ</Link></li>
                    </ul>

                </div>
                <div className="col-lg-3 col-md-6 d-flex justify-content-md-center">
                    <ul className='footer-links'>
                        <li><h5 className='fw-bold'>Connect With Us</h5></li>
                        <li><Link to=""><span><i className="fa-solid fa-envelope me-1"></i></span>Email Us : {companyData?.email}</Link></li>
                        <li><a target='_blank' href={`https://wa.me/${companyData?.whatsappNumber}`}><span><i className="fa-solid fa-phone me-1"></i></span>Talk to a Counsellor</a></li>

                    </ul>
                </div>
                <div className="col-xl-12 border-top py-2">
                    <div className="row">
                        <div className="col-xl-6 d-flex  align-items-center">
                            <div className="d-flex gap-2 align-items-center cond-links ">
                                <Link className="fs-14 text-white" target='_blank' to={'/privacy-policy'}>Privacy Policy</Link>
                                <div className="vl"></div>
                                <Link className="fs-14 text-white" target='_blank' to={'/terms-and-conditions'}>Terms & Conditions</Link>
                                <div className="vl"></div>
                                <Link className="fs-14 text-white"   to={'/refund-policy'}>Refund Policy</Link>
                            </div>
                        </div>
                        <div className="col-xl-6  text-center text-md-end">
                            <div className="fs-14 text-white"> {companyData?.copyright} </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </section>
    )
}

export default Footer