import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Banner from '../../../src/assets/img/landing-page/Banner-1.jpg'
import Banner2 from '../../../src/assets/img/landing-page/Banner-2.jpg'
import Banner3 from '../../../src/assets/img/landing-page/Banner-3.jpg'
import Banner4 from '../../../src/assets/img/landing-page/Banner-4.jpg'
// import Banner1Mobile from '../../../src/assets/img/landing-page/Banner-mobile-1.jpg'

function Hero() {
  return (
    <>
     {/* hero-section */}
     <section className=''>
        <Carousel fade>
          <Carousel.Item >
            <img src={Banner} className='img-fluid' />
          </Carousel.Item>

          <Carousel.Item >
            <img src={Banner2} className='img-fluid' />
          </Carousel.Item>

          <Carousel.Item>
            <img src={Banner3} className='img-fluid' />
          </Carousel.Item>
          
          <Carousel.Item>
            <img src={Banner4} className='img-fluid' />
          </Carousel.Item>
        </Carousel>
      </section>
    
    
    
    
    </>
  )
}

export default Hero