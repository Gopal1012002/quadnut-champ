import React, { useEffect, useState } from "react";
import loginImg from "../../../assets/img/login-img.png";
import studentRegisterIcon from "../../../assets/img/registerStudentIcon.png";
import AOS from "aos";
import OwlCarousel from "react-owl-carousel";
import "aos/dist/aos.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useAuthCompany } from "../../../services/AppServices";
import conf from "../../../conf/conf";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthStudent, {
  StudentForgotPasswordOtpSend,
  StudentForgotPasswordOtpVerify,
  StudentForgotPasswordUpdate,
} from "../../../services/StudentServices";
import { toast } from "react-toastify";
import OTPInput from "react-otp-input";
import Head from "../../../layouts/main-layout/head/Head";
import {
  containsDigit,
  containsLetter,
  containsSpecialCharacters,
} from "../../../utils/dynamic.util";

const StudentForgotPassword = () => {
  const { setToken } = AuthStudent();
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const navigate = useNavigate();
  const newPassword = watch("newPassword");
  const { companyData } = useAuthCompany();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [urlPrefix, setUrlPrefix] = useState(
    `${conf.apiAssetUrl}/${companyData?.frontFolder}/logos`
  );
  const [isLoading, setLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [errorTwoFactor, setErrorTwoFactor] = useState();
  const [otp, setOtp] = useState("");
  const [tFToken, setTFToken] = useState("");
  const [tFTokenTwo, setTFTokenTwo] = useState("");
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds for 1 minute
  const [isRunning, setIsRunning] = useState(false);
  const [isPassUpdate, setIsPassUpdate] = useState(false);
  const [resendOtp, setResendOtp] = useState(false);
  const [loginData, setLoginData] = useState({});
  const [currentStringType, setCurrentStringType] = useState("empty");
  const handlePassword = (e) => {
    if (e.target.value.length === 0) {
      setCurrentStringType("empty");
      return;
    }
    if (e.target.value.length < 8) {
      setCurrentStringType("poor");
      return;
    }
    if (e.target.value.length >= 8) {
      setCurrentStringType("avg");
    }
    if (!containsDigit(e.target.value) || !containsLetter(e.target.value)) {
      setCurrentStringType("avg");
      return;
    }
    if (containsDigit(e.target.value) && containsLetter(e.target.value)) {
      setCurrentStringType("strong");
    }
    if (!containsSpecialCharacters(e.target.value)) {
      setCurrentStringType("strong");
      return;
    }
    if (containsSpecialCharacters(e.target.value)) {
      setCurrentStringType("heavy");
      return;
    }
  };
  const onUpdatePassword = (e) => {
    if (currentStringType !== "heavy") {
      return;
    }
    const token = tFTokenTwo?.token;
    e.twoFactorToken = token;

    StudentForgotPasswordUpdate(e)
      .then((res) => {
        toast.success(res?.message);
        navigate("/student-login");
      })
      .catch((err) => {
        if (err?.message === "jwt expired") {
          toast.error("Session expired !! ");
          setIsPassUpdate(true);
          setTwoFactor(false);
        } else {
          toast.error(err?.response?.data?.message);
        }
      });
  };
  const handleStartTimer = () => {
    setIsRunning(true);
  };

  const handleTimerEnd = () => {
    setResendOtp(true); // Replace with your function to be called when the timer ends
  };

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      handleTimerEnd(); // Call the function when the timer ends
    }

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, [isRunning, timeLeft]);

  const onSubmitForm = (e) => {
    setSubmitting(true);
    setLoginData(e);
    StudentForgotPasswordOtpSend(e)
      .then((res) => {
        toast.success(res?.message);
        setTwoFactor(true);
        setTFToken(res?.data);
        handleStartTimer();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  const resendOTPFunction = () => {
    onSubmitForm(loginData);
  };

  const VerifyTwoFactor = (e) => {
    if (otp.length !== 6) {
      setErrorTwoFactor(true);
      return;
    } else {
      setErrorTwoFactor(false);
    }
    const data = {
      otp: otp,
      twoFactorToken: tFToken?.token,
    };

    setIsVerifying(true);
    StudentForgotPasswordOtpVerify(data)
      .then((res) => {
        toast.success(res?.message);
        setIsPassUpdate(true);
        setTwoFactor(false);
        setTFTokenTwo(res?.data);
      })
      .catch((err) => {
        if (err?.response?.data?.statusCode == 401) {
          toast.error(err?.response?.data?.message);
          setTwoFactor(null);
          setTFToken(null);
          setOtp(null);
        } else {
          toast.error(err?.response?.data?.message);
        }
      })
      .finally(() => {
        setIsVerifying(false);
      });
  };
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Head title="Student Login" />
      <div class="main-wrapper log-wrap">
        <div class="row">
          {/* <!-- Login Banner --> */}
          <div className="col-md-6 login-bg">
            <OwlCarousel
              className="owl-carousel login-slide owl-theme"
              loop
              margin={10}
              nav
              smartSpeed={500}
              data-aos="fade-up"
              responsive={{
                0: { items: 1 },
                600: { items: 1 },
                1000: { items: 1 },
              }}
            >
              <div className="welcome-login">
                <div className="login-banner">
                  <img
                    src={studentRegisterIcon}
                    className="img-fluid ms-1 login-first-image"
                    alt="Logo"
                  />
                </div>
                <div className="mentor-course text-center">
                  <h2>
                    Welcome to <br />
                    {companyData?.websiteName ?? "AW LMS"} Courses.
                  </h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam.
                  </p>
                </div>
              </div>
              <div className="welcome-login">
                <div className="login-banner">
                  <img src={loginImg} className="img-fluid" alt="Logo" />
                </div>
                <div className="mentor-course text-center">
                  <h2>
                    Welcome to <br />
                    {companyData?.websiteName ?? "AW LMS"} Courses.
                  </h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam.
                  </p>
                </div>
              </div>
              <div className="welcome-login">
                <div className="login-banner">
                  <img src={loginImg} className="img-fluid" alt="Logo" />
                </div>
                <div className="mentor-course text-center">
                  <h2>
                    Welcome to <br />
                    {companyData?.websiteName ?? "AW LMS"} Courses.
                  </h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam.
                  </p>
                </div>
              </div>
            </OwlCarousel>
          </div>
          {/* <!-- /Login Banner --> */}

          <div class="col-md-6 login-wrap-bg">
            {twoFactor ? (
              // {false ? (
              <div class="login-wrapper">
                <div class="loginbox">
                  <div class="img-logo">
                    <img
                      src={`${urlPrefix}/${companyData?.logo}`}
                      class="img-fluid"
                      alt="Logo"
                    />
                    <div class="back-home">
                        <Link to="/">Back to Home</Link>
                    </div>
                  </div>
                  <h1>Verify OTP ?</h1>
                  <div class="reset-password">
                    <p>Enter OTP to change your password.</p>
                  </div>
                  <form onSubmit={handleSubmit(VerifyTwoFactor)}>
                    <div class="input-block">
                      {/* <input
                              type="email"
                              class="form-control"
                              placeholder="Enter your email address"
                            /> */}
                      <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        inputStyle={{
                          width: "100%",
                          maxWidth: window.innerWidth < 425 ? "55px" : "50px", // Adjust width on smaller screens
                          height: window.innerWidth < 425 ? "33px" : "50px", // Adjust height on smaller screens
                          margin: "0 0px",
                          fontSize: "16px",
                          textAlign: "center",
                          borderRadius: "5px",
                          border: "1px solid #FF875A",
                          transition: "all 0.2s ease-in-out",
                        }}
                        focusStyle={{
                          border: "1px solid #06ae92",
                          boxShadow: "0 0 8px #06ae92",
                        }}
                        renderSeparator={<span className="mx-1"> </span>}
                        renderInput={(props) => (
                          <input
                            type="number"
                            {...props}
                            pattern="[0-9]*"
                            inputMode="numeric"
                            title="Only numbers are allowed"
                          />
                        )}
                        containerStyle={{
                          display: "flex",
                          justifyContent: "start",
                          alignItems: "center",
                        }}
                      />
                      <div className="pt-3 text-start">
                        {resendOtp ? (
                          <p className=" fw-600">
                            <span
                              className="text-info fw-600 clickable-btn"
                              onClick={resendOTPFunction}
                            >
                              Resend OTP?
                            </span>
                          </p>
                        ) : (
                          <p className=" fw-600">
                            <span className="text-info fw-600">
                              Resend OTP :{" "}
                            </span>
                            {`${timeLeft}`}
                          </p>
                        )}{" "}
                      </div>
                    </div>
                    <div class="d-grid">
                      <button
                        class="btn btn-start"
                        disabled={isLoading ? true : false}
                        type="submit"
                      >
                        {isVerifying ? "Verifying.." : "Verify"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : isPassUpdate ? (
              <>
                {/* <div className="col-md-6 login-wrap-bg "> */}
                {/* <!-- Login --> */}
                <div className="login-wrapper">
                  <div className="loginbox  student-register-wrapper">
                    <div className="img-logo">
                      <Link to="/">
                        <img
                          src={`${urlPrefix}/${companyData?.logo}`}
                          className="img-fluid"
                          alt="Logo"
                        />
                      </Link>
                      <div className="back-home">
                        <Link to="/">Back to Home</Link>
                      </div>
                    </div>
                    <h1 className="sign-up-button">Change Password</h1>
                    <form onSubmit={handleSubmit(onUpdatePassword)}>
                      <div className="input-block">
                        <label className="form-control-label">
                          New Password
                        </label>
                        <div className="pass-group" id="passwordInput">
                          <input
                            {...register("newPassword", {
                              required: "New password is required",
                            })}
                            type={`${showOldPassword ? "text" : "password"}`}
                            className="form-control pass-input student-register-input"
                            placeholder="Enter your password"
                            onChange={(e) => {
                              handlePassword(e);
                              setValue("newPassword", e.target.value, {
                                shouldValidate: true,
                              });
                            }}
                          />
                          <span
                            className={`toggle-password ${
                              showOldPassword
                                ? "feather-eye"
                                : "feather-eye-off"
                            }`}
                            onClick={() => {
                              setShowOldPassword(!showOldPassword);
                            }}
                          ></span>
                          {errors.newPassword && (
                            <div className="error-italic">
                              {errors.newPassword.message}{" "}
                            </div>
                          )}
                        </div>
                        <div
                          className={`password-strength ${currentStringType}-active`}
                          id="passwordStrength"
                        >
                          <span
                            id="poor"
                            className={`${
                              currentStringType === "heavy" ||
                              currentStringType === "strong" ||
                              currentStringType === "avg" ||
                              currentStringType === "poor"
                                ? "active"
                                : ""
                            }`}
                          ></span>
                          <span
                            id="weak"
                            className={`${
                              currentStringType === "heavy" ||
                              currentStringType === "strong" ||
                              currentStringType === "avg"
                                ? "active"
                                : ""
                            }`}
                          ></span>
                          <span
                            id="strong"
                            className={`${
                              currentStringType === "heavy" ||
                              currentStringType === "strong"
                                ? "active"
                                : ""
                            }`}
                          ></span>
                          <span
                            id="heavy"
                            className={`${
                              currentStringType === "heavy" ? "active" : ""
                            }`}
                          ></span>
                        </div>
                        <div id="passwordInfo">
                          {currentStringType === "poor" && (
                            <>
                              😣{" "}
                              <span className="text-danger">
                                {" "}
                                Weak. Must contain at least 8 characters
                              </span>
                            </>
                          )}
                          {currentStringType === "avg" && (
                            <>
                              😯{" "}
                              <span className="text-warning">
                                {" "}
                                Average. Must contain at least 1 letter or
                                number
                              </span>
                            </>
                          )}
                          {currentStringType === "strong" && (
                            <>
                              😊{" "}
                              <span className="text-primary">
                                {" "}
                                Almost. Must contain special symbol
                              </span>
                            </>
                          )}
                          {currentStringType === "heavy" && (
                            <>
                              😊
                              <span className="text-success">
                                {" "}
                                Awesome! You have a secure password.
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="input-block">
                        <label className="form-control-label">
                          Confirm Password
                        </label>
                        <div className="pass-group" id="passwordInput">
                          <input
                            {...register("confirmPassword", {
                              required: "Confirm password is required",
                              validate: (value) =>
                                value === newPassword ||
                                "Password do not match",
                            })}
                            type={`${
                              showConfirmPassword ? "text" : "password"
                            }`}
                            className="form-control pass-input student-register-input"
                            placeholder="Enter your password"
                          />
                          {errors.confirmPassword && (
                            <div className="error-italic">
                              {errors.confirmPassword.message}{" "}
                            </div>
                          )}
                          <span
                            className={`toggle-password ${
                              showConfirmPassword
                                ? "feather-eye"
                                : "feather-eye-off"
                            }`}
                            onClick={() => {
                              setShowConfirmPassword(!showConfirmPassword);
                            }}
                          ></span>
                        </div>
                      </div>
                      <div className="d-grid">
                        <button
                          className="btn btn-primary btn-start"
                          type="submit"
                        >
                          {isLoading ? "Updating..." : "Update"}
                        </button>
                      </div>
                    </form>
                  </div>
                  {/* </div> */}
                </div>
              </>
            ) : (
              <div class="login-wrapper">
                <div class="loginbox">
                  <div class="img-logo">
                    <img
                      src={`${urlPrefix}/${companyData?.logo}`}
                      class="img-fluid"
                      alt="Logo"
                    />
                    <div class="back-home">
                      <Link to={"/"}>Back to Home</Link>
                    </div>
                  </div>
                  <h1>Forgot Password ?</h1>
                  <div class="reset-password">
                    <p>Enter your email to reset your password.</p>
                  </div>
                  <form onSubmit={handleSubmit(onSubmitForm)}>
                    <div class="input-block">
                      <label class="form-control-label">Email</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter your email address"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Please enter a valid email",
                          },
                        })}
                      />
                      {errors.email && (
                        <div className="error-italic">
                          {" "}
                          {errors.email.message}{" "}
                        </div>
                      )}
                    </div>
                    <div class="d-grid">
                      <button
                        class={`btn btn-start ${
                          isSubmitting ? "disabled" : ""
                        }`}
                        type="submit"
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {/* <!-- /Login --> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentForgotPassword;
