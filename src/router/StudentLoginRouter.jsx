import StudentLoginAuthGuard from "../guards/AuthStudentLogin";
import MainLayout from "../layouts/main-layout/MainLayout";
import StudentLoginLayout from "../layouts/student-login-layout/StudentLoginLayout";
import NotFound from "../pages/notFound/NotFound";
import StudentForgotPassword from "../pages/student/auth/StudentForgotPassword";
import StudentLogin from "../pages/student/auth/StudentLogin";
import StudentRegister from "../pages/student/auth/StudentRegister";


export const StudentLoginRouter = [
    {
        path:'/',
        element:<>
        <StudentLoginAuthGuard />
        <StudentLoginLayout />
        </>,
        children:[
            {
                path:'student-register',
                element: <StudentRegister />
            },
            {
                path:'student-login',
                element: <StudentLogin />
            },
            {
                path:'student-forgot-password',
                element: <StudentForgotPassword />
            },
        ]
    }
]