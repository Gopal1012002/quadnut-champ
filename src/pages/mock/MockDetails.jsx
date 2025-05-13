import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { GetMockTestDetails, useAuthCompany } from '../../services/AppServices';
import Breadcrumb from '../../components/common/Breadcrumb';
import Head from '../../layouts/main-layout/head/Head';
import noDataFound from '../../assets/img/noDataFound.jpg'
import { Col, Container, Row } from 'react-bootstrap';
import quizIcon from '../../assets/img/icon/quiz-box-icon.svg'
import { capitalizeFirstLetter, formatDateAndTime, formatMinutesToAll, formattedMinuteToHrs, minuteToHrs } from '../../utils/dynamic.util';
import CountdownTimer from '../../components/common/CountdownTimer';
import AuthStudent, { CheckMockTestPurchased, MockTestLeaderboard } from '../../services/StudentServices';
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import MockInstructionModal from './mockAttempt/MockInstructionModal';
import '../../assets/css/leaderboard.css'
import conf from '../../conf/conf';
import dummyUser from "../../assets/img/user/user16.png";
import certificateIcon from '../../assets/img/certificate-icon.svg'

const MockDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { student } = AuthStudent();
    const { companyData } = useAuthCompany();
    const [urlPrefix, setUrlPrefix] = useState(`${conf.apiAssetUrl}/${companyData?.frontFolder}/kyc`)
    const [isLoading, setLoading] = useState(false);
    const [isPurchased, setPurchased] = useState(false);
    const [mockData, setMockData] = useState();
    const [insModal, setInsModal] = useState(false);
    const [leaderboard, setLeaderboard] = useState();
    let currentTime = new Date();
    const closeInsModal = () => {
        setInsModal(false)
    }
    const [breadCrumbData, setBreadCrumbData] = useState([
        {
            title: "Home",
            link: "/",
            categoryIndex: "",
        },
        {
            title: "Mock Test",
            link: "",
            categoryIndex: "",
        },
    ]);

    const onHandleStart = () => {
        if (!student) {
            Cookies.set('mock-slug', slug, { expires: 1 / 24 })
            toast.success('Login required !!')
            navigate('/student-login')
        } else if (!isPurchased) {
            navigate(`/student/mock-checkout/${mockData?.mockTestId}/${slug}`)
        } else {
            setInsModal(true)
        }
    }
    useEffect(() => {
        setLoading(true);
        GetMockTestDetails(slug).then((res) => {
            setMockData(res?.data?.data)
            CheckMockTestPurchased(res?.data?.data?.mockTestId).then((res) => {
                setPurchased(true)
            }).catch((err) => {
                console.log(err);
            })
            if (student && res?.data?.data?.isTimeOriented === 'YES') {
                const endDateTime = new Date(res?.data?.data?.mockTestEndTime)
                const currentDateTime = new Date();
                if (endDateTime <= currentDateTime) {
                    MockTestLeaderboard({ slug }).then((res) => {
                        setLeaderboard(res?.data)
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            } else if (student) {
                MockTestLeaderboard({ slug }).then((res) => {
                    setLeaderboard(res?.data)
                }).catch((err) => {
                    console.log(err)
                })
            }
        }).catch((err) => {
            console.log(err);

        }).finally(() => {
            setLoading(false)
        })
    }, [])



    // useEffect(()=>{
    //     setLoading(true);
    //     CheckMockTestPurchased(slug).then((res)=>{
    //         setPurchased(true)
    //     }).catch((err)=>{
    //         console.log(err);
    //     }).finally(()=>setLoading(false))
    // },[])
    return (<>
        {
            mockData && <Head title={mockData?.mockTestMetaTitle ?? "Mock Test"} description={mockData?.mockTestMetaDescription} />
        }

        <Breadcrumb data={breadCrumbData} />
        {
            isLoading ?
                <Container>
                    <div className='headings w-100 shine'></div> <br />
                    <div className='headings shine w-25'></div> <br />
                    <div className='headings w-100 shine'></div> <br />
                    <div className='headings w-100 shine'></div> <br />
                    <div className='mock-bar w-100 shine'></div> <br />
                </Container> : mockData ? <>
                    <Container>
                        <h2 className='text-start '>
                            {mockData?.mockTestTitle}
                        </h2>

                        <h6 className='mock-description'>
                            {mockData?.mockTestDescription}
                        </h6>

                        <Row>
                            <Col md={4} sm={6}>
                                <button className='btn btn-primary btn-sm' onClick={() => navigate('/course-list')}>
                                    Tutorials
                                </button>

                                {/* <button className='btn btn-seconary btn-sm'>
                    Quiz
                </button> */}
                            </Col>
                            <Col sm={12} className='my-2' >
                                <p className='text-secondary fs-8'>
                                    At {companyData?.websiteName}, we believe in empowering learners like you with the skills and knowledge needed to excel in web development. And what better way to do that than with a fun and interactive Mock Test?
                                </p>
                            </Col>
                            <Col sm={12} className='text-start'>
                                {
                                    mockData && mockData?.isTimeOriented === 'YES' && <CountdownTimer targetDate={mockData?.mockTestStartTime} endDate={mockData?.mockTestEndTime} />
                                }
                            </Col>
                            <Col sm={12} className='my-3'>
                                <div className="mock-cover mx-auto">
                                    <div className="mock-cover-1">
                                        <div className="mock-cover-1-left d-none d-md-block">
                                            {mockData?.isTimeOriented === 'YES' ? <p className="text-primary fw-600">
                                                {formatDateAndTime(mockData?.mockTestStartTime)} <i className="fa-solid fa-right-long"></i> {formatDateAndTime(mockData?.mockTestEndTime)}
                                            </p> : <p className="text-primary fw-600">
                                                No Start End Time Limit !!
                                            </p>}

                                        </div>
                                        <div className="mock-cover-1-right">
                                            <img src={quizIcon} />
                                        </div>
                                    </div>
                                    <div className="mock-cover-2 ">
                                        <h3>
                                            {mockData?.mockTestTitle}
                                        </h3>
                                        <p className='text-secondary'>
                                            So, what are you waiting for? Click the "Start Test" button and get started!
                                        </p>
                                    </div>
                                    <div className="mock-cover-3">
                                        <div className="mock-cover-3-left  d-none d-md-block">
                                            <Row>
                                                <Col md={6} sm={12} className='my-2'>
                                                    <span className='shape me-1 text-primary'>
                                                        {mockData?.questionCount}
                                                    </span>
                                                    <span className='me-2'>
                                                        Total Number of Questions
                                                    </span>
                                                </Col>
                                                <Col md={6} sm={12} className='my-2'>
                                                    <span className='shape me-1  text-primary'>
                                                        {formattedMinuteToHrs(mockData?.mockTestTime)}
                                                    </span>
                                                    <span>
                                                        Total Time for Questions
                                                    </span>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="mock-cover-3-right">
                                            <button className='btn btn-primary btn-sm rounded-0' onClick={onHandleStart}>
                                                {isPurchased ? 'Start Mock Test' : 'Register Mock Test'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={12} className='my-3' >
                                <h6 className="fw-bold text-primary mb-3">
                                    Details of {mockData?.mockTestTitle}
                                </h6>

                                <ul className="mock-details-list text-secondary ps-3" style={{ listStyleType: 'square', lineHeight: '2' }}>
                                    <li className="mb-2">
                                        <span className="fw-medium">Total Number of Mock Questions:</span> {mockData?.questionCount}
                                    </li>

                                    <li className="mb-2">
                                        <span className="fw-medium">Time Allotted:</span> {formattedMinuteToHrs(mockData?.mockTestTime)}
                                    </li>

                                    <li className="mb-2">
                                        <span className="fw-medium">Negative Marking:</span> No
                                    </li>

                                    <li className="mb-2">
                                        <span className="fw-medium">Difficulty Level:</span> {capitalizeFirstLetter(mockData?.mockTestDifficulty)}
                                    </li>

                                    <li className="mb-2">
                                        <span className="fw-medium">Total Attempts:</span> {mockData?.mockTestLimitType === 'LIMITED' ? mockData?.mockTestMaxAttempts : 'Unlimited'}
                                    </li>

                                    <li className="mb-2">
                                        <span className="fw-medium">Qualifying Certificate:</span> {mockData?.mockTestPassCertificate === 'YES' ? 'Yes' : 'No'}
                                    </li>

                                    <li className="mb-2">
                                        <span className="fw-medium">Completion Certificate:</span> {mockData?.mockTestCompletionCertificate === 'YES' ? 'Yes' : 'No'}
                                    </li>

                                    <li className="mb-2">
                                        <span className="fw-medium">Mock Test Price:</span> {mockData?.mockTestIsPaid === 'YES' ? `₹ ${mockData?.mockSellingPrice} /-` : 'Free'}
                                    </li>

                                    <li className="mb-2">
                                        <span className="fw-medium">Applicants Enrolled:</span> {mockData?.totalRegistrationCount}
                                    </li>

                                    {mockData?.mockTestRegistrationType === 'LIMITED' && (
                                        <li className="mb-2">
                                            <span className="fw-medium">Seats Left:</span> {mockData?.mockRegistrationMaxLimit - mockData?.totalRegistrationCount}
                                        </li>
                                    )}
                                </ul>
                                {
                                    currentTime < new Date(mockData?.mockTestEndTime) && <>

                                        <h6 className="fw-bold text-primary mb-3 mt-4">
                                            Few Instructions Before Attempting Mock Test
                                        </h6>
                                        <ol className='mock-details-list text-secondary ps-3'>
                                            <li>Ensure you have a stable and high-speed internet connection throughout the duration of the test.</li>
                                            <li>Use a compatible device (laptop, desktop, or tablet) to attempt the test.</li>
                                            <li>Close all unnecessary applications and browser tabs to avoid distractions and ensure smooth performance.</li>
                                            <li>Keep your device fully charged or connected to a power source to prevent interruptions.</li>
                                            <li>Use a supported browser (e.g., Google Chrome, Mozilla Firefox, or Microsoft Edge) for the best experience.</li>
                                            <li>Do not refresh the page or click the back button during the test, as it may result in the loss of your progress.</li>
                                            <li>Read all questions carefully and manage your time effectively to complete the test within the given duration.</li>
                                            <li>Do not use any external resources, notes, or assistance, as this is an independent assessment.</li>
                                            <li>Ensure your webcam and microphone are functioning properly if the test requires them.</li>
                                            <li>Do not share or discuss the test questions with anyone during or after the test.</li>
                                            <li>In case of any technical issues, contact the support team immediately using the provided contact information.</li>
                                            <li>Submit your answers before the timer ends to ensure your responses are recorded successfully.</li>
                                        </ol>

                                    </>
                                }
                            </Col>
                        </Row>
                        {/* {console.log(leaderboard)} */}
                        {leaderboard?.result && <Row>
                            <section className="leader-section" id="leader-board">
                                <h3 className='text-primary text-center'>
                                    <span className='leaderboard'>
                                        <img src={certificateIcon} alt="" />
                                    </span> Applicant's Leaderboard
                                    <span className='leaderboard'>
                                        <img src={certificateIcon} className='ms-2' alt="" />
                                    </span>
                                </h3>
                                <div className="container">
                                    {/* <!-- leader-profile --> */}

                                    <div className="row pt-5 gy-3 ">
                                        {leaderboard?.result?.length > 1 &&
                                            <div className="col-md-4 d-flex justify-content-center ">
                                                <div className="card p-4 rank-three-card rounded-3 border-0  w-75">
                                                    <div className="row gy-2">
                                                        <div className="col-12 d-flex justify-content-center align-items-center">
                                                            <div className='topper-profile-box'>
                                                                <img src={`${urlPrefix}/${leaderboard?.result[1]?.studentImage}`} onError={(e) => e.target.src = dummyUser} alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 text-center">
                                                            <p className="fw-bold m-0">{leaderboard?.result[1]?.studentName}</p>
                                                        </div>
                                                        <div className="col-xl-6 text-end">
                                                            <p className=" mb-0 text-start text-xl-start">Rank:<span className='fw-bold fs-4 ms-2'>#2</span></p>
                                                        </div>
                                                        <div className="col-xl-6">
                                                            <p className="mb-0 text-nowrap text-end text-xl-end">Score: <span className='fw-bold fs-4 ms-2'>{leaderboard?.result[1]?.percentObtained}</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                        {leaderboard?.result?.length > 0 &&
                                            <div className="col-md-4 d-flex justify-content-center ">
                                                <div className="card p-4 rank-one-card rounded-3 border-0  w-75">
                                                    <div className="row gy-2">
                                                        <div className="col-12 d-flex justify-content-center align-items-center">
                                                            <div className='topper-profile-box'>
                                                                <img src={`${urlPrefix}/${leaderboard?.result[0]?.studentImage}`} onError={(e) => e.target.src = dummyUser} alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 text-center">
                                                            <p className="fw-bold m-0">{leaderboard?.result[0]?.studentName}</p>
                                                        </div>
                                                        <div className="col-xl-6 text-end">
                                                            <p className=" mb-0 text-start text-xl-start">Rank:<span className='fw-bold fs-4 ms-2'>#1</span></p>
                                                        </div>
                                                        <div className="col-xl-6">
                                                            <p className="mb-0 text-nowrap text-end text-xl-end">Score: <span className='fw-bold fs-4 ms-2'>{leaderboard?.result[0]?.percentObtained}</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {leaderboard?.result?.length > 2 &&
                                            <div className="col-md-4 d-flex justify-content-center ">
                                                <div className="card p-4 rank-three-card rounded-3 border-0  w-75">
                                                    <div className="row gy-2">
                                                        <div className="col-12 d-flex justify-content-center align-items-center">
                                                            <div className='topper-profile-box'>
                                                                <img src={`${urlPrefix}/${leaderboard?.result[2]?.studentImage}`} onError={(e) => e.target.src = dummyUser} alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 text-center">
                                                            <p className="fw-bold m-0">{leaderboard?.result[2]?.studentName}</p>
                                                        </div>
                                                        <div className="col-xl-6 text-end">
                                                            <p className=" mb-0 text-start text-xl-start">Rank:<span className='fw-bold fs-4 ms-2'>#3</span></p>
                                                        </div>
                                                        <div className="col-xl-6">
                                                            <p className="mb-0 text-nowrap text-end text-xl-end">Score: <span className='fw-bold fs-4 ms-2'>{leaderboard?.result[2]?.percentObtained}</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>

                                    {/* <!-- leader-table --> */}
                                    <div className="row mt-5">
                                        <div className="col-12">
                                            <div className="card p-2 table-responsive">
                                                <table className="table table-striped leader-table">
                                                    <thead>
                                                        <tr className="text-center">
                                                            <td className="fw-bold">Profile</td>
                                                            <td className="fw-bold">Rank</td>
                                                            <td className="fw-bold">Name</td>
                                                            <td className="fw-bold">Total Time</td>
                                                            <td className="fw-bold">Attempt</td>
                                                            <td className="fw-bold">Score</td>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            leaderboard?.result?.length > 0 &&
                                                            leaderboard?.result?.map((rh, index) => {
                                                                return (<tr className={leaderboard?.isAttempt && rh.rank == leaderboard?.studentRank ? "text-center student-row" : "text-center"} key={index}>
                                                                    <td className='img-table-data'>
                                                                        <div className="student-profile-box">
                                                                            <img src={`${urlPrefix}/${rh?.studentImage}`} onError={(e) => e.target.src = dummyUser} alt="" />
                                                                        </div>
                                                                    </td>
                                                                    <td>#{rh?.rank}</td>
                                                                    <td><p className="m-0">{rh?.studentName}</p></td>

                                                                    <td>{formatMinutesToAll(rh?.attemptDuration)}</td>
                                                                    <td>{rh?.attemptCount}</td>
                                                                    <td>{rh?.percentObtained}</td>
                                                                </tr>)
                                                            })
                                                        }
                                                        {
                                                            leaderboard?.isAttempt && leaderboard?.studentRank > 10 && leaderboard?.studentRank != 11 &&
                                                            <>
                                                                <tr className={"text-center"}>
                                                                    <td className='text-muted'>--</td>
                                                                    <td className='text-muted'>--</td>
                                                                    <td className='text-muted'>--</td>

                                                                    <td className='text-muted'>--</td>
                                                                    <td className='text-muted'>--</td>
                                                                    <td className='text-muted'>--</td>
                                                                </tr>
                                                                <tr className={"text-center"}>
                                                                    <td className='text-muted'>--</td>
                                                                    <td className='text-muted'>--</td>
                                                                    <td className='text-muted'>--</td>

                                                                    <td className='text-muted'>--</td>
                                                                    <td className='text-muted'>--</td>
                                                                    <td className='text-muted'>--</td>
                                                                </tr>
                                                            </>
                                                        }

                                                        {leaderboard?.isAttempt && leaderboard?.studentRank > 10 &&
                                                            <tr className={"text-center student-row"}>
                                                                <td className='img-table-data'>
                                                                    <div className="student-profile-box">
                                                                        <img src={`${urlPrefix}/${student?.logo}`} onError={(e) => e.target.src = dummyUser} alt="" />
                                                                    </div>
                                                                </td>
                                                                <td>#{leaderboard?.studentRank}</td>
                                                                <td><p className="m-0">{student?.name}</p></td>

                                                                <td>{formatMinutesToAll(leaderboard?.myResult?.attemptDuration)}</td>
                                                                <td>{leaderboard?.myResult?.attemptCount}</td>
                                                                <td>{leaderboard?.myResult?.percentObtained}</td>
                                                            </tr>
                                                        }

                                                    </tbody>
                                                </table>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </Row>}
                        {/* {
                            leaderboard &&
                            <Row className='d-flex justify-content-center'>
                                    <div className='mock-leaderboard-block'>
                                        <ul>
                                            <li className='c-list__item'>
                                                <span className='rank'>
                                                    Rank
                                                </span>
                                                <span className='student'>
                                                    Student 
                                                </span>
                                                <span className='score'>
                                                    # score
                                                </span>
                                            </li>
                                        </ul>

                                        {leaderboard?.result?.map((leader, index) => {
                                            return (<li className='c-list__item' key={index}>
                                                <span  className='rank'>
                                                    {leader?.rank}
                                                </span>
                                                <span  className='student'>
                                                    <span className='avatar-span'>
                                                        <img className='c-avatar' src={`${urlPrefix}/${leader?.studentImage}`} onError={(e) => e.target.src = dummyUser} alt="" />
                                                    </span>
                                                    <span className='name-span'>
                                                        {leader?.studentName}
                                                    </span>
                                                </span>
                                                <span  className='score'>
                                                    {leader?.percentObtained}
                                                    {formatMinutesToAll(leader?.attemptDuration)}
                                                </span>
                                            </li>)

                                        })}
                                    </div>
                            </Row>
                        } */}

                    </Container>
                </> :
                    <div className='image-wrapper'>
                        <img src={noDataFound} alt="" />
                        <p className='text-center text-secondary'>
                            Mock test not found. This mock test either does not exist or may have been deleted.
                        </p>
                    </div>
        }
        {
            insModal && <MockInstructionModal isOpen={insModal} onClose={closeInsModal} data={mockData} startQuiz={() => { }} />
        }
    </>
    )
}

export default MockDetails