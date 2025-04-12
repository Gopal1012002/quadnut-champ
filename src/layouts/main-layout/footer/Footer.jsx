import React, { useState } from 'react'
import conf from '../../../conf/conf'
import logo from "../../../assets/img/logo.svg";
import icon19 from "../../../assets/img/icon/icon-19.svg";
import icon20 from "../../../assets/img/icon/icon-20.svg";
import icon21 from "../../../assets/img/icon/icon-21.svg";
import { Link } from 'react-router-dom';
import { Button, Row } from 'react-bootstrap';
import Header from '../head/Header';
import AuthStudent from '../../../services/StudentServices';
import defaultLogo from "../../../assets/img/defaultLogo.png";
import instagramIcon from "../../../assets/img/icon/instagram.png"
import linkedinIcon from "../../../assets/img/icon/linkedin.png"
import telegramIcon from "../../../assets/img/icon/telegram.png"
import threadsIcon from "../../../assets/img/icon/threads.png"
import twitterIcon from "../../../assets/img/icon/twitter.png"
import whatsappIcon from "../../../assets/img/icon/whatsapp.png"
import youtubeIcon from "../../../assets/img/icon/youtube.png"

const Footer = ({ companyData }) => {
  const [urlPrefix, setUrlPrefix] = useState(`${conf.apiAssetUrl}/${companyData?.frontFolder}/logos/`)
  const [islogo, setLogo] = useState(true);
  const student = AuthStudent();
 
  return (<>
    <footer className={process.env.REACT_APP_PROJECTNAME === 'AWLMS' ? "footer" : "footer purple"}>
      {/* <!-- Footer Top --> */}
      <div className="footer-top " >
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              {/* <!-- Footer Widget --> */}
              <div className="footer-widget footer-about">
                <div className="footer-logo">
                  {
                    islogo ? <>
                    {console.log(`${urlPrefix}${'logo-1743513080570-156339356.jpg'}`)}
                      <img src={`${urlPrefix}${companyData?.logo}`} alt="logo"
                        style={{ maxHeight: '100px', width: '170px' }}
                        onError={(e) => e.target.src = defaultLogo}
                      />
                    </> : <>
                      <img src={logo} alt="logo" />
                    </>
                  }

                </div>
                <div className="footer-about-content">
                  <p className={process.env.REACT_APP_PROJECTNAME === "AWLMS" ? "" : "text-light"}>
                    {
                      companyData?.description
                    }
                  </p>
                </div>

                <div className="footer-about-social my-2">
                    <ul className=' d-flex flex-row justify-content-evenly text-light'>
                      <li>
                        <a href={`https://${companyData?.instagram}`} target="_blank">
                          <img src={instagramIcon} alt="instagram_icon" className='social-icon' />
                        </a>
                      </li>

                      <li>
                        <a href={`https://${companyData?.linkedin}`} target="_blank">
                        <img src={linkedinIcon} alt="linkedin_icon" className='social-icon' />
                        </a>
                      </li>

                      <li>
                        <a href={`https://${companyData?.telegram}`} target="_blank">
                        <img src={telegramIcon} alt="telegram_icon" className='social-icon' />
                        </a>
                      </li>

                      <li>
                        <a href={`https://${companyData?.threads}`} target="_blank">
                        <img src={threadsIcon} alt="threads_icon" className='social-icon' />
                        </a>
                      </li>

                      <li>
                        <a href={`https://${companyData?.twitter}`} target="_blank">
                        <img src={twitterIcon} alt="twitter_icon" className='social-icon' />
                        </a>
                      </li>

                      <li>
                        <a href={`https://api.whatsapp.com/send?phone=${companyData?.whatsappNumber}`} target="_blank">
                        <img src={whatsappIcon} alt="twitter_icon" className='social-icon' />
                        </a>
                      </li>

                      <li>
                        <a href={`https://${companyData?.youtube}`} target="_blank">
                        <img src={youtubeIcon} alt="twitter_icon" className='social-icon' />
                        </a>
                      </li>

                    </ul>
                </div>
              </div>
              {/* <!-- /Footer Widget --> */}
            </div>

            <div className="col-lg-2 col-md-6">
              {/* <!-- Footer Widget --> */}
              {/* <div className="footer-widget footer-menu">
                    <h2 className="footer-title">For Instructor</h2>
                    <ul>
                      <li>
                        <Link to="instructor-profile.html">Profile</Link>
                      </li>
                      <li>
                        <Link to="login.html">Login</Link>
                      </li>
                      <li>
                        <Link to="register.html">Register</Link>
                      </li>
                      <li>
                        <Link to="instructor-list.html">Instructor</Link>
                      </li>
                      <li>
                        <Link to="instructor-dashboard.html"> Dashboard</Link>
                      </li>
                    </ul>
                  </div> */}
              {/* <!-- /Footer Widget --> */}
            </div>

            <div className="col-lg-2 col-md-6">
              {/* <!-- Footer Widget --> */}
              <div className="footer-widget footer-menu">
                <h2 className={process.env.REACT_APP_PROJECTNAME === "AWLMS" ? "footer-title" : "footer-title text-light"}>For Student</h2>
                {
                  student?.student ?
                    <ul>
                      <li>
                        <Link to="/student?profile" className={process.env.REACT_APP_PROJECTNAME === "AWLMS" ? "" : " text-light"}>Profile</Link>
                      </li>
                      <li>
                        <Link to="/student-login" className={process.env.REACT_APP_PROJECTNAME === "AWLMS" ? "" : " text-light"}>Student</Link>
                      </li>
                      <li>
                        <Link to="/student?dashboard" className={process.env.REACT_APP_PROJECTNAME === "AWLMS" ? "" : " text-light"}> Dashboard</Link>
                      </li>
                      <li>
                        <Link to="/category" className={process.env.REACT_APP_PROJECTNAME === "AWLMS" ? "" : " text-light"}>Explore</Link>
                      </li>
                      <li>
                        <Link to="/course-list" className={process.env.REACT_APP_PROJECTNAME === "AWLMS" ? "" : " text-light"}>Courses</Link>
                      </li>
                    </ul> :
                    <ul>
                      <li>
                        <Link to="/student-login" className={process.env.REACT_APP_PROJECTNAME === "AWLMS" ? "" : " text-light"}>Login</Link>
                      </li>
                      <li>
                        <Link to="/student-register" className={process.env.REACT_APP_PROJECTNAME === "AWLMS" ? "" : " text-light"}>Register</Link>
                      </li>
                      <li>
                        <Link to="/category" className={process.env.REACT_APP_PROJECTNAME === "AWLMS" ? "" : " text-light"}>Explore</Link>
                      </li>
                      <li>
                        <Link to="/course-list" className={process.env.REACT_APP_PROJECTNAME === "AWLMS" ? "" : " text-light"}>Courses</Link>
                      </li>
                    </ul>
                }

              </div>
              {/* <!-- /Footer Widget --> */}
            </div>

            <div className="col-lg-4 col-md-6">
              {/* <!-- Footer Widget --> */}
              <div className="footer-widget footer-contact">
                <h2 className="footer-title text-light">News letter</h2>
                <div className="news-letter">
                  <form onClick={(e) => e.preventDefault()}>
                    <Row>
                      <div className='col-8'>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your email address"
                          name="email"
                        />
                      </div>
                      <div className=' col-4'>
                        <Button className={`form-control ${process.env.REACT_APP_PROJECTNAME === "AWLMS" ? "" : "text-white"}  btn btn-primary rounded-sm`}>
                          Submit
                        </Button>
                      </div>

                    </Row>


                  </form>
                </div>
                <div className="footer-contact-info">
                  <div className="footer-address">
                    <img src={icon20} alt="Img" className="img-fluid" />
                    <p className={process.env.REACT_APP_PROJECTNAME === "AWLMS" ? "" : " text-light"}>
                      {" "}
                      {companyData?.address}
                    </p>
                  </div>
                  <p className={process.env.REACT_APP_PROJECTNAME === "AWLMS" ? "" : " text-light"}>
                    <img src={icon19} alt="Img" className="img-fluid " />
                    {companyData?.email}
                  </p>
                  <p className={process.env.REACT_APP_PROJECTNAME === "AWLMS" ? "mb-0" : "mb-0 text-light"}>
                    <img src={icon21} alt="Img" className="img-fluid  text-light" />
                    +91 {companyData?.contactNo}
                  </p>
                </div>
              </div>
              {/* <!-- /Footer Widget --> */}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Footer Top --> */}

      {/* <!-- Footer Bottom --> */}
      <div className="footer-bottom border-top mt-1">
        <div className="container">
          {/* <!-- Copyright --> */}
          <div className="copyright">
            <div className="row">
              <div className="col-md-6">
                <div className="privacy-policy">
                  <ul>
                    <li>
                      <Link to="/terms-and-conditions" className={process.env.REACT_APP_PROJECTNAME === "AWLMS" ? "" : " text-light"}>Terms & Condition</Link>
                    </li>
                    <li>
                      <Link to="/privacy-policy" className={process.env.REACT_APP_PROJECTNAME === "AWLMS" ? "" : " text-light"}>Privacy & Policy</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="copyright-text">
                  <p className={process.env.REACT_APP_PROJECTNAME === "AWLMS" ? "mb-0" : "mb-0 text-light"}>
                    &copy; {companyData?.copyright}.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- /Copyright --> */}
        </div>
      </div>
      {/* <!-- /Footer Bottom --> */}
    </footer>
  </>)
}

export default Footer