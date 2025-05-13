import React from 'react'
import DecorationImg from '../../../assets/img/landing-page/shape.png'
import ExpertiseImg from '../../../assets/img/landing-page/expertise.jpg'
import Head from '../../../layouts/main-layout/head/Head'


function Expertise() {
    return (
        <>
            <Head title="Our Expertise" />
            <section className='p-4 py-5'>
                <div className="container commit-sec">
                    <div className="row gy-5 commit-quality commit-sec">
                        {/* heading tittle start */}
                        <div className="col-xl-12 text-center d-flex justify-content-center align-items-center flex-column">
                            <div className='tittle-box'>
                                <div className='deco-img'>
                                    <img src={DecorationImg} alt="icon" />
                                </div>
                                <h1 className='mb-2 fw-bold'>Our Expertise</h1>
                            </div>
                            <p>Where Experience Meets Excellence.</p>
                        </div>
                        {/* heading tittle end */}
                        <div className="col-lg-6 d-flex justify-content-center">
                            <img src={ExpertiseImg} alt="image" className='img-fluid' style={{ width: "500px" }} />
                        </div>
                        <div className="col-lg-6 pt-md-4">
                            <div className=''>
                                <p className='mb-2 para-align-justify '>The Specific and Evolving Needs of both Tech and Non-Tech Sectors. At QuadNut, we believe in creating Programs that not only impart Theoretical Knowledge but also emphasize Practical Application, ensuring our learners are Job-Ready and Future-Focused.</p>
                                <p className='mb-2 para-align-justify'>We take pride in our team of Industry-Driven Experts and Professionals who bring Unparalleled Knowledge and Experience to the table. Our Trainers hail from esteemed institutions like IITs and NITs and have worked with Renowned Multinational Corporations (MNCs), ensuring that the Content Delivered is both Current and Relevant to Industry Demands.</p>
                                <p className='mb-2 para-align-justify'>With this Strong Foundation, our Programs are designed to meet Global Standards, providing participants with a Unique Blend of Academic Rigor, Practical Training, and Industry Insights. Whether it’s Advanced Tech Skills or Foundational Knowledge for Non-Tech Domains, QuadNut ensures learners gain the Expertise they need to Excel in Their Chosen Fields.</p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Expertise