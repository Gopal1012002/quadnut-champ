import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'animate.css';

import HeroSection from './HeroSection';

// Assets
import BtnImg from '../../../src/assets/img/quad-champs/button-img/book-icon.png';
// import HeroImg from '../../../src/assets/img/quad-champs/hero-section/hero-main-img.png';
import HeroImg1 from '../../../src/assets/img/quad-champs/hero-section/3.png';
import HeroImg2 from '../../../src/assets/img/quad-champs/hero-section/2.png';
import HeroImg3 from '../../../src/assets/img/quad-champs/hero-section/4.png';
import HeroImg4 from '../../../src/assets/img/quad-champs/hero-section/1.png';
import HeroImg5 from '../../../src/assets/img/quad-champs/hero-section/5.png';
import HeroImg6 from '../../../src/assets/img/quad-champs/hero-section/6.png';

import Heroshape1 from '../../../src/assets/img/quad-champs/hero-section/hero-shape-1.png';
import Heroshape2 from '../../../src/assets/img/quad-champs/hero-section/hero-shape-5.png';
import Heroshape3 from '../../../src/assets/img/quad-champs/hero-section/hero-shape-2.png';
import Heroshape4 from '../../../src/assets/img/quad-champs/hero-section/hero-shape-4.png';
import BlogImg1 from '../../../src/assets/img/quad-champs/into-video/blog-img1png.png'
import BlogImg2 from '../../../src/assets/img/quad-champs/into-video/blog-img2.png'
import BlogImg3 from '../../../src/assets/img/quad-champs/into-video/blog-img3.png'

// Slide content

const heroData = [
  {
    title: "Strong Foundations, Bright Futures – From 3rd to 8th Grade.",
    description: "Lay the foundation for future success",
    img:  HeroImg1,
  },
  {
    title: "Solid foundations for IIT-JEE,  NEET, and beyond.",
    description: "Prepare for a strong academic future.",
    img:HeroImg2,
  },
  {
    title: "Achieve excellence  in competitive exams",
    description: "Achieve excellence in competitive exams",
    img: HeroImg3,
  },
  {
    title: "Explore the world  of Science, Technology, Engineering, and Math.",
    description: "Discover the world of Science, Technology, Engineering, and Mathematics",
    img: HeroImg4,
  },
  {
    title: "Where knowledge meets real-world application",
    description: "Hands-on learning for real-world applications",
    img: HeroImg5,
  },
  {
    title: "Challenge Limits. Master Concepts. Win Olympiads",
    description: "Excel in national and international Olympiad exams.",
    img: HeroImg6,
  },
];

const HeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      effect="fade"
      loop={true}
      slidesPerView={1}
      speed={800}
      onSlideChange={(swiper) => {
        setActiveIndex(swiper.realIndex);
      }}
    >
      {heroData.map((item, index) => (
        <SwiperSlide key={index}>
          <HeroSection
            key={activeIndex === index ? `active-${index}` : `inactive-${index}`}
            animate={activeIndex === index}
            title={item.title}
            description={item.description}
            heroImg={item.img}
            shape1={Heroshape1}
            shape2={Heroshape2}
            shape3={Heroshape3}
            shape4={Heroshape4}
            btnImg={BtnImg}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroCarousel;
