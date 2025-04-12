import React, { useEffect, useState } from 'react'
import SessionImage from '../../assets/img/landing-page/session-img.png'
import { CreateDemoSessionRequestService, GetCityList, GetStateList } from '../../services/StudentServices';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import DecorationImg from '../../assets/img/landing-page/shape.png'
import RSelect from '../common/RSelect';
import { IoCheckbox } from "react-icons/io5";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { MdOutlineRadioButtonChecked } from "react-icons/md";

function BookSession() {
    const [stateList, setStateList] = useState();
    const [cityList, setCityList] = useState();
    const [isLoading, setLoading] = useState(false);
    const [sessionForType, setsessionForType] = useState('Student')
    const [stateId, setStateId] = useState();
    const [isOtpLoading, setOtpLoading] = useState(false);
    const [isSessionLoading, setSessionLoading] = useState(false);
    const [token, setToken] = useState();
    const [isOtpValid, setOtpValid] = useState(false);
    const [isOtpType, setOtpType] = useState(false);
    const [email, setEmail] = useState();
    const [otp, setOtp] = useState();
    const [timeLeft, setTimeLeft] = useState(60); // 60 seconds for 1 minute
    const [isRunning, setIsRunning] = useState(false);
    const [resendOtp, setResendOtp] = useState(false);
    const [reviewBy, setReviewBy] = useState('Student');
    const [isConsent, setConsent] = useState(false);
    const [interests, setInterests] = useState({
        'Seminars(Offline)': false,
        'Workshops(Offline)': false,
        'Training Programs(Offline)': false,
        'Online Upskilling Programs(Individual)': false,
        'Corporate/Group Upskilling Sessions': false,
        'Other (Please specify)': false,
    })

    const [segments, setSegments] = useState({
        ['Tech (e.g., Programming, Data Science, AI/ML, etc']: false,
        ['Non-Tech (e.g., Soft SKills, Communication, Management, etc']: false
    })

    const [modeOfContact, setModeOfContact] = useState('Phone')

    const toggleInterests = (interest) => {
        setInterests({ ...interests, [interest]: !interests[interest] })
    }
    const toggleSegments = (interest) => {
        setSegments({ ...segments, [interest]: !segments[interest] })
    }
    const {
        control,
        reset,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        unregister,
    } = useForm();

    const handleStartTimer = () => {
        setIsRunning(true);
        setTimeLeft(60)
        setResendOtp(false)
    };

    const handleTimerEnd = () => {
        setResendOtp(true); // Replace with your function to be called when the timer ends
    };

    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            handleTimerEnd(); // Call the function when the timer ends
        }

        return () => clearInterval(timer); // Cleanup the interval on component unmount
    }, [isRunning, timeLeft]);

    useEffect(() => {
        setLoading(true)
        GetStateList(101).then((res) => {
            let stateArr = [];
            res?.data?.map((state) => stateArr.push({ value: state.name, label: state.name, id: state.stateId }));
            setStateList(stateArr);
        }).catch((err) => {
            // toast.error(err?.response?.data?.message)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        setLoading(true);
        GetCityList(stateId).then((res) => {
            let stateArr = [];
            res?.data?.map((state) => stateArr.push({ value: state.name, label: state.name, id: state.cityId }));
            setCityList(stateArr);
        }).catch((err) => {
            // toast.error(err?.response?.data?.message)
        }).finally(() => {
            setLoading(false)
        })
    }, [stateId])

    const onSubmitData = (e) => {
        e.token = token
        e.type = "other"
        let interestsArray = [];
        let segmentArray = [];
        for(const key in interests) {
            if(interests[key]){
                interestsArray.push(key);
            }
        }
        if(interests['Other (Please specify)']){
            interestsArray.push(e.otherInterest)
        }
        e.userInterests = interestsArray;
        for(const key in segments) {
            if(segments[key]) {
                segmentArray.push(key)
            }
        }
        e.userTrainingSegments = segmentArray;
        e.modeOfContact = modeOfContact;
        if(e.sessionForType !== "Student") {
            e.sessionForType = "College"
        }

        setSessionLoading(true);
        CreateDemoSessionRequestService(e).then((res) => {
            toast.success(res?.message);
            setToken(null);
            setOtpValid(false);
            setOtpType(false)
            setEmail(null)
            setOtp(null)
            reset();
            setInterests({
                'Seminars(Offline)': false,
                'Workshops(Offline)': false,
                'Training Programs(Offline)': false,
                'Online Upskilling Programs(Individual)': false,
                'Corporate/Group Upskilling Sessions': false,
                'Other (Please specify)': false,
            })
            setSegments({
                ['Tech (e.g., Programming, Data Science, AI/ML, etc']: false,
                ['Non-Tech (e.g., Soft SKills, Communication, Management, etc']: false
            })
        }).catch((err) => {
            toast.error(err?.response?.data?.message)
        }).finally(() => {
            setSessionLoading(false);
        })
    }

    const onSendOtp = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // Check if the email matches the regex pattern
        if (!emailRegex.test(email)) {
            toast.error('Enter valid email address !!!');
            return;
        }
        setOtpLoading(true);
        CreateDemoSessionRequestService({ userEmail: email, type: "submit" }).then((res) => {
            toast.success(res?.message);
            setToken(res?.data)
            setOtpType(true)
            setValue("userEmail", null)
            handleStartTimer();
        }).catch((err) => {
            toast.error(err?.response?.data?.message)
        }).finally(() => {
            setOtpLoading(false)
        })

    }

    const onVerifyOtp = () => {

        setOtpLoading(true);
        CreateDemoSessionRequestService({ emailOtp: otp, token, type: "verify" }).then((res) => {
            toast.success(res?.message);
            setToken(res?.data)
            setOtpType(false)
            setValue("userEmail", email, { shouldValidate: true })
            setOtpValid(true)
        }).catch((err) => {
            if (err?.response?.data?.message === 'jwt expired') {
                toast.error('OTP Verification failed : OTP Expired !!!')
            } else {
                toast.error(err?.response?.data?.message)
            }
        }).finally(() => {
            setOtpLoading(false)
        })
    }

    const resendOTPFunction = () => {
        onSendOtp()
    }

    return (
        <>
            <section className='py-5'>
                <div className="container">
                    {/* heading tittle start */}
                    <div className="col-xl-12 text-center d-flex justify-content-center align-items-center flex-column">
                        <div className='tittle-box'>
                            <div className='deco-img d-md-block d-none'>
                                <img src={DecorationImg} alt="icon" />
                            </div>
                            <h1 className='mb-2 fw-bold'>Book Your Session</h1>
                        </div>

                        <p>Learn From India's Best Teachers</p>
                    </div>
                    {/* heading tittle end */}

                    <div className="col-xl-12">
                        <div className='session-box card rounded-0 py-5'>
                            <div className="row gy-2">
                                <div className="col-lg-12 d-flex justify-content-center">
                                    <div className="card session-card bg-white rounded-3 py-md-5 px-md-4 p-3 mx-2 mx-md-0 mb-0">
                                        <div className="row gy-3">
                                            {/* <div className="col-xl-12 text-center">
                                                <h3 className='mb-3'>Enter Your Details</h3>
                                            </div> */}
                                            <div className="col-xl-12">
                                                <form onSubmit={handleSubmit(onSubmitData)} className='session-from'>
                                                    <div className="row gy-3">

                                                        <div className="col-xl-6 col-md-12">
                                                            <Controller
                                                                name="sessionForType"
                                                                control={control}
                                                                rules={{ required: "Please select a reviewer" }}
                                                                render={({ field, fieldState }) => (
                                                                    <RSelect
                                                                        {...field}
                                                                        className="session-form-select-round"
                                                                        options={[
                                                                            { label: "College / University / Institute", value: "College / University / Institute" },
                                                                            { label: "Student", value: "Student" },
                                                                        ]}
                                                                        placeholder="Are you a ?"
                                                                        value={field.value ? { label: field.value, value: field.value } : null}
                                                                        onChange={(selectedOption) => { field.onChange(selectedOption.value); setReviewBy(selectedOption.value) }}
                                                                        styles={{
                                                                            control: (base, state) => ({
                                                                                ...base,
                                                                                borderColor: state.isFocused ? '#d4145a7d' : base.borderColor,
                                                                                boxShadow: state.isFocused ? '0 0 0 1px #d4145a7d' : base.boxShadow,
                                                                                borderRadius: "25px",
                                                                                '&:hover': {
                                                                                    borderColor: state.isFocused ? '#d4145a7d' : base.borderColor,
                                                                                },
                                                                            }),
                                                                            option: (base, state) => ({
                                                                                ...base,
                                                                                backgroundColor: state.isFocused
                                                                                    ? '#ffe6e6'
                                                                                    : state.isSelected
                                                                                        ? '#ffcccc'
                                                                                        : 'white',
                                                                                color: 'black',
                                                                                '&:active': {
                                                                                    backgroundColor: '#d4145a7d',
                                                                                },
                                                                            }),
                                                                        }}
                                                                    />
                                                                )}
                                                            />

                                                            {errors.sessionForType && (
                                                                <span className="error-italic">{errors.sessionForType.message}</span>
                                                            )}

                                                        </div>

                                                        <div className="col-xl-6">
                                                            <input {...register("userName", {
                                                                required: "Name is required",
                                                                pattern: {
                                                                    value: /^(?=.*[a-zA-Z]{3,}).*$/,
                                                                    message: "Please enter a valid name",
                                                                },
                                                            })} className='form-control' placeholder='Enter your Name' />
                                                            {errors.userName && <span className='error-italic'> {errors.userName.message} </span>}
                                                        </div>
                                                        <div className="col-xl-6">
                                                            <input {...register("userNumber", {
                                                                required: "contact no. is required",
                                                                pattern: {
                                                                    value: /^[6-9][0-9]{9}$/,
                                                                    message: "Phone number must be valid and of 10 digits",
                                                                },
                                                            })} className='form-control' placeholder='Enter your Mobile Number' />
                                                            {errors.userNumber && <span className='error-italic my-0 py-0'> {errors.userNumber.message} </span>}
                                                        </div>
                                                        {
                                                            !isOtpType ?
                                                                <div className="col-xl-6">
                                                                    <div className="phn-no">
                                                                        <button onClick={(e) => e.preventDefault()} disabled={isOtpLoading || isOtpValid} className="send-otp-btn btn ">
                                                                            <div onClick={onSendOtp}>{isOtpLoading ? 'Sending...' : 'Send OTP'}</div>
                                                                        </button>
                                                                        <input
                                                                            disabled={isOtpValid}
                                                                            {...register("userEmail", {
                                                                                required: "email is required",
                                                                                pattern: {
                                                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                                                    message: "Invalid email address",
                                                                                },
                                                                            }
                                                                            )}
                                                                            onChange={(e) => { setValue('userEmail', e.target.value, { shouldValidate: true }); setEmail(e.target.value) }} className='form-control' placeholder='Enter your Email' />
                                                                        {errors.userEmail && <span className='error-italic'> {errors.userEmail.message} </span>}
                                                                    </div>
                                                                </div> :
                                                                <div className="col-xl-6">
                                                                    <div className="phn-no">
                                                                        <button onClick={(e) => e.preventDefault()} disabled={isOtpLoading} className="send-otp-btn btn ">
                                                                            <div onClick={onVerifyOtp}>Verify</div>
                                                                        </button>
                                                                        <input {...register("otp", {
                                                                            required: "otp is required"
                                                                        })}
                                                                            onChange={(e) => { setOtp(e.target.value) }} className='form-control' placeholder='Enter OTP ' />
                                                                        {errors.otp && <span className='error-italic'> {errors.otp.message} </span>}
                                                                    </div>
                                                                </div>
                                                        }

                                                        {
                                                            reviewBy == 'Student' ? <>
                                                                <div className="col-xl-6">
                                                                    <select
                                                                        defaultValue=""
                                                                        {...register("userState", { required: "State is required" })}
                                                                        className="form-select state-select"
                                                                        aria-label="Default select example"
                                                                        onChange={(e) => { setValue("userState", e.target.value); setStateId(e.target.value) }}
                                                                    >
                                                                        <option value="" disabled>State</option>
                                                                        {stateList?.map((state, index) => (
                                                                            <option key={index} value={state.id}>{state?.value}</option>
                                                                        ))}
                                                                    </select>

                                                                    {errors.userState && <span className="error-italic">{errors.userState.message}</span>}
                                                                </div>
                                                                <div className="col-xl-6">
                                                                    <select
                                                                        defaultValue=""
                                                                        {...register("userCity", { required: "City is required" })}
                                                                        className="form-select state-select"
                                                                        aria-label="Default select example"
                                                                    >
                                                                        <option value="" disabled>City</option>
                                                                        {cityList?.map((state, index) => (
                                                                            <option key={index} value={state.id}>{state?.value}</option>
                                                                        ))}
                                                                    </select>

                                                                    {errors.userCity && <span className="error-italic">{errors.userCity.message}</span>}
                                                                </div></> : <>
                                                                <div className="col-xl-12">
                                                                    <input {...register("userLocation", {
                                                                        required: "Please provide complete location",
                                                                    })} className='form-control' placeholder='Institute location' />
                                                                    {errors.userLocation && <span className='error-italic my-0 py-0'> {errors.userLocation.message} </span>}
                                                                </div>
                                                            </>
                                                        }


                                                        <div className="col-xl-12 interests-container">
                                                            <label className="form-label">What are you interested in?</label>
                                                            <div className="interest-options">
                                                                {[
                                                                    'Seminars(Offline)',
                                                                    'Workshops(Offline)',
                                                                    'Training Programs(Offline)',
                                                                    'Online Upskilling Programs(Individual)',
                                                                    'Corporate/Group Upskilling Sessions',
                                                                    'Other (Please specify)',
                                                                ].map((interest, index) => (
                                                                    <div key={index} className="interest-option" onClick={() => toggleInterests(interest)}>
                                                                        {interests[interest] ? (
                                                                            <IoCheckbox className="interest-icon" />
                                                                        ) : (
                                                                            <MdOutlineCheckBoxOutlineBlank className="interest-icon" />
                                                                        )}
                                                                        <span className="interest-label">{interest}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {
                                                            interests['Other (Please specify)'] &&
                                                            <div className="col-xl-12">
                                                                <input {...register("otherInterest", {
                                                                    required: "Please specify the interests",
                                                                })} className='form-control' placeholder='Other (Please specify)' />
                                                                {errors.otherInterest && <span className='error-italic my-0 py-0'> {errors.otherInterest.message} </span>}
                                                            </div>
                                                        }

                                                        <div className="col-xl-12 interests-container">
                                                            <label className="form-label">Preferred Training Segment</label>

                                                            <div className="interest-options">
                                                                {[
                                                                    'Tech (e.g., Programming, Data Science, AI/ML, etc',
                                                                    'Non-Tech (e.g., Soft SKills, Communication, Management, etc',
                                                                ].map((interest, index) => (
                                                                    <div key={index} className="interest-option" onClick={() => toggleSegments(interest)}>
                                                                        {segments[interest] ? (
                                                                            <IoCheckbox className="interest-icon" />
                                                                        ) : (
                                                                            <MdOutlineCheckBoxOutlineBlank className="interest-icon" />
                                                                        )}
                                                                        <span className="interest-label">{interest}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="col-xl-12 interests-container">
                                                            <label className="form-label">Preferred Mode of Contact</label>
                                                            <div className="interest-options">
                                                                {[
                                                                    'Phone',
                                                                    'Email',
                                                                    'WhatsApp',
                                                                ].map((interest, index) => (
                                                                    <div key={index} className="mode-option" onClick={() => setModeOfContact(interest)}>
                                                                        {modeOfContact == interest ? (
                                                                            <MdOutlineRadioButtonChecked className="interest-icon" />
                                                                        ) : (
                                                                            <MdOutlineRadioButtonUnchecked className="interest-icon" />
                                                                        )}
                                                                        <span className="interest-label">{interest}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="col-xl-12  col-md-12">
                                                            <textarea
                                                                className="form-control session-form-select-round"
                                                                rows={5} {...register("userDescription", {
                                                                    required: "Message is required",
                                                                })} placeholder='Please feel free to share any specific requirements, questions or comments' />
                                                            {errors.userDescription && <span className='error-italic'> {errors.userDescription.message} </span>}
                                                        </div>

                                                        <div className="col-xl-12 ">
                                                            <div className="interest-option border-0" onClick={() => setConsent(!isConsent)}>
                                                                {isConsent ? (
                                                                    <IoCheckbox className="interest-icon" />
                                                                ) : (
                                                                    <MdOutlineCheckBoxOutlineBlank className="interest-icon" />
                                                                )}
                                                                <span className="interest-label">I agree to receive communication from QuadNut Professional regarding seminars, workshops and training programs.</span>
                                                            </div>
                                                        </div>

                                                        <div className="col-xl-12">
                                                            <button type='submit' className='btn w-100 schedule-btn py-2 border-0' disabled={!isOtpValid || isSessionLoading}>
                                                                {isSessionLoading ? 'Continuing...' : 'Get In Touch'}
                                                            </button>

                                                        </div>
                                                        {
                                                            isOtpType && <div className=" text-center">
                                                                {resendOtp ? (
                                                                    <p className=" fw-600">
                                                                        <span
                                                                            className="text-info fw-600 clickable-btn"
                                                                            onClick={resendOTPFunction}
                                                                        >
                                                                            Resend OTP?
                                                                        </span>
                                                                    </p>
                                                                ) : (
                                                                    <p className=" fw-600">
                                                                        <span className="text-info fw-600">
                                                                            Resend OTP :{" "}
                                                                        </span>
                                                                        {`${timeLeft}`}
                                                                    </p>
                                                                )}{" "}
                                                            </div>
                                                        }
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>









                </div >
            </section >



        </>
    )
}

export default BookSession