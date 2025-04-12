import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import TwoFactorAuthentication from "./studentSettings/TwoFactorAuthentication";
import { FaLink, FaRegBell, FaRegEdit } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { StudentProfileService } from "../../services/StudentServices";
import StudentPasswordReset from "./studentSettings/StudentPasswordReset";
import ActiveLogHistory from "./studentSettings/ActiveLogHistory";
import StudentSecurity from './studentSettings/StudentSecurity'
import StudentProfileUpdate from './studentProfile/StudentProfileUpdate';
import StudentSocialAccounts from "./studentSettings/StudentSocialAccounts";
import StudentLoginLog from "./studentSettings/StudentLoginLog";

const StudentSettings = () => {
  const [currentTab, setCurrentTab] = useState('EditProfile');
  const [twoFactorOn, setTwoFactorOn] = useState(false);
  const [logActivityOn, setLogActivityOn] = useState(false);
  const [studentData, setStudentdata] = useState();
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    StudentProfileService()
      .then((res) => {
        setStudentdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div className="col-xl-9 col-lg-9">
        <div className="settings-widget card-details">
          <div className="settings-menu p-0">
            <div className="profile-heading">
              <h3>Settings</h3>
              <p>You have full control to manage your own account settings</p>
            </div>
            <div className="settings-page-head">
              <ul className="settings-pg-links">
                <li>
                  <Link to="" className={`${currentTab === 'EditProfile' ? 'active' : ''}`} onClick={()=>setCurrentTab('EditProfile')}>
                    <FaRegEdit className="me-1" />
                    Edit Profile
                  </Link>
                </li>
                <li>
                  <Link to="" className={`${currentTab === 'Security' ? 'active' : ''}`}   onClick={()=>setCurrentTab('Security')}>
                    <MdLockOutline className="me-1" /> Security
                  </Link>
                </li>
                <li>
                  <Link to="" className={`${currentTab === 'SocialProfiles' ? 'active' : ''}`}   onClick={()=>setCurrentTab('SocialProfiles')}>
                    <FaRegCircleUser className="me-1"/> Social Profiles
                  </Link>
                </li>
                <li>
                  <Link to="" className={`${currentTab === 'LoginLog' ? 'active' : ''}`}  onClick={()=>setCurrentTab('LoginLog')}>
                    <FaLink className="me-1"  /> Login Log
                  </Link>
                </li>
                {/* <li>
                  <Link to="" className={`${currentTab === 'Notifications' ? 'active' : ''}`}>
                    <FaRegBell className="me-1"  onClick={()=>setCurrentTab('Notifications')} /> Notifications
                  </Link>
                </li> */}
              </ul>
            </div>
            { currentTab === 'EditProfile' && <StudentProfileUpdate />}
            {currentTab === 'Security' && <StudentSecurity />}
            {currentTab === 'SocialProfiles' && <StudentSocialAccounts />}
            {currentTab === 'LoginLog' && <StudentLoginLog />}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentSettings;
