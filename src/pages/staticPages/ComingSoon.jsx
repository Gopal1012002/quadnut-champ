import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import bikeImg from './../../assets/img/landing-page/come-soon-bike.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const ComingSoon = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <div class="main-wrapper comming-soon-box" style={{
            height:"70vh",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center"
        }

        }>
            <div class="error-box">
                <h4>WE ARE COMING SOON!!</h4>
                <h6 class="font-weight-normal">We are crafting something amazing</h6>
            </div>
            <div class="error-box-img text-center mb-4">
                <img src={bikeImg} alt="Img" class="img-fluid" />
            </div>
        </div>
    );
};

export default ComingSoon;