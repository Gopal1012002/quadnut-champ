import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { StudentProfileService, StudentUpdateSocialProfileService } from '../../../services/StudentServices';
import { toast } from 'react-toastify';

const StudentSocialAccounts = () => {
      const [isLoading, setLoading] = useState(false);
      const [studentProfile, setStudentProfile] = useState({});
        const {
          control,
          reset,
          register,
          handleSubmit,
          formState: { errors },
          setValue,
          watch,
          unregister,
        } = useForm();

        const onSubmitForm = (e) => {
            setLoading(true);
            StudentUpdateSocialProfileService(e).then((res)=>{
                toast.success(res.message);
                refreshProfile();
            }).catch((err)=>{
                toast.error(err.message);
            }).finally(()=>{
                setLoading(false);
            })
        }

        const refreshProfile = () => {
            setLoading(true);
            StudentProfileService()
              .then((res) => {
                setStudentProfile(res?.data);
                setValue("studentWebsite", res?.data?.studentWebsite ?? "");
                setValue("studentGithub", res?.data?.studentGithub ?? "");
                setValue("studentX", res?.data?.studentX  ?? "");
                setValue("studentLinkedin", res?.data?.studentLinkedin  ?? "");
                setValue("studentFB", res?.data?.studentFB  ?? "");
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
        <form onSubmit={handleSubmit(onSubmitForm)} >
            <div className="checkout-form settings-wrap">
                <div className="row">
                    <div className="col-md-12">
                        <div className="input-block">
                            <label className="form-label">Website</label>
                            <input
                            {...register("studentWebsite", {
                                pattern: {
                                  value: /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(:\d+)?(\/[^\s]*)?$/,
                                  message: "Please enter a valid website URL"
                                }
                              })}
                            placeholder='Enter your website'
                            type="text" className="form-control" />
                            {errors.studentWebsite && <span className="error-italic">{errors.studentWebsite.message}</span>} 
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="input-block">
                            <label className="form-label">Github</label>
                            <input
                            placeholder='Enter your github link'
                            {...register("studentGithub", {
                                pattern: {
                                  value: /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(:\d+)?(\/[^\s]*)?$/,
                                  message: "Please enter a valid github URL"
                                }
                              })}
                            type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="input-block">
                            <label className="form-label">Facebook</label>
                            <input
                            placeholder='Enter your fb profile link'
                            {...register("studentFB", {
                                pattern: {
                                  value: /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(:\d+)?(\/[^\s]*)?$/,
                                  message: "Please enter a valid facebook URL"
                                }
                              })}
                            type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="input-block">
                            <label className="form-label">Twitter</label>
                            <input
                            placeholder='Enter your twitter profile link'
                            {...register("studentX", {
                                pattern: {
                                  value: /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(:\d+)?(\/[^\s]*)?$/,
                                  message: "Please enter a valid twitter profile URL"
                                }
                              })}
                            type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="input-block">
                            <label className="form-label">Linkedin</label>
                            <input
                            placeholder='Enter your linkedin profile link'
                            {...register("studentLinkedin", {
                                pattern: {
                                  value: /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(:\d+)?(\/[^\s]*)?$/,
                                  message: "Please enter a valid linkedin profile URL"
                                }
                              })}
                            type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <button className="btn btn-sm btn-primary" disabled={isLoading} type="submit"> {isLoading ? 'Saving...' : 'Save Profile'} </button>
                    </div>
                </div>
            </div>
        </form>)
}

export default StudentSocialAccounts