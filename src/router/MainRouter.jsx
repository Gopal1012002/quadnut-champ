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
                path:'course-details/:id',
                element:<CourseDetails />
            },
            {
                path:'course-details/:id/:slug',
                element:<CourseDetails />
            },
            {
                path:'instructor-details/:id',
                element:<InstructorDetails />
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
                path: 'mock-details/:slug',
                element: <MockDetails />
            },
            {
                path: 'coming-soon',
                element: <ComingSoon />
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
                path:'*',
                element: <ComingSoon />
            }
        ]
    }
]