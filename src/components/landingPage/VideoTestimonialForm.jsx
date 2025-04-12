import React, { useEffect, useState } from 'react'
import SessionImage from '../../assets/img/landing-page/session-img.png'
import AuthStudent, { AddVideoReviewService, CreateDemoSessionRequestService, GetStateList } from '../../services/StudentServices';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import DecorationImg from '../../assets/img/landing-page/shape.png'
import RSelect from '../common/RSelect';
import { ProgressBar } from 'react-bootstrap';
import Swal from 'sweetalert2';

function VideoTestimonialForm() {
    const [isSessionLoading, setSessionLoading] = useState(false);
    const [videoFile, setVideoFile] = useState(null);
    const [videoError, setVideoError] = useState(false);
    const [studentType, setStudentType] = useState();
    const [reviewBy, setReviewBy] = useState('Student')
    const [studentClass, setStudentClass] = useState();
    const [progress, setProgress] = useState();
    const { student } = AuthStudent();
    const navigate = useNavigate();

    const updateProgress = (progress) => {
        setProgress(progress)
    }

    const {
        control,
        reset,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        trigger,
        watch,
        unregister,
    } = useForm();


    const onSubmitData = (e) => {
        if (!student) {
            toast.info('Please login from your account')
            navigate('/student-login');
            return;
        }
        if (!videoFile) {
            setVideoError(true);
            return;
        }
        e.studentClass = e.studentClass?.value
        e.video = videoFile[0]
        setSessionLoading(true);
        AddVideoReviewService(e, updateProgress).then((res) => {
            toast.success(res?.message);
            reset();
            setVideoError(false);
            setVideoFile();
            setStudentType(null);
            setReviewBy('Student');
            setStudentClass(null)
            setValue("studentClass", null)
            setValue("userName", student.name)
            setValue("userEmail", student.email)
            setProgress(0)
        }).catch((err) => {
            toast.error(err?.response?.data?.message)
        }).finally(() => {
            setSessionLoading(false);
        })
    }

    const removeVideo = () => {
        setVideoFile(null);
    }

    useEffect(() => {
        if (student) {
            setValue("userName", student?.name)
            setValue("userEmail", student?.email)
        }
    }, [])
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
                            <h1 className='mb-2 fw-bold'>Submit Your Testimonial</h1>
                        </div>

                        <p>Learn From India's Best Teachers</p>
                    </div>
                    {/* heading tittle end */}

                    <div className="col-xl-12">
                        <div className='session-box card rounded-0 py-5'>
                            <div className="row gy-2">
                                <div className="col-lg-12 d-flex justify-content-center">
                                    <div className=" py-md-5 px-md-4 p-3 mx-2 mx-md-0 mb-0">
                                        <div className="row gy-3">
                                            <div className="col-xl-8 mx-auto">
                                                <form onSubmit={handleSubmit(onSubmitData)} className='session-from-testimonial'>
                                                    <div className="row gy-3">
                                                        <div className="col-xl-6 col-md-6">
                                                            <input
                                                                disabled={student}
                                                                {...register("userName", {
                                                                    required: "Name is required",
                                                                    pattern: {
                                                                        value: /^(?=.*[a-zA-Z]{3,}).*$/,
                                                                        message: "Please enter a valid name",
                                                                    },
                                                                })} className='form-control form-control-testimonial bg-white' placeholder='Enter Your Name' />
                                                            {errors.userName && <span className='error-italic'> {errors.userName.message} </span>}
                                                        </div>
                                                        <div className="col-xl-6  col-md-6">
                                                            <input {...register("studentTown", {
                                                                required: "Student city / town is required",
                                                            })} className='form-control' placeholder='Enter your City / Town' />
                                                            {errors.studentTown && <span className='error-italic'> {errors.studentTown.message} </span>}
                                                        </div>
                                                        <div className="col-xl-6 col-md-6">
                                                            <Controller
                                                                name="reviewBy"
                                                                control={control}
                                                                rules={{ required: "Please select a reviewer" }}
                                                                render={({ field, fieldState }) => (
                                                                    <RSelect
                                                                        {...field}
                                                                        className="session-form-select-round"
                                                                        options={[
                                                                            { label: "Student", value: "Student" },
                                                                            { label: "Parent", value: "Parent" },
                                                                            { label: "Teacher", value: "Teacher" },
                                                                        ]}
                                                                        placeholder="Select review by"
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

                                                            {errors.reviewBy && (
                                                                <span className="error-italic">{errors.reviewBy.message}</span>
                                                            )}

                                                        </div>

                                                        <div className="col-xl-6 col-md-6">
                                                            <input
                                                                disabled={student}
                                                                {...register("userEmail", {
                                                                    required: "Email is required",
                                                                    pattern: {
                                                                        value: /^(?=.*[a-zA-Z]{3,}).*$/,
                                                                        message: "Please enter a valid email",
                                                                    },
                                                                })} className='form-control bg-white' placeholder='Enter your Email' />
                                                            {errors.userEmail && <span className='error-italic'> {errors.userEmail.message} </span>}
                                                        </div>

                                                        {
                                                            reviewBy === 'Student' &&
                                                            <>
                                                                <div className="col-xl-6 col-md-6">
                                                                    <Controller
                                                                        name="studentType"
                                                                        control={control}
                                                                        rules={{ required: "Please select student type" }}
                                                                        render={({ field, fieldState }) => (
                                                                            <RSelect
                                                                                {...field}
                                                                                className="session-form-select-round"
                                                                                options={[
                                                                                    { label: "College Student", value: "College Student" },
                                                                                    { label: "School Student", value: "School Student" }
                                                                                ]}
                                                                                value={
                                                                                    field.value
                                                                                        ? { label: field.value, value: field.value }
                                                                                        : null
                                                                                }
                                                                                onChange={(selectedOption) => {
                                                                                    field.onChange(selectedOption.value);
                                                                                    setStudentType(selectedOption.value); // your custom logic
                                                                                    setStudentClass(null); // your custom logic
                                                                                }}
                                                                                placeholder="Select student type"
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
                                                                                        }
                                                                                    })
                                                                                }}
                                                                            />
                                                                        )}
                                                                    />

                                                                    {errors.studentType && (
                                                                        <span className="error-italic">{errors.studentType.message}</span>
                                                                    )}

                                                                </div>
                                                                <div className="col-xl-6 col-md-6">
                                                                    <Controller
                                                                        name="studentClass"
                                                                        control={control}
                                                                        rules={{ required: "Please select a class/department" }}
                                                                        render={({ field, fieldState }) => (
                                                                            <RSelect
                                                                                {...field}
                                                                                className="session-form-select-round"
                                                                                options={
                                                                                    studentType === 'College Student'
                                                                                        ? [
                                                                                            { label: "IT", value: "IT" },
                                                                                            { label: "Computer Science", value: "Computer Science" },
                                                                                            { label: "Information Technology", value: "Information Technology" },
                                                                                            { label: "Electronics and Communication", value: "Electronics and Communication" },
                                                                                            { label: "Electrical Engineering", value: "Electrical Engineering" },
                                                                                            { label: "Mechanical Engineering", value: "Mechanical Engineering" },
                                                                                            { label: "Civil Engineering", value: "Civil Engineering" },
                                                                                            { label: "Chemical Engineering", value: "Chemical Engineering" },
                                                                                            { label: "Biomedical Engineering", value: "Biomedical Engineering" },
                                                                                            { label: "Bio Tech", value: "Bio Tech" },
                                                                                            { label: "Biochemistry", value: "Biochemistry" },
                                                                                            { label: "Microbiology", value: "Microbiology" },
                                                                                            { label: "Physics", value: "Physics" },
                                                                                            { label: "Mathematics", value: "Mathematics" },
                                                                                            { label: "Chemistry", value: "Chemistry" },
                                                                                            { label: "Statistics", value: "Statistics" },
                                                                                            { label: "English", value: "English" },
                                                                                            { label: "Economics", value: "Economics" },
                                                                                            { label: "History", value: "History" },
                                                                                            { label: "Political Science", value: "Political Science" },
                                                                                            { label: "Psychology", value: "Psychology" },
                                                                                            { label: "Sociology", value: "Sociology" },
                                                                                            { label: "Philosophy", value: "Philosophy" },
                                                                                            { label: "Commerce", value: "Commerce" },
                                                                                            { label: "Business Administration", value: "Business Administration" },
                                                                                            { label: "Management", value: "Management" },
                                                                                            { label: "Accounting and Finance", value: "Accounting and Finance" },
                                                                                            { label: "Marketing", value: "Marketing" },
                                                                                            { label: "Human Resource", value: "Human Resource" },
                                                                                            { label: "Education", value: "Education" },
                                                                                            { label: "Law", value: "Law" },
                                                                                            { label: "Journalism and Mass Communication", value: "Journalism and Mass Communication" },
                                                                                            { label: "Architecture", value: "Architecture" },
                                                                                            { label: "Fine Arts", value: "Fine Arts" },
                                                                                            { label: "Performing Arts", value: "Performing Arts" },
                                                                                            { label: "Physical Education", value: "Physical Education" },
                                                                                            { label: "Environmental Science", value: "Environmental Science" },
                                                                                            { label: "Library Science", value: "Library Science" },
                                                                                        ]
                                                                                        : [
                                                                                            { label: "K3-K8", value: "K3-K8" },
                                                                                            { label: "K9-K12", value: "K9-K12" },
                                                                                        ]
                                                                                }
                                                                                value={field.value}
                                                                                onChange={(selected) => {
                                                                                    field.onChange(selected);
                                                                                    setStudentClass(selected); // your local state handler
                                                                                }}
                                                                                placeholder="Select class/department"
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

                                                                    {errors.studentClass && (
                                                                        <span className="error-italic">{errors.studentClass.message}</span>
                                                                    )}
                                                                </div>
                                                            </>
                                                        }


                                                        <div className="col-xl-12 col-md-12 position-relative">
                                                            <input
                                                                disabled
                                                                className="form-control pe-5 bg-white"
                                                                placeholder={videoFile && videoFile[0]?.name ? `Uploaded file: ${videoFile[0]?.name}` : "Upload the video"}
                                                            />
                                                            {/* Hidden file input */}
                                                            <input
                                                                type="file"
                                                                id="uploadInput"
                                                                accept=".mp4, .mkv, video/mp4, video/x-matroska"
                                                                style={{ display: 'none' }}
                                                                onChange={(e) => {
                                                                    const file = e.target.files[0];

                                                                    if (file) {
                                                                        if (file.size > 10 * 1024 * 1024) {
                                                                            Swal.fire({
                                                                                title: "File size error",
                                                                                text: 'File size must be less than 10MB.',
                                                                                icon: "danger",
                                                                            })
                                                                            e.target.value = ''; // Clear the input
                                                                            setVideoFile(null); // Reset your state if needed
                                                                            setVideoError(true); // Optional: update error state
                                                                            return;
                                                                        }
                                                                        setVideoFile(e.target.files); // Your own state for preview or upload
                                                                        setVideoError(false);
                                                                    }
                                                                }}
                                                            />



                                                            {
                                                                !videoFile ?
                                                                    <i
                                                                        className="fas fa-upload position-absolute"
                                                                        style={{
                                                                            right: '30px',
                                                                            top: videoError ? '30%' : '50%',
                                                                            transform: 'translateY(-50%)',
                                                                            color: '#999',
                                                                            cursor: 'pointer',
                                                                        }}
                                                                        onClick={() => document.getElementById('uploadInput').click()}
                                                                    /> : <i
                                                                        className="fas fa-trash position-absolute"
                                                                        style={{
                                                                            right: '30px',
                                                                            top: '50%',
                                                                            transform: 'translateY(-50%)',
                                                                            color: '#999',
                                                                            cursor: 'pointer',
                                                                        }}
                                                                        onClick={removeVideo}
                                                                    />
                                                            }
                                                            {videoError && (
                                                                <span className="error-italic"> {'Video file is required'} </span>
                                                            )}
                                                        </div>

                                                        <p className='text-end my-0 py-0 fs-12 text-secondary'>
                                                            Recommended format : mp4, mkv | Max file size: 10MB
                                                        </p>


                                                        <div className="col-xl-12  col-md-12">
                                                            <textarea
                                                                className="form-control session-form-select-round"
                                                                rows={5} {...register("reviewText", {
                                                                    required: "Video description is required",
                                                                })} placeholder='Video Description' />
                                                            {errors.reviewText && <span className='error-italic'> {errors.reviewText.message} </span>}
                                                        </div>
                                                        <div className="col-xl-12 mx-auto">
                                                            {
                                                                progress > 0 && isSessionLoading && <div className="mx-auto my-2 w-75 w-md-50">
                                                                    <ProgressBar striped variant="success" now={progress} />
                                                                    <p className="text-center fw-bold text-primary fs-5">{progress}%</p>
                                                                </div>
                                                            }
                                                        </div>

                                                        <div className="col-xl-3 mx-auto">
                                                            <button type='submit' className='btn w-100 schedule-btn py-2 border-0' disabled={isSessionLoading} >
                                                                {isSessionLoading ? 'Submitting...' : 'Submit'}
                                                            </button>
                                                        </div>
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

export default VideoTestimonialForm