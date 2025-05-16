import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import TestiprofileImg from '../../assets/img/quad-champs/into-video/testi-autor1.png';
import TestiquotesImg from '../../assets/img/quad-champs/into-video/testi-quote.png';
const testimonials = [
    {
        name: 'Aditi Sharma',
        role: 'Student - Online Learner',
        quote: 'The learning resources at Quadnut Champ have been a game-changer for my study routine! The tools and strategies make difficult topics easier to grasp and apply.',
    },
    {
        name: 'Varun Mehta',
        role: 'Student - Educational Enthusiast',
        quote: 'I’ve been using Quadnut Champ to enhance my learning experience. Their approach to digital learning has made studying more interactive and engaging.',
    },
    {
        name: 'Neha Bansal',
        role: 'Student - Course Seeker',
        quote: 'Quadnut Champ has completely transformed the way I approach online courses. Their interactive modules help me retain information better and make learning fun!',
    },
    {
        name: 'Rahul Jain',
        role: 'Student - Tech Learner',
        quote: 'I recommend Quadnut Champ to anyone looking to expand their knowledge in tech. The platform is intuitive and offers personalized learning paths that suit my needs.',
    },
    {
        name: 'Simran Kaur',
        role: 'Student - EdTech Explorer',
        quote: 'Quadnut Champ helped me develop a deeper understanding of various subjects. The interactive content has increased my engagement and made my learning more effective.',
    },
];



function ChamptesitimonialCard() {
    return (
        <div className="swiper-container-custom px-2 position-relative">
            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 1 },
                    1024: { slidesPerView: 1 },
                }}
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
                                        <img src={TestiprofileImg} alt="profile" />
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
        </div>
    );
}

export default ChamptesitimonialCard;
