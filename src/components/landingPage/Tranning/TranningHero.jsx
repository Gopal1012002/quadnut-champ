import React, { useState } from 'react'
import HeroImg from '../../../assets/img/landing-page/tr-hero-img.png'
import Shape1 from '../../../assets/img/landing-page/tr-hero-shape1.png'
import Shape2 from '../../../assets/img/landing-page/tr-hero-shape2.png'
import DemoForm from './DemoForm';
import {Modal, ModalBody, ModalHeader } from 'react-bootstrap';

function TranningHero() {
    const [isOpen, setOpen] = useState(false);
    const [heading, setHeading] = useState('');
    const onClose = () => {
        setOpen(false);
    }
    const onOpen = () => {
        setOpen(true);
    }
    return (
        <>
            <section>
                <div className="container-fluid px-0">
                    <div className="tranning-bg">
                        <div className="row">
                            <div className="col-lg-7 d-flex flex-column  justify-content-center">
                                <div className='py-1 px-2 tr-tittle rounded-1'>
                                    <h5 className='mb-0' >100% Satisfaction Gaurantee</h5>
                                </div>
                                <div className='mt-md-3 fw-boldm tr-hero-heading'>
                                    <h1>Train with Experts <br /> Compete with the Best.</h1>
                                </div>
                                <div>
                                    <p><b>Empowering Students</b> with Industry-Relevant Skills through Offline Training Programs for Colleges and Universities.</p>
                                </div>
                                <div>
                                    <button class="cta" onClick={()=>{onOpen();setHeading("Book a Seminar")}}><span>Book a Seminar</span><svg width="15px" height="10px" viewBox="0 0 13 10"><path d="M1,5 L11,5"></path><polyline points="8 1 12 5 8 9"></polyline></svg></button>
                                    <button class="cta ms-md-3"  onClick={()=>{onOpen();setHeading("Schedule a Workshop")}}><span>Schedule a Workshop</span><svg width="15px" height="10px" viewBox="0 0 13 10"><path d="M1,5 L11,5"></path><polyline points="8 1 12 5 8 9"></polyline></svg></button>
                                    <button class="cta ms-xl-3" onClick={()=>{onOpen();setHeading("Partner with Us")}}><span>Partner with Us</span><svg width="15px" height="10px" viewBox="0 0 13 10"><path d="M1,5 L11,5"></path><polyline points="8 1 12 5 8 9"></polyline></svg></button>
                                </div>

                            </div>
                            <div className="col-lg-5  d-flex justify-content-center">
                                <div className='tr-hero-box'>
                                    <div className='tr-hero-shape-box hero-shape1'>
                                        <img src={Shape1} alt="shape-icon" className='img-fluid' />
                                    </div>
                                    <div className='tr-hero-shape-box hero-shape2'>
                                        <img src={Shape2} alt="shape-icon" className='img-fluid' />
                                    </div>
                                    <img src={HeroImg} alt="image" className='img-fluid' style={{ width: "370px" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <Modal centered show={isOpen} onHide={onClose} size='lg'>
                <ModalHeader>
                   <h2 className='text-center'> {heading} </h2>
                </ModalHeader>
                <ModalBody className='py-0 pt-4'>
                    <DemoForm heading={heading} close={onClose} />
                </ModalBody>
            </Modal>
        </>
    )
}

export default TranningHero