import React, { useEffect, useState } from "react";
import { CourseSearchService, GetSubCategoryList, useAuthCompany } from "../../services/AppServices";
import { Link, useNavigate } from "react-router-dom";
import { Col, ListGroup, Row } from "react-bootstrap";
import conf from "../../conf/conf";
import DecorationImg from '../../assets/img/landing-page/shape.png'

import defaultThumbnail from '../../assets/img/deafult-course-thumbnail.png'


function SearchSection({ data }) {
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState('');
    const [isSearchLoading, setSearchLoading] = useState(false);
    const { companyData } = useAuthCompany()
    const [searchList, setSearchList] = useState([]);
    const [urlPrefix, setUrlPrefix] = useState(
        `${conf.apiAssetUrl}/${companyData?.frontFolder}/thumbnail`
    );
    const navigate = useNavigate();

    const onSearchCourses = () => {
        navigate(`/course-list?keyword=${searchText}`)
    }
    const onTypeCourse = (event) => {
        if (event.target.value?.length < 3) {
            setSearchList(null)
            return;
        }
        setSearchLoading(true);
        CourseSearchService(event.target.value).then((res) => {
            setSearchList(res?.data)
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setSearchLoading(false);
        })
    }
    useEffect(() => {
        setLoading(true);
        GetSubCategoryList().then((res) => {
            setSubCategoryList(res.data)
            setCategory(res?.data[0]?.categoryId)
        }).finally(() => {
            setLoading(false);
        })
    }, [])
    return (
        <>
            <section className=''>
                <div className="container-fluid bg-light-grey-blue">
                    <div className="row gy-3">
                        <div className="col-xl-12">
                            <div className="card border-0 bg-light-grey-blue p-md-5 p-3 rounded-0">
                                <div className="row gy-md-4 gy-3">
                                    <div className="col-xl-12 text-center d-flex justify-content-center align-items-center flex-column">
                                        <div className='tittle-box'>
                                            <div className='deco-img d-none d-md-block'>
                                                <img src={DecorationImg} alt="icon" />
                                            </div>
                                            <h1 className='mb-2 fw-bold'>Explore Courses at QuadNut</h1>
                                        </div>
                                        {/* <h3>Together at QuadNut</h3> */}
                                        {/* <p className="mb-0 search-txt-13px">Choose among 1000+ programs</p> */}
                                    </div>

                                    <div className="col-xl-12">
                                        <div className="banner-content bg-none mb-0 py-0">
                                            <form
                                                className="form"
                                                onSubmit={(e) => e.preventDefault()}
                                            >
                                                <div className="form-inner search-width mx-auto py-0">
                                                    <div className="input-group">
                                                     
                                                        <input
                                                            type="text"
                                                            className="form-control px-0"
                                                            placeholder="Search Techincal Courses, Online eductional Courses, etc"
                                                            onChange={(e) => { setSearchText(e.target.value); onTypeCourse(e) }}
                                                        />
                                                           <i className="fa-solid fa-magnifying-glass d-flex align-items-center me-1 search-icon" onClick={onSearchCourses}></i>
                                                        {/* <button
                                                            className="btn btn-primary sub-btn mt-0"
                                                            type="submit"
                                                            onClick={onSearchCourses}
                                                        >
                                                            <i className="fas fa-arrow-right"></i>
                                                        </button> */}
                                                        {
                                                            isSearchLoading && <ListGroup className="mt-2 position-absolute serach-menu-postion  w-100 shadow bg-white">
                                                                {
                                                                    [0, 1]?.map((val, index) =>
                                                                        <ListGroup.Item key={index} action>
                                                                            <div className="headings shine" ></div>
                                                                        </ListGroup.Item>
                                                                    )
                                                                }
                                                            </ListGroup>
                                                        }
                                                        {!isSearchLoading && searchList?.length > 0 && (
                                                            <ListGroup style={{ zIndex: '10000' }} className="mt-2 position-absolute  shadow bg-white serach-menu-postion w-100">
                                                                {searchList.map((course, index) => (
                                                                    <ListGroup.Item key={index} action>
                                                                        <Row className="gy-2">
                                                                            <div className=" col-md-2  d-flex align-items-center ">
                                                                                <Link to={`course-details/${course?.courseCode}/${course?.courseSlug}`}>
                                                                                    <div className="course-div-image sub-img">
                                                                                        <img
                                                                                            src={`${urlPrefix}/${course?.courseThumbnail}`}
                                                                                            className=""
                                                                                            alt=""
                                                                                            style={{ height: '50px' }}
                                                                                            onError={(e) => e.target.src = defaultThumbnail}
                                                                                        />
                                                                                    </div>
                                                                                </Link>

                                                                            </div>
                                                                            <div className=" col-md-10">
                                                                                <Row >
                                                                                    <Col md={12}>
                                                                                        <Link className="search-txt-13px" to={`course-details/${course?.courseCode}/${course?.courseSlug}`}>
                                                                                            {course.courseTitle}
                                                                                        </Link>
                                                                                    </Col>
                                                                                    <Col md={12}>
                                                                                        <Link className="search-txt-13px" to={`/instructor-details/${JSON.parse(course?.assignedInstructorsName ?? '[]')[0]?.employeeCode}`}>
                                                                                            {JSON.parse(course?.assignedInstructorsName ?? '[]')[0]?.name}
                                                                                        </Link>
                                                                                    </Col>
                                                                                </Row>

                                                                            </div>
                                                                        </Row>
                                                                    </ListGroup.Item>
                                                                ))}
                                                            </ListGroup>)}
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

            </section>




        </>
    )
}

export default SearchSection