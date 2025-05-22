import React from 'react'

// import HeroImg2 from '../../../assets/img/mock-test-2.png'
import PrimaryGradeImg from '../../../assets/img/quad-champs/classes/8to12.png'
import SyllabusIcon from '../../../assets/img/quad-champs/classes/checklist.png'
import foundationalIcon from '../../../assets/img/quad-champs/classes/learning.png'
import PerformanceIcon from '../../../assets/img/quad-champs/classes/performance.png'

import BtnImg from '../../../../src/assets/img/quad-champs/button-img/book-icon.png'
import IntroImg from '../../../assets/img/quad-champs/into-video/intro-video-1.png'
import SectiontittleImg from '../../../assets/img/quad-champs/about/section-tittle-img.png'
import AboutcheckIcon from '../../../assets/img/quad-champs/about/about-icon.png'
import IntoshapeImg1 from '../../../assets/img/quad-champs/into-video/activite-shape3.png'
import { Link } from 'react-router-dom'

const SeniorGrades = () => {
  return (
    <section className='py-5'>
      <div className="container">
        <div className="row">
           <div className="col-xl-12 mb-3 text-center d-flex justify-content-center align-items-center flex-column">
          <div className='tittle-box'>
            <div className='deco-img d-none d-md-flex'>
              {/* <img src={ ShapeImg } alt="icon" /> */}
            </div>
            <h1 className='mb-2 fw-bold '>Focused Learning for Senior Grades (8–12)</h1>
          </div>

          <p className='section-heading'>Precision-driven batches for board exam success and competitive exam readiness.</p>

        </div>
        </div>
        <div className="row algin-items-center">
          <div className="col-lg-6">
            <div className='d-flex flex-column align-items-center align-items-lg-start'>
            
              <p className='mt-md-3 text-center text-lg-start description'>Our advanced batches focus on school board preparation (CBSE, ICSE, and State Boards) while simultaneously equipping students to perform well in competitive assessments like Olympiads and NTSE.</p>
              
              <ul className='mt-lg-2'>
                <li className='pb-3 d-flex algin-item-center justify-content-start gap-1'><div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><h6>Board-focused learning with syllabus precision</h6></li>
                <li className='pb-3 d-flex algin-item-center justify-content-start gap-1'><div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><h6>Competitive exam readiness (NTSE, Olympiads)</h6></li>
                <li className='pb-3 d-flex algin-item-center justify-content-start gap-1'><div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><h6>Subject-specific deep-dives for enhanced conceptual clarity</h6></li>
              </ul>
            </div>
            {/* common btn start */}
            <div className='w-100  d-flex justify-content-center justify-content-lg-start'>
              <div className='champ-common-btn mt-3'>
                <Link to="/course-list">
                  <span><img src={BtnImg} alt="immage" className='me-2' /></span><span className='btn-txt'>Get Started</span>
                </Link>
              </div>
            </div>
            {/* common btn end */}
          </div>
          <div className="col-lg-6   hover-img-box">
           
            <div className='hover-effect-img'>
              <img src={PrimaryGradeImg} alt="about-img" className='img-fluid w-75' />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SeniorGrades






