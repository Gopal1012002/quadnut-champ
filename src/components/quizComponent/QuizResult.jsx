import React from "react";
import { Card, CardBody, CardHeader, Col, Row } from "react-bootstrap";
import { AiOutlineSmile } from "react-icons/ai";
import { TbFaceIdError } from "react-icons/tb";

const QuizResult = ({ data, totalGrade }) => {
  return (
    <>
      <div className="quiz-result-page">
        <div className="quiz-result-header w-100 p-4 bg-dark text-light">
          <p className=" fs-4 fw-700">
            {data?.percentObtained >= data?.percentRequired
              ? data?.percentObtained > 90
                ? "Outstanding performance!"
                : "Review the course materials to expand your learning."
              : "Review the course materials to expand your learning."}
          </p>
          <div className="d-flex flex-row justify-content-between">
          <p className="fw-400">You have scored {data?.percentObtained?.toFixed(2)}%.</p>
          <p className="fw-400">Required : <span className="text-primary">{data?.percentRequired}%.</span></p>
          </div>
          
        </div>
        <p className="ps-4 mt-2">
          <b>Overall Result :</b> <span className={`${ data?.quizResult ? 'text-success' : 'text-danger'}`}> {data?.quizResult ? 'Passed 🥳' : 'Failed 😕'}  </span>
        </p>
        <Row className="d-flex justify-content-center">
          <Col xs={12} md={5}>
            <Card>
              <CardHeader>
                <h5 className="text-center">Total Questions</h5>
              </CardHeader>
              <CardBody>
                <p className="text-center"> {data?.totalQuestionCount}</p>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={5}>
            <Card>
              <CardHeader>
                <h5  className="text-center">Corrected Questions</h5>
              </CardHeader>
              <CardBody>
              <p className="text-center"> {data?.correctQuestionCount}</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <h6 className="ps-4 text-success">
          <AiOutlineSmile size={22} /> Questions You Answered Correctly
        </h6>
        {data?.answers?.map((correctAns, index) => {
          if (correctAns?.isCorrected === "YES") {
            return (
              <p key={index} className="ps-5 text-soft">
                Q{index + 1} : {correctAns?.questionTitle}  <span className="text-primary"> (Grade : {(correctAns?.questionGrade*100 /totalGrade)?.toFixed(2)} %) </span>
              </p>
            );
          }
        })}
        {data?.percentObtained !== 100 && (
          <>
            <h6 className="ps-4 text-danger">
              <TbFaceIdError size={22} /> Questions to Revisit
            </h6>
            {data?.answers?.map((correctAns, index) => {
              if (correctAns?.isCorrected !== "YES") {
                return (
                  <p key={index}  className="ps-5 text-soft">
                    Q{index + 1} : {correctAns?.questionTitle}  <span className="text-primary"> (Grade : {(correctAns?.questionGrade*100 /totalGrade)?.toFixed(2)}) </span>
                  </p>
                );
              }
            })}
          </>
        )}
      </div>
    </>
  );
};

export default QuizResult;
