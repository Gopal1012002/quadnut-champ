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
import {
  containsDigit,
  containsLetter,
  containsSpecialCharacters,
} from "../../../utils/dynamic.util";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RegisterStudentService } from "../../../services/StudentServices";
import { toast } from "react-toastify";
import Head from '../../../layouts/main-layout/head/Head'
const StudentRegister = () => {
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const { companyData } = useAuthCompany();
  const [currentStringType, setCurrentStringType] = useState("empty");
  const [password, setpassword] = useState("");
  const [sameEmailError, setSameEmailError] = useState(false);
  const [urlPrefix, setUrlPrefix] = useState(
    `${conf.apiAssetUrl}/${companyData?.frontFolder}/logos`
  );
  const handlePassword = (e) => {
    setpassword(e.target.value);
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

  const onSubmitForm = (e) => {
    setLoading(true);
    RegisterStudentService(e)
      .then((res) => {
        toast.success(res?.message);
        toast.success("Please log in to your account.");
        navigate(`/student-login`);
      })
      .catch((err) => {
        if (err?.response?.status === 409) {
          setSameEmailError(true);
        }
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Head title="Student Registration" />
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
              data-aos="fade-up"
              autoplay={true}  // Enable auto-rotation
              autoplayTimeout={2000}  // Set interval in milliseconds (3 seconds)
              autoplayHoverPause={true}
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
                  <p className="text-muted">
                    Our LMS streamlines course delivery, enhances collaboration, and provides smart progress-tracking tools for an effortless learning experience.
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
                    Designed for educators and learners, our LMS simplifies course management, fosters collaboration, and ensures effective skill development.
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

          <div className="col-md-6 login-wrap-bg ">
            {/* <!-- Login --> */}
            <div className="login-wrapper">
              <div className="loginbox  student-register-wrapper">
                <div className="img-logo">
                  <Link to="/">
                    <img
                      src={`${urlPrefix}/${companyData?.logo}`}
                      className="img-fluid"
                      alt="Logo"
                      onClick={() => navigate("/")}
                    />
                  </Link>
                  <div className="back-home">
                    <Link to="/">Back to Home</Link>
                  </div>
                </div>
                <h3 className="sign-up-button">Your Adventure Starts Here!</h3>
                <form onSubmit={handleSubmit(onSubmitForm)}>
                  <div className="input-block">
                    <label className="form-control-label">Full Name</label>
                    <input
                      type="text"
                      {...register("fullName", {
                        required: "Full name is required",
                        pattern: {
                          value: /[a-zA-Z]/,
                          message: "Please enter a valid name",
                        },
                      })}
                      className="form-control student-register-input"
                      placeholder="Enter your Full Name"
                    />
                    {errors.fullName && (
                      <div className="error-italic">
                        {errors.fullName.message}{" "}
                      </div>
                    )}
                  </div>
                  <div className="input-block">
                    <label className="form-control-label">Email</label>
                    <input
                      type="text"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Please enter a valid email",
                        },
                      })}
                      onChange={(e) => {
                        setValue("email", e.target.value, {
                          shouldValidate: true,
                        });
                        setSameEmailError(false);
                      }}
                      className="form-control student-register-input"
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <div className="error-italic">
                        {errors.email.message}{" "}
                      </div>
                    )}
                    {sameEmailError && (
                      <div className="error-italic">Email already exists </div>
                    )}
                  </div>
                  <div className="input-block">
                    <label className="form-control-label">Password</label>
                    <div className="pass-group" id="passwordInput">
                      <input
                        {...register("password", {
                          required: "Password is required",
                        })}
                        type={`${showOldPassword ? "text" : "password"}`}
                        className="form-control pass-input student-register-input"
                        placeholder="Enter your password"
                        onChange={(e) => {
                          handlePassword(e);
                          setValue("password", e.target.value, {
                            shouldValidate: true,
                          });
                        }}
                      />
                      {errors.password && (
                        <div className="error-italic">
                          {errors.password.message}{" "}
                        </div>
                      )}
                      <span
                        className={`toggle-password ${showOldPassword ? "feather-eye" : "feather-eye-off"
                          }`}
                        onClick={() => {
                          setShowOldPassword(!showOldPassword);
                        }}
                      ></span>
                    </div>
                    <div
                      className={`password-strength ${currentStringType}-active`}
                      id="passwordStrength"
                    >
                      <span
                        id="poor"
                        className={`${currentStringType === "heavy" ||
                          currentStringType === "strong" ||
                          currentStringType === "avg" ||
                          currentStringType === "poor"
                          ? "active"
                          : ""
                          }`}
                      ></span>
                      <span
                        id="weak"
                        className={`${currentStringType === "heavy" ||
                          currentStringType === "strong" ||
                          currentStringType === "avg"
                          ? "active"
                          : ""
                          }`}
                      ></span>
                      <span
                        id="strong"
                        className={`${currentStringType === "heavy" ||
                          currentStringType === "strong"
                          ? "active"
                          : ""
                          }`}
                      ></span>
                      <span
                        id="heavy"
                        className={`${currentStringType === "heavy" ? "active" : ""
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
                            Average. Must contain at least 1 letter or number
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

                  <div className="form-check remember-me">
                    <label className="form-check-label mb-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="remember"
                        {...register("remember", {
                          required: "Please agree to our terms and conditions",
                        })}
                      />{" "}
                      I agree to the <Link to={""}>Terms of Service</Link> and{" "}
                      <Link to={""}>Privacy Policy.</Link>
                    </label>
                    {errors.remember && (
                      <div className="error-italic">
                        {errors.remember.message}{" "}
                      </div>
                    )}
                  </div>
                  <div className="d-grid">
                    <button className="btn btn-primary btn-start" disabled={isLoading || currentStringType !== "heavy"} type="submit">
                      {isLoading ? "Creating..." : "Create Account"}
                    </button>
                    <p className="text-center mt-2 text-soft">Already have an account? <Link to="/student-login" className="highlighted-text link">Login here</Link></p>
                  </div>
                </form>
              </div>
              {/* <div className="google-bg text-center">
                <span>
                  <a href="#">Or sign in with</a>
                </span>
                <div className="sign-google">
                  <ul>
                    <li>
                      <a href="#">
                        <img src={"netIcon01"} className="img-fluid" alt="Logo" />{" "}
                        Sign In using Google
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img
                          src="assets/img/net-icon-02.png"
                          className="img-fluid"
                          alt="Logo"
                        />
                        Sign In using Facebook
                      </a>
                    </li>
                  </ul>
                </div>
                <p className="mb-0">
                  Already have an account? <a href="login.html">Sign in</a>
                </p>
              </div> */}
            </div>
            {/* <!-- /Login --> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentRegister;
