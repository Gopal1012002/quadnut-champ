import React, { useState } from 'react'
import HeroImg from '../../assets/img/landing-page/upskilling.png'
import Shape1 from '../../assets/img/landing-page/tr-hero-shape1.png'
import Shape2 from '../../assets/img/landing-page/tr-hero-shape2.png'
import Typewriter from 'typewriter-effect';
import WhojoinImg from '../../assets/img/landing-page/whojoin-img1.png'
import {Link} from 'react-router-dom'


function UpskillHero() {
  const [isOpen, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  }
  const onOpen = () => {
    setOpen(true);
  }
  return (
    <>
      <section>
        <div className="container-fluid px-0">
          <div className="tranning-bg">
            <div className="row">
              <div className="col-lg-7 d-flex flex-column  justify-content-center">
                <div className='py-1 px-2 tr-tittle rounded-1'>
                  <h5 className='mb-0' >Learn. Build. Grow.</h5>
                </div>
                <div className='mt-md-3 fw-boldm tr-hero-heading'>
                  <h1> With Courses That Are <br /> <span className='text-primary'>
                    <Typewriter
                      options={{
                        strings: ['Future-Proof', 'Mentor-Led', 'Industry-Ready', 'AI-Powered', 'No-Fluff', 'Certified', 'In-Demand'],
                        autoStart: true,
                        loop: true,
                      }}
                    /></span></h1>
                </div>

                <div>
                  <p><b>QuadNut Upskilling</b> Programs are more than just lessons—they're launchpads. Designed by experts and driven by real-world outcomes, and mentorship to thrive in today’s digital economy.</p>
                </div>

                <div>
                  <button className="cta no-cursor"><span> Project-Based Learning</span></button>
                  <button className="cta ms-md-3 no-cursor"><span> Certified by Industry Experts</span></button>
                  <button className="cta ms-xl-3 no-cursor"><span>Mentorship & Career Support</span></button>
                </div>

              </div>
              <div className="col-lg-5  d-flex justify-content-center">
                <div className='tr-hero-box'>
                  <div className='tr-hero-shape-box hero-shape1'>
                    <img src={Shape1} alt="shape-icon" className='img-fluid' />
                  </div>
                  <div className='tr-hero-shape-box hero-shape2'>
                    <img src={Shape2} alt="shape-icon" className='img-fluid' />
                  </div>
                  <img src={HeroImg} alt="image" className='img-fluid' style={{ width: "370px" }} />
                </div>
              </div>

              <div className="col-lg-12 d-flex justify-content-center">
              <div className='category-items-box'>
                <div className='category-itemss item-2'>
                  <Link to={"/course-list"} className="fw-500">
                    <span>
                      <img src={WhojoinImg} alt="icon" />
                    </span> <b>Explore Courses</b> 
                  </Link>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <Modal centered show={isOpen} onHide={onClose} size='lg'>
                <ModalBody className='py-0 pt-4'>
                    <DemoForm close={onClose} />
                </ModalBody>
            </Modal> */}
    </>
  )
}

export default UpskillHero