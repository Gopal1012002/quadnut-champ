import React from 'react'
import { Link } from 'react-router-dom';
export const MockTestCard = ({data}) => {
    return (
        <>
            <div className="mock-test-card d-flex justify-content-between align-items-stretch h-100">
                <div className="content-section d-flex flex-column justify-content-between">
                    <div className='top-content'>
                        <h2 className="card-title" style={{minHeight:"48px"}}>{data?.mockTestTitle}</h2>
                        <p className="description my-2">
                            {data?.mockTestDescription}
                        </p>

                        <div className="info-section d-flex flex-wrap gap-2 mt-1 mb-1">
                            <span className="info-badge certificate"><span className='fw-bold'>Certificate -</span> {(data?.mockTestCompletionCertificate == "YES" || data?.mockTestPassCertificate == "YES") && "Provided"}</span>
                            <span className="info-badge duration"> <span className='fw-bold'>Duration -</span> {data?.mockTestTime} minutes</span>
                            <span className="info-badge duration"> <span className='fw-bold'>Difficulty level -</span> {data?.mockTestDifficulty}</span>
                        </div>
                    </div>

                    <Link to={`/mock-details/${data?.mockTestSlug}`} target='_blank' className="explore-link">
                        {/* <span className='text-url pb-0'>Explore Test</span> */}
                        <button class="cta ms-md-3 d-flex align-items-center "> <span>Explore Test</span><svg width="15px" height="10px" viewBox="0 0 13 10"><path d="M1,5 L11,5"></path><polyline points="8 1 12 5 8 9"></polyline></svg></button>
                        
                    </Link>
                </div>
            
               <div className="shape">
                </div>

               

            </div>


        </>
    )
}






