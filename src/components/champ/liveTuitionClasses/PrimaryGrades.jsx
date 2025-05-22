import React from 'react'
// import { Link } from 'react-router-dom';
// import HeroImg2 from '../../../assets/img/mock-test-2.png'
import BtnImg from '../../../../src/assets/img/quad-champs/button-img/book-icon.png'
import PrimaryGradeImg from '../../../assets/img/quad-champs/classes/6to7.png'
import SyllabusIcon from '../../../assets/img/quad-champs/classes/checklist.png'
import foundationalIcon from '../../../assets/img/quad-champs/classes/learning.png'
import PerformanceIcon from '../../../assets/img/quad-champs/classes/performance.png'
import { Link } from 'react-router-dom'
// import PerformanceIcon from '../../../assets/img/quad-champs/classes/checklist.png'
// import InsightIcon from '../../../assets/img/icon/insight.png'
// import FinancialPerformanceIcon from '../../../assets/img/icon/financial-performance.png'
// import ShapeImg from '../../../assets/img/icon/shape.png'
const PrimaryGrades = () => {
  return (
    <div className="container py-5 mocktest primary-grade">

      <div className="row align-items-center">
        <div className="col-xl-12 mb-3 text-center d-flex justify-content-center align-items-center flex-column">
          <div className='tittle-box'>
            <div className='deco-img d-none d-md-flex'>
              {/* <img src={ ShapeImg } alt="icon" /> */}
            </div>
            <h1 className='mb-2 fw-bold '>Strong Foundations for Grades 3 to 7</h1>
          </div>

          <p className='section-heading'>Designed to match syllabus and spark confidence.</p>

        </div>

        <div className="col-lg-6 text-center">
          <img
            src={PrimaryGradeImg}
            alt="Strong Foundations for Grades 3 to 7 "
            className="img-fluid rounded w-75"
          />
        </div>

        <div className="col-lg-6 mb-4 mb-lg-0">

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

          <div className='w-100  d-flex justify-content-center justify-content-lg-start'>
            <div className='champ-common-btn mt-3'>
              <Link to="#">
                <span><img src={BtnImg} alt="immage" className='me-2' /></span><span className='btn-txt'>Enroll Today</span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default PrimaryGrades






