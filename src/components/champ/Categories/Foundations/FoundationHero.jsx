import React from 'react'
import HeroImg from '../../../../assets/img/quad-champs/classes/hero.png'
import Shape1 from '../../../../assets/img/landing-page/tr-hero-shape1.png'
import Shape2 from '../../../../assets/img/landing-page/tr-hero-shape2.png'

function FoundationHero() {
  return (
    <>
         <section>
                   <div className="container-fluid px-0">
                       <div className="foundation-bg">
                           <div className="row">
                               <div className="col-lg-12 col-xl-7 d-flex flex-column  justify-content-center">
                                   <div className='mt-md-3 fw-bold tr-hero-heading'>
                                       <h1 className='text-center text-lg-start'>Board Excellence Meets Competitive 
                                          Exam Readiness <span className='foundation-hero-txt-decoration'>(Grades 8 to 10)</span></h1>
                                   </div>
                                   <div>
                                       <p className='text-center text-lg-start'>The Foundation program at QuadNut Champs is crafted for students of Classes 8 to 10, acting as a launchpad for both academic excellence and early preparation for top competitive exams like <b>IIT-JEE, NEET, and CUET</b>. This program bridges school-level learning with future-ready competitive frameworks.</p>
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

export default FoundationHero