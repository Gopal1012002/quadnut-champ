import React, { useEffect, useState } from "react";
import DecorationImg from '../../assets/img/landing-page/shape.png'
import RoteMobile from '../../assets/img/landing-page/rote-mobile.png'
import Img1 from '../../assets/img/landing-page/what1.jpg'
import Img2 from '../../assets/img/landing-page/what2.jpg'
import Img3 from '../../assets/img/landing-page/what3.jpg'
import AOS from "aos";
import "aos/dist/aos.css";

function WhatQuadnut() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <>
            <section className='pt-md-5'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 px-0">
                            <img src={Img1} alt="image" className="img-fluid" data-aos="zoom-in"
                                data-aos-easing="linear"
                                data-aos-duration="1000"
                                data-aos-delay="300" />

                        </div>
                        <div className="col-md-4  px-0">
                            <img src={Img2} alt="image" className="img-fluid" data-aos="zoom-in"
                                data-aos-easing="linear"
                                data-aos-duration="1000"
                                data-aos-delay="900" />
                        </div>
                        <div className="col-md-4  px-0">
                            <img src={Img3} alt="image" className="img-fluid" data-aos="zoom-in"
                                data-aos-easing="linear"
                                data-aos-duration="1000"
                                data-aos-delay="1800" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default WhatQuadnut