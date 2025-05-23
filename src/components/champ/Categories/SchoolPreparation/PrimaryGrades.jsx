import React from 'react'
// import { Link } from 'react-router-dom';
// import HeroImg2 from '../../../assets/img/mock-test-2.png'
import BtnImg from '../../../../../src/assets/img/quad-champs/button-img/book-icon.png'
import PrimaryGradeImg from '../../../../assets/img/quad-champs/classes/6to7.png'
import SyllabusIcon from '../../../../assets/img/quad-champs/classes/checklist.png'
import foundationalIcon from '../../../../assets/img/quad-champs/classes/learning.png'
import PerformanceIcon from '../../../../assets/img/quad-champs/classes/performance.png'
import { Link } from 'react-router-dom'
// import PerformanceIcon from '../../../assets/img/quad-champs/classes/checklist.png'
// import InsightIcon from '../../../assets/img/icon/insight.png'
// import FinancialPerformanceIcon from '../../../assets/img/icon/financial-performance.png'
// import ShapeImg from '../../../assets/img/icon/shape.png'

import SectiontittleImg from '../../../../assets/img/quad-champs/about/section-tittle-img.png'
import KeyShape1 from '../../../../../src/assets/img/quad-champs/into-video/activite-shape2.png'
const PrimaryGrades = () => {
  return (
    <section className='py-5'>
      <div className="container  mocktest primary-grade">

        <div className="row align-items-center">
          <div className="col-lg-6 text-center hover-img-box">

            <div className="hover-effect-img">
              <img
                src={PrimaryGradeImg}
                alt="Strong Foundations for Grades 3 to 7 "
                className="img-fluid rounded w-75"
              />
            </div>
          </div>

          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className='d-flex flex-column align-items-center align-items-lg-start'>
              <div><span><img src={SectiontittleImg} alt="book-icon" className='img-fluid me-1' /></span><span className='about-txt'>Primary Grades</span></div>
              <h1 className='mt-3 text-center text-lg-start'>Strong Foundations for Primary Grades (3rd to 7th)</h1>
            </div>
            <p className=" description">
              We offer carefully curated batches that align with the school's syllabus while enhancing core understanding. These sessions ensure syllabus completion in a timely manner while introducing concept boosters that help young learners develop confidence and curiosity.
            </p>

            {/* Feature List */}
            <ul className="list-unstyled mt-4">
              <li className="item mb-2 d-flex justify-content-start">
                <div class="icon-box">
                  <img src={SyllabusIcon} alt="icon" />
                </div>
                <div class="item-content">
                  <h6>Full syllabus coverage across all subjects</h6>
                </div>
              </li>
              <li className="item mb-2 d-flex justify-content-start">
                <div class="icon-box">
                  <img src={foundationalIcon} alt="icon" />
                </div>
                <div class="item-content">
                  <h6>Strengthening foundational understanding</h6>
                </div>
              </li>
              <li className="item mb-2 d-flex justify-content-start">
                <div class="icon-box">
                  <img src={PerformanceIcon} alt="icon" />
                </div>
                <div class="item-content">
                  <h6>School-integrated batches tailored for academic improvement</h6>
                </div>
              </li>


            </ul>

           
          </div>

        </div>
      </div>
    </section>

  )
}

export default PrimaryGrades






