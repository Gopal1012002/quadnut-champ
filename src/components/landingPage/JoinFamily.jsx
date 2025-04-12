import React from 'react'
import DecorationImg from '../../assets/img/landing-page/shape.png'
import CheckImg from '../../assets/img/landing-page/check-mark.png'

function JoinFamily() {
    return (
        <>
            <section className='pt-md-5'>
                <div className="container">
                    <div className="row gy-3">
                        {/* heading tittle start */}
                        <div className="col-xl-12 text-center d-flex justify-content-center align-items-center flex-column">
                            <div className='tittle-box'>
                                <div className='deco-img d-none d-md-block'>
                                    <img src={DecorationImg} alt="icon" />
                                </div>
                                <h1 className='mb-2 fw-bold'>Welcome to QuadNut</h1>
                            </div>

                            <p>Your Learning Journey Starts Here!</p>
                        </div>
                        {/* heading tittle end */}
                        <div className="col-xl-12">
                            <div className="card study-bg-1 p-md-5 p-2 rounded-0">
                                <div className="row gy-2">
                                    <div className="col-lg-6">
                                        <div>
                                            <h3 className='mb-3'>Powerful Platform Designed for All Learners</h3>
                                            <p className='para-align-justify '>Unlock your learning potential with QuadNut, a comprehensive platform crafted to cater to all age groups, from Zero to Hero. Experience seamless integration between teachers and students, making learning interactive and effective.</p>
                                        </div>
                                        <div>
                                            <ul className='para-align-justify '>
                                                <li className='pb-2 fs-15 fs-14-max-375px d-flex'>
                                                    <div><img src={CheckImg} alt="icon" className='me-2' /></div>
                                                    <div><b>Zero to Hero:</b> Catering to all age groups, from beginners to advanced learners.</div>
                                                 </li>
                                                 <li className='pb-2 fs-15 fs-14-max-375px d-flex'>
                                                    <div><img src={CheckImg} alt="icon" className='me-2' /></div>
                                                    <div><b>Seamless Integration of Teacher and Student:</b> Connecting educators and learners effortlessly for a smooth learning experience.</div>
                                                 </li>
                                                 <li className='pb-2 fs-15 fs-14-max-375px d-flex'>
                                                    <div><img src={CheckImg} alt="icon" className='me-2' /></div>
                                                    <div><b>Time-Oriented Mock Tests:</b> Practice under time constraints with mock tests designed to simulate real exams.</div>
                                                 </li>
                                                 <li className='pb-2 fs-15 fs-14-max-375px d-flex'>
                                                    <div><img src={CheckImg} alt="icon" className='me-2' /></div>
                                                    <div><b>Instant Feedback & Score Analysis:</b> Receive immediate feedback and detailed analysis to track your progress and improve.</div>
                                                 </li>
                                                 <li className='pb-2 fs-15 fs-14-max-375px d-flex'>
                                                    <div><img src={CheckImg} alt="icon" className='me-2' /></div>
                                                    <div><b>Centralized & Well-Organized:</b> Everything you need in one place, structured for easy access and smooth navigation.</div>
                                                 </li>
                                                 <li className='pb-2 fs-15 fs-14-max-375px d-flex'>
                                                    <div><img src={CheckImg} alt="icon" className='me-2' /></div>
                                                    <div><b>Practical-Based Learning:</b> Focus on hands-on learning, ensuring real-world application of knowledge.</div>
                                                 </li>
                                              
                                            </ul>
                                        </div>
                                    </div>


                                    <div className="col-lg-6 d-flex align-items-center ">
                                        <div className="card rounded-4 mb-0 w-100">
                                        <iframe className='border-radius-15px' width="100%" height="315" src="https://www.youtube.com/embed/9Tz2tY-ZEwQ?si=6TtUGewYr9aMUEtv" title="YouTube video player" frameborder="15px" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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

export default JoinFamily