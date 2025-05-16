import React from 'react'
import BtnImg from '../../../src/assets/img/quad-champs/button-img/book-icon.png'
import AboutImg from '../../assets/img/quad-champs/about/about2.png'
import AboutImg2 from '../../assets/img/quad-champs/about/about.png'
import SectiontittleImg from '../../assets/img/quad-champs/about/section-tittle-img.png'
import AboutCallImg from '../../assets/img/quad-champs/about/about-call.png'
import AboutcheckIcon from '../../assets/img/quad-champs/about/about-icon.png'

function ChampAboutus() {
  return (
    <>
      <section className=' about-bg'>
        <div className="container">
          <div className="row align-items-center gy-5">
            <div className="col-lg-6  position-relative d-flex justify-content-center hover-img-box">
              <div className='about-sec-img'>
                <img src={AboutImg} alt="about-img" className='img-fluid top-bottom' />
              </div>
             <div className='hover-effect-img'>
               <img src={AboutImg2} alt="about-img" className='img-fluid' />
             </div>
            </div>

            <div className="col-lg-6">
              <div className='d-flex flex-column align-items-center align-items-lg-start'>
                <div><span><img src={SectiontittleImg} alt="book-icon" className='img-fluid me-1' /></span><span className='about-txt'>About us</span></div>
                <h1 className='mt-3 text-center text-lg-start'>Who We Are – Introduction to Educate Online Platform</h1>
              </div>
              <div className="row mt-4 gy-3">
                <div className="col-xl-6">
                  <div className="about-card-1  border-0 h-100">
                    <h4>Our Mission</h4>
                    <p className='fs-15'>Educate the ultimate destination transforming to education best educational environment</p>
                    <ul className='mt-4'>
                      <li><span><img src={AboutcheckIcon} alt="icon" className='me-2' /></span>Quick Learning System</li>
                      <li><span><img src={AboutcheckIcon} alt="icon" className='me-2' /></span>Super Fast Online Platform</li>
                      <li><span><img src={AboutcheckIcon} alt="icon" className='me-2' /></span>Weekly Assignments</li>
                    </ul>

                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="about-card-2  border-0 h-100">
                    <h1>6<span>k+</span></h1>
                    <p className='mt-2'>Enrolled Students all
                      Over the World</p>
                    <div className='d-flex gap-1 mt-5 '>
                      <div>
                        <img src={AboutCallImg} alt="call-icon" className='img-fluid' />
                      </div>
                      <div>
                        <p className='mb-0'>Call Us Anytime</p>
                        <p className='fs-18'>+91 8888000000</p>
                      </div>

                    </div>



                  </div>
                </div>
              </div>
              {/* common btn start */}
              {/* <div className='champ-common-btn mt-3'>
                <span><img src={BtnImg} alt="immage" className='me-2' /></span><span className='btn-txt'>More About</span>
              </div> */}
              {/* common btn end */}
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default ChampAboutus