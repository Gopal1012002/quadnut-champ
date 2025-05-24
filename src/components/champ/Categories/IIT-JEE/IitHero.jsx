import React from 'react'
import HeroImg from '../../../../assets/img/quad-champs/classes/hero.png'
import Shape1 from '../../../../assets/img/landing-page/tr-hero-shape1.png'
import Shape2 from '../../../../assets/img/landing-page/tr-hero-shape2.png'

function IitHero() {
    return (
        <>
            <section>
                <div className="container-fluid px-0">
                    <div className="iit-jee-bg">
                        <div className="row">
                            <div className="col-lg-12 col-xl-7 d-flex flex-column  justify-content-center">
                                <div className='mt-md-3 fw-bold'>
                                    <h1 className='text-center text-xl-start'>Cracking India’s Toughest Exams with the Right Strategy and Support</h1>
                                </div>
                                <div>
                                    <p className='text-center text-xl-start'>At QuadNut Champs, we understand the immense pressure and preparation required to succeed in India’s most competitive exams—IIT JEE and NEET. Our specialized program is built to guide students of Classes 11 and 12 through a structured, high-intensity journey that not only equips them with academic mastery but also supports their mental resilience and clarity of purpose.</p>
                                </div>
                            </div>
                            {/* <div className="col-lg-5  d-flex justify-content-center">
                                   <div className='tr-hero-box'>
                                       <div className='tr-hero-shape-box hero-shape2'>
                                           <img src={Shape2} alt="shape-icon" className='img-fluid' />
                                       </div>
                                       <img src={HeroImg} alt="image" className='img-fluid' style={{ width: "470px" }} />
                                   </div>
                               </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default IitHero