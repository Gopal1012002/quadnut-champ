import React, { useState, useEffect } from "react";
import { Modal, Button, Container, Row, Col, Card } from "react-bootstrap";

const PopupOne = ({ heading, description, isLink, link }) => {
  return (
    <Card className="border-0 border-rounded-0 text-center p-5 m-0 webinar-banner text-white mb-0" style={{ borderRadius: '0px' }}>
      <h2 className="fw-bold text-white"> {heading} </h2>
      <p> {description} </p>
      {
        isLink === 'YES' && <Col md="4 mx-auto">
         <a href={link} target="_blank"> <Button className="bg-info"> Read More... 🔍</Button></a>
        </Col>
      }

    </Card>
  );
};

export default PopupOne;
