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
import ChampAboutus from '../../components/landingPage/ChampAboutus';
import IntoVideo from '../../components/landingPage/IntoVideo';
import ChampkeyFeatures from '../../components/landingPage/ChampkeyFeatures';


const Home2 = () => {
  const { student } = AuthStudent();
  return (
    <>
      <Head title={'QuadNut - Learning Management System'} />
      <Hero />
      {/* <SearchSection /> */}
      <WhatQuadnut />
      <ChampAboutus />
      <IntoVideo />
      <ChampkeyFeatures />
      {/* <Features /> */}
      {/* <JoinFamily /> */}
      {/* <BookSession /> */}
      {/* <TrendsCourse /> */}
      {/* <StudyResource /> */}
      {/* <TestimonialSection /> */}
      {
        student && <VideoTestimonialForm />
      }
    </>
  );
};

export default Home2;
