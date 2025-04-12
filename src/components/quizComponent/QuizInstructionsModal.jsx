import React, { useState } from "react";
import "../../assets/css/quizInstructionsModal.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { GrLinkNext } from "react-icons/gr";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { numberToWords } from "../../utils/dynamic.util";

const QuizInstructionsModal = ({ isOpen, onClose, data, startQuiz }) => {
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
    reset();
    startQuiz();
  }
  const showInstructorMessage = () => {
    setInstructorMessage(true);
    setIsAccepted(false);
  };

  return (
    <Modal show={isOpen} onHide={close} centered size="lg" backdrop="static">
      <ModalHeader className="pt-3 pb-3">
        <h3 className="modal-title">Quiz Instructions</h3>
        <IoMdCloseCircleOutline
          className=" fs-2 clickable-btn"
          onClick={close}
          color="#F66962"
        />
        {/* <button className="close-btn fs-2" onClick={close}>&times;</button> */}
      </ModalHeader>
      <ModalBody>
        {data?.lessonDetails?.attemptCount !== 0 && (
          <div className="attempts-info">
            <div className="info-card">
              <h4>Total Attempts</h4>
              <p className="highlight">{data?.lessonDetails?.attemptCount}</p>
            </div>
            <div className="info-card">
              <h4>Attempts Consumed</h4>
              <p className="highlight">
                {data?.lessonDetails?.attemptConsumed}
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
          {data?.lessonDetails?.attemptCount == 0 && (
            <li>There is no limit in attempting this quiz.</li>
          )}
          <li>
            There {data?.quizData?.length > 1 ? "are" : "is"}{" "}
            {numberToWords(data?.quizData?.length)}{" "}
            {data?.quizData?.length > 1 ? "questions" : "question"} in the quiz.
          </li>
          <li>
            You must score at least{" "}
            <span className="highlight">
              {data?.lessonDetails?.passPercent}%
            </span>{" "}
            to qualify.
          </li>
          <li>Each question may have different grade points.</li>
          {data?.lessonDetails?.isCertificate === "YES" && (
            <li>This quiz is necessary for your final certificate.</li>
          )}
          {data?.lessonDetails?.quizTimeType === "DEFAULT" ? (
            <li>
              You have to complete all questions in{" "}
              <span className="highlight">
                {data?.lessonDetails?.quizCompleteTime} minutes
              </span>
              .
            </li>
          ) : (
            <li>Each question has its specific time to complete.</li>
          )}
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
          >
          Start Quiz
          </button>
        }
      </ModalFooter>
    </Modal>
  );
};

export default QuizInstructionsModal;
