import React, { useState, useEffect } from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";

const PopupTwo = ({ heading, description, isLink, link }) => {
    return (
        <Container fluid className="banner-container-2 text-center py-5">
            <Row className="justify-content-center">
                <Col md={8} lg={8} className="p-4 banner-content">
                    <h1 className="fw-bold">{heading}</h1>
                    <p className="mt-3">
                        {description}
                    </p>
                    {
                        isLink === 'YES' && <Col md="4 mx-auto">
                            <a href={link} target="_blank"> <Button className="bg-info"> Register Here</Button></a>
                        </Col>
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default PopupTwo;
