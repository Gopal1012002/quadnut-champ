import React from 'react'
import SectiontittleImg from '../../assets/img/quad-champs/about/section-tittle-img.png'
import FeaturesImg1 from '../../assets/img/quad-champs/into-video/features-img-1.png'
import FeaturesImg2 from '../../assets/img/quad-champs/into-video/features-img-2.png'
import AboutcheckIcon from '../../assets/img/quad-champs/about/about-icon.png'
import BtnImg from '../../../src/assets/img/quad-champs/button-img/book-icon.png'
import KeyShape1 from '../../../src/assets/img/quad-champs/into-video/activite-shape2.png'

function ChampkeyFeatures() {
    return (
        <>
            <section className='champ-key-features mt-5'>
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-xl-12 d-flex justify-content-center position-relative ">
                            <div className='key-shape1'>
                                <img src={KeyShape1} alt="shape" className='img-fluid zoom' />
                            </div>
                            <div className='w-75 d-flex justify-content-center flex-column align-items-center'>
                                <div>
                                    <span><img src={SectiontittleImg} alt="book-icon" className='img-fluid me-1' /></span><span className='about-txt'>Key Features</span>
                                </div>
                                <h2 className='text-center mt-2'>Unlock the essentials that set us apart
                                    For Our Little Learners</h2>
                            </div>



                        </div>
                        <div className="col-md-6 ">
                            <div className='features-box '>
                                <div className='features-img'>
                                    <img src={FeaturesImg1} alt="image" className='img-fluid' />
                                </div>
                                <div className=''>
                                    <h2 className='text-center text-xl-start'>Live Tuition Classes</h2>
                                    <ul className='mt-4'>
                                        <li className='pb-3 d-flex gap-1'><div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>Learning with Multimedia & Interactivity</div></li>
                                        <li className='pb-3 d-flex gap-1'><div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>Learning with Multimedia & Interactivity</div></li>
                                        <li className='pb-3 d-flex gap-1'><div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>Learning with Multimedia & Interactivity</div></li>
                                    </ul>
                                    <div className='w-100  d-flex justify-content-center justify-content-xl-start'>
                                        <div className='champ-btn-type2 mt-2'>
                                            <a href="#">
                                                Explore Features <span className='btn-txt'><i class="fa-solid fa-arrow-right"></i></span>
                                            </a>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-6 ">
                            <div className='features-box '>
                                <div className='features-img'>
                                    <img src={FeaturesImg2} alt="image" className='img-fluid' />
                                </div>
                                <div className=''>
                                    <h2 className='text-center text-xl-start'>Recorded Courses</h2>
                                    <ul className='mt-4'>
                                        <li className='pb-3 d-flex gap-1'><div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>Learning with Multimedia & Interactivity</div></li>
                                        <li className='pb-3 d-flex gap-1'><div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>Learning with Multimedia & Interactivity</div></li>
                                        <li className='pb-3 d-flex gap-1'><div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>Learning with Multimedia & Interactivity</div></li>
                                    </ul>
                                    <div className='w-100  d-flex justify-content-center justify-content-xl-start'>
                                        <div className='champ-btn-type2 mt-2'>
                                            <a href="#">
                                                Explore Features <span className='btn-txt'><i class="fa-solid fa-arrow-right"></i></span>
                                            </a>

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

export default ChampkeyFeatures