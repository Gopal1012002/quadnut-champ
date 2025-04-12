import React, { useEffect, useState } from "react";
import object from '../../assets/img/object.png'
import pencilIcon from '../../assets/img/pencil-icon.svg';
import courseIcon from '../../assets/img/cources-icon.svg';
import certificateIcon from '../../assets/img/certificate-icon.svg'
import graduateIcon from '../../assets/img/gratuate-icon.svg';
import { CourseSearchService, GetSubCategoryList, useAuthCompany } from "../../services/AppServices";
import { Link, useNavigate } from "react-router-dom";
import { Col, ListGroup, Row } from "react-bootstrap";
import defaultThumbnail from '../../assets/img/deafult-course-thumbnail.png'
import conf from "../../conf/conf";

const HomeBanner = ({ data }) => {
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
      <section className="home-slide d-flex align-items-center">
        <div className="container">
          <div className="row ">
            <div className="col-md-7">
              <div className="home-slide-face aos" data-aos="fade-up">
                <div className="home-slide-text ">
                  <h5>The Leader in Online Learning</h5>
                  <h1>Engaging & Accessible Online Courses For All</h1>
                  <p>Own your future learning new skills online</p>
                </div>



                <div className="banner-content">
                  <form
                    className="form"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className="form-inner">
                      <div className="input-group">
                        <i className="fa-solid fa-magnifying-glass search-icon"></i>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Techincal Courses, Online eductional Courses, etc"
                          onChange={(e) => { setSearchText(e.target.value); onTypeCourse(e) }}
                        />
                        <button
                          className="btn btn-primary sub-btn"
                          type="submit"
                          onClick={onSearchCourses}
                        >
                          <i className="fas fa-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                    {
                      isSearchLoading && <ListGroup className="mt-2 position-absolute w-100 shadow bg-white">
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
                      <ListGroup style={{ zIndex: '10000' }} className="mt-2 position-absolute w-100 shadow bg-white">
                        {searchList.map((course, index) => (
                          <ListGroup.Item key={index} action>
                            <Row>
                              <Col md={4} sm={4} lg={2} xl={2}>
                                <Link to={`course-details/${course?.courseCode}/${course?.courseSlug}`}>
                                  <div className="course-div-image">
                                    <img
                                      src={`${urlPrefix}/thumbnail/${course?.courseThumbnail}`}
                                      className=""
                                      alt=""
                                      style={{ height: '50px' }}
                                      onError={(e) => e.target.src = defaultThumbnail}
                                    />
                                  </div>
                                </Link>

                              </Col>
                              <Col md={8} sm={8} lg={10} xl={10}>
                                <Row>
                                  <Col md={12}>
                                    <Link to={`course-details/${course?.courseCode}/${course?.courseSlug}`}>
                                      {course.courseTitle}
                                    </Link>
                                  </Col>
                                  <Col md={12}>
                                    <Link to={`/instructor-details/${JSON.parse(course?.assignedInstructorsName ?? '[]')[0]?.employeeCode}`}>
                                      {JSON.parse(course?.assignedInstructorsName ?? '[]')[0]?.name}
                                    </Link>
                                  </Col>
                                </Row>

                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>)}
                  </form>
                </div>




                
                <div className="trust-user">
                  <p>
                    Trusted by over 15K Users <br />
                    worldwide since 2024
                  </p>

                </div>
              </div>
            </div>
            <div className="col-md-5 d-flex align-items-center">
              <div className="girl-slide-img aos" data-aos="fade-up">
                <img src={object} alt="Img" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section student-course">
        <div className="container">
          <div className="course-widget">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="course-full-width">
                  <div
                    className="blur-border course-radius align-items-center aos"
                    data-aos="fade-up"
                  >
                    <div className="online-course d-flex align-items-center">
                      <div className="course-img">
                        <img src={pencilIcon} alt="Img" />
                      </div>
                      <div className="course-inner-content">
                        <h4>
                          {
                            data?.courseCount > 1000 ? <><span>{data?.courseCount}</span>K</> :
                              <span>{data?.courseCount}</span>
                          }

                        </h4>
                        <p>Online Courses</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 d-flex">
                <div className="course-full-width">
                  <div
                    className="blur-border course-radius aos"
                    data-aos="fade-up"
                  >
                    <div className="online-course d-flex align-items-center">
                      <div className="course-img">
                        <img src={courseIcon} alt="Img" />
                      </div>
                      <div className="course-inner-content">
                        <h4>
                          <span> {data?.instructorCount} </span>+
                        </h4>
                        <p>Expert Tutors</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 d-flex">
                <div className="course-full-width">
                  <div
                    className="blur-border course-radius aos"
                    data-aos="fade-up"
                  >
                    <div className="online-course d-flex align-items-center">
                      <div className="course-img">
                        <img src={certificateIcon} alt="Img" />
                      </div>
                      <div className="course-inner-content">
                        <h4>
                          {
                            data?.certifiedCourses > 1000 ? <><span>{data?.certifiedCourses}</span>K+</> :
                              <><span>{data?.certifiedCourses}</span> +</>
                          }
                        </h4>
                        <p>Ceritified Courses</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 d-flex">
                <div className="course-full-width">
                  <div
                    className="blur-border course-radius aos"
                    data-aos="fade-up"
                  >
                    <div className="online-course d-flex align-items-center">
                      <div className="course-img">
                        <img src={graduateIcon} alt="Img" />
                      </div>
                      <div className="course-inner-content">
                        <h4>
                          {
                            data?.studentCount > 1000 ? <><span>{data?.studentCount}</span>K+</> :
                              <><span>{data?.studentCount}</span> +</>
                          }
                        </h4>
                        <p>Online Students</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeBanner;
