import React from 'react'
import TestimonialSlider from './TestimonialSlider'
import DecorationImg from '../../assets/img/landing-page/shape.png'

function TestimonialSection() {
    return (
        <>
            <section>
                <div className="container py-5">
                    <div className="row"> 
                        {/* heading tittle start */}
                        <div className="col-xl-12 text-center d-flex justify-content-center align-items-center flex-column">
                            <div className='tittle-box'>
                                <div className='deco-img d-none d-md-block'>
                                    <img src={DecorationImg} alt="icon" />
                                </div>
                                <h1 className='mb-2 fw-bold'>What our Student Says</h1>
                            </div>

                            <p>Real Students. Real Experiences. Real Impact</p>
                        </div>
                        {/* heading tittle end */}

                    </div>
                    <div className="col-xl-12 pt-3">
                        <TestimonialSlider />

                    </div>

                </div>
            </section>

        </>
    )
}

export default TestimonialSection