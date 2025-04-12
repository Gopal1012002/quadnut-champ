
import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdCloseCircle } from "react-icons/io";
import '../../../assets/css/TwoFactorAuthenticationOtp.css'

const TwoFactorAuthenticationOtp = (props) => {

    useEffect(() => {

        function hanyaAngka(event) {
            var angka = (event.which) ? event.which : event.keyCode
            if (angka != 46 && angka > 31 && (angka < 48 || angka > 57))
                return false;
            return true;
        }
        const inputs = document.querySelectorAll('.otp-input input');

        inputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                if (e.target.value.length > 1) {
                    e.target.value = e.target.value.slice(0, 1);
                }
                if (e.target.value.length === 1) {
                    if (index < inputs.length - 1) {
                        inputs[index + 1].focus();
                    }
                }
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && !e.target.value) {
                    if (index > 0) {
                        inputs[index - 1].focus();
                    }
                }
                if (e.key === 'e') {
                    e.preventDefault();
                }
            });
        });
    }, );
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header  >
                <div className="d-flex justify-content-end">
                    <Modal.Title id="contained-modal-title-vcenter" >
                        <span>TWO-FACTOR AUTHENTICATION</span>
                    </Modal.Title>
                    <a href="#" className="text-end ms-5" onClick={props.onHide} ><IoMdCloseCircle /></a>
                </div>
            </Modal.Header>
            <Modal.Body>
                <form id="form">
                    <Row>

                        <Col md="12">
                            <label>Enter 6-digit code from your authenticator application</label>
                            <div className="otp-input" id="num_otp">
                                <input type="number" min="0" max="9" required name="num_otp" onkeypress="return hanyaAngka(event)" />
                                <input type="number" min="0" max="9" required name="num_otp" onkeypress="return hanyaAngka(event)" />
                                <input type="number" min="0" max="9" required name="num_otp" onkeypress="return hanyaAngka(event)" />
                                <input type="number" min="0" max="9" required name="num_otp" onkeypress="return hanyaAngka(event)" />
                                <input type="number" min="0" max="9" required name="num_otp" onkeypress="return hanyaAngka(event)" />
                                <input type="number" min="0" max="9" required name="num_otp" pattern="[0-9]"
                                    onkeypress="return hanyaAngka(event)" />
                            </div>

                        </Col>

                        <Col md="12" className="d-flex justify-content-center gap-2 mt-2">
                            <Button >Continue</Button>
                        </Col>

                    </Row>
                </form>
            </Modal.Body>


        </Modal>
    )
}

export default TwoFactorAuthenticationOtp