import React from 'react'
import MainLayout from '../layouts/main-layout/MainLayout.jsx';
import Home from '../pages/home/Home.jsx';
import CourseDetails from '../pages/course/CourseDetails.jsx';
import InstructorDetails from '../pages/instructor/InstructorDetails.jsx';
import CourseList from '../pages/course/CourseList.jsx';
import CategoryList from '../pages/category/CategoryList.jsx';
import NotFound from '../pages/notFound/NotFound.jsx';
import TermsAndCondition from '../pages/staticPages/TermsAndCondition.jsx';
import PrivacyPolicy from '../pages/staticPages/PrivacyPolicy.jsx';
import Certificate from '../components/certificate/Certificate.jsx';
import MockDetails from '../pages/mock/MockDetails.jsx';
import ScrollToTop from '../hooks/ScrollToTop.jsx';
import Home2 from '../pages/home/Home2.jsx';
import ComingSoon from '../pages/staticPages/ComingSoon.jsx';
import ScholarShip from '../components/landingPage/ScholarShip.jsx';
import MockTest from '../components/landingPage/MockTest.jsx';
import QuadnutStore from '../components/landingPage/QuadnutStore.jsx';
import UpSkilling from '../components/landingPage/UpSkilling.jsx';
import AboutUs from '../components/landingPage/AboutUs.jsx';
import Quality from '../components/landingPage/about-us-component/Quality.jsx';
import TrackRecord from '../components/landingPage/about-us-component/TrackRecord.jsx';
import Expertise from '../components/landingPage/about-us-component/Expertise.jsx';
import TestimonialsSuccess from '../components/landingPage/about-us-component/TestimonialsSuccess.jsx';
import ScholarShipSlug from '../components/landingPage/ScholarshipSlug.jsx';
import Tranning from '../components/landingPage/Tranning/Tranning.jsx';
import SucessStories from '../components/landingPage/sucess-stories/SucessStories.jsx';
import BlogsList from '../pages/blog/BlogsList.jsx';
import BlogDetails from '../pages/blog/BlogDetails.jsx';
import ContactUs from '../components/contact/ContactUs.jsx';
import LiveTuitionClassesPage from '../pages/Classes/LiveTuitionClassesPage.jsx';
import SchoolPreparationPage from '../pages/champCategories/SchoolPreparationPage.jsx';
import FoundationPage from '../pages/champCategories/FoundationPage.jsx';
import IITPage from '../pages/champCategories/IITPage.jsx';
export const MainRouter = [
    {
        path: '/',
        element: <>
            <ScrollToTop />
            <MainLayout />
        </>,
        children: [
            {
                path: '',
                // element: <Home />
                element: <Home2 />
            },
            {
                path: 'course-details/:id',
                element: <CourseDetails />
            },
            {
                path: 'course-details/:id/:slug',
                element: <CourseDetails />
            },
            {
                path: 'instructor-details/:id',
                element: <InstructorDetails />
            },
            {
                path: 'course-list',
                element: <CourseList />
            },
            {
                path: 'course-list/:id',
                element: <CourseList />
            },
            {
                path: 'category-list',
                element: <CategoryList />
            },
            {
                path: 'category-list/:id',
                element: <CategoryList />
            },
            {
                path: 'category/:id',
                element: <CategoryList />
            },
            {
                path: 'category',
                element: <CategoryList />
            },
            {
                path: 'about-us',
                element: <AboutUs />
            },
            {
                path: 'quality',
                element: <Quality />
            },
            {
                path: 'track-record',
                element: <TrackRecord />
            },
            {
                path: 'expertise',
                element: <Expertise />
            },
            {
                path: 'testimonials-success',
                element: <TestimonialsSuccess />
            },
            {
                path: 'mock-details/:slug',
                element: <MockDetails />
            },
            {
                path: 'coming-soon',
                element: <ComingSoon />
            },
            {
                path: 'training',
                element: <Tranning />
            },
            {
                path: 'terms-and-conditions',
                element: <TermsAndCondition />
            },
            {
                path: 'privacy-policy',
                element: <PrivacyPolicy />
            },
            {
                path: 'scholarship',
                element: <ScholarShip />
            },
            {
                path: 'scholarship/:slug',
                element: <ScholarShipSlug />
            },
            {
                path: 'mock-tests',
                element: <MockTest />
            },
            {
                path: 'quadNut-store',
                element: <QuadnutStore />
            },
            {
                path: 'up-skilling',
                element: <UpSkilling />
            },
            {
                path: 'success-stories',
                element: <SucessStories />
            },
            {
                path: 'blogs-list',
                element: <BlogsList />
            },
            {
                path: 'blogs-details',
                element: <BlogDetails />
            },
            {
                path: 'live-tuition-classes',
                element: <ComingSoon />
            },

            {
                path: "school-preparation",
                element: <SchoolPreparationPage />
            },
             {
                path: "foundation",
                element: <FoundationPage />
            },
               {
                path: "iit-jee",
                element: <IITPage />
            },
            {
                path: 'testimonials',
                element: <SucessStories />
            },

            {
                path: 'recorded-courses',
                element: <CourseList />
            },

            {
                path: 'contact-us',
                element: <ContactUs />
            },
            {
                path: '*',
                element: <ComingSoon />
            }
        ]
    }
]