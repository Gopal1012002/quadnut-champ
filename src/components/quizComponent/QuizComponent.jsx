import React, { useEffect, useState } from "react";
import { GetQuizData, QuizStartService, QuizSubmitService, StartQuizService } from "../../services/StudentServices";
import "../../assets/css/video-player.css";
import {
  FaRegCheckCircle,
  FaRegCircle,
  FaRegPlayCircle,
  FaRegSquare,
} from "react-icons/fa";
import { FaRegSquareCheck, FaRegSquareFull } from "react-icons/fa6";
import { PiSkipForwardFill } from "react-icons/pi";
import { Modal, ModalBody, ModalHeader, ProgressBar } from "react-bootstrap";
import QuizInstructionsModal from "./QuizInstructionsModal";
import ClockImg from "../../assets/img/icon/clock.svg";
import { Circles, Hourglass } from "react-loader-spinner";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import QuizResult from "./QuizResult";

const QuizComponent = ({ lessonId }) => {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [questionArray, setQuestionArray] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalGrade, setTotalGrade] = useState(0);
  const [quizType, setQuizType] = useState("");
  const [quizTime, setQuizTime] = useState("");
  const [questionLength, setQuestionLength] = useState(0);
  const [answerArray, setAnswerArray] = useState([]);
  const [quizToken, setQuizToken] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [progress, setProgress] = useState({
    initial: 0,
    current: 0,
  });
  const [quizData, setQuizData] = useState({});
  const [steps, setSteps] = useState("1");
  const [isLoading, setLoading] = useState(false);
  const [quizResultData, setQuizResultData] = useState({});
  const nextStep = () => {
    if (steps === "1") {
      setSteps("2");
    }
  };
  const setUpTime = (timer) => {
    const initialHours = Math.floor(timer / 60);
    const initialMinutes = timer % 60;
    const initialSeconds = 0;

    setHours(initialHours);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
  };
  const startQuiz = () => {
    setLoading(true);
    QuizStartService(lessonId).then((res)=>{
      toast.success(res?.message)
      setQuizToken(res?.data)
    }).catch((err)=>{
      toast.error(err?.response?.data?.message);
      setSteps("2");
      setLoading(false);
      return;
    }).finally(()=>{
      setLoading(false)
    })
    setSteps("3");
    if (quizData?.lessonDetails?.quizTimeType === "DEFAULT") {
      setUpTime(quizData?.lessonDetails?.quizCompleteTime);
      setProgress({
        initial: quizData?.lessonDetails?.quizCompleteTime * 60,
        current: quizData?.lessonDetails?.quizCompleteTime * 60,
      });
    } else {
      setUpTime(currentQuestion?.questionTime);
      setProgress({
        initial: currentQuestion?.questionTime * 60,
        current: currentQuestion?.questionTime * 60,
      });
    }
    setCurrentQuestionIndex(0);
    setIsQuizStarted(true);
  };
  const onSelectAnswer = (answer, index) => {
    let answer_array = [...answerArray];

    if (currentQuestion?.questionType === "SINGLE") {
      if (
        answer_array[currentQuestionIndex].selectedOptionId === answer?.answerId
      ) {
        answer_array[currentQuestionIndex].selectedOptionId = "";
        answer_array[currentQuestionIndex].selectedOptionIndex = "";
      } else {
        answer_array[currentQuestionIndex].selectedOptionId = answer?.answerId;
        answer_array[currentQuestionIndex].selectedOptionIndex = index;
      }
      answer_array[currentQuestionIndex].selectedOptionTitle =
        answer?.answerTitle;
    } else {
      if (
        answer_array[currentQuestionIndex]?.selectedIndexArray?.includes(index)
      ) {
        answer_array[currentQuestionIndex].selectedIndexArray = answer_array[
          currentQuestionIndex
        ].selectedIndexArray.filter((item) => item !== index);
        answer_array[currentQuestionIndex].selectedOptionIdArray = answer_array[
          currentQuestionIndex
        ].selectedOptionIdArray.filter((item) => item !== answer?.answerId);
        answer_array[currentQuestionIndex].selectedOptionTitleArray =
          answer_array[currentQuestionIndex].selectedOptionTitleArray.filter(
            (item) => item !== answer?.answerTitle
          );
      } else {
        answer_array[currentQuestionIndex].selectedIndexArray = [
          ...answer_array[currentQuestionIndex]?.selectedIndexArray,
          index,
        ];
        answer_array[currentQuestionIndex].selectedOptionIdArray = [
          ...answer_array[currentQuestionIndex]?.selectedOptionIdArray,
          answer?.answerId,
        ];
        answer_array[currentQuestionIndex].selectedOptionTitleArray = [
          ...answer_array[currentQuestionIndex]?.selectedOptionTitleArray,
          answer?.answerTitle,
        ];
      }
    }
    setAnswerArray(answer_array);
  };

  const onSubmitQuiz = () => {
    setLoading(true);
    const quizData = {
      answers:answerArray,
      quizToken
    }
    QuizSubmitService(quizData).then((res)=>{
      setQuizResultData(res?.data)
      setSteps("4");
    }).catch((err)=>{
      console.log(err?.response?.data?.message);
    }).finally(()=>{
      setLoading(false)
    })
  }

  const onNextQuiz = () => {
    if (currentQuestionIndex < questionArray?.length - 1) {
      if (quizType !== "DEFAULT") {
        setUpTime(questionArray[currentQuestionIndex + 1]?.questionTime);
        setProgress({
          initial: questionArray[currentQuestionIndex + 1]?.questionTime * 60,
          current: questionArray[currentQuestionIndex + 1]?.questionTime * 60,
        });
      }
      setCurrentQuestion(questionArray[currentQuestionIndex + 1]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }else{
      onSubmitQuiz();
    }
  };

  const onSelfSubmit = () => {
    Swal.fire({
      title: "Are you sure?",
      text: 'Please note: Once submission done, it cannot be undone.',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#06AE92",
      cancelButtonColor: "#364a63",
      confirmButtonText: 'Yes'
    }).then((res)=>{
      if(res?.isConfirmed){
        onSubmitQuiz();
      }
    })
  }

  const gradeCalculator = (quizDetails) => {
    setTotalGrade(quizDetails.reduce((accumulator, currentValue) => accumulator + currentValue?.questionGrade, 0))
  }
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          if (hours > 0) {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          } else {
            // if(showQuizModal){
            //     timesUp();
            // }
            if (isQuizStarted) {
              onNextQuiz();
            }
            clearInterval(timerInterval);
          }
        }
      }

      setProgress({
        ...progress,
        current: progress.current - 1,
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [hours, minutes, seconds]);
  useEffect(() => {
    setIsQuizStarted(false);
    setQuestionArray([]);
    setCurrentQuestion({})
    setCurrentQuestionIndex('')
    setSteps('1')
    setLoading(true);
    
    GetQuizData(lessonId)
      .then((res) => {
        setQuizData(res.data);
        setQuestionArray(res?.data?.quizData);
        setCurrentQuestion(res?.data?.quizData[0]);
        setQuestionLength(res?.data?.quizData?.length);
        setQuizType(res?.data?.lessonDetails?.quizTimeType);
        if (res?.data?.lessonDetails?.quizTimeType === "DEFAULT") {
          setQuizTime(res?.data?.lessonDetails?.quizCompleteTime);
        }
        let answer_array = [];
        res?.data?.quizData?.map((ans) => {
          let particular_ans_array = [...ans?.answerList];
          answer_array.push({
            questionId: ans?.questionId,
            questionTitle: ans?.questionTitle,
            answerList: particular_ans_array,
            questionType:ans?.questionType,
            answerTitle:'',
            isCorrected:'',
            selectedOptionId: "",
            selectedOptionTitle: "",
            selectedOptionIndex: "",
            selectedIndexArray: [],
            selectedOptionIdArray: [],
            selectedOptionTitleArray: [],
          });
        });
        setAnswerArray(answer_array);
        gradeCalculator(res?.data?.quizData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [lessonId]);
  return (
    <>
      <div
        className="container-fluid height-pdf-viewer"
        onContextMenu={(e) => e.preventDefault()}
      >
        <div
          className="height-pdf-viewer quiz-viewer p-0"
          style={{
            height: "100vh",
            overflowY: "scroll",
            border: "1px solid #ccc",
          }}
        >
          {isLoading ? (
            <>
              <div className="loader-div">
                <Hourglass
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="hourglass-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  colors={["#F66962", "#72a1ed"]}
                />
              </div>
            </>
          ) :
          steps === "4"  ? (
            <QuizResult data={quizResultData} totalGrade={totalGrade} />
          ) :
          steps === "3" ? (
            <div className="quiz-container p-4  rounded">
              <div className="question-top mb-3">
                <span>Question {currentQuestionIndex + 1} :</span>
                <span className="d-flex flex-row">
                  <span className="subs-title">
                    {hours > 0 ? `${hours}h` : ""} {minutes}m {seconds}s
                    <div className="clock-right-bottom">
                      <ProgressBar
                        striped
                        variant={
                          ((progress.current * 100) / progress.initial).toFixed(
                            0
                          ) > 50
                            ? "info"
                            : "danger"
                        }
                        now={(
                          (progress.current * 100) /
                          progress.initial
                        ).toFixed(0)}
                        style={{ height: "10px" }}
                      />
                    </div>
                  </span>
                </span>
              </div>
              <h5 className=" text-primary mb-3">
                {currentQuestion?.questionTitle}
              </h5>
              <p className="text-soft text-small">
                <b>Grade Points : </b> {((currentQuestion?.questionGrade *100)/totalGrade)?.toFixed(0)}% </p>
              {currentQuestion?.answerList?.map((answer, index) => {
                return (
                  <div
                    key={index}
                    className="border my-3 border-sm p-3 d-flex align-items-center clickable-btn"
                    onClick={() => onSelectAnswer(answer, index)}
                  >
                    {currentQuestion?.questionType === "SINGLE" ? (
                      answerArray[currentQuestionIndex]?.selectedOptionIndex ===
                      index ? (
                        <FaRegCheckCircle
                          size={19}
                          color="#2d2f31"
                          className="me-2"
                        />
                      ) : (
                        <FaRegCircle
                          size={19}
                          color="#2d2f31"
                          className="me-2"
                        />
                      )
                    ) : answerArray[
                        currentQuestionIndex
                      ]?.selectedIndexArray?.includes(index) ? (
                      <FaRegSquareCheck
                        size={20}
                        color="#2d2f31"
                        className="me-2"
                      />
                    ) : (
                      <FaRegSquare size={20} color="#2d2f31" className="me-2" />
                    )}
                    <span className="answer-heading">
                      {answer?.answerTitle}
                    </span>
                  </div>
                );
              })}
              {currentQuestionIndex + 1 == questionArray?.length ? (
                <button
                  className="btn btn-primary rounded-0 me-2"
                  onClick={onSelfSubmit}
                  disabled={
                    answerArray[currentQuestionIndex]?.selectedIndexArray
                      ?.length === 0 &&
                    (!answerArray[currentQuestionIndex]?.selectedOptionId ||
                      answerArray[currentQuestionIndex]?.selectedOptionId ===
                        "")
                  }
                >
                  Submit Quiz
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-primary rounded-0 me-2"
                    onClick={onNextQuiz}
                    disabled={
                      answerArray[currentQuestionIndex]?.selectedIndexArray
                        ?.length === 0 &&
                      (!answerArray[currentQuestionIndex]?.selectedOptionId ||
                        answerArray[currentQuestionIndex]?.selectedOptionId ===
                          "")
                    }
                  >
                    Next
                  </button>
                  {currentQuestion?.questionSkippable === "YES" && (
                    <button
                      className="btn bg-dark text-white rounded-0"
                      onClick={onNextQuiz}
                    >
                      Skip
                    </button>
                  )}
                </>
              )}
            </div>
          ) : (
            <div className="quiz-container p-4 bg-light rounded shadow-sm">
              <h3 className="lesson-title text-primary fw-bold mb-3">
                {quizData?.lessonDetails?.lessonTitle}
              </h3>
              <p className="text-muted small mb-4">
                <i className="bi bi-question-circle"></i> Quiz |{" "}
                {quizData?.quizData?.length} Questions
              </p>
              <div className="d-flex flex-wrap gap-2 mb-4">
                <button
                  className="btn btn-primary rounded-pill px-4 shadow-sm"
                  onClick={nextStep}
                >
                  <FaRegPlayCircle size={22} className="me-2" />
                  Start Quiz
                </button>
                <button className="btn btn-warning text-white rounded-pill px-4 shadow-sm">
                  <PiSkipForwardFill size={22} className="me-2" /> Skip Quiz
                </button>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-transparent">
                  <b>Manage your time:</b> Plan and monitor how much time you
                  spend on each section of the quiz.
                </li>
                <li className="list-group-item bg-transparent">
                  <b>Read carefully:</b> Make sure you understand what each
                  question is asking.
                </li>
                <li className="list-group-item bg-transparent">
                  <b>Answer in your own words:</b> Avoid academic integrity
                  issues by answering questions in your own words.
                </li>
                <li className="list-group-item bg-transparent">
                  <b>Review your answers:</b> If time and quiz settings allow,
                  you may be able to review your answers before submitting.
                </li>
                <li className="list-group-item bg-transparent">
                  <b>Submit on time:</b> Don't leave it to the last minute to
                  submit your quiz.
                </li>
                <li className="list-group-item bg-transparent">
                  <b>Prepare your tech:</b> Make sure your technology is ready
                  to go so the quiz runs smoothly.
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <QuizInstructionsModal
        startQuiz={startQuiz}
        data={quizData}
        isOpen={steps === "2"}
        onClose={() => {
          setSteps("1");
        }}
      />
    </>
  );
};

export default QuizComponent;
