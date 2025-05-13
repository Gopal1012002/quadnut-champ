import React from 'react'
import CommitQuality from '../../../assets/img/landing-page/commit-quality.png'
import QualityImg1 from '../../../assets/img/landing-page/quality-img1.png'
import QualityImg2 from '../../../assets/img/landing-page/quality-img2.png'
import QualityImg3 from '../../../assets/img/landing-page/quality-img3.png'
import QualityImg4 from '../../../assets/img/landing-page/quality-img4.png'
import QualityImg5 from '../../../assets/img/landing-page/quality-img5.png'
import QualityImg from '../../../assets/img/landing-page/quality-box-img.png'
import DecorationImg from '../../../assets/img/landing-page/shape.png'
import Head from '../../../layouts/main-layout/head/Head'

function Quality() {
  return (
    <>
      <Head title="Commitment To Quality" />
      <section className='p-4 py-5'>
        <div className="container commit-sec">
          <div className="row gy-4 commit-quality commit-sec">
            {/* heading tittle start */}
            <div className="col-xl-12 text-center d-flex justify-content-center align-items-center flex-column">
              <div className='tittle-box'>
                <div className='deco-img'>
                  <img src={DecorationImg} alt="icon" />
                </div>
                <h1 className='mb-2 fw-bold'>Commitment to Quality</h1>
              </div>

              <p>Committed to Quality. Dedicated to You</p>
            </div>
            {/* heading tittle end */}
            <div className="col-lg-6">
              <img src={CommitQuality} alt="image" className='img-fluid' />
            </div>
            <div className="col-lg-6 pt-md-5">
              <div className=''>
                <p className='mb-2 para-align-justify'>At QUADNUT, quality is at the core of everything we do. We are dedicated to delivering exceptional training and development programs that meet the highest standards of excellence, ensuring every participant gains a truly transformative learning experience.</p>
                <p className='mb-2 para-align-justify'>Each of our courses is meticulously designed and curated by a team of industry experts, academicians from prestigious institutions like IITs and NITs, and seasoned professionals from leading MNCs. This ensures that our programs are not only academically rigorous but also deeply practical and aligned with the latest industry trends.</p>
                <p className='mb-0 para-align-justify'>Our commitment to quality reflects in every aspect of our training:</p>
              </div>
              <div className='about-list d-flex flex-column flex-md-row gap-md-5 gap-3 pt-3'>
                <ul className=''>
                  <li className='fw-bold'>In-Depth Knowledge</li>
                  <li className='fw-bold mt-3'>Hands-On Learning</li>
                </ul>
                <ul className=''>
                  <li className='fw-bold'>Actionable Insights</li>
                  <li className='fw-bold mt-3'>Continuous Improvement</li>
                </ul>
              </div>
              <div className='mt-4'>
                <button type="submit" class="btn px-4 schedule-btn py-2 border-0">Let's Start</button>
              </div>
            </div>
            <div className="col-xl-12">

              <div className=' w-100'>
                <div className="row">
                  <div className="col-xl-9 commit-bg">
                    <div className="row py-5 px-3 gy-lg-5 gy-3 ">
                      <div className="col-md-6 d-flex flex-column flex-md-row align-items-center justify-content-center gap-3">
                        <div><img src={QualityImg1} alt="icon" style={{ width: "80px" }} /></div>
                        <div className=''>
                          <h5 className='text-white text-md-start text-center'>In-Depth Knowledge</h5>
                          <p className='text-white fs-14 text-md-start text-center'>Our curriculum dives deep into concepts, ensuring learners gain a solid theoretical foundation.</p>
                        </div>
                      </div>
                      <div className="col-md-6 d-flex flex-column flex-md-row align-items-center justify-content-center gap-3">
                        <div><img src={QualityImg2} alt="icon" style={{ width: "80px" }} /></div>
                        <div className=''>
                          <h5 className='text-white text-md-start text-center'>Hands-On Learning</h5>
                          <p className='text-white fs-14 text-md-start text-center'>We emphasize practical exposure with real-world projects, case studies, and simulations to prepare participants for real challenges..</p>
                        </div>
                      </div>
                      <div className="col-md-6 d-flex flex-column flex-md-row align-items-center justify-content-center gap-3">
                        <div><img src={QualityImg3} alt="icon" style={{ width: "80px" }} /></div>

                        <div className=''>
                          <h5 className='text-white text-md-start text-center'>Actionable Insights</h5>
                          <p className='text-white fs-14 text-md-start text-center'>Our programs focus on equipping learners with skills and strategies they can immediately apply in their academic or professional pursuits..</p>
                        </div>
                      </div>
                      <div className="col-md-6 d-flex flex-column flex-md-row align-items-center justify-content-center gap-3">
                        <div><img src={QualityImg4} alt="icon" style={{ width: "80px" }} /></div>

                        <div className=''>
                          <h5 className='text-white text-md-start text-center'>Continuous Improvement</h5>
                          <p className='text-white fs-14 text-md-start text-center'> We consistently update our course content and methodologies, incorporating feedback from learners and staying ahead of industry advancements.</p>
                        </div>
                      </div>


                      {/* <div className="col-md-6 d-flex gap-3 align-items-center ">
                        <div><img src={QualityImg5} alt="icon" style={{ width: "80px" }} /></div>

                        <div className=''>
                          <h5 className='text-white'>Global Relevance</h5>
                          <p className='text-white fs-14'> By benchmarking against international standards, we ensure our training is competitive on a global scale while being locally applicable.</p>
                        </div>
                      </div> */}


                    </div>
                  </div>
                  <div className="col-lg-3  d-none d-xl-block ">
                  <div className='w-100 h-100 d-flex justify-content-center align-items-center border'>
                    <img src={QualityImg} alt="image" className='img-fluid ' />
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

export default Quality