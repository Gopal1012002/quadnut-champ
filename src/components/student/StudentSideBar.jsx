import React, { useState } from "react";
import user16 from "../../assets/img/user/user16.png";
import { Link, useSearchParams } from "react-router-dom";
import AuthStudent from "../../services/StudentServices";
import { useAuthCompany } from "../../services/AppServices";
import conf from "../../conf/conf";

const StudentSideBar = ({ current, setCurrentFunc }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { logout, student } = AuthStudent();
  const { companyData } = useAuthCompany();
  const [isImage, setIsImage] = useState(true);
  const [urlPrefix, setUrlPrefix] = useState(
    `${conf.apiAssetUrl}/${companyData?.frontFolder}/kyc`
  );
  return (
    <>
      <div className="col-xl-3 col-lg-3 theiaStickySidebar">
        <div className="settings-widget dash-profile">
          <div className="settings-menu">
            <div className="profile-bg">
              <div className="profile-img">
                <Link to="">
                  {isImage ? (
                    <img
                      src={`${urlPrefix}/${student?.image}`}
                      onError={() => setIsImage(false)}
                      alt="Img"
                    />
                  ) : (
                    <img src={user16} alt="Img" />
                  )}
                </Link>
              </div>
            </div>
            <div className="profile-group">
              <div className="profile-name text-center" onClick={()=>{setCurrentFunc("MyProfile");  setSearchParams({'tab':"MyProfile"})}}>
                <h4>
                  <Link to="">{student?.name}</Link>
                </h4>
                <p>Student</p>
              </div>
            </div>
          </div>
        </div>
        <div className="settings-widget account-settings">
          <div className="settings-menu">
            <h3>Dashboard</h3>
            <ul>
              <li
                className={`nav-item ${current === "Dashboard" ? "active" : ""
                  }`}
                onClick={() =>{ setCurrentFunc("Dashboard"); setSearchParams({'tab':"Dashboard"})}}
              >
                <Link to="" className="nav-link">
                <i className="fas fa-tachometer-alt"></i>Dashboard
                </Link>
              </li>
              <li
                className={`nav-item ${current === "MyProfile" ? "active" : ""
                  }`}
                onClick={() =>{ setCurrentFunc("MyProfile");  setSearchParams({'tab':"MyProfile"})}}
              >
                <Link to="" className="nav-link">
                <i className="fa-solid fa-user"></i>My Profile
                </Link>
              </li>
              <li
                className={`nav-item ${current === "EnrolledCourses" ? "active" : ""
                  }`}
                  onClick={() =>{ setCurrentFunc("EnrolledCourses");  setSearchParams({'tab':"EnrolledCourses"})}}
              >
                <Link
                  to=""
                  className="nav-link"
                  
                >
                  <i className="fa-solid fa-graduation-cap"></i>Enrolled Courses
                </Link>
              </li>
              <li
                className={`nav-item ${current === "EnrolledMocks" ? "active" : ""
                  }`}
                  onClick={() =>{ setCurrentFunc("EnrolledMocks"); setSearchParams({'tab':"EnrolledMocks"})}}
              >
                <Link
                  to=""
                  className="nav-link"
                  
                >
                  <i className="fa-solid fa-file-circle-question"></i>Enrolled Tests
                </Link>
              </li>
              <li
                className={`nav-item ${current === "MyQuizAttempts" ? "active" : ""
                  }`}
                  onClick={() =>{ setCurrentFunc("MyQuizAttempts");  setSearchParams({'tab':"MyQuizAttempts"})}}
              >
                <Link to="" className="nav-link"
                 
                >
                  <i className="fa-solid fa-shapes"></i>My Quiz Attempts
                </Link>
              </li>
              <li
                className={`nav-item ${current === "OrderHistory" ? "active" : ""
                  }`}
                  onClick={() =>{ setCurrentFunc("OrderHistory");  setSearchParams({'tab':"OrderHistory"})}}
              >
                <Link to="" className="nav-link" >
                <i className="fab fa-first-order"></i>Order History
                </Link>
              </li>
              <li
                className={`nav-item ${current === "Wishlist" ? "active" : ""}`}
                onClick={() =>{ setCurrentFunc("Wishlist"); setSearchParams({'tab':"Wishlist"})}}
              >
                <Link to="" className="nav-link" >
                <i className="fa-solid fa-heart"></i>Wishlist
                </Link>
              </li>
              <li
                className={`nav-item ${current === "CertificateList" ? "active" : ""}`}
                onClick={() => {setCurrentFunc("CertificateList"); setSearchParams({'tab':"CertificateList"})}}
              >
                <Link to="" className="nav-link"
                 
                >
                  <i className="fa fa-certificate" aria-hidden="true"></i>Certificate List
                </Link>
              </li>
              <li
                className={`nav-item ${current === "Reviews" ? "active" : ""}`}
                onClick={() =>{ setCurrentFunc("Reviews");  setSearchParams({'tab':"Reviews"})}}
              >
                <Link to="" className="nav-link"
                  
                >
                  <i className="fa-solid fa-star"></i>Reviews
                </Link>
              </li>

              <li
                className={`nav-item ${current === "Support" ? "active" : ""}`}
                onClick={() =>{ setCurrentFunc("Support"); setSearchParams({'tab':"Support"})}}
              >
                <Link to="" className="nav-link"
                  
                >
                  <i className="fa-solid fa-ticket"></i>Support Ticket
                </Link>
              </li>
              {/* <li
                className={`nav-item ${
                  current === "Question&Answer" ? "active" : ""
                }`}
              >
                <Link to="" className="nav-link">
                  <i className="bx bxs-bookmark-alt"></i>Question & Answer
                </Link>
              </li> */}
              {/* <li
                className={`nav-item ${
                  current === "Referrals" ? "active" : ""
                }`}
              >
                <Link to="" className="nav-link">
                  <i className="bx bxs-user-plus"></i>Referrals
                </Link>
              </li> */}
              {/* <li
                className={`nav-item ${current === "Messages" ? "active" : ""}`}
              >
                <Link to="" className="nav-link">
                  <i className="bx bxs-chat"></i>Messages
                </Link>
              </li> */}
              {/* <li
                className={`nav-item ${
                  current === "SupportTickets" ? "active" : ""
                }`}
              >
                <Link to="" className="nav-link">
                  <i className="bx bxs-coupon"></i>Support Tickets
                </Link>
              </li> */}
            </ul>
            <h3>Account Settings</h3>
            <ul>
              <li
                className={`nav-item ${current === "Settings" ? "active" : ""}`}
                onClick={() => {setCurrentFunc("Settings");  setSearchParams({'tab':"Settings"})}}
              >
                <Link to="" className="nav-link">
                <i className="fas fa-cog"></i>Settings
                </Link>
              </li>
              <li className={`nav-item`} onClick={logout}>
                <Link to="" className="nav-link">
                <i className="fa fa-sign-out" aria-hidden="true"></i>Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentSideBar;
