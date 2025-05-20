import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import quadNutLogo from '../../assets/img/quad-champs/logo.png'
import champLogo from '../../assets/img/quad-champs/logo.png';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Goal from '../../../src/assets/img/landing-page/menu.png'
import NavImg1 from '../../assets/img/quad-champs/nav-img1.png'
import NavImg2 from '../../../src/assets/img/quad-champs/nav-img2.png'
import NavImg3 from '../../../src/assets/img/quad-champs/nav-img3.png'
import NavImg4 from '../../../src/assets/img/quad-champs/nav-img4.png'
import NavImg5 from '../../../src/assets/img/quad-champs/nav-img5.png'
import NavImg6 from '../../../src/assets/img/quad-champs/nav-img6.png'
import user16 from "../../assets/img/user/user16.png";
import AuthStudent from '../../services/StudentServices';
import conf from '../../conf/conf';
import { GetCategoryHierarchy, GetSegmentHierarchy, useAuthCompany } from '../../services/AppServices';
import UseUser15MinuteTracker from './UseUser15MinuteTracker';
import { Dropdown } from 'react-bootstrap';

function NavBar() {
  const navigate = useNavigate();
  const { companyData } = useAuthCompany()
  const [urlPrefix, setUrlPrefix] = useState(
    `${conf.apiAssetUrl}/${companyData?.frontFolder}/`
  );
  const { student, logout } = AuthStudent();
  const cartRef = useRef(null);
  const studentRef = useRef(null);
  const notificationRef = useRef(null);
  const [isImage, setIsImage] = useState(true);
  const location = useLocation(); // Provides the current location object
  const [categoryTree, setCategoryTree] = useState();
  const [isLoading, setLoading] = useState(false);
  const [isLogo, setIsLogo] = useState(true);
  const [menu, setMenu] = useState(false);
  const logo = `${conf.apiAssetUrl}/${companyData.frontFolder}/logos/${companyData.logo}`;
  const [y, setY] = useState(window.scrollY);
  const [studentHead, setUserHead] = useState(false);
  const [cartHead, setCartHead] = useState(false);
  const [notificationHead, setNotificationHead] = useState(false);
  const clicked = useRef()
  clicked.current = false;

  if (student) {
    UseUser15MinuteTracker();
  }

  const toggleNotificationHead = () => {
    setNotificationHead(!notificationHead)
  }
  const logoutStudentFunction = () => {
    navigate('/student-login')
    logout();
  };
  const toggleStudentHead = () => {
    setUserHead(!studentHead);
  };
  const toggleCartHead = () => {
    setCartHead(!cartHead);
  };
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
      if (window.innerWidth > "767px") {

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
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* navigation bar */}
      <section className=''>
        <div className="container-fluid px-3 shadow-sm ">
          <Navbar expand="xl" className="py-2">
            <Navbar.Brand className='m-0'>
              <Link to="/" className="d-flex justify-content-center align-items-center text-decoration-none">
                <div className="champ-logo">
                  <img src={champLogo} alt="QuadNut Logo" />
                </div>
              </Link>
            </Navbar.Brand>
            {
              student && location.pathname !== "/student" &&

              <Navbar.Brand className='ms-auto d-xl-none d-block' >
                <ul>
                  <li className="nav-item user-nav">
                    <li className="nav-item user-nav">
                      <a
                        href="#"
                        className={`dropdown-toggle dropdown-toggle-no-after ${studentHead ? "show" : ""}`}
                        data-bs-toggle="dropdown"
                        aria-expanded={`${studentHead ? true : false}`}
                      >
                        <span className="user-img" onClick={toggleStudentHead}>
                          {isImage ? (
                            <img
                              src={`${urlPrefix}/kyc/${student?.image}`}
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
                                src={`${urlPrefix}/kyc/${student?.image}`}
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
                        <Link className="dropdown-item" onClick={e => { e.preventDefault(); navigate("/student?dashboard") }}>
                          <i className="feather-home me-1" ></i> Dashboard
                        </Link>
                        <Link className="dropdown-item" to="/student?profile">
                          <i className="feather-user me-1"></i> Profile
                        </Link>
                        <Link className="dropdown-item" to="/student?courses">
                          <i className="feather-star me-1"></i> My Learning
                        </Link>

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
                  </li>
                </ul>
              </Navbar.Brand>
            }
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto pt-3 pt-xl-0">
                <ul className="nav-links menu">
                  <li className='divider'><Link to="/" > <span><img src={Goal} className='img-fluid me-1 nav-img' /></span><span className='vertical-bottom fs-14 nav-r-txt underline-animation'>Categories</span></Link>
                    <ul className="submenu  card shadow-sm rounded-2 py-2">
                      {location?.pathname == "/up-skilling" ?
                        categoryTree?.map((parent, index) => {
                          return (
                            <li key={index}>
                              <Link to={`/category-list/${parent?.parentCategoryId}`} >
                                {parent?.parentCategoryName}
                              </Link>
                            </li>)
                        }) : <>

                          <li>
                            <Link to="" >
                              School Preparation
                            </Link>
                            {/* <ul className="submenu  card shadow-sm rounded-2 py-2">
                          <li><Link to={`/training`} className='sub-menu-items'>Training</Link></li>
                          <li><Link to={`/up-skilling`} className='sub-menu-items'>Upskilling</Link></li>
                        </ul> */}
                          </li>
                          <li>
                            <Link to="" >
                              Foundation
                            </Link>
                            {/* <ul className="submenu  card shadow-sm rounded-2 py-2">
                          <li><a target='_blank' href={`https://champ.quadnut.org`} className='sub-menu-items'>JEE Mains</a></li>
                          <li><a target='_blank' href={`https://champ.quadnut.org`} className='sub-menu-items'>JEE ADVANCED</a></li>
                          <li><a target='_blank' href={`https://champ.quadnut.org`} className='sub-menu-items'>NEET UG</a></li>
                        </ul> */}
                          </li>
                           <li><Link to="/" className='sub-menu-items'>IIT JEE</Link></li>
                          <li>
                            <Link to="" >
                              STEM Learning
                            </Link>
                            {/* <ul className="submenu  card shadow-sm rounded-2 py-2">
                          <li><a target='_blank' href={`https://champ.quadnut.org`} className='sub-menu-items'>Banking</a></li>
                          <li><a target='_blank' href={`https://champ.quadnut.org`} className='sub-menu-items'>SSC</a></li>
                          <li><a target='_blank' href={`https://champ.quadnut.org`} className='sub-menu-items'>Railways</a></li>
                        </ul> */}
                          </li>
                          <li><Link to="/" className='sub-menu-items text-nowrap'>Practical Based Learning</Link></li>
                          <li><Link to="/" className='sub-menu-items'>Olympiads</Link></li>
                         
                        </>
                      }</ul>
                  </li>

                  <li className='divider'><Link to="/" > <span><img src={NavImg1} className='img-fluid me-1 nav-img' /></span><span className='vertical-bottom fs-14 nav-r-txt underline-animation'>About Us</span></Link >
                    <ul className="submenu  card shadow-sm rounded-2 py-2">
                      <li><Link to={"/expertise"}>Our Expertise</Link></li>
                      <li><Link to={"/quality"}>Commitment to Quality</Link></li>
                      <li><Link to={"/track-record"}>Our Track Record</Link></li>
                      <li ><Link to={'testimonials-success'} className='text-nowrap'>Testimonials of Success</Link></li>

                    </ul>

                  </li>
                  <li className='divider'><Link to="/live-tuition-classes"><span><img src={NavImg2} className='img-fluid me-1 nav-img' /></span><span className='vertical-bottom fs-14 nav-r-txt underline-animation'>Live Tuition Classes</span></Link></li>
                  <li className='divider'><Link to="/recorded-courses"> <span><img src={NavImg3} className='img-fluid me-1 nav-img' /></span><span className='vertical-bottom fs-14 nav-r-txt underline-animation'>Recorded Courses</span></Link></li>
                  <li className='divider'><Link to="/blogs-list"> <span><img src={NavImg4} className='img-fluid me-1 nav-img' /></span><span className='vertical-bottom fs-14 nav-r-txt underline-animation'>Blog</span></Link></li>
                  <li className='divider'><Link to="/testimonials"> <span><img src={NavImg6} className='img-fluid me-1 nav-img' /></span><span className='vertical-bottom fs-14 nav-r-txt underline-animation'>Testimonials</span></Link></li>
                  <li className='divider'><Link to="/contact-us"> <span><img src={NavImg5} className='img-fluid me-1 nav-img' /></span><span className='vertical-bottom fs-14 nav-r-txt underline-animation'>Contact Us</span></Link></li>

                </ul>
              </Nav>
              {
                student &&
                <Navbar.Brand className='m-0 d-none d-xl-block' >
                  <ul>
                    <li className="nav-item user-nav">
                      <a
                        href="#"
                        className={`dropdown-toggle dropdown-toggle-no-after ${studentHead ? "show" : ""}`}
                        data-bs-toggle="dropdown"
                        aria-expanded={`${studentHead ? true : false}`}
                      >
                        <span className="user-img" onClick={toggleStudentHead}>
                          {isImage ? (
                            <img
                              src={`${urlPrefix}/kyc/${student?.image}`}
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
                                src={`${urlPrefix}/kyc/${student?.image}`}
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
                  </ul>
                </Navbar.Brand>
              }

            </Navbar.Collapse>

          </Navbar>
        </div>

      </section>





    </>
  )
}

export default NavBar