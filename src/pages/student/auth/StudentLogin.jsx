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
  LoginStudentService,
  StudentOtpVerifyService,
} from "../../../services/StudentServices";
import { toast } from "react-toastify";
import OTPInput from "react-otp-input";
import Head from "../../../layouts/main-layout/head/Head";

const StudentLogin = () => {
  const {setToken} = AuthStudent();
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const { companyData } = useAuthCompany();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [urlPrefix, setUrlPrefix] = useState(
    `${conf.apiAssetUrl}/${companyData?.frontFolder}/logos`
  );
  const [isLoading, setLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [errorTwoFactor, setErrorTwoFactor] = useState();
  const [otp, setOtp] = useState("");
  const [tFToken, setTFToken] = useState("");
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds for 1 minute
  const [isRunning, setIsRunning] = useState(false);
  const [resendOtp, setResendOtp] = useState(false);
  const [loginData, setLoginData] = useState({});

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
    setLoading(true);
    setLoginData(e)
    LoginStudentService(e)
      .then((res) => {
        toast.success(res?.message);
        if (res?.statusCode == 201) {
          setTwoFactor(true);
          setTFToken(res?.data);
          handleStartTimer()
        }else {
          setToken(res?.data?.data, res?.data?.token)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const resendOTPFunction = () => {
    onSubmitForm(loginData)
  }

  const VerifyTwoFactor = (e) => {
    if (otp.length !== 6) {
      setErrorTwoFactor(true);
      return;
    } else {
      setErrorTwoFactor(false);
    }
    const data = {
      otp: otp,
      twoFactorToken: tFToken,
    };
    setIsVerifying(true);
    StudentOtpVerifyService(data)
      .then((res) => {
        toast.success(res?.message);
        setToken(res?.data?.data, res?.data?.token)
        // setToken(res?.data?.admin_data, res?.data?.access_token);
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
      <div className="main-wrapper log-wrap">
        <div className="row">
          {/* <!-- Login Banner --> */}
          <div className="col-md-6 login-bg">
            <OwlCarousel
              className="owl-carousel login-slide owl-theme"
              loop
              margin={10}
              nav
              smartSpeed={500}
              autoplay={true}  // Enable auto-rotation
              autoplayTimeout={2000}  // Set interval in milliseconds (3 seconds)
              autoplayHoverPause={true} 
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
                  Our LMS enhances education with easy course access, interactive tools, and real-time progress tracking for a better learning journey.
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
                  Our LMS enhances education with easy course access, interactive tools, and real-time progress tracking for a better learning journey.
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
                  Our LMS enhances education with easy course access, interactive tools, and real-time progress tracking for a better learning journey.
                  </p>
                </div>
              </div>
            </OwlCarousel>
          </div>
          {/* <!-- /Login Banner --> */}

          <div className="col-md-6 login-wrap-bg">
            {/* <!-- Login --> */}
            {twoFactor ? (
              <div className="login-wrapper">
                <div className="loginbox">
                  <div className="img-logo" onClick={()=>navigate('/')}>
                    <img
                      src={`${urlPrefix}/${companyData?.logo}`}
                      className="img-fluid"
                      alt="Logo"
                    />
                    <div className="back-home">
                      <Link to="/">Back to Home</Link>
                    </div>
                  </div>
                  <h1>Verify OTP ?</h1>
                  <div className="reset-password">
                    <p>Enter OTP to login into your account.</p>
                  </div>
                  <form onSubmit={handleSubmit(VerifyTwoFactor)}>
                    <div className="input-block">
                      {/* <input
                        type="email"
                        className="form-control"
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
                    <div className="d-grid">
                      <button className="btn btn-start" disabled={isLoading ? true : false} type="submit">
                       { isVerifying ? 'Verifying..' : 'Verify'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="login-wrapper">
                <div className="loginbox">
                  <div className="w-100">
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
                    <h3>Ready to Dive In? Sign In!</h3>
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                      <div className="input-block">
                        <label className="form-control-label">Email</label>
                        <input
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value:
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                              message: "Please enter a valid email",
                            },
                          })}
                          type="text"
                          // defaultValue="gopal.appworks@gmail.com"
                          className="form-control"
                          placeholder="Enter your email address"
                        />
                        {errors.email && (
                          <div className="error-italic">
                            {errors.email.message}
                          </div>
                        )}
                      </div>
                      <div className="input-block">
                        <label className="form-control-label">Password</label>
                        <div className="pass-group">
                          <input
                            {...register("password", {
                              required: "Password is required",
                            })}
                            type={`${showOldPassword ? "text" : "password"}`}
                            className="form-control pass-input student-register-input"
                            placeholder="Enter your password"
                          // defaultValue="123456@A"
                          />
                          {errors.password && (
                            <div className="error-italic">
                              {errors.password.message}{" "}
                            </div>
                          )}
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
                        </div>
                      </div>
                      <div className="forgot">
                        <span>
                          <Link
                            className="forgot-link"
                            to="/student-forgot-password"
                          >
                            Forgot Password ?
                          </Link>
                        </span>
                      </div>
                      <div className="remember-me">
                        <label className="custom_check mr-2 mb-0 d-inline-flex remember-me">
                          {" "}
                          Remember me
                          <input type="checkbox" name="radio" />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <div className="d-grid">
                        <button className="btn btn-primary btn-start" type="submit">
                          {isLoading ? "Signing In..." : "Sign In"}
                        </button>
                        <p className="text-center mt-2 text-soft">Doesn't have an account? <Link to="/student-register" className="highlighted-text link">Register here</Link></p>
                      </div>
                    </form>
                  </div>
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

export default StudentLogin;
