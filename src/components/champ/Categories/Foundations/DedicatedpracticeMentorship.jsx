import React from 'react'
import AboutImg from '../../../../assets/img/quad-champs/about/about2.png'
import AboutImg2 from '../../../../assets/img/quad-champs/foundation/foundation-mentorship.png'
import SectiontittleImg from '../../../../assets/img/quad-champs/about/section-tittle-img.png'
import AboutcheckIcon from '../../../../assets/img/quad-champs/about/about-icon.png'
import Head from "../../../../layouts/main-layout/head/Head"

function DedicatedpracticeMentorship() {
  return (
    <>
    <Head title='Foundation '/>

      <section className='py-md-5 pb-5' >
        <div className="container">
          <div className="row align-items-center gy-5">
            <div className="col-xl-5  position-relative d-flex justify-content-center hover-img-box">
              {/* <div className='about-sec-img img-2'>
                <img  src={AboutImg}  alt="about-img" className='img-fluid top-bottom' />
              </div> */}
              <div className='hover-effect-img img-1'>
                <img src={AboutImg2} alt="about-img" className='img-fluid' />
              </div>
            </div>

            <div className="col-xl-7 px-md-4">
              <div className='d-flex flex-column align-items-center align-items-xl-start'>
                <div><span><img src={SectiontittleImg} alt="book-icon" className='img-fluid me-1' /></span><span className='about-txt'>Dedicated Practice Mentorship</span></div>
                <p className='mt-3 text-center text-xl-start'>A unique element of this program is the Practice-Focused Faculty—an educator solely assigned to train students on solving problems aligned with JEE, NEET, and CUET levels. This ensures consistent reinforcement through practice and strategic guidance.</p>
              </div>
              <div className="row mt-4 gy-3">
                <div className="col-xl-6">
                  <div className="about-card-1  border-0 h-100">
                    <h5 className='lh-base'>Performance Tracking & Competitive Edge</h5>
                    <ul className='mt-4'>
                      <li className='pb-3 d-flex gap-1'><div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>All India Monthly Test: Benchmark your performance with nationwide peers Series</div></li>
                      <li className='pb-3 d-flex gap-1'><div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>Data-Driven Analysis: Detailed test feedback to assess strengths and identify improvement areas</div></li>
                      <li className='pb-3 d-flex gap-1'><div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>One-on-One Mentoring: Personalized attention and strategic feedback from assigned mentors</div></li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="about-card-1 our-vision  border-0 h-100">
                    <h5 className='lh-base'>Full Academic Ecosystem Support</h5>
                    <ul className='mt-4'>
                      <li className='d-flex gap-1 pb-3'><div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>Daily Practice Papers (DPPs) for routine strengthening</div></li>
                       <li className='d-flex gap-1 pb-3'><div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>Doubt resolution with real-time support</div></li>
                       <li className='d-flex gap-1 pb-3'><div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>Dedicated personal guidance for motivation and consistency</div></li>
                    </ul>

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

export default DedicatedpracticeMentorship