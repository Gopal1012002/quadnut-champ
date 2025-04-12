import React, { useState } from "react";
import "../../../assets/css/quizInstructionsModal.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { GrLinkNext } from "react-icons/gr";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { formatDateAndTime, numberToWords } from "../../../utils/dynamic.util";
import { useNavigate } from "react-router-dom";
import { StartMockTestService } from "../../../services/StudentServices";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const MockInstructionModal = ({ isOpen, onClose, data, startQuiz }) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  
  const [questionLength, setQuestionLength] = useState(data?.quizData?.length);
  const [isInstructorMessage, setInstructorMessage] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  if (!isOpen) return null;
  const reset = () => {
    setIsAccepted(false);
    setInstructorMessage(false);
  }
  const close = () => {
    reset();
    onClose();
  };
  const onStartQuiz = () => {
    setLoading(true);
    StartMockTestService(data?.mockTestId).then((res)=>{
      Cookies.set(`mock-${data?.mockTestId}`, res?.data, { expires: 1/(24*12) })
      navigate(`/mock-attempt/${data?.mockTestId}/${data?.mockTestSlug}`)
    }).catch((err)=>{
      console.log(err);
      toast.error(err?.response?.data?.message)
    }).finally(()=>{
      setLoading(false)
    })
    // startQuiz();
    
  }
  const showInstructorMessage = () => {
    setInstructorMessage(true);
    setIsAccepted(false);
  };

  return (
    <Modal show={isOpen} onHide={close} centered size="lg" backdrop="static">
      <ModalHeader className="pt-3 pb-3">
        <h3 className="modal-title">Mock Instructions</h3>
        <IoMdCloseCircleOutline
          className=" fs-2 clickable-btn"
          onClick={close}
          color="#F66962"
        />
        {/* <button className="close-btn fs-2" onClick={close}>&times;</button> */}
      </ModalHeader>
      <ModalBody>
        {data?.mockTestLimitType === 'LIMITED' && (
          <div className="attempts-info">
            <div className="info-card">
              <h4>Total Attempts</h4>
              <p className="highlight">{data?.mockTestMaxAttempts}</p>
            </div>
            <div className="info-card">
              <h4>Attempts Consumed</h4>
              <p className="highlight">
                {data?.attemptsConsumed}
              </p>
            </div>
          </div>
        )}

        {
          isInstructorMessage && isInstructorMessage !== null && isInstructorMessage !== "null" ? <div className="instructor-message-container">
          <div className="message-header">Message from the Instructor</div>
          <div className="message-body">
            <p>{data?.lessonDetails?.quizBeforeMessage}
            </p>
          </div>
        </div> :
          <ul className="instruction-list">
          {data?.mockTestLimitType !== 'LIMITED' && (
            <li>There is no limit in attempting this quiz.</li>
          )}
          {/* <li>
            There {data?.quizData?.length > 1 ? "are" : "is"}{" "}
            {numberToWords(data?.quizData?.length)}{" "}
            {data?.quizData?.length > 1 ? "questions" : "question"} in the quiz.
          </li> */}
          <li>
            You must score at least{" "}
            <span className="highlight">
              {data?.mockTestPassPercent}%
            </span>{" "}
            to qualify.
          </li>
          <li>Each question may have different grade points.</li>
          {data?.mockTestPassCertificate === "YES" && (
            <li>This mock is necessary for your Completion certificate.</li>
          )}
          {data?.mockTestTimeType === "DEFAULT" ? (
            <li>
              You have to complete all questions in{" "}
              <span className="highlight">
                {data?.mockTestTime} minutes
              </span>
              .
            </li>
          ) : (
            <li>Each question has its specific time to complete.</li>
          )}

          {
            data?.isTimeOriented === "YES" && <li>You have to complete this mock test before end time :<span className="text-primary"> {formatDateAndTime(data?.mockTestEndTime)}</span>.</li>
          }
        </ul>
        }
        
      </ModalBody>
      <ModalFooter>
        <div className="accept-instructions">
          <input
            type="checkbox"
            id="acceptInstructions"
            className="me-2 text-hightlight"
            required
            checked={isAccepted}
            onChange={() => setIsAccepted(!isAccepted)}
          />
          <label
            className="acceptInstructions mt-2 clickable-btn"
            onChange={() => setIsAccepted(!isAccepted)}
            htmlFor="acceptInstructions"
          >
            I have read and understood the above instructions.
          </label>
        </div>
        {
          data?.lessonDetails?.quizBeforeMessage?.trim() &&
          !isInstructorMessage &&
          data?.lessonDetails?.quizBeforeMessage?.trim() !== "" ?
          <button className="btn btn-primary btn bg-highlight"
          onClick={showInstructorMessage}
          disabled={!isAccepted}
          >
            Next <GrLinkNext className="ms-1" />
          </button> : <button disabled={!isAccepted} className="btn btn-primary btn bg-highlight"
          onClick={onStartQuiz}
          > { isLoading ? 'Starting...' : 'Start Quiz'}
          </button>
        }
      </ModalFooter>
    </Modal>
  );
};

export default MockInstructionModal;
