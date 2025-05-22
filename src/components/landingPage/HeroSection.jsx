import React from 'react';
import { Link } from 'react-router-dom';

function HeroSection({
  title,
  description,
  heroImg,
  shape1,
  shape2,
  shape3,
  shape4,
  btnImg,
  animate = false,
}) {
  return (
    <section className='champs-hero'>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <div className='champ-hero-content position-relative'>
              <div className='champ-hero-shape3'>
                <img src={shape3} alt="shape3" className='float' />
              </div>
              <h1
                className={`text-center text-lg-start ${
                  animate ? 'animate__animated animate__fadeInDown' : ''
                }`}
                dangerouslySetInnerHTML={{ __html: title }}
              />
              <p
                className={`text-center text-lg-start ${
                  animate ? 'animate__animated animate__fadeInUp animate__delay-1s' : ''
                }`}
              >
                {description}
              </p>
            </div>
            <div className='w-100 d-flex justify-content-center justify-content-lg-start'>
              <div
                className={`champ-common-btn ${
                  animate ? 'animate__animated animate__zoomIn animate__delay-2s' : ''
                }`}
              >
                <Link to="/course-list">
                  <span><img src={btnImg} alt="button" className='me-2' /></span>
                  <span className='btn-txt'>GET STARTED</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-5 d-flex justify-content-center hero-img-section position-relative ">
            <div className='champ-hero-shape1'>
              <img src={shape1} alt="shape1" className='rotate-animation' />
            </div>
            <div className='champ-hero-shape2'>
              <img src={shape2} alt="shape2" className='left-right' />
            </div>
            <div className='champ-hero-shape4'>
              <img src={shape4} alt="shape4" className='top-bottom' />
            </div>
            <img
              src={heroImg}
              alt="hero"
              className={`img-fluid hero-main-img ${
                animate ? 'animate__animated animate__fadeInRight animate__delay-1s' : ''
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
