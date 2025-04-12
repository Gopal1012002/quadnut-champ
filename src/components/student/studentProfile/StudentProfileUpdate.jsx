import React, { useEffect, useState } from "react";
import user16 from "../../../assets/img/user/user16.jpg";
import { FaRegTrashAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import { IoCloudUploadOutline } from "react-icons/io5";
import AuthStudent, {
  StudentProfileImageRemoveService,
  StudentProfileService,
  StudentProfileUpdateService,
} from "../../../services/StudentServices";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuthCompany } from "../../../services/AppServices";
import conf from "../../../conf/conf";
import userCircleIcon from "../../../assets/img/userCircleIcon.png";
import { toast } from "react-toastify";
import Head from '../../../layouts/main-layout/head/Head'
import Swal from "sweetalert2";
import base64 from "react-native-base64";
import RSelect from "../../../components/common/RSelect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDateAndTimeTwo } from "../../../utils/dynamic.util";

const StudentProfileUpdate = () => {
  const { companyData } = useAuthCompany();
  const { student } = AuthStudent();
  const [urlPrefix, setUrlPrefix] = useState(
    `${conf.apiAssetUrl}/${companyData?.frontFolder}`
  );
  const [isLoading, setLoading] = useState(false);
  const [studentProfile, setStudentProfile] = useState({});
  const [studentImageUrl, setStudentImageUrl] = useState("");
  const [isStudentImage, setIsStudentImage] = useState(false);
  const [studentImageFile, setStudentImageFile] = useState("");
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

  const onSubmitForm = (data) => {
    let formData = new FormData();

    const options = { timeZone: "Asia/Kolkata", hour12: false };
    const istDate = new Date(data.studentDOB.toLocaleString("en-US", options))
      .toISOString()
      .replace("T", " ")
      .slice(0, 19);
    // Append all form fields
    for (const key in data) {
      if (
        key === "studentImage" &&
        studentImageFile &&
        studentImageFile?.length > 0
      ) {
        formData.append(key, studentImageFile[0]);
      }
      else if (key == "studentDOB") {
        formData.append(key, istDate)
      }
      else {
        formData.append(key, data[key]);
      }
    }


    Swal.fire({
      title: "Are you sure?",
      text: 'Please note: Once changes are saved, they cannot be undone.',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#06AE92",
      cancelButtonColor: "#364a63",
      confirmButtonText: 'Yes'
    }).then((res) => {
      if (res?.isConfirmed) {
        setLoading(true);
        StudentProfileUpdateService(formData)
          .then((res) => {

            refreshProfile()
            Swal.fire({
              title: res?.message ?? "Profile updated successfully",
              icon: "success",
            })
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message || "Something went wrong");
          })
          .finally(() => {
            setLoading(false);
          });
      }
    })
  };
  const handleStudentImage = (e) => {
    const file = e.target.files[0];
    setStudentImageFile(e.target.files);
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only PNG or JPG images are allowed");
        return;
      }
      setValue("studentImage", file); // Add file to the form
      setStudentImageUrl(URL.createObjectURL(file)); // Set the preview URL
      setIsStudentImage(true);
    }
  };

  const removeStudentImage = () => {
    Swal.fire({
      title: "Are you sure?",
      text: 'Profile image will be deleted and can not be reverted',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#06AE92",
      cancelButtonColor: "#364a63",
      confirmButtonText: 'Yes'
    }).then((res) => {
      if (res?.isConfirmed) {
        setLoading(true);
        StudentProfileImageRemoveService().then((res) => {
          setStudentImageUrl('');
          setIsStudentImage(false)
          Swal.fire({
            title: res?.message ?? "Profile image removed successfully",
            icon: "success",
          })
        }).catch((err) => {
          toast.error(err?.response?.data?.message)
        }).finally(() => {
          setLoading(false);
        })
      } else {
        return;
      }
    })
  }

  const refreshProfile = () => {
    setLoading(true);
    StudentProfileService()
      .then((res) => {
        student.image = res?.data?.studentImage
        Cookies.set(
          'student' + "-info",
          base64.encode(JSON.stringify(student)),
          { expires: 1 }
        )
        setStudentProfile(res?.data);
        setValue("firstName", res?.data?.firstName);
        setValue("lastName", res?.data?.lastName);
        setValue("studentContactNo", res?.data?.studentContactNo);
        setValue("studentTitle", res?.data?.studentTitle);
        setValue("studentDOB", res?.data?.studentDob);
        setValue("studentGender", res?.data?.studentGender);
        if (res?.data?.about && res?.data?.about !== 'null') {
          setValue("about", res?.data?.about);
        }

        setStudentImageUrl(`${urlPrefix}/kyc/${res?.data?.studentImage}`);
        if (res?.data?.studentImage) {
          setIsStudentImage(true);
        }
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
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="course-group profile-upload-group mb-0 d-flex">
          <div className="course-group-img profile-edit-field d-flex align-items-center">
            <Link to="" className="profile-pic">
              {isStudentImage ? (
                <img
                  src={studentImageUrl}
                  onError={() => setIsStudentImage(false)}
                  alt="Img"
                  className="img-fluid"
                />
              ) : (
                <img src={userCircleIcon} alt="Img" className="img-fluid" />
              )}
            </Link>
            <div className="profile-upload-head">
              <h4>
                <Link to="">Your avatar</Link>
              </h4>
              <p>PNG or JPG of size 400 x 400</p>
              <div className="new-employee-field">
                <div className="d-flex align-items-center mt-2">
                  <div className="image-upload mb-0">
                    <input
                      type="file"
                      name="studentImage"
                      accept="image/jpeg, image/png, image/gif"
                      onChange={handleStudentImage}
                    />
                    <div className="image-uploads">
                      <IoCloudUploadOutline />
                    </div>
                  </div>
                  <div className="img-delete">
                    <Link to="" className="delete-icon" onClick={removeStudentImage}>
                      <FaRegTrashAlt />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="checkout-form settings-wrap">
          <div className="edit-profile-info">
            <h5>Personal Details</h5>
            <p>Edit your personal information</p>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="input-block">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  className="form-control"
                />
                {errors.firstName && <div className="error-italic"> {errors.firstName.message} </div>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-block">
                <label className="form-label">Last Name</label>
                <input
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  type="text"
                  className="form-control"
                />
                {errors.lastName && <div className="error-italic"> {errors.lastName.message} </div>}
              </div>
            </div>
            {/* <div className="col-md-6">
              <div className="input-block">
                <label className="form-label">User Name</label>
                <input type="text" className="form-control" value="studentdemo" />
              </div>
            </div> */}
            <div className="col-md-6">
              <div className="input-block">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  {...register("studentContactNo", {
                    required: "Student contact no. is required",
                  })}
                  className="form-control"
                  placeholder="Student Contact No."
                />
                {errors.studentContactNo && (
                  <div className="error-italic"> {errors.studentContactNo.message} </div>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="input-block">
                <label className="form-label" htmlFor="package_type">
                  Gender<code>*</code>
                </label>
                <div className="form-control-wrap">
                  {/* Use Controller to manage RSelect for package_type */}
                  <Controller
                    name="studentGender"
                    className="form-control"
                    control={control}
                    rules={{ required: "Gender is required" }} // Validation rule
                    render={({ field }) => (
                      <RSelect
                        {...field}
                        options={[
                          { label: "MALE", value: "MALE" },
                          { label: "FEMALE", value: "FEMALE" },
                          { label: "OTHER", value: "OTHER" },
                        ]}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption.value);
                        }}
                        value={field.value ? { label: field.value, value: field.value } : null}
                      />
                    )}
                  />

                  {/* Display validation error */}
                  {errors.package_type && <span className="error-italic">{errors.package_type.message}</span>}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="input-block">
                <label className="form-label" htmlFor="studentDOB">
                  DOB<code>*</code>
                </label>
                <div className="form-control p-0">
                  {/* Using Controller to handle input field */}
                  <Controller
                    name="studentDOB"
                    control={control}
                    rules={{ required: "DOB is required" }}
                    render={({ field }) => {
                      // Ensure field.value is a valid Date object
                      const dateValue = field.value ? new Date(field.value) : null;

                      // Convert UTC to local date and format as YYYY-MM-DD
                      const formattedDate = dateValue
                        ? new Date(dateValue.getTime() - dateValue.getTimezoneOffset() * 60000)
                          .toISOString()
                          .split("T")[0]
                        : "";

                      return (
                        <input
                          type="date"
                          max="2008-12-31"
                          className="form-control border-0 w-100 m-0"
                          {...field}
                          value={formattedDate}
                          onChange={(e) => field.onChange(new Date(e.target.value))}
                        />
                      );
                    }}
                  />


                  {/* Display validation error */}
                  {errors.studentDOB && <span className="error-italic">{errors.studentDOB.message}</span>}
                </div>
              </div>
            </div>


            <div className="col-md-12">
              <div className="input-block">
                <label className="form-label">Designation</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Student Designation"
                  {...register("studentTitle", {
                    required: "Student title is required",
                  })}
                />
                {errors.studentTitle && (
                  <div className="error-italic"> {errors.studentTitle.message} </div>
                )}
              </div>
            </div>

            <div className="col-md-12">
              <div className="input-block">
                <label className="form-label">Bio</label>
                <textarea
                  rows="4"
                  className="form-control"
                  {...register("about")}
                  placeholder="Student Bio "
                ></textarea>
              </div>
            </div>
            <div className="col-md-12">
              <button className="btn btn-sm btn-primary" disabled={isLoading ? true : false} type="submit">
                {isLoading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default StudentProfileUpdate;
