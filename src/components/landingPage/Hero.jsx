import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Banner from '../../../src/assets/img/landing-page/Banner-1.jpg'
import Banner2 from '../../../src/assets/img/landing-page/Banner-2.jpg'
import Banner3 from '../../../src/assets/img/landing-page/Banner-3.jpg'
import Banner4 from '../../../src/assets/img/landing-page/Banner-4.jpg'
import MobBanner1 from '../../../src/assets/img/landing-page/mob-ban-1.jpg'
import MobBanner2 from '../../../src/assets/img/landing-page/mob-ban-2.jpg'
import MobBanner3 from '../../../src/assets/img/landing-page/mob-ban-3.jpg'
import MobBanner4 from '../../../src/assets/img/landing-page/mob-ban-1.jpg'
 

function Hero() {
  return (
    <>
     {/* hero-section */}
     <section className='d-none d-md-block'>
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
      <section className='d-block d-md-none'>
        <Carousel fade>
          <Carousel.Item >
            <img src={MobBanner1} className='img-fluid w-100' />
          </Carousel.Item>

          <Carousel.Item >
            <img src={MobBanner2} className='img-fluid w-100' />
          </Carousel.Item>

          <Carousel.Item>
            <img src={MobBanner3} className='img-fluid w-100' />
          </Carousel.Item>
          
          <Carousel.Item>
            <img src={MobBanner4} className='img-fluid w-100' />
          </Carousel.Item>
        </Carousel>
      </section>
    </>
  )
}

export default Hero