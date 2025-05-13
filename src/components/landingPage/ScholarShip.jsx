import React, { useEffect, useState } from 'react'
import Scholarship from '../../assets/img/landing-page/Scholarship-boy.png'
import Duration from '../../assets/img/landing-page/hourglass.png'
import Download from '../../assets/img/landing-page/download.png'
import WhatappImg from '../../assets/img/landing-page/whatsapp.png'
import FrendImg from '../../assets/img/landing-page/share-img.png'
import Exam from '../../assets/img/landing-page/calendar.png'
import ExmTime from '../../assets/img/landing-page/time-management.png'
import { GetScholarshipListService, useAuthCompany } from '../../services/AppServices'
import BookSession from '../../../src/components/landingPage/BookSession'
import TestimonialSlider from '../../components/landingPage/TestimonialSlider'
import UpcommingScholarship from './UpcommingScholarship'
import { Link } from 'react-router-dom'
import { formatDateRank, formatTime, formatTimeRank } from '../../utils/dynamic.util'
import conf from '../../conf/conf'
import Head from '../../layouts/main-layout/head/Head'
import RedeemImg from '../../assets/img/landing-page/redeem.png'
import RedeemImg2 from '../../assets/img/landing-page/dashboard.png'
import RedeemImg3 from '../../assets/img/landing-page/unlock.png'

function ScholarShip() {
  const [scholarshipData, setScholarshipData] = useState();
  const [scholarshipUpcoming, setScholarshipUpcoming] = useState();
  const [isLoading, setLoading] = useState(false);
  const { companyData } = useAuthCompany();
  useEffect(() => {
    setLoading(true);
    GetScholarshipListService().then((res) => {
      setScholarshipData(res?.data?.featured)
      setScholarshipUpcoming(res?.data?.nonFeatured)
    }).catch((err) => {

    }).finally(() => {
      setLoading(false)
    })
  }, [])
  const shareOnWhatsApp = () => {
    const message = `Check this out: https://quadnut.org/scholarship/${scholarshipData?.slug}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <Head title={scholarshipData?.scholarshipName} description={scholarshipData?.scholarshipShortDescription} />
      <section>
        <div className="container my-3">

          <div className="row gy-4">
            {/* scholarship section start */}
            <div className="col-xl-12 px-4 pt-md-5">
              <div className="card scholarship-box rounded-3 ">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8 p-md-4 d-flex flex-column align-items-md-start justify-content-md-start align-items-center justify-content-center">
                      <div>
                        <h1 className='fw-bold text-center text-md-start text-white'>{scholarshipData?.scholarshipName}</h1>
                        <h4 className='text-white text-center text-md-start text-dark-gray'>{scholarshipData?.scholarshipShortDescription}</h4>
                      </div>
                      <div className='d-flex  gap-1 align-items-center mt-3'>
                        <div>
                          <img src="https://cdn-icons-png.flaticon.com/128/18303/18303056.png" alt="" style={{
                            width: "25px"
                          }} />
                        </div>
                        <div>
                          <p className='fw-bold mb-0 text-white'>Duration: {scholarshipData?.scholarshipDuration} mins</p>
                        </div>
                      </div>
                      {
                        scholarshipData?.scholarshipType == "OFFLINE" ?
                          <div className="btn btn-white px-4 py-3 rounded-2 mt-4 fw-bold Register-free" data-bs-toggle="modal" data-bs-target="#myModal">Register Here
                          </div> :
                          <Link target='_blank' to={`http://quadnut.org/mock-details/${scholarshipData?.mockTestSlug}`} >
                            <div className="btn btn-white px-4 py-3 rounded-2 mt-4 fw-bold Register-free" >Register Here
                            </div>
                          </Link>
                      }

                    </div>

                    <div className="col-md-4 d-flex justify-content-center ">
                      <img src={Scholarship} alt="image" className='img-fluid' style={{ width: "320px" }} />
                    </div>

                  </div>


                </div>
              </div>
            </div>

            {/* exam section start */}
            <div className="col-xl-12 px-md-4 ">
              <div className="card p-4 border-0 exm-time-box">
                <div className="row gy-4 exm-detail">
                  <div className="col-6 d-flex align-items-center ">
                    <h3 className='mb-0'>Exam Details</h3>
                  </div>
                  <div className="col-6 d-flex justify-content-end">
                    {scholarshipData?.syllabusFileName && <a href={`${conf.apiAssetUrl}/${companyData?.frontFolder}/content/${scholarshipData?.syllabusFileName}`} target='_blank'>
                      <div className=' Syllabus-box d-flex align-items-center gap-2 border p-2 rounded-2'>
                        <img src={Download} alt="img" className='img-fluid' />
                        <h6 className='mb-0'> Syllabus</h6>
                      </div></a>}

                  </div>
                  <div className="col-md-6">
                    <div className="card border-0 exm-time-box" >
                      <div className='w-100 d-flex align-items-center gap-4 p-lg-5 p-3'>
                        <div>
                          <img src={Exam} alt="image" className='img-fluid' style={{ width: "100px" }} />
                        </div>
                        <div>
                          <h4>Exam Dates</h4>
                          <p> {scholarshipData?.scholarshipType == "OFFLINE" ? "Offline" : "Online"}  <span> :  {scholarshipData?.scholarshipType == "OFFLINE" ?
                            formatDateRank(scholarshipData?.offlineStartDate?.split("T")[0]) : formatDateRank(scholarshipData?.onlineStartDate?.split("T")[0])
                          } to {
                              scholarshipData?.scholarshipType == "OFFLINE" ?
                                formatDateRank(scholarshipData?.offlineEndDate?.split("T")[0]) : formatDateRank(scholarshipData?.onlineEndDate?.split("T")[0])
                            } </span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card border-0 exm-time-box" >
                      <div className='w-100 d-flex align-items-center gap-4 p-lg-5 p-3'>
                        <div>
                          <img src={ExmTime} alt="image" className='img-fluid' style={{ width: "100px" }} />
                        </div>
                        <div>
                          <h4>Exam Timings</h4>
                          <p>{scholarshipData?.scholarshipType == "OFFLINE" ? "Offline" : "Online"}  <span> : {scholarshipData?.scholarshipType == "OFFLINE" ?
                            formatTimeRank(scholarshipData?.offlineStartDate) : formatTimeRank(scholarshipData?.onlineStartDate)
                          } to {
                              scholarshipData?.scholarshipType == "OFFLINE" ?
                                formatTimeRank(scholarshipData?.offlineEndDate) : formatTimeRank(scholarshipData?.onlineEndDate)
                            }</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* what Quadnut section start */}

            <div className="col-xl-12 px-md-4">
              <div className="card p-4 border-0 exm-time-box">
                <div className="row gy-4">
                  <div className="col-md-12">
                    <h3 className='mb-2 text-center text-md-start'>{scholarshipData?.scholarshipName}</h3>
                  </div>
                  <div className="col-lg-10 mt-0">
                    <p className='para-align-justify text-center text-md-start'>
                      {scholarshipData?.scholarshipDescription}
                    </p>
                  </div>
                  <div className="col-lg-2 mt-0 col-md-2 mt-0 d-flex justify-content-center">
                    <img src="https://www.pw.live/scholarship/_next/static/media/success-trophy.ddf4a092.svg" alt="img" className='img-fluid d-md-none d-lg-block' />
                  </div>
                </div>
              </div>
            </div>

              {/* Quadnut coin start */}

            <div className="col-xl-12 px-md-4">
              <div className="card p-4 border-0 exm-time-box">
                <div className="row gy-4">
                  <div className="col-md-12">
                    <h3 className='mb-2 text-center text-md-start'>What Are QuadCoins?</h3>
                  </div>
                  <div className="col-lg-10 mt-0">
                    <p className='para-align-justify text-center text-md-start'>
                      QuadCoins are performance-based rewards earned through your mock test scores. The higher your score, the more QuadCoins you collect — and these can be redeemed for up to 100% scholarship on QuadNut training programs
                    </p>
                    <ul>
                      <li className='d-flex gap-2 pb-2'><span><img src={RedeemImg} alt="image" /></span><span className='fw-bold '>Redeem for Course Enrollments</span></li>
                      <li className='d-flex gap-2 pb-2'><span><img src={RedeemImg2} alt="image" /></span><span className='fw-bold '>Track Coins in Your Dashboard</span></li>
                      <li className='d-flex gap-2'><span><img src={RedeemImg3} alt="image" /></span><span className='fw-bold '> Unlock Premium Training at Low or Zero Cost</span></li>
                    </ul>
                  </div>
                  <div className="col-lg-2 mt-0 col-md-2 mt-0 d-flex justify-content-center">
                    <img src="https://img.freepik.com/premium-vector/boy-holds-coin_160901-1500.jpg?w=740" alt="img" className='img-fluid d-md-none d-lg-block' />
                  </div>
                </div>
              </div>
            </div>

            {/* share section start */}
            <div className="col-xl-12 px-md-4">
              <div className="card share-frnd-card  border-0 exm-time-box">
                <div className="row gy-4">
                  <div className="col-md-8 mt-0 p-5 d-flex flex-column align-items-center align-items-md-start      ">
                    <h2 className='mb-2 fw-bold text-center text-md-start'>Share with your friends</h2>
                    <p className='para-align-justify text-center text-md-start '>
                      By supporting them, your friends can unlock access to top-notch educational resources, expert advice, and customized learning experiences designed to help them reach their academic aspirations
                    </p>

                    <div className='  Syllabus-box d-flex align-items-center gap-2 border p-2 rounded-2' style={{ width: "fit-content" }}
                      onClick={shareOnWhatsApp}
                    >
                      <img src={WhatappImg} alt="img" className='img-fluid' />
                      <h6 className='mb-0'>Share with Friends</h6>
                    </div>
                  </div>
                  <div className="col-md-4 mt-0 share-frnd-bg d-flex align-items-center py-3 justify-content-md-end px-md-5 justify-content-center pt-md-4">
                    <img src={FrendImg} alt="img" className='img-fluid align-self-center ' style={{ width: "200px" }} />
                  </div>
                </div>
              </div>
            </div>


            {
              scholarshipUpcoming?.length > 0 && 
            <div className="col-xl-12 ">
              <div className="card p-md-5 p-3  share-frnd-card  border-0 exm-time-box">
                <div className="row gy-4  ">
                  <div className="col-md-12  d-flex flex-column align-items-center align-items-md-start">
                    <h2 className='mb-2 fw-bold text-center text-md-start'>QuadNut Scholarship Test</h2>

                  </div>
                  <div className="col-xl-12">
                    <UpcommingScholarship data={scholarshipUpcoming} />
                  </div>
                </div>
              </div>
            </div>}
          </div>
        </div>

           

           
      </section>








      {/* modal for Scholarship start */}
      <div class="modal fade" id="myModal">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="">{scholarshipData?.scholarshipName}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <BookSession id={scholarshipData?.id}  />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      {/* modal for Scholarship end */}




    </>
  )
}

export default ScholarShip