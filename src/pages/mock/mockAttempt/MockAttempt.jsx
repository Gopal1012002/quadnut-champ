import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaRegCheckCircle } from 'react-icons/fa'
import { GetMockQuestions, MockAttemptLogServices, SubmitMockTestService } from '../../../services/StudentServices';
import { useNavigate, useParams } from 'react-router-dom';
import MockQuestion from './MockQuestion';
import Swal from 'sweetalert2';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';

const MockAttempt = () => {
  const { id, slug } = useParams();
  const [token, setToken] = useState(Cookies.get(`mock-${id}`));
  const [isLoading, setLoading] = useState(false);
  const [mockDetails, setMockDetails] = useState();
  const [answers, setAnswers] = useState();
  const [isNext, setIsNext] = useState(false);
  const [isPrev, setIsPrev] = useState(false);
  const [current, setCurrent] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [totalGrade, setTotalGrade] = useState(0);
  const [mockType, setMockType] = useState();
  const [hours, setHours] = useState(0);
  const [isQuizStarted, setQuizStarted] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [endTime, setEndTime] = useState();
  const [mockStartTime, setMockStartTime] = useState();
  const [textResponse, setTextReponse] = useState();
  const navigate = useNavigate();
  

  const [isFullScreen, setIsFullScreen] = useState(false);
  const enterFullScreen = () => {
    try {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen(); // Firefox
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(); // Chrome, Safari, Opera
        } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen(); // IE/Edge
        }
        setIsFullScreen(true);
      }
    } catch (error) {
      console.log(error);
      
    }

  };
  
  const submitMockTestLog = () => {
    
    if(currentQuestion?.questionType === 'SINGLE' || currentQuestion?.questionType ===  'MULTIPLE'){
      const data = {
        mockTestId:id,
        token,
        questionId:currentQuestion?.questionId,
        questionTitle: currentQuestion?.questionTitle,
        questionType: currentQuestion?.questionType,
        questionGrade: currentQuestion?.questionGrade,
        answerList: JSON.stringify(currentQuestion?.answerList),
        answerResponse: currentQuestion?.questionType === 'SINGLE' ? JSON.stringify(currentQuestion?.selectedOptionId) : JSON.stringify(currentQuestion?.selectedOptionIdArray),
        totalQuestions: answers?.length,
        questionOrder: current,
        totalGrade
      }

      MockAttemptLogServices(data).then((res)=>{
        console.log(res?.message)
      }).catch((err)=>{
        console.log(err)
      }).finally(()=>{

      })
    }else{
      // setTextReponse()
      const data = {
        mockTestId:id,
        token,
        questionId:currentQuestion?.questionId,
        questionTitle: currentQuestion?.questionTitle,
        questionType: currentQuestion?.questionType,
        questionGrade: currentQuestion?.questionGrade,
        answerList: JSON.stringify(currentQuestion?.answerList),
        answerResponse: currentQuestion?.selectedText,
        totalQuestions: answers?.length,
        questionOrder: current,
        totalGrade
      }
      setTextReponse(data)
    }
  }

  const submitMockTestTextLog = (data) => {
      MockAttemptLogServices(data).then((res)=>{
        console.log(res?.message)
      }).catch((err)=>{
        console.log(err)
      }).finally(()=>{
        setTextReponse(false)
      })
    }
  

  useEffect(()=>{
    let cookieToken = Cookies.get(`mock-${id}`);
    
    if(!cookieToken) {
      Swal.fire({
        title: 'Invalid Mock Attempt!!',
        text: 'Token respective to this mock attempt is not found.',
        icon: "warning",
      }).then((res) => {
        if (res?.isConfirmed) {
          if(document.fullscreenElement){
            document.exitFullscreen();
          }
          navigate(`/mock-details/${slug}`)
        }else{
          if(document.fullscreenElement){
            document.exitFullscreen();
          }
          navigate(`/mock-details/${slug}`)
        }
      }).finally(()=>{
        if(document.fullscreenElement){
          document.exitFullscreen();
        }
        navigate(`/mock-details/${slug}`)
      })
    }else{
      Cookies.remove(`mock-${id}`);
    }
  },[])

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);


  useEffect(() => {
    const isConfirmed = window.confirm("Open in full screen?");
    if (isConfirmed) {
      try {
        enterFullScreen();
      } catch (error) {
        
      }
      
    } else {
      navigate(`/mock-details/${slug}`);
    }
  }, []);

  useEffect(() => {

    document.addEventListener("keydown", function (event) {
      const blockedKeys = [
        "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"
      ];

      if (
        event.ctrlKey && (event.key.toLowerCase() === "r" || event.key.toLowerCase() === "f5") || // Block Ctrl+R, Ctrl+Shift+R, Ctrl+F5
        event.metaKey && (event.key.toLowerCase() === "r" || event.key.toLowerCase() === "f5") || // Block Cmd+R (Mac)
        blockedKeys.includes(event.key) || // Block function keys F1 - F12
        (event.key === "F11") // Specifically block F11 in fullscreen
      ) {
        event.preventDefault();
        event.stopPropagation();
        console.log("Blocked:", event.key);
      }
    });

  })


  const setUpTime = (timer) => {
    const initialHours = Math.floor(timer / 60);
    const initialMinutes = timer % 60;
    const initialSeconds = 0;

    setHours(initialHours);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
  };
  const onSelectAnswer = (data) => {
    let dummyCurrentQuestion = currentQuestion;
    if (dummyCurrentQuestion?.questionType === 'SINGLE') {
      dummyCurrentQuestion.selectedOptionId = data;
    } else if (dummyCurrentQuestion?.questionType === 'MULTIPLE') {
      if (!dummyCurrentQuestion?.selectedOptionIdArray) {
        dummyCurrentQuestion.selectedOptionIdArray = []
      }
      if (dummyCurrentQuestion?.selectedOptionIdArray?.includes(data)) {
        let newArray = dummyCurrentQuestion?.selectedOptionIdArray?.filter((id) => id != data);
        dummyCurrentQuestion.selectedOptionIdArray = [...newArray];
      } else {
        let newArray = dummyCurrentQuestion?.selectedOptionIdArray;
        newArray.push(data);
        dummyCurrentQuestion.selectedOptionIdArray = [...newArray];
      }
    } else {
      dummyCurrentQuestion.selectedText = data;
    }
    submitMockTestLog()
    setCurrentQuestion(dummyCurrentQuestion);
    let dummyAnswerArray = [...answers];
    dummyAnswerArray[current] = dummyCurrentQuestion;
    setAnswers([...dummyAnswerArray]);

  }
  const onClickPrev = () => {
    if (current > 0) {
      if ((current - 1) === 0) {
        setIsPrev(false)
      }
      if ((current) <= answers?.length - 1) {
        setIsNext(true)
      }
      setCurrentQuestion(answers[current - 1]);
      setCurrent(current - 1);
      if(textResponse){
        submitMockTestTextLog(textResponse);
      }
    }
  }
  const onClickNext = () => {
    if (mockType === 'SPECIFIC') {
      setUpTime(currentQuestion?.questionTime)
      if ((current + 1) === (answers?.length - 1)) {
        setIsNext(false);
      }
      if (current >= 0) {
        setIsPrev(true);
      }
      setCurrentQuestion(answers[current + 1]);
      setCurrent(current + 1)
      if(textResponse){
        submitMockTestTextLog(textResponse);
      }
      return;
    }
    if(textResponse){
      submitMockTestTextLog(textResponse);
    }
    if (current < (answers?.length - 1)) {
      if ((current + 1) === (answers?.length - 1)) {
        setIsNext(false);
      }
      if (current >= 0) {
        setIsPrev(true);
      }
      setCurrentQuestion(answers[current + 1]);
      setCurrent(current + 1)
    }
  }

  const onSubmitMockTest = () => {
    let endTime = new Date();
    const bodyData = {
      mockData: mockDetails?.mockDetails,
      answers: JSON.stringify(answers),
      token,
      mockAttemptStartTime: mockStartTime,
      mockAttemptEndTime: endTime
    }
    setLoading(true);
    SubmitMockTestService(bodyData).then((res) => {
      if (res.statusCode === 201) {
        Swal.fire({
          title: res?.message,
          text: res?.data?.message,
          icon: "success",
        }).then((res) => {
          if (res?.isConfirmed) {
            if(document.fullscreenElement){
              document.exitFullscreen();
            }
            navigate(`/mock-details/${slug}`)
          }
        })
      } else {
        toast.success(res?.message);
        // document.exitFullscreen();
        navigate(`/mock-details/${slug}`)
      }

    }).catch((err) => {
      toast.error(err?.response?.data?.message);
      // document.exitFullscreen();
    }).finally(() => {
      setLoading(false);
      // document.exitFullscreen();
    })
  }



  const askToSubmitMock = () => {
    if(textResponse){
      submitMockTestTextLog(textResponse);
    }
    Swal.fire({
      title: "Are you sure?",
      text: 'Please note: Once submission done, it cannot be undone.',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#06AE92",
      cancelButtonColor: "#364a63",
      confirmButtonText: 'Yes'
    }).then((res) => {
      if (res?.isConfirmed) {
        onSubmitMockTest();
      }
    })
  }

  const selectQuestion = (index) => {
    if (mockType === 'SPECIFIC') {
      if(textResponse){
        submitMockTestTextLog(textResponse);
      }
      return;
    }
    if (index === 0) {
      setIsPrev(false);
    } else if (index === (answers?.length - 1)) {
      setIsNext(false);
    } else {
      setIsNext(true);
      setIsPrev(true);
    }
    setCurrent(index);
    setCurrentQuestion(answers[index]);
    if(textResponse){
      submitMockTestTextLog(textResponse);
    }
  }
  const timesUpDefault = () => {
    onSubmitMockTest();
    Swal.fire({
      title: "Times Up !!",
      text: 'Mock test time has been completed.',
      icon: "warning",
    })
    navigate(`/mock-details/${slug}`)
  }

  const timesUpSpecific = () => {
    if (current !== (answers?.length - 1)) {
      setUpTime(currentQuestion?.questionTime)
      setCurrentQuestion(answers[current + 1]);
      setCurrent(current + 1)
    } else {
      timesUpDefault();
    }
  }

  const onMarkForPreview = () => {
    let dummyAnswerArray = [...answers];
    if (dummyAnswerArray[current].isMarked) {
      dummyAnswerArray[current].isMarked = false;
    } else {
      dummyAnswerArray[current].isMarked = true;
    }

    setAnswers([...dummyAnswerArray]);
    setCurrentQuestion(dummyAnswerArray[current])
  }

  const handleExitFullScreen = () => {
    onSubmitMockTest();
    // Call your function here
  };



  useEffect(() => {

    const currentDate = new Date();
    setMockStartTime(currentDate);
    setLoading(true);
    GetMockQuestions(id).then((res) => {
      setMockDetails(res?.data?.mockData);
      setAnswers([...res?.data?.mockData?.questions])
      setCurrent(0);
      setCurrentQuestion(res?.data?.mockData?.questions[0])
      setIsNext(res?.data?.mockData?.questions?.length > 1)
      setTotalGrade(res?.data?.mockData?.totalGrade);
      setMockType(res?.data?.mockData?.mockDetails?.quizTimeType);
      if (res?.data?.mockData?.mockDetails?.quizTimeType === 'DEFAULT') {
        setUpTime(res?.data?.mockData?.mockDetails?.quizCompleteTime);
      } else {
        setUpTime(res?.data?.mockData?.questions[0]?.questionTime)
      }
      if (res?.data?.mockData?.mockDetails?.isTimeOriented === 'YES') {
        setEndTime(new Date(res?.data?.mockData?.mockDetails?.mockTestEndTime));
      }
      setQuizStarted(true)

    }).catch((err) => {
      if (err?.status === 401) {
        Swal.fire({
          title: "Submission Closed – Time Over!",
          text: 'You Missed the Submission Window. It has been closed',
          icon: "warning",
        })
      } else {
        toast.error(err?.response?.data?.message)
      }
      navigate(`/mock-details/${slug}`)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (mockDetails?.mockDetails?.isTimeOriented === 'YES') {
        let currentTime = new Date();
        if (currentTime > endTime) {
          timesUpDefault();
        }
      }
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
              // onNextQuiz();
              if (mockDetails?.mockDetails?.quizTimeType === 'DEFAULT') {
                timesUpDefault();
              } else {
                timesUpSpecific();
              }
            }
            clearInterval(timerInterval);
          }
        }
      }

      // setProgress({
      //   ...progress,
      //   current: progress.current - 1,
      // });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [hours, minutes, seconds]);

  return (<>
    <Container className='mt-2' >
      <Row>
        <Col md={8} className='mock-title-mobile text-center d-flex align-items-center justify-content-center bg-secondary text-light fs-3 py-2'>
          <b>
            {mockDetails?.mockDetails?.mockTitle}
          </b>
        </Col>

        <Col md={12} className=' mobile-time-left-heading'>
          <div className="d-flex align-items-center justify-content-center pb-0 border-bottom">
            {/* <h5>Quant - Question Number 8</h5> */}
            <div className="mock-hour">
              <div className="top">
                {hours}
              </div>
              <div className="bottom">
                hours
              </div>
            </div>
            <div className="mock-minutes">
              <div className="top">
                {minutes}
              </div>
              <div className="bottom">
                minutes
              </div>
            </div>
            <div className="mock-seconds">
              <div className="top">
                {seconds}
              </div>
              <div className="bottom">
                seconds
              </div>
            </div>
          </div>
        </Col>

        <Col md={4} className='time-left-heading text-center d-flex align-items-center justify-content-center text-light fs-3 py-2 mock-time-left-heading'>
          <b>
            {
              mockType === 'SPECIFIC' ? 'Question Timer' : 'Time Left'
            }
          </b>
        </Col>
      </Row>
      <Row>
        <MockQuestion
          data={currentQuestion}
          onSelectAnswer={onSelectAnswer}
          current={current}
          totalGrade={totalGrade} />
        <Col md={4} className='mobile-question-div px-0'>
          <Col md={12}>
            <div className="d-flex align-items-center justify-content-center pb-0 time-left-heading">
              {/* <h5>Quant - Question Number 8</h5> */}
              <div className="mock-hour">
                <div className="top">
                  {hours}
                </div>
                <div className="bottom">
                  hours
                </div>
              </div>
              <div className="mock-minutes">
                <div className="top">
                  {minutes}
                </div>
                <div className="bottom">
                  minutes
                </div>
              </div>
              <div className="mock-seconds">
                <div className="top">
                  {seconds}
                </div>
                <div className="bottom">
                  seconds
                </div>
              </div>
            </div>
          </Col>
          <Col md={12} className='full-div-mobile text-center d-flex align-items-center justify-content-center text-light fs-3 py-2 mock-time-left-heading mt-0 mx-0'>
            <b>
              Questions
            </b>
          </Col>

          <Col md={12} className='p-3' >
            <Row className='g-2 px-auto'>
              {
                answers?.length > 0 && answers?.map((res, index) => {
                  return (<Col xs={2} key={index}>
                    <div
                      onClick={() => selectQuestion(index)}
                      className={`mock-question-icon ${index === current ? 'bg-primary' :
                        res?.isMarked === true ? 'bg-secondary' :
                          ((res?.questionType === 'SINGLE' && res?.selectedOptionId) ||
                            (res?.questionType === 'MULTIPLE' && res?.selectedOptionIdArray?.length > 0) ||
                            (res?.questionType === 'TEXT' && res?.selectedText)) ? 'bg-success' :

                            'bg-white border text-dark'}  mock-icon-text-light`}>
                      {index + 1}
                    </div>
                  </Col>)
                })
              }
            </Row>
          </Col>
        </Col>

        <Col lg={8} md={12} className='full-div-mobile d-flex justify-content-evenly align-items-center mock-bottom-buttons' >
          <button className='d-none d-sm-flex btn btn-danger rounded-lg mark-for-preview px-3' disabled={mockType === 'SPECIFIC'} onClick={onMarkForPreview}>
            {currentQuestion?.isMarked ? 'Unmark' : 'Mark for Preview'}
          </button>
          <button className=' btn btn-primary rounded-lg mark-for-preview-l px-3' onClick={onClickPrev} disabled={!isPrev || mockType === 'SPECIFIC'} >
            Previous
          </button>
          <button className=' btn btn-primary rounded-lg mark-for-preview-r px-3' onClick={onClickNext}
            disabled={!isNext || (mockType === 'SPECIFIC' && currentQuestion?.questionType === 'SINGLE' && !answers[current]?.selectedOptionId)
              || (mockType === 'SPECIFIC' && currentQuestion?.questionType === 'MULTIPLE' && !(answers[current]?.selectedOptionIdArray?.length > 0))
              || (mockType === 'SPECIFIC' && currentQuestion?.questionType === 'TEXT' && !answers[current]?.selectedText)
            }>
            Next
          </button>
          <button className='d-none d-sm-flex  btn btn-danger rounded-lg mark-for-preview-g px-3' disabled={isLoading} onClick={askToSubmitMock}>
            {isLoading ? 'Submitting...' : 'Submit Test'}
          </button>
        </Col>

        <Col md={12} className='d-flex justify-content-evenly sm-visible-buttons w-100'>
          <div>
            <button className=' btn btn-danger rounded-lg mark-for-preview px-3' disabled={mockType === 'SPECIFIC'} onClick={onMarkForPreview}>
              {currentQuestion?.isMarked ? 'Unmark' : 'Mark for Preview'}
            </button>
          </div>
          <div>
            <button className=' btn btn-danger rounded-lg mark-for-preview-g px-3' disabled={isLoading} onClick={askToSubmitMock}>
              {isLoading ? 'Submitting...' : 'Submit Test'}
            </button>
          </div>


        </Col>

        <Col lg={8} md={12} >
          <hr className='m-0 ' />
        </Col>
        <Col lg={8} md={12} className="full-div-mobile d-flex flex-column flex-md-row justify-content-evenly align-items-center mock-bottom-buttons">
          <hr className="w-100 d-md-none" />
          <div className="d-flex flex-wrap w-100 justify-content-evenly gap-3 text-center">
            <div className="d-flex flex-row align-items-center">
              <span className="mock-dot bg-success text-success me-2"></span>
              <span>Answered</span>
            </div>

            <div className="d-flex flex-row align-items-center">
              <span className="mock-dot bg-primary text-primary me-2"></span>
              <span>Current</span>
            </div>

            <div className="d-flex flex-row align-items-center">
              <span className="mock-dot bg-white border text-white me-2"></span>
              <span>Not Attempted</span>
            </div>

            <div className="d-flex flex-row align-items-center">
              <span className="mock-dot bg-dark border text-white me-2"></span>
              <span>Review</span>
            </div>
            <div className="d-flex flex-row align-items-center d-none" id='fullscreenid'>
              <span>Go full screen</span>
            </div>
          </div>
        </Col>

      </Row>
    </Container>
  </>)
}

export default MockAttempt