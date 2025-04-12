import React, { useEffect, useState } from "react";
import StudentPasswordReset from './StudentPasswordReset'
import TwoFactorAuthentication from './TwoFactorAuthentication'
import ActiveLogHistory from './ActiveLogHistory'
import { StudentProfileService } from "../../../services/StudentServices";


const StudentSecurity = () => {
    const [currentTab, setCurrentTab] = useState('EditProfile');
    const [twoFactorOn, setTwoFactorOn] = useState(false);
    const [logActivityOn, setLogActivityOn] = useState(false);
    const [studentData, setStudentdata] = useState();
    const [isLoading, setLoading] = useState(false);
    const [twoFactor, setTwoFactor] = useState('');
    const [logStatus, setLogStatus] = useState('');
    const [modalResetShow, setModalResetShow] = useState(false);
    const [
        modalTwoFactorAuthenticationShow,
        setModalTwoFactorAuthenticationShow,
      ] = useState(false);
      const [modalActiveLogHistroyShow, setModalActiveLogHistroyShow] =
        useState(false);
      const twoFactorToggleFunction = () => {
        setTwoFactorOn(!twoFactorOn);
      };
      const activityLogToggleFunction = () => {
        setLogActivityOn(!logActivityOn);
      };
      const refreshProfile = () => {
        setLoading(true);
        StudentProfileService()
          .then((res) => {
            setTwoFactorOn(res?.data?.otpEnable !== 'NONE')
            setLogActivityOn(res?.data?.logStatus === 'ACTIVE')
            // setTwoFactor(res?.otpEnable);
            setLogStatus(res?.logStatus)
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    
    
      useEffect(() => {
        refreshProfile()
      }, []);
  return (
    <>
      <div className="checkout-form settings-wrap">
        <ul className="settings-noti-lists">
          <li>
            <div className="notification-title">
              <h6>Change Password</h6>
              <p>Set a unique password to protect your account</p>
            </div>
            <div className="status-toggle modal-status">
              <button
                className="btn btn-sm btn-primary"
                type="submit"
                onClick={() => setModalResetShow(true)}
              >
                Update Password
              </button>

              <StudentPasswordReset
                studentdata={studentData}
                show={modalResetShow}
                onHide={() => setModalResetShow(false)}
              />
            </div>
          </li>
          <li>
            <div className="notification-title">
              <h6>Two-factor authentication</h6>
              <p>Secure your account with 2FA security</p>
            </div>
            <div className="status-toggle modal-status">
              <input
                type="checkbox"
                id="user3"
                className="check"
                checked={twoFactorOn}
                onChange={() => setModalTwoFactorAuthenticationShow(true)}
              />
              <label htmlFor="user3" className="checktoggle">
                {" "}
              </label>
            </div>

            <TwoFactorAuthentication
              toggleFunction={twoFactorToggleFunction}
              show={modalTwoFactorAuthenticationShow}
              onHide={() => setModalTwoFactorAuthenticationShow(false)}
            />
          </li>
          <li>
            <div className="notification-title">
              <h6>Log History Activate</h6>
              <p>Keep an eye on your login history</p>
            </div>
            <div className="status-toggle modal-status ">
              <input
                type="checkbox"
                id="user4"
                className="check fs-2"
                checked={logActivityOn}
                onChange={() => setModalActiveLogHistroyShow(true)}
              />
              <label htmlFor="user4" className="checktoggle">
                {" "}
              </label>
            </div>

            <ActiveLogHistory
              toggleFunction={activityLogToggleFunction}
              show={modalActiveLogHistroyShow}
              onHide={() => setModalActiveLogHistroyShow(false)}
            />
          </li>
        </ul>
      </div>
    </>
  );
};

export default StudentSecurity;
