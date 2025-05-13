import React from 'react'
import HeroImg2 from './img/mock-test-2.png'
import ReportIcon from './img/icon/report.png'
import AnalysisIcon from './img/icon/analysis.png'
import PerformanceIcon from './img/icon/performance.png'
import InsightIcon from './img/icon/insight.png'
import FinancialPerformanceIcon from './img/icon/financial-performance.png'
import ShapeImg from './img/icon/shape.png'
const WhatMockTest = () => {
  return (
    <div className="container py-5 mocktest">

      <div className="row align-items-center">
        <div className="col-xl-12 mb-3 text-center d-flex justify-content-center align-items-center flex-column">
          <div className='tittle-box'>
            <div className='deco-img d-none d-md-flex'>
              <img src={ ShapeImg } alt="icon" />
            </div>
            <h1 className='mb-2 fw-bold '>QuadNut Mock Test Section</h1>
          </div>

          <p className='section-heading'>What is the QuadNut Mock Test Section?</p>

        </div>

        <div className="col-lg-6 text-center">
          <img
            src={HeroImg2}
            alt="Mock Test "
            className="img-fluid rounded"
          />
        </div>

        <div className="col-lg-6 mb-4 mb-lg-0">

          <p className="text-muted description">
            This section is designed solely for practice and performance evaluation across various domains
            including Tech, Non-Tech, and Academic Competitive Exams like <strong>JEE, NEET, NTSE, Olympiads</strong>, etc.
            Whether you're preparing for a coding course or brushing up on reasoning skills, our central-level mock tests offer:
          </p>

          {/* Feature List */}
          <ul className="list-unstyled mt-4">
            <li className="item mb-2 d-flex justify-content-start">
              <div class="icon-box">
                <img src={ReportIcon} alt="icon" />
              </div>
              <div class="item-content">
                <h6>Detailed Evaluation Reports</h6>
              </div>
            </li>
            <li className="item mb-2 d-flex justify-content-start">
              <div class="icon-box">
                <img src={AnalysisIcon} alt="icon" />
              </div>
              <div class="item-content">
                <h6>Ranking Analysis (National Level)</h6>
              </div>
            </li>
            <li className="item mb-2 d-flex justify-content-start">
              <div class="icon-box">
                <img src={PerformanceIcon} alt="icon" />
              </div>
              <div class="item-content">
                <h6>Performance Breakdown by Section</h6>
              </div>
            </li>
            <li className="item mb-2 d-flex justify-content-start">
              <div class="icon-box">
                <img src={InsightIcon} alt="icon" />
              </div>
              <div class="item-content">
                <h6>Strength/Weakness Insights</h6>
              </div>
            </li>
            <li className="item mb-2 d-flex justify-content-start">
              <div class="icon-box">
                <img src={FinancialPerformanceIcon} alt="icon" />
              </div>
              <div class="item-content">
                <h6>Earn QuadCoins Based on Performance</h6>
              </div>
            </li>

          </ul>

          <button className="btn btn-box px-4 mt-3 btn-custom">Start Practicing</button>
        </div>

      </div>
    </div>
  )
}

export default WhatMockTest






