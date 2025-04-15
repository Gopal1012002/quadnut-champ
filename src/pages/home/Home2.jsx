import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiLogIn, FiUserPlus, FiLogOut } from 'react-icons/fi';
import AuthStudent from '../../services/StudentServices';
import '../../assets/css/home.css'

import HeaderStrip from '../../components/landingPage/HeaderStrip'
import Hero from '../../components/landingPage/Hero'
import NavBar from '../../components/landingPage/NavBar'
import Features from '../../components/landingPage/Features'
import StudyResource from '../../components/landingPage/StudyResource'
import Head from '../../layouts/main-layout/head/Head';
import JoinFamily from '../../components/landingPage/JoinFamily';
import TestimonialMarquee from '../../components/landingPage/Testimonial';
import TrendsCourse from '../../components/landingPage/Trendscourse';
import TestimonialSection from '../../components/landingPage/TestimonialSection';
import SearchSection from '../../components/landingPage/SearchSection';
import BookSession from '../../components/landingPage/BookSession';
import WhatQuadnut from '../../components/landingPage/WhatQuadnut';
import VideoTestimonialForm from '../../components/landingPage/VideoTestimonialForm';







const Home2 = () => {
  const { student } = AuthStudent();
  return (
    <>
      <Head title={'QuadNut Champ - a comprehensive LMS'} />
      <Hero />
      <SearchSection />
      <WhatQuadnut />
      <Features />
      <JoinFamily />
      <BookSession />
      <TrendsCourse />
      <StudyResource />
      <TestimonialSection />
      {
        student && <VideoTestimonialForm />
      }
    </>
  );
};

export default Home2;
