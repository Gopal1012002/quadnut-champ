import React from "react";
import user17 from "../../assets/img/user/user-17.jpg";
import defaultInstructorImage from '../../assets/img/default-instructor-image.png'
import { FaPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { GoListOrdered } from "react-icons/go";

const InstructorSidebar = ({ instructorData, handleTab, tab }) => {
  return (
    <>
      <div className="col-xl-3 col-lg-3 theiaStickySidebar">
        <div className="settings-widget dash-profile">
          <div className="settings-menu">
            <div className="profile-bg">
              <div className="profile-img">
                <Link to="">
                  <img 
                  src={instructorData?.employeeImage}
                  onError={(e) => e.target.src = defaultInstructorImage}
                   alt="Img" />
                </Link>
              </div>
            </div>
            <div className="profile-group">
              <div className="profile-name text-center">
                <h4>{instructorData?.name}</h4>
                <p>Instructor</p>
                <Link to="" className="add-course btn-primary">
                  {/* Follow <FaPlusSquare size={20} /> */}
                  {instructorData?.instructorTitle}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="settings-widget account-settings">
          <div className="settings-menu">
            <h3>Dashboard</h3>
            <ul>
              <li className={`nav-item ${tab === "1" ? 'active' :''} `} onClick={() => handleTab("1")}>
                <Link to="" className="nav-link">
                  <CgProfile className="me-1" /> {" "} Profile
                </Link>
              </li>
              <li className={`nav-item ${tab === "2" ? 'active' :''} `} onClick={() => handleTab("2")}>
                <Link to="" className="nav-link">
                  <GoListOrdered className="me-1" /> {" "} Courses
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorSidebar;
