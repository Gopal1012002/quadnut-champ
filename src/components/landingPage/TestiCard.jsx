import React from 'react'
import Comma from '../../assets/img/landing-page/comma.png'
import ProfileImg from '../../assets/img/landing-page/leadership.png'

function TestiCard({name, text, data}) {
    return (
        <>
            <div className="card rounded-0 p-4 testimonail-card-height">
                <div className="row gy-4">
                    <div className="col-xl-12">
                        <img src={Comma} alt="img" className='img-fluid comma-img' />
                    </div>
                    <div className="col-xl-12">
                        <p className='mb-0 fs-14'>
                            {data}    
                        </p>
                    </div>
                    <div className="col-xl-12 d-flex align-items-center  gap-3">
                        {/* <div className='testi-profile-box p-2'>
                            <img src={ProfileImg} alt="img" />
                        </div> */}
                        <div>
                            <p className='mb-0 fs-14 fw-bold'> {name} </p>
                            <p className='mb-0 fs-14'> {text} </p>
                        </div>
                    </div>
                </div>


            </div>


        </>
    )
}

export default TestiCard