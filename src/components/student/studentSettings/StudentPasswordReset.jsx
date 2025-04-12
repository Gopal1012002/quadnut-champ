import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IoMdCloseCircle } from "react-icons/io";
import { StudentPasswordUpdateService } from "../../../services/StudentServices";
import {
  containsDigit,
  containsLetter,
  containsSpecialCharacters,
} from "../../../utils/dynamic.util";

const StudentPasswordReset = (props) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [currentStringType, setCurrentStringType] = useState("empty");
  const [invalidPassError, setInvalidPassError] = useState(false);
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm();
  const newPassword = watch("newPassword");
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
  const closeModal = () => {
    props.onHide();
    reset()
    setCurrentStringType("empty");
    setInvalidPassError(false);
    setShowConfirmPassword(false);
    setShowNewPassword(false);
    setShowOldPassword(false);
  }
  const submitFormData = (e) => {
    if (currentStringType !== "heavy") {
      return;
    }
    setLoading(true);
    StudentPasswordUpdateService(e)
      .then((res) => {
        toast.success(res?.message);
        closeModal();
      })
      .catch((err) => {
        if(err?.response?.data?.message === 'Invalid Password !!'){
          setInvalidPassError(true);
        }
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Body>
        <div className="d-flex justify-content-between  mb-0">
          <h4> Update Password</h4>
          <a href="#" className="text-end" onClick={closeModal}>
            <IoMdCloseCircle className="fs-4" />
          </a>
        </div>
        <form onSubmit={handleSubmit(submitFormData)}>
          <div className="checkout-form student-pass-update settings-wrap px-0 pt-2 pb-2">
            <Row>
              <Col md="12">
                <div className="input-block">
                  <label className="form-control-label">Current Password</label>
                  <div className="pass-group" id="passwordInput">
                    <input
                      {...register("oldPassword", {
                        required: "Current password is required",
                      })}
                      type={`${showOldPassword ? "text" : "password"}`}
                      className="form-control-md form-control "
                      placeholder="Enter your current password"
                      onChange={(e)=>{
                        setInvalidPassError(false);
                        setValue('oldPassword', e.target.value, {shouldValidate: true})
                      }}
                    />
                    <span
                      className={`toggle-password ${
                        showOldPassword ? `feather-eye ${errors.oldPassword || invalidPassError ? 'pb-3' :''}` : `feather-eye-off ${errors.oldPassword || invalidPassError ? 'pb-3' :''}`
                      }`}
                      onClick={() => {
                        setShowOldPassword(!showOldPassword);
                      }}
                    ></span>
                    {errors.oldPassword && (
                      <div className="error-italic">
                        {errors.oldPassword.message}{" "}
                      </div>
                    )}
                    {
                      invalidPassError && <div className="error-italic">
                      {"Invalid Password"}{" "}
                    </div>
                    }
                    
                  </div>
                </div>
                <div className="input-block">
                  <label className="form-control-label">New Password</label>
                  <div className="pass-group" id="passwordInput">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    className="form-control-md form-control "
                    {...register("newPassword", {
                      required: "New Password is required",
                    })}
                    onChange={(e) => {
                      handlePassword(e);
                      setValue("newPassword", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                    placeholder="Enter New Password"
                  />
                  <span
                      className={`toggle-password ${
                        showNewPassword ? `feather-eye ${errors.newPassword ? 'pb-3' :''}` : `feather-eye-off ${errors.newPassword ? 'pb-3' :''}`
                      }`}
                      onClick={() => {
                        setShowNewPassword(!showNewPassword);
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
                <div className="input-block">
                  <label className="form-control-label">Re-type New Password</label>
                  <div className="pass-group" id="passwordInput">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control-md form-control "
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === newPassword ||
                        "Password do not match",
                    })}
                    placeholder="Enter Confirm Password"
                  />
                  <span
                      className={`toggle-password ${
                        showConfirmPassword ? `feather-eye ${errors.confirmPassword ? 'pb-3' :''}` : `feather-eye-off ${errors.confirmPassword ? 'pb-3' :''}`
                      }`}
                      onClick={() => {
                        setShowConfirmPassword(!showConfirmPassword);
                      }}
                    ></span>
                  {errors.confirmPassword && (
                    <div className="error-italic">
                      {errors.confirmPassword.message}{" "}
                    </div>
                  )}
                  </div>
                </div>
              </Col>

              <Col md="12" className="d-flex justify-content-center gap-2">
                <Button type="submit" className="btn-sm fs-10" disabled={isLoading ? true : false}>
                  {
                    isLoading ? 'Updating...' : 'Update Password'
                  }
                </Button>
                {/* <Button  type="reset"  className="ms-2 btn-sm bg-black border-black fs-10" onClick={props.onHide} >Cancel</Button> */}
              </Col>
            </Row>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default StudentPasswordReset;
