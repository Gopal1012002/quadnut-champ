import React from 'react'
import ShapeImg from './img/icon/shape.png'

import TimerIcon from './img/icon/timer.png'
import FeedbackIcon from './img/icon/feedback.png'
import BenchmarkIcon from './img/icon/benchmark.png'
import EarningIcon from './img/icon/earning.png'
import DiscountIcon from './img/icon/discount.png'
import WhymockImg from './img/why-mock-img.png'

const WhyMockTest = () => {
    return (
        <div className="container py-5 mocktest">

            <div className="row align-items-center">
                <div className="col-xl-12 mb-3 text-center d-flex justify-content-center align-items-center flex-column">
                    <div className='tittle-box'>
                        <div className='deco-img'>
                            <img src={ShapeImg} alt="icon" />
                        </div>
                        <h1 className='mb-2 fw-bold '>Why Take a Mock Test?</h1>
                    </div>

                    <p className='section-heading'>Boost Accuracy. Build Exam Confidence.</p>

                </div>

        
            </div>
            <div className="row align-items-start g-4 mt-4">
                <div className="col-lg-4 col-md-6 d-flex align-items-xl-end align-items-center flex-column">
                    <div className="mocktest-card">
                        <div className="content">
                            <p>Get a real exam simulation with time-bound tests
                            </p>
                        </div>
                        <div className="icon">
                            <img src={TimerIcon} alt="icon" />
                        </div>
                    </div>
                    <div className="mocktest-card type2">
                        <div className="content">
                            <p>Receive a personalized feedback report with detailed analytics
                            </p>
                        </div>
                        <div className="icon">
                            <img src={FeedbackIcon} alt="icon" />
                        </div>
                    </div>
                    {/* <div className="mocktest-card whymock3">
                        <div className="content">
                            <p>Benchmark yourself with an All-India Rank
                            </p>
                        </div>
                        <div className="icon">
                            <img src={BenchmarkIcon} alt="icon" />
                        </div>
                    </div> */}
                </div>
                <div className="col-lg-4 col-md-6 d-flex align-items-xl-start align-items-start flex-column">
                <img className='img-fluid' src={WhymockImg} alt="mock test" />   
                </div>

                <div className="col-lg-4 col-md-6 d-flex align-items-xl-start align-items-start flex-column">
                    <div className="mocktest-card">
                        
                        <div className="icon">
                            <img src={EarningIcon} alt="icon" />
                        </div>
                        <div className="content">
                            <p>Earn QuadCoins based on your accuracy and score

                            </p>
                        </div>
                    </div>
                    <div className="mocktest-card type3">
                       
                        <div className="icon">
                            <img src={DiscountIcon} alt="icon" />
                        </div>
                        <div className="content">
                            <p>Redeem QuadCoins for discounts on QuadNut courses, e-books, learning kits & more

                            </p>
                        </div>
                    </div>
                   
                </div>

                <div className="col-lg-12 d-flex justify-content-center">
                    
                    
                    <div className="mocktest-card ">
                        <div className="icon">
                            <img src={BenchmarkIcon} alt="icon" />
                        </div>
                        <div className="content">
                            <p>Benchmark yourself with an All-India Rank
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default WhyMockTest