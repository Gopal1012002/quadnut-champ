import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BtnImg from '../../../src/assets/img/quad-champs/button-img/book-icon.png'
import HeroImg from '../../../src/assets/img/quad-champs/hero-section/hero-main-img.png'
import Heroshape1 from '../../../src/assets/img/quad-champs/hero-section/hero-shape-1.png'
import Heroshape2 from '../../../src/assets/img/quad-champs/hero-section/hero-shape-5.png'
import Heroshape3 from '../../../src/assets/img/quad-champs/hero-section/hero-shape-2.png'
import Heroshape4 from '../../../src/assets/img/quad-champs/hero-section/hero-shape-4.png'



function Hero() {
  return (
    <>
      {/* hero-section */}
      <section className='champs-hero'>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className='champ-hero-content position-relative  '>
                <div className='champ-hero-shape3'>
                  <img src={Heroshape3} alt="icon" className='float ' />
                </div>
                <h1 className='text-center text-lg-start'>Empowering Students <br />from 3rd to 12th Grade with <br />Quality Education</h1>
                <p className='text-center text-lg-start'>Brief description of QuadNut Champs and its offerings (Live tuition, Recorded courses, Olympiad training, etc.)</p>
              </div>
              <div className='w-100  d-flex justify-content-center justify-content-lg-start'>
                  <div className='champ-common-btn '>
                <Link to="/course-list"><span><img src={BtnImg} alt="immage" className='me-2' /></span><span className='btn-txt'>GET STARTED</span></Link>
              </div>
              </div>
            
            </div>
            {/* hero image */}
            <div className="col-lg-5 d-flex justify-content-center hero-img-section position-relative ">
              <div className='champ-hero-shape1'>
                <img src={Heroshape1} alt="icon" className='rotate-animation ' />
              </div>
              <div className='champ-hero-shape2'>
                <img src={Heroshape2} alt="icon" className='left-right' />
              </div>
              <div className='champ-hero-shape4'>
                <img src={Heroshape4} alt="icon" className='top-bottom' />
              </div>
              <img src={HeroImg} alt="image" className='img-fluid hero-main-img' />
            </div>
          </div>
        </div>



      </section>

    </>
  )
}

export default Hero