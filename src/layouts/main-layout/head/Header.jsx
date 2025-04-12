import React, { useEffect, useRef, useState } from "react";
import defaultLogo from "../../../assets/img/defaultLogo.png";
import conf from "../../../conf/conf";
import { Link, useLocation } from "react-router-dom";
import { GetCategoryHierarchy, useAuthCompany } from "../../../services/AppServices";
import user16 from "../../../assets/img/user/user16.png";
import cartIcon from "../../../assets/img/icon/cart.svg";
import wishIcon from "../../../assets/img/icon/wish.svg";
import notificationIcon from "../../../assets/img/icon/notification.svg";
import NotificationHeader from "../../../components/header/NotificationHeader";
import AuthStudent from "../../../services/StudentServices";
import { toast } from "react-toastify";
import CartHeader from "../../../components/header/CartHeader";
const Header = () => {
  const {companyData} = useAuthCompany()
  const [urlPrefix, setUrlPrefix] = useState(
    `${conf.apiAssetUrl}/${companyData?.frontFolder}/kyc`
  );
  const { student, logout } = AuthStudent();
  const cartRef = useRef(null);
  const studentRef = useRef(null);
  const notificationRef = useRef(null);
  const [isImage, setIsImage] = useState(true);
  const [isStudent, setIsStudent] = useState(student ? true : false);
  const location = useLocation(); // Provides the current location object
  const [currentUrl, setCurrentUrl] = useState(location.pathname); // Initial state based on URL
  const [categoryTree, setCategoryTree] = useState();
  const [isLoading, setLoading] = useState(false);
  const [isLogo, setIsLogo] = useState(true);
  const [menu, setMenu] = useState(false);
  const logo = `${conf.apiAssetUrl}/${companyData?.frontFolder}/logos/${companyData?.logo}`;
  const [y, setY] = useState(window.scrollY);
  const [studentHead, setUserHead] = useState(false);
  const [cartHead, setCartHead] = useState(false);
  const [notificationHead, setNotificationHead] = useState(false);

  const toggleNotificationHead = () => {
    setNotificationHead(!notificationHead)
  }
  const logoutStudentFunction = () => {
    logout();
  };
  const toggleStudentHead = () => {
    setUserHead(!studentHead);
  };
  const toggleCartHead = () => {
    setCartHead(!cartHead);
  };
  useEffect(() => {
    // Update currentUrl whenever the location changes
    setCurrentUrl(location.pathname);
  }, [location]);
  const toggleMenu = () => {
    setMenu(!menu);
  };
  useEffect(() => {
    const header = document.querySelector(".header");
  });
  useEffect(() => {
    setLoading(true);
    GetCategoryHierarchy()
      .then((res) => {
        setCategoryTree(res?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const handleNavigation = (e) => {
    const window = e.currentTarget;
    setY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", (e) => handleNavigation(e));

    return () => {
      // return a cleanup function to unregister our function since it will run multiple times
      window.removeEventListener("scroll", (e) => handleNavigation(e));
    };
  }, [y]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        // setIsInside(false);
        setCartHead(false);
      }
      if (studentRef.current && !studentRef.current.contains(event.target)) {
        // setIsInside(false);
        setUserHead(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationHead(false)
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={`header light ${menu ? "menu-opened" : ""} `}>
      <div
        className={`header-fixed ${currentUrl?.split("/")[1] === "student" ? "bg-white" : ""
          }`}
      >
        <nav
          className={`navbar navbar-expand-lg header-nav scroll-sticky ${y ? "add-header-bg" : ""
            }`}
        >
          <div className="container">
            <div className="navbar-header">
              <div id="mobile_btn" to="" onClick={toggleMenu}>
                <span className="bar-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
              <Link to="/" className="navbar-brand logo">
                <img
                  src={isLogo ? logo : defaultLogo}
                  onError={() => {
                    setIsLogo(false);
                  }}
                  className="img-fluid"
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="main-menu-wrapper">
              <div className="menu-header">
                <Link to="/" className="menu-logo">
                  <img src={logo} className="img-fluid" alt="Logo" />
                </Link>
                <p id="menu_close" className="menu-close" to="">
                  <i className="fas fa-times" onClick={toggleMenu}></i>
                </p>
              </div>
              <ul className="main-nav">
                <li
                  className={`has-submenu ${currentUrl == "/" ? "active" : ""
                    } `}
                >
                  <Link className="" to="/">
                    Home
                    {/* <i className="fas fa-chevron-down"></i> */}
                  </Link>
                </li>
                <li className="has-submenu">
                  <Link to="/category">
                    Category <i className="fas fa-chevron-down"></i>
                  </Link>
                  <ul className="submenu">
                    {categoryTree?.length > 0 &&
                      categoryTree?.map((res) => {
                        return (
                          <li key={res?.parentCategoryId}>
                            <Link
                              key={res?.parentCategoryId}
                              to={`/category/${res?.parentCategoryId}`}
                            >
                              {res?.parentCategoryName}
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </li>
                <li
                  className={`has-submenu ${currentUrl == "/course-list" ? "active" : ""
                    } `}
                >
                  <Link to="/course-list">Courses</Link>
                </li>
                <li
                  className={`d-block d-md-none has-submenu ${currentUrl == "/student-login" ? "active" : ""
                    } `}
                >
                  <Link to="/student-login"> {isStudent ? 'Dashboard' : 'Login'} </Link>
                </li>
                {
                  isStudent ? <li
                    className={`d-block d-md-none has-submenu `}
                    onClick={logoutStudentFunction}
                  >
                    <Link to="">Logout</Link>
                  </li> :
                    <li
                      className={`d-block d-md-none has-submenu ${currentUrl == "/student-register" ? "active" : ""
                        } `}
                    >
                      <Link to="/student-register">Register</Link>
                    </li>
                }

              </ul>
            </div>
            <ul className="nav header-navbar-rht">
              {isStudent && (
                <>
                  <li className={`nav-item ${isStudent ? "extra-width" : ""}`}>
                    <div>
                      <Link
                        to=""
                        id="dark-mode-toggle"
                        className="dark-mode-toggle"
                      >
                        <i className="fa-solid fa-moon"></i>
                      </Link>
                      <Link
                        to=""
                        id="light-mode-toggle"
                        className="dark-mode-toggle "
                      >
                        <i className="fa-solid fa-sun"></i>
                      </Link>
                    </div>
                  </li>
                  <li className={`nav-item cart-nav `}>
                    <a
                      href="#"
                      className={`dropdown-toggle ${cartHead ? "show" : ""}`}
                      data-bs-toggle="dropdown"
                      aria-expanded={`${cartHead ? true : false}`}
                    >
                      <img src={cartIcon} alt="img" onClick={toggleCartHead} />
                    </a>
                    <div
                      className={`wishes-list dropdown-menu dropdown-menu-right ${cartHead ? "show" : ""
                        }`}
                      data-popper-placement="bottom-end"
                      data-bs-popper={`${cartHead ? "static" : ""}`}
                      ref={cartRef}
                    >
                      <CartHeader />
                    </div>
                  </li>
                  <li className="nav-item noti-nav">
                    <a
                      href="#"
                      className={`dropdown-toggle ${notificationHead ? "show" : ""}`}
                      data-bs-toggle="dropdown"
                      aria-expanded={`${notificationHead ? true : false}`}
                    >
                      <img src={notificationIcon} onClick={toggleNotificationHead} alt="img" />
                    </a>
                    <div className={`notifications dropdown-menu dropdown-menu-right ${notificationHead ? 'show' : ''} `}
                      data-popper-placement="bottom-end"
                      data-bs-popper={`${notificationHead ? 'static' : ''} `}
                      ref={notificationRef}
                    >
                     <NotificationHeader />
                    </div>
                  </li>
                </>
              )}

              {!isStudent ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link header-sign" to="/student-login">
                      Sign In
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link header-login"
                      to="/student-register"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item user-nav">
                  <a
                    href="#"
                    className={`dropdown-toggle ${studentHead ? "show" : ""}`}
                    data-bs-toggle="dropdown"
                    aria-expanded={`${studentHead ? true : false}`}
                  >
                    <span className="user-img" onClick={toggleStudentHead}>
                      {isImage ? (
                        <img
                          src={`${urlPrefix}/${student?.image}`}
                          alt="User Image"
                          onError={() => setIsImage(false)}
                          className="avatar-img rounded-circle"
                        />
                      ) : (
                        <img
                          src={user16}
                          alt="User Image"
                          className="avatar-img rounded-circle"
                        />
                      )}
                      <span className="status online"></span>
                    </span>
                  </a>
                  <div
                    ref={studentRef}
                    className={`users dropdown-menu dropdown-menu-right ${studentHead ? "show" : ""
                      }`}
                    data-popper-placement="bottom-end"
                    data-bs-popper={`${studentHead ? "static" : ""}`}
                  >
                    <div className="user-header">
                      <div className="avatar avatar-sm">
                        {isImage ? (
                          <img
                            src={`${urlPrefix}/${student?.image}`}
                            alt="User Image"
                            onError={() => setIsImage(false)}
                            className="avatar-img rounded-circle"
                          />
                        ) : (
                          <img
                            src={user16}
                            alt="User Image"
                            className="avatar-img rounded-circle"
                          />
                        )}
                      </div>
                      <div className="user-text">
                        <h6>{student?.name ?? "Student Name"}</h6>
                        <p className="text-muted mb-0">Student</p>
                      </div>
                    </div>
                    <Link className="dropdown-item" to="/student?dashboard">
                      <i className="feather-home me-1"></i> Dashboard
                    </Link>
                    <Link className="dropdown-item" to="/student?profile">
                      <i className="feather-user me-1"></i> Profile
                    </Link>
                    <Link className="dropdown-item" to="/student?courses">
                      <i className="feather-star me-1"></i> My Learning
                    </Link>
                    {/* <Link className="dropdown-item" to="/student?support">
                      <i className="feather-star me-1"></i> Chat
                    </Link> */}

                    <Link
                      className="dropdown-item"
                      to=""
                      onClick={logoutStudentFunction}
                    >
                      <i className="feather-log-out me-1"></i>
                      Logout
                    </Link>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
