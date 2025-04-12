import React, { useEffect, useState } from 'react'
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Scrollbar,
  // Autoplay,
  EffectFade,
  EffectCoverflow,
  Keyboard,
  Mousewheel
} from "swiper/modules";
import TestiCard from './TestiCard';
import { GetFeaturedReviews } from '../../services/AppServices';


function TestimonialSlider() {

  const [testimonials, setTestimonials] = useState();
  
  useEffect(()=>{
    GetFeaturedReviews().then((res)=>{
      let tempArr = [];
      res?.data?.featuredReviewList?.map((elem)=>tempArr.push({id:elem.reviewId, name:elem?.studentName, text:elem?.studentTitle, data:elem?.reviewText?.substr(0,250)}))

      setTestimonials([...tempArr]);
    }).catch((err)=>{
      console.log(err)
    })
  },[])


  return (
    <>
      <section>
        <div className="container">
          <div className='slider-box'>
            <div class="testimonial__area-button-prev btn-pre">
              <i class="fa-solid fa-arrow-left"></i>
            </div>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, EffectCoverflow, Keyboard, Mousewheel]}
              spaceBetween={50}

              // autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              navigation={{
                nextEl: '.testimonial__area-button-next',
                prevEl: '.testimonial__area-button-prev',
                clickable: true,
              }}
              // pagination={{ clickable: true }}
              breakpoints={{
                1024: { slidesPerView: 3 },
                768: { slidesPerView: 1 },
                480: { slidesPerView: 1 }
              }}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {testimonials?.length > 0 && testimonials?.map((element, index) => <SwiperSlide key={index}>
                <TestiCard name={element.name} text={element.text} data={element.data} />
              </SwiperSlide>)}
            </Swiper>
            <div class="testimonial__area-button-next btn-next">
              <i class="fa-solid fa-arrow-right"></i>
            </div>
          </div>



        </div>
      </section>

    </>
  )
}

export default TestimonialSlider