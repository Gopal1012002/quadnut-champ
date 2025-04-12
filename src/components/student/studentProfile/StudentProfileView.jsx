import React, { useEffect, useState } from 'react'
import { StudentProfileService } from '../../../services/StudentServices';

const StudentProfileView = () => {
    const [studentProfile, setStudentProfile] = useState({});
    const [isLoading, setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true)
        StudentProfileService().then((res)=>{
            setStudentProfile(res?.data)
        }).catch((err)=>{
            console.log(err);
        }).finally(()=>{
            setLoading(false)
        })
    },[])
  return (<div className="col-xl-9 col-lg-9">	
    <div className="settings-widget card-details mb-0">
        <div className="settings-menu p-0">
            <div className="profile-heading">
                <h3>My Profile</h3>
            </div>
            <div className="checkout-form personal-address">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="contact-info">
                            <h6>First Name</h6>
                            <p>{studentProfile?.firstName}</p>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="contact-info">
                            <h6>Last Name</h6>
                            <p>{studentProfile?.lastName}</p>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="contact-info">
                            <h6>Designation</h6>
                            <p>{studentProfile?.studentTitle}</p>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="contact-info">
                            <h6>Email</h6>
                            <p>
                                {studentProfile?.studentEmail}
                            </p>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="contact-info">
                            <h6>Phone Number</h6>
                            <p>{studentProfile?.studentContactNo}</p>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="contact-info mb-0">
                            <h6>Bio</h6>
                            <p>{studentProfile?.about} </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>)
}

export default StudentProfileView