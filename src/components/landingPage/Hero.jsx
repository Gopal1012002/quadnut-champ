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
import HeroImg from '../../../src/assets/img/quad-champs/hero-section/hero-main-img-3.png';
// import HeroImg1 from '../../../src/assets/img/quad-champs/hero-section/hero-img1.png';
// import HeroImg2 from '../../../src/assets/img/quad-champs/hero-section/hero-img2.png';
// import HeroImg3 from '../../../src/assets/img/quad-champs/hero-section/hero-img3.png';
// import HeroImg4 from '../../../src/assets/img/quad-champs/hero-section/hero-img4.png';
// import HeroImg5 from '../../../src/assets/img/quad-champs/hero-section/hero-img5.png';
import Heroshape1 from '../../../src/assets/img/quad-champs/hero-section/hero-shape-1.png';
import Heroshape2 from '../../../src/assets/img/quad-champs/hero-section/hero-shape-5.png';
import Heroshape3 from '../../../src/assets/img/quad-champs/hero-section/hero-shape-2.png';
import Heroshape4 from '../../../src/assets/img/quad-champs/hero-section/hero-shape-4.png';
import BlogImg1 from '../../../src/assets/img/quad-champs/into-video/blog-img1png.png'
import BlogImg2 from '../../../src/assets/img/quad-champs/into-video/blog-img2.png'
import BlogImg3 from '../../../src/assets/img/quad-champs/into-video/blog-img3.png'

// Slide content

// const HeroImg ='https://img.freepik.com/free-vector/stem-education-logo-with-children-cartoon-character_1308-62702.jpg?uid=R179690245&ga=GA1.1.1210744585.1744884787&semt=ais_hybrid&w=740'

const HeroImg1 ='https://img.freepik.com/premium-photo/portrait-smiling-young-woman-against-white-background_1048944-10612123.jpg?w=1480'
const HeroImg2 ='https://html.themewant.com/studykids/assets/images/banner/01.png'
// const HeroImg2 ='https://img.freepik.com/free-photo/teens-casual-clothes_1098-2580.jpg?t=st=1747639968~exp=1747643568~hmac=5d14d81f723d363fc6e9c323ac089cbcb4ebe9c19a0835277a45510640a7acf2&w=1480'

const HeroImg3 ='https://img.freepik.com/premium-photo/portrait-smiling-young-woman-against-white-background_1048944-10612123.jpg?w=1480'
const heroData = [
  {
    title: "Strong Foundations, Bright Futures – From 3rd to 8th Grade.",
    description: "Lay the foundation for future success",
    img:  HeroImg,
  },
  {
    title: "Solid foundations for IIT-JEE,  NEET, and beyond.",
    description: "Prepare for a strong academic future.",
    img:HeroImg,
  },
  {
    title: "Achieve excellence  in competitive exams",
    description: "Achieve excellence in competitive exams",
    img: HeroImg,
  },
  {
    title: "Explore the world  of Science, Technology, Engineering, and Math.",
    description: "Discover the world of Science, Technology, Engineering, and Mathematics",
    img: HeroImg,
  },
  {
    title: "Where knowledge meets real-world application",
    description: "Hands-on learning for real-world applications",
    img: HeroImg,
  },
  {
    title: "Challenge Limits. Master Concepts. Win Olympiads",
    description: "Excel in national and international Olympiad exams.",
    img: HeroImg,
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
