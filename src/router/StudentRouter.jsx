import { Outlet } from "react-router-dom";
import StudentDashboard from "../pages/student/dashboard/StudentDashboard";
import StudentAuthGuard from "../guards/AuthStudent";
import StudentLayout from "../layouts/student-layout/StudentLayout";
import Cart from "../pages/purchase/Cart";
import Checkout from "../pages/purchase/Checkout";
import Verify from "../pages/purchase/Verify";
import CourseRead from "../pages/course/CourseRead";
import Certificate from "../components/certificate/Certificate";
import Notification from "../pages/notification/Notification";
import MockCheckout from "../pages/mock/MockCheckout";
import VerifyMockOrder from "../pages/mock/MockVerifyOrder";
import ScrollToTop from "../hooks/ScrollToTop";


export const StudentRouter = [
    {
        path: '/student',
        element: <>
        <ScrollToTop />
        <StudentAuthGuard />
        <StudentLayout/></>,
        children:[
            {
                path: '',
                element: <StudentDashboard />
            },
            {
                path: 'dashboard',
                element: <StudentDashboard />
            },
            {
                path: 'cart',
                element: <Cart />
            },
            {
                path: 'checkout',
                element: <Checkout />
            },
            {
                path: 'verify-order/:id',
                element: <Verify />
            },
            {
                path: 'mock-checkout/:id/:slug',
                element: <MockCheckout />
            },
            {
                path: 'verify-mock-order/:id',
                element: <VerifyMockOrder />
            },
            {
                path: 'course-read/:id',
                element: <CourseRead />
            },
            {
                path: 'notification',
                element: <Notification />
            }
        ]
    }
]