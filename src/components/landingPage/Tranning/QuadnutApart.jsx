import React from 'react'
import DecorationImg from "../../../assets/img/landing-page/shape.png";
import ApartImg1 from "../../../assets/img/landing-page/apart-1.png";
import ApartImg2 from "../../../assets/img/landing-page/apart-2.png";
import ApartImg3 from "../../../assets/img/landing-page/apart-3.png";
import ApartImg4 from "../../../assets/img/landing-page/apart-4.png";
import ApartImg5 from "../../../assets/img/landing-page/apart-5.png";

function QuadnutApart() {
    return (
        <>
            <section>
                <div className="container">
                    <div className="row py-md-5 gy-md-4 gy-3">
                        {/* heading tittle start */}
                        <div className="col-xl-12 text-center d-flex justify-content-center align-items-center flex-column">
                            <div className='tittle-box'>
                                <div className='deco-img d-none d-md-block'>
                                    <img src={DecorationImg} alt="icon" />
                                </div>
                                <h1 className='mb-2 text-center mt-3  fw-bold '>What Sets QuadNut Apart?</h1>
                            </div>
                            <p className='section-heading'>We Cover Both Tech & Non-Tech Verticals</p>
                        </div>
                        {/* heading tittle end */}
                        <div className="col-xl-12">
                            <div className="row gy-3">
                                <div className="col">
                                    <div className="card border-0 h-100"  style={{
                                        backgroundColor:"#f1f9fc"
                                    }}>
                                        <div className="card-body pt-2 pb-0 d-flex flex-column align-items-center justify-content-center">
                                            <div className='apart-img-box'>
                                                <img src={ApartImg1} alt="image" className='img-fluid' />
                                            </div>
                                            <h5 className='mb-2 text-center mt-4 lh-base' >Offline <br /> Engagement</h5>
                                            <p className='text-center fs-14'>Real-world interaction, collaborative learning, and mentorship on campus.</p>

                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card border-0 h-100"  style={{
                                        backgroundColor:"#f1f9fc"
                                    }}>
                                        <div className="card-body pt-2 pb-0 d-flex flex-column align-items-center justify-content-center">
                                            <div className='apart-img-box'>
                                            <img src={ApartImg2} alt="image" className='img-fluid' />
                                            </div>
                                            <h5 className='mb-2 text-center mt-4 lh-base' >Industry-Driven  <br /> Content</h5>
                                            <p className='text-center fs-14'> Built by professionals from top institutions and corporations.</p>

                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card border-0 h-100"  style={{
                                        backgroundColor:"#f1f9fc"
                                    }}>
                                        <div className="card-body pt-2 pb-0 d-flex flex-column align-items-center justify-content-center">
                                            <div className='apart-img-box'>
                                            <img src={ApartImg3} alt="image" className='img-fluid' />
                                            </div>
                                            <h5 className='mb-2 text-center mt-4 lh-base' >Tailored  <br /> Programs</h5>
                                            <p className='text-center fs-14'>Customized training based on the academic level and department</p>

                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card border-0 h-100"  style={{
                                        backgroundColor:"#f1f9fc"
                                    }}>
                                        <div className="card-body pt-2 pb-0 d-flex flex-column align-items-center justify-content-center">
                                            <div className='apart-img-box'>
                                            <img src={ApartImg4} alt="image" className='img-fluid' />
                                            </div>
                                            <h5 className='mb-2 text-center mt-4 lh-base'> Bonus  <br /> Classes</h5>
                                            <p className='text-center fs-14'>Personality Development + Communication Skills to create well-rounded professionals</p>

                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card border-0 h-100"  style={{
                                        backgroundColor:"#f1f9fc"
                                    }}>
                                        <div className="card-body pt-2 pb-0 d-flex flex-column align-items-center justify-content-center">
                                            <div className='apart-img-box'>
                                            <img src={ApartImg5} alt="image" className='img-fluid' />
                                            </div>
                                            <h5 className='mb-2 text-center mt-4 lh-base'> Placement  <br /> Support</h5>
                                            <p className='text-center fs-14'> Resume building, interview prep, and job connect guidance.</p>

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

export default QuadnutApart