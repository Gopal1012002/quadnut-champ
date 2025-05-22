import React, { useRef } from 'react'

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
    Autoplay,
    EffectFade,
    EffectCoverflow,
    Keyboard,
    Mousewheel
} from "swiper/modules";


import TestiprofileImg from '../../assets/img/quad-champs/into-video/testi-autor1.png';
import TestiprofileImg2 from '../../assets/img/quad-champs/into-video/user-2.png';
import TestiquotesImg from '../../assets/img/quad-champs/into-video/testi-quote.png';
const testimonials = [
    {
        name: 'Aditi Sharma',
        role: 'Student - Online Learner',
        img: TestiprofileImg,
        quote: 'The learning resources at Quadnut Champ have been a game-changer for my study routine! The tools and strategies make difficult topics easier to grasp and apply.',
    },
    {
        name: 'Varun Mehta',
        role: 'Student - Educational Enthusiast',
        img: TestiprofileImg,
        quote: 'I’ve been using Quadnut Champ to enhance my learning experience. Their approach to digital learning has made studying more interactive and engaging.',
    },
    {
        name: 'Neha Bansal',
        role: 'Student - Course Seeker',
        img: TestiprofileImg2,
        quote: 'Quadnut Champ has completely transformed the way I approach online courses. Their interactive modules help me retain information better and make learning fun!',
    },
    {
        name: 'Rahul Jain',
        role: 'Student - Tech Learner',
        img: TestiprofileImg,
        quote: 'I recommend Quadnut Champ to anyone looking to expand their knowledge in tech. The platform is intuitive and offers personalized learning paths that suit my needs.',
    },
    {
        name: 'Simran Kaur',
        role: 'Student - EdTech Explorer',
        img: TestiprofileImg2,
        quote: 'Quadnut Champ helped me develop a deeper understanding of various subjects. The interactive content has increased my engagement and made my learning more effective.',
    },
];



const ChampTesitimonialSwiper = () => {

    const prevRef = useRef(null);
    const nextRef = useRef(null);
    return (
        <>

            <div className="swiper-container-custom px-2 position-relative">

                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, Autoplay, EffectCoverflow, Keyboard, Mousewheel]}
                    spaceBetween={50}
                    autoplay={{ delay: 3000, disableOnInteraction: true }}
                    loop={true}


                    // navigation={{
                    //     nextEl: ".testimonial__area-button-next-1",
                    //     prevEl: ".testimonial__area-button-prev-1",
                    //      clickable: true,
                    // }}
                    onSwiper={(swiper) => {
                        // Delay navigation setup until refs are available
                        setTimeout(() => {
                            if (swiper.params.navigation) {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                                swiper.navigation.destroy();
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }
                        });
                    }}

                    pagination={{ el: '.swiper-pagination', clickable: false }}
                    // pagination={{ clickable: true }}
                    breakpoints={{
                        1024: { slidesPerView: 1 },
                        768: { slidesPerView: 1 },
                        480: { slidesPerView: 1 }
                    }}
                    onSlideChange={() => console.log('slide change')}

                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <div className="row mt-4 gy-3">
                                <div className="col-xl-12">
                                    <div className="champ-testimonial-card">
                                        <div className="d-flex gap-2 align-items-center">
                                            <div>
                                                <img src={TestiquotesImg} alt="quotes" />
                                            </div>
                                            <h4 className="mb-0">Impressive Learning!</h4>
                                        </div>
                                        <p className="mt-4">{testimonial.quote}</p>
                                    </div>
                                    <div className="d-flex gap-3 align-items-center mt-3">
                                        <div className="champ-testi-profile-box">
                                            <img src={testimonial.img} alt="profile" />
                                        </div>
                                        <div>
                                            <h5 className="mb-0">{testimonial.name}</h5>
                                            <p className="mb-0">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                </Swiper>

                <div class="row d-flex  justify-content-center justify-content-md-end mt-2 mt-md-0">
                    <div class="col-xl-6 col-lg-6">
                        <div class="testimonial__area-button-1">
                            <div class="testimonial__area-button-prev-1" ref={prevRef}>
                                <i class="fa-solid fa-arrow-left"></i>
                            </div>
                            <div class="testimonial__area-button-next-1" ref={nextRef}>
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}

export default ChampTesitimonialSwiper


