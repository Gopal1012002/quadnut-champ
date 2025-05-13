import React from 'react'
import DecorationImg from '../../../assets/img/landing-page/shape.png'
import TestiImg from '../../../assets/img/landing-page/testi-sucess.png'
import Head from '../../../layouts/main-layout/head/Head'

function TestimonialsSuccess() {
    return (
        <>    
          <Head title="Testimonials of Success" />
            <section className='p-4 py-5'>
                <div className="container commit-sec">
                    <div className="row gy-5 commit-quality commit-sec">
                        {/* heading tittle start */}
                        <div className="col-xl-12 text-center d-flex justify-content-center align-items-center flex-column">
                            <div className='tittle-box'>
                                <div className='deco-img'>
                                    <img src={DecorationImg} alt="icon" />
                                </div>
                                <h1 className='mb-2 fw-bold'>Testimonials of Success</h1>
                            </div>
                            <p>Where Success Speaks for Itself.</p>
                        </div>
                        {/* heading tittle end */}
                        <div className="col-lg-6 d-flex justify-content-center">
                            <img src={TestiImg} alt="image" className='img-fluid' style={{ width: "500px" }} />
                        </div>
                        <div className="col-lg-6 d-flex align-items-center">
                            <div className=''>
                                <p className='mb-2 para-align-justify'>Our learners consistently share stories of personal and professional growth, highlighting the practical skills, industry insights, and confidence they have gained through our programs.</p>

                                <p className='mb-2 para-align-justify'>At QUADNUT, our track record is a testament to our commitment to excellence and innovation in training and development. We continue to strive for even greater impact by empowering individuals with the skills they need to succeed in an ever-evolving world</p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>




        </>
    )
}

export default TestimonialsSuccess