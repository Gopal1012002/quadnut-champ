import logo from './logo.svg';
import './App.css';
import Home from './pages/home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/feather.css'
import './assets/css/style.css'
import './assets/plugins/fontawesome/css/fontawesome.min.css';
import './assets/plugins/fontawesome/css/all.min.css'
import './assets/css/owl.carousel.min.css'
import './assets/css/owl.theme.default.min.css'
import './assets/plugins/select2/css/select2.min.css';
import './assets/css/custom.css'
import './assets/css/shimmer.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainRouter } from './router/MainRouter';
import conf from './conf/conf';
import { StudentLoginRouter } from './router/StudentLoginRouter';
import { ToastContainer } from 'react-toastify';
import { StudentRouter } from './router/StudentRouter';
import NotFound from './pages/notFound/NotFound';
import { PlainRouter } from './router/PlainRouter';
import ScrollToTop from './hooks/ScrollToTop';
import { useEffect } from 'react';
import PreventF11 from './utils/PreventF11';
 
function App() {
  const preventRightClick = e => e.preventDefault();

  const preventPrint = () => {
    window.alert("This feature is not available in this version.");
  };

  const handleKeyDown = (e) => {
    // Check if the event target is within a form element
    const isWithinForm = e.target.closest('form');
    // if (e.key === "F11") {
    //   e.preventDefault(); // Prevent default fullscreen behavior
    //   alert("F11 is disabled on this page!");
    //   return;
    // }
    // Prevent default behavior only if the event target is not within a form element
    if (!isWithinForm) {
      e.preventDefault();
    }
    

  };

  useEffect(() => {
  //   document.addEventListener("keydown", function (event) {
  //     const blockedKeys = [
  //         "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"
  //     ];
  
  //     // Check if page is in fullscreen mode
  //     const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
  
  //     if (
  //         event.ctrlKey && (event.key.toLowerCase() === "r" || event.key.toLowerCase() === "f5") || // Block Ctrl+R, Ctrl+Shift+R, Ctrl+F5
  //         event.metaKey && (event.key.toLowerCase() === "r" || event.key.toLowerCase() === "f5") || // Block Cmd+R (Mac)
  //         blockedKeys.includes(event.key) || // Block function keys F1 - F12
  //         (isFullscreen && event.key === "F11") // Specifically block F11 in fullscreen
  //     ) {
  //         event.preventDefault();
  //         event.stopPropagation();
  //         console.log("Blocked:", event.key);
  //     }
  // });
  
  
  //   document.addEventListener("keydown", function (event) {
  //     if (
  //         event.ctrlKey || // Detect if Ctrl is pressed
  //         event.metaKey || // Detect if Command key (Mac) is pressed
  //         (event.keyCode >= 112 && event.keyCode <= 123) // Detect function keys (F1 to F12)
  //     ) {
  //         event.preventDefault();
  //         event.stopPropagation();
  //         console.log("Blocked:", event.key);
  //     }
  // });
  

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', preventRightClick);
      window.removeEventListener("beforeprint", preventPrint);
      // document.removeEventListener("keydown", handleKeyDown);
    //   document.addEventListener("keydown", function (event) {
    //     const blockedKeys = [
    //         "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"
    //     ];
    
    //     // Check if page is in fullscreen mode
    //     const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
    
    //     if (
    //         event.ctrlKey && (event.key.toLowerCase() === "r" || event.key.toLowerCase() === "f5") || // Block Ctrl+R, Ctrl+Shift+R, Ctrl+F5
    //         event.metaKey && (event.key.toLowerCase() === "r" || event.key.toLowerCase() === "f5") || // Block Cmd+R (Mac)
    //         blockedKeys.includes(event.key) || // Block function keys F1 - F12
    //         (event.key === "F11") // Specifically block F11 in fullscreen
    //     ) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //         console.log("Blocked:", event.key);
    //     }
    // });
    };
  }, []); 
  const AppRouter = createBrowserRouter([
    ...MainRouter,
    ...StudentLoginRouter,
    ...StudentRouter,
    ...PlainRouter,
    {
      path: "*",
      element: <NotFound />,
    }
  ],  { basename: conf.basename })
  return (<>
  {/* <ScrollToTop /> */}
  <RouterProvider router={AppRouter}>
  {/* <PreventF11/> */}
  </RouterProvider>
    {/* <Home />  */}
  </>);
}

export default App;
