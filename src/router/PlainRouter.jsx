import Certificate from "../components/certificate/Certificate";
import PopupOne from "../components/popups/PopupOne";
import Home2 from "../pages/home/Home2";
import MockAttempt from "../pages/mock/mockAttempt/MockAttempt";


export const PlainRouter = [
    {
        path: '/certificate-status/:id',
        element: <Certificate />
    },
    {
        path: '/mock-attempt/:id/:slug',
        element: <MockAttempt />
    },
    {
        path: '/home-page-2',
        element: <Home2 />
    },
    {
        path: '/popup-banner',
        element: <PopupOne />
    },
]