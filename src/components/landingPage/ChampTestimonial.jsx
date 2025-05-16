import React from 'react'
import BtnImg from '../../../src/assets/img/quad-champs/button-img/book-icon.png'
import TestiImg from '../../assets/img/quad-champs/into-video/testi-img-1.png'
import TestiImg2 from '../../assets/img/quad-champs/into-video/testi-img-2.png'
import SectiontittleImg from '../../assets/img/quad-champs/about/section-tittle-img.png'
import AboutCallImg from '../../assets/img/quad-champs/about/about-call.png'
import AboutcheckIcon from '../../assets/img/quad-champs/about/about-icon.png'
import TestiShape1 from '../../assets/img/quad-champs/into-video/testi-shape1.png'
import TestiShape2 from '../../assets/img/quad-champs/into-video/testi-like.png'

import ChamptesitimonialCard from './ChamptesitimonialCard'

function ChampTestimonial() {
    return (
        <>
            <section className='champ-testimonial'>
                <div className="container ">
                    <div className="row align-items-center gy-5">
                        <div className="col-lg-6  position-relative hover-img-box">
                            <div className='testi-shape1'>
                                <img src={TestiShape1} alt="shape1" className='rotate-animation ' />
                            </div>
                             <div className='testi-shape2'>
                                <img src={TestiShape2} alt="shape1" className='flip' />
                            </div>
                            <div className='test-img'>
                                <img src={TestiImg2} alt="about-img" className='img-fluid top-bottom' />
                            </div>
                            <div className='hover-effect-img'>
                                <img src={TestiImg} alt="about-img" className='img-fluid' />
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className='d-flex flex-column align-items-center align-items-lg-start'>
                                <div><span><img src={SectiontittleImg} alt="book-icon" className='img-fluid me-1' /></span><span className='about-txt'>TESTIMONIAL</span></div>
                                <h1 className='mt-3 text-center text-lg-start'>Real Experiences From Our
                                    Dedicated Learners</h1>

                            </div>
                            <ChamptesitimonialCard />





                            {/*                             
                            <div className="row mt-4 gy-3">
                                <div className="col-xl-12">
                                    <div className=" champ-testimonial-card ">
                                        <div className='d-flex gap-2  align-items-center'>
                                            <div><img src={TestiquotesImg} alt="quotes" /></div>
                                            <h4 className='mb-0'>Impresive Learning!</h4>
                                        </div>
                                        <p className='mt-4'> Educate the ultimate destination for knowledge seekers and
                                            educators we are committed to transforming special education
                                            impact global channels without standards compliant systems
                                            attractive learning opinions.</p>
                                    </div>
                                    <div className='d-flex gap-3 align-items-center'>
                                        <div className='champ-testi-profile-box'>
                                            <img src={TestiprofileImg} alt="image" />
                                        </div>
                                        <div>
                                            <h5 className='mb-0'>Anjelina</h5>
                                            <p className='mb-0'>Student</p>
                                        </div>
                                    </div>
                                </div>

                            </div> */}

                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default ChampTestimonial