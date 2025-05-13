import React from 'react'
import HeroImg from './img/mock-test-1.png'
export const MockTestHero = () => {
    return (
        <>
            <div className="container py-5 mocktest">
                <div className="row align-items-center">
                    <div className="col-lg-6 text-center text-lg-start px-5">
                        <h1 className="fw-bold heading"> Practice Evaluate Improve</h1>
                        <h4 className="subheading"> Take Mock Tests with QuadNut</h4>
                        <p className='description '>
                            Welcome to the QuadNut Mock Test Platform your one-stop destination to practice domain-specific tests, evaluate your performance, and level up your learning with real-time feedback and rankings. These mock tests are not just about answers they are about insights.
                        </p>
                        <button className="btn btn-box mt-3 btn-custom">Get started</button>
                    </div>
                    <div className="col-lg-6 ">
                        <img src={HeroImg} className="img-fluid" />
                    </div>

                </div>
            </div>
        </>
    )
}
