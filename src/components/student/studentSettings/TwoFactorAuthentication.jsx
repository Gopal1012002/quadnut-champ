import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IoMdCloseCircle } from "react-icons/io";
import {StudentTwoFactorToggleService} from '../../../services/StudentServices';
const TwoFactorAuthentication = (props) => {
  const [invalidPassError, setInvalidPassError] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const closeModal = () => {
    props.onHide();
    reset();
    setInvalidPassError(false);
  }

  const submitFormData = (e) => {
    setLoading(true)
    StudentTwoFactorToggleService(e).then((res)=>{
        toast.success(res?.message)
        props.toggleFunction()
        closeModal()
    }).catch((err)=>{
        toast.error(err?.response?.data?.message)
        if(err?.status == 401){
            setInvalidPassError(true)
        }
    }).finally(()=>{
        setLoading(false)
    })
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
        <div className="d-flex justify-content-between mb-0">
          <h5>Two-factor authentication</h5>
          <a href="#" className="text-end" onClick={closeModal}>
            <IoMdCloseCircle className="fs-4" />
          </a>
        </div>
        <form onSubmit={handleSubmit(submitFormData)}>
          <div className="checkout-form student-pass-update settings-wrap px-0 pt-2 pb-2">
            <Row>
              <Col md="12">
                <div className="input-block">
                  <label className="form-control-label">Password</label>
                  <div className="pass-group" id="passwordInput">
                    <input
                      {...register("password", {
                        required: "Password is required",
                      })}
                      type={`${showOldPassword ? "text" : "password"}`}
                      className="form-control-md form-control "
                      placeholder="Enter your password"
                      onChange={(e) => {
                        setInvalidPassError(false);
                        setValue("password", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                    />
                    <span
                      className={`toggle-password ${
                        showOldPassword
                          ? `feather-eye ${errors.password ||invalidPassError ? "pb-3" : ""}`
                          : `feather-eye-off ${
                              errors.password ||invalidPassError ? "pb-3" : ""
                            }`
                      }`}
                      onClick={() => {
                        setShowOldPassword(!showOldPassword);
                      }}
                    ></span>
                    {errors.password && (
                      <div className="error-italic">
                        {errors.password.message}{" "}
                      </div>
                    )}
                    {invalidPassError && (
                      <div className="error-italic">{"Invalid Password !!"} </div>
                    )}
                  </div>
                </div>
              </Col>

              <Col md="12" className="d-flex justify-content-center gap-2">
                <Button type="submit" className="btn-sm fs-10" disabled={isLoading ? true: false}>
                    {isLoading ? 'Continue...' : 'Continue'}
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

export default TwoFactorAuthentication;
