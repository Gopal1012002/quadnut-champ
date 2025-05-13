import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "react-bootstrap";
import { formatDateAndTime } from "../../../utils/dynamic.util";

const StudentMockResult = ({ data }) => {
    const [questionList, setQuestionList] = useState([]);
    const [totalGrade, setTotalGrade] = useState("");
    const [futureDeclare, setFutureDeclare] = useState(false);
    const [declareTime, setDeclareTime] = useState();

    useEffect(() => {
        if (data?.studentResponse) {
            let parsedResponse = JSON.parse(data?.studentResponse ?? "");
            parsedResponse = JSON.parse(parsedResponse);
            let questionGrade = 0;
            parsedResponse?.map((ques) => {
                questionGrade += ques?.questionGrade;
            });
            setTotalGrade(questionGrade);
            setQuestionList(parsedResponse); // Update state
        } else {
            if (data.isTimeOriented === 'YES') {
                let endDate = new Date(data.endTime);
                let currentDate = new Date();
                if (currentDate < endDate) {
                    setFutureDeclare(true);
                    setDeclareTime(endDate);
                }
            }
        }
    }, [data?.studentResponse]);

    return (
        <>
            <div className="quiz-result-page" style={{ overflowY: 'scroll', maxHeight: '500px', scrollbarWidth: 'none' }}>
                <div className="quiz-result-header w-100 p-4 bg-dark text-light">
                    <p className=" fs-4 fw-700">
                        {data?.mockTestTitle}
                    </p>
                    <div className="d-flex flex-row justify-content-between">
                        <p className="fw-400">You have scored {data?.percentObtained}%.</p>
                        <p className="fw-400">
                            Required :{" "}
                            <span className="text-primary">{data?.passingPercent}%.</span>
                        </p>
                    </div>
                </div>
                <p className="ps-4 mt-2">
                    <b>Overall Result :</b>{" "}
                    <span
                        className={`${data?.quizResult === "PASS" ? "text-success" : "text-danger"
                            }`}
                    >
                        {" "}
                        {data?.quizResult === "PASS" ? "Passed 🥳" : "Failed 😕"}{" "}
                    </span>
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
                                <h5 className="text-center">Corrected Questions</h5>
                            </CardHeader>
                            <CardBody>
                                <p className="text-center"> {data?.correctQuestionCount}</p>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                {questionList?.map((correctAns, index) => {
                    let parsedMultipleAnswers;
                    if (correctAns?.questionType === 'MULTIPLE') {
                        parsedMultipleAnswers = JSON.parse(correctAns?.correctedAns ?? '[]')
                    }
                    return (
                        <div key={index} className="p-3 border rounded mb-3 bg-light">
                            <div className="d-flex align-items-start">
                                <strong className="me-2">Q{index + 1}:</strong>
                                <div dangerouslySetInnerHTML={{ __html: correctAns?.questionTitle }}></div>
                                <span className="ms-auto text-primary small">
                                    (Grade: {((correctAns?.questionGrade * 100) / totalGrade)?.toFixed(2)}%)
                                </span>
                            </div>

                            <div className="mt-2  mock-answers">
                                {correctAns?.questionType !== 'TEXT' && correctAns?.answerList?.map((answer, ansIndex) => {
                                    return (<div
                                        key={ansIndex}
                                        className={correctAns?.questionType === 'SINGLE' ? `p-1 ps-2 my-1 rounded d-flex align-items-center ${answer?.answerTitle === correctAns?.correctedAns ? "bg-success-mock text-white" :
                                            answer?.answerTitle !== correctAns?.correctedAns && correctAns?.selectedOptionId === answer?.answerId ? "bg-danger-mock text-white" :
                                                "bg-white"
                                            }` :
                                            correctAns?.questionType === 'MULTIPLE' ?
                                                `p-1  ps-2 my-1 rounded d-flex align-items-center ${correctAns?.selectedOptionIdArray?.includes(answer?.answerId) && (parsedMultipleAnswers.some(item => item.answerId === answer.answerId) || correctAns?.isCorrected === "YES") ? "bg-success-mock text-white" :
                                                    correctAns?.selectedOptionIdArray?.includes(answer?.answerId) ? "bg-danger-mock text-white" :
                                                        parsedMultipleAnswers.some(item => item.answerId === answer.answerId) ? "bg-success-mock text-white" :
                                                            "bg-white"
                                                }` :
                                                `p-1  ps-2 my-1 rounded d-flex align-items-center ${answer?.answerTitle === correctAns?.correctedAns ? "bg-success-mock text-white" :
                                                    answer?.answerTitle !== correctAns?.correctedAns && correctAns?.selectedOptionId === answer?.answerId ? "bg-danger-mock text-white" :
                                                        "bg-white"
                                                }`
                                        }
                                    >
                                        <span className="me-2 fw-bold">{ansIndex + 1}.</span>
                                        <span>{answer?.answerTitle}</span>
                                        {correctAns?.questionType === 'SINGLE' && correctAns?.selectedOptionId == answer?.answerId ?
                                            <span className="border rounded ms-2 px-2" style={{ fontSize: '12px' }}>
                                                Your Answer
                                            </span> :
                                            correctAns?.questionType === 'MULTIPLE' && correctAns?.selectedOptionIdArray?.includes(answer?.answerId) &&
                                            <span className="border rounded ms-2 px-2" style={{ fontSize: '12px' }}>
                                                Your Answer
                                            </span>}
                                    </div>)
                                }
                                )}
                                {correctAns?.questionType === 'TEXT' &&
                                    correctAns?.isCorrected === 'YES' && <div className="p-1  ps-2 my-1 rounded d-flex align-items-center bg-success-mock text-white">
                                        <span>{correctAns?.selectedText}</span>
                                        <span className="border rounded ms-2 px-2" style={{ fontSize: '12px' }}>
                                            Your Answer
                                        </span>
                                    </div>
                                }
                                {correctAns?.questionType === 'TEXT' &&
                                    correctAns?.isCorrected !== 'YES' && <> <div className="p-1 ps-2 my-1 rounded d-flex align-items-center bg-danger-mock text-white">
                                        <span>{correctAns?.selectedText}</span>
                                        <span className="border rounded ms-2 px-2" style={{ fontSize: '12px' }}>
                                            Your Answer
                                        </span>
                                    </div>
                                        <div className="p-1 my-1 rounded d-flex align-items-center bg-success-mock text-white">
                                            <span>{correctAns?.correctedAns}</span>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>)
                })}
                {futureDeclare &&  <p className="text-center text-muted">
                    The correct answers to the mock test questions will be released on {formatDateAndTime(declareTime)}.
                </p> }
            </div>
        </>
    );
};

export default StudentMockResult;
