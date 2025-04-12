import React, { useEffect, useState } from "react";
import Head from "../../layouts/main-layout/head/Head";
import icon01 from "../../assets/img/icon/icon-01.svg";
import icon02 from "../../assets/img/icon/icon-02.svg";
import user1 from "../../assets/img/user/user1.jpg";
import {
  GetCategoryHierarchy,
  GetCourseList,
  GetFeaturedInstructors,
  GetTrendingCourses,
  useAuthCompany,
} from "../../services/AppServices";
import conf from "../../conf/conf";
import { Form, Link, useParams, useSearchParams } from "react-router-dom";
import { AddToWishlistHelper, minuteToHrs } from "../../utils/dynamic.util";
import { Accordion } from "react-bootstrap";
import PriceRangeSlider from "../../components/common/PriceRangeSlider";
import RSelect from "../../components/common/RSelect";
import Pagination from "../../components/common/Pagination";
import courseNotFoundImg from '../../assets/img/courseNotFound.png'
import AuthStudent, { AddToWishlist, GetWishlistIdsList, RemoveFromWishlist } from "../../services/StudentServices";
import { CourseBlockShimmer } from "../../components/shimmer/Shimmer";
import defaultThumbnail from '../../assets/img/deafult-course-thumbnail.png'
import defaultInstructorImage from '../../assets/img/default-instructor-image.png'
import OwlCarousel from "react-owl-carousel";
import AOS from "aos";
import "aos/dist/aos.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import TrendingCourses from "../../components/courses/TrendingCourses";
import TrendingCoursesGrid from "../../components/courses/TrendingCoursesGrid";
import { toast } from "react-toastify";

const CourseList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [refreshFlag, setRefreshFlag] = useState(false);
  const { id } = useParams();
  const { student } = AuthStudent();
  const [wishlistIds, setWishlistIds] = useState([]);
  const [listType, setListType] = useState("list");
  const { companyData } = useAuthCompany();
  const [courseCount, setCourseCount] = useState({
    total: 0,
    free: 0,
    paid: 0,
  });
  const [courseList, setCourseList] = useState([]);
  const [trendingCourseList, setTrendingCourseList] = useState([]);
  const [pagianatedData, setPaginatedData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [categoryTree, setCategoryTree] = useState();
  const [categoryArray, setCategoryArray] = useState([]);
  const [instructorList, setInstructorList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [instructorArray, setInstructorArray] = useState([]);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [filter, setFilter] = useState({
    page: 1,
    instructorArray: "",
    categoryArray: "",
    keyword: "",
    sort: "new",
    price: "all",
    limit: "9",
    studentCode: student?.studentCode ?? -1
  });

  const onHandleReset = () => {
    setFilter({
      page: 1,
      instructorArray: "",
      categoryArray: "",
      keyword: "",
      sort: "new",
      price: "all",
      limit: "9",
      studentCode: student?.studentCode ?? -1
    });
    setCategoryArray([]);
    
    setRefreshFlag(true);
  };

  const refreshPageList = () => {
    // page: 1,
    // instructorArray: "",
    // categoryArray: "",
    // keyword: "",
    // sort: "new",
    // price: "all",
    // limit: "9"
    // if(){

    // }

    setLoading(true);
    GetCourseList(filter)
      .then((res) => {
        setPaginatedData(res.data);
        setCourseList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // useEffect(() => {
  //   refreshPageList();
  // }, [filter]);

  useEffect(() => {
    if (refreshFlag) {
      refreshPageList();
      setRefreshFlag(false); // Reset the flag
    }
  }, [filter, refreshFlag]);

  const paginationCourseList = (limit, page) => {
    setFilter({ ...filter, page: page, });
    setRefreshFlag(true);
  };
  const handleFilterChange = (filterType, value, catType, pIdx, cIdx, sIdx) => {
    if (filterType === "page") {
      setFilter({ ...filter, [filterType]: value });
      setRefreshFlag(true);
      // refreshPageList();
    } else if (filterType === "instructorArray") {
      let ins_string = "";
      if (instructorArray.includes(value)) {
        let ins_array = instructorArray;
        ins_array = ins_array?.filter((item) => item !== value);
        for (let i = 0; i < ins_array.length; i++) {
          ins_string += ins_array[i] + ",";
        }
        setInstructorArray([...ins_array]);
      } else {
        instructorArray?.map((insItem) => {
          ins_string += insItem + ",";
        });
        ins_string += value + ",";
        setInstructorArray([...instructorArray, value]);
      }
      setFilter({ ...filter, [filterType]: ins_string });
      setRefreshFlag(true);
      // refreshPageList();
    } else if (filterType === "categoryArray") {
      let cat_string = "";
      
      if (categoryArray.includes(value)) {
        let dummyCategoryArray = [...categoryArray]
        if(catType === 'parent') {
          categoryTree[pIdx]?.categoryList?.forEach((val, index)=>{
            if(dummyCategoryArray?.includes(parseInt(val?.categoryId))){
              dummyCategoryArray = dummyCategoryArray?.filter((curVal)=> parseInt(curVal) != parseInt(val?.categoryId))
            }
            val?.subCategoryList?.forEach((subval, index)=>{
              if(dummyCategoryArray?.includes(parseInt(subval?.subCategoryId))){
                dummyCategoryArray = dummyCategoryArray?.filter((subCurVal)=> parseInt(subCurVal) != parseInt(subval?.subCategoryId))
              }
            })
          })
          dummyCategoryArray = dummyCategoryArray?.filter((parentCurVal)=> parentCurVal != value);
        } else if(catType === 'category') {
          categoryTree[pIdx]?.categoryList[cIdx]?.subCategoryList?.forEach((val, index)=>{
            if(dummyCategoryArray?.includes(parseInt(val?.subCategoryId))){
              dummyCategoryArray = dummyCategoryArray?.filter((curSubVal)=> parseInt(curSubVal) != parseInt(val?.subCategoryId))
            }
          })
          dummyCategoryArray = dummyCategoryArray?.filter((subCurVal)=> parseInt(subCurVal) != parseInt(value));
        } else if(catType === 'subcategory') {
          if(dummyCategoryArray?.includes(value)){
            dummyCategoryArray = dummyCategoryArray?.filter((subCurVal)=> subCurVal != value)
          }
        }
        let cat_array = [...dummyCategoryArray];
        cat_array = cat_array?.filter((item) => item !== value);
        for (let i = 0; i < cat_array.length; i++) {
          cat_string += cat_array[i] + ",";
        }
        setCategoryArray([...dummyCategoryArray]);
      } else {
        let new_cat_string = [];
        if(catType === 'parent') {
          categoryTree[pIdx]?.categoryList?.forEach((val, index)=>{
            if(!categoryArray?.includes(val?.categoryId)){
              new_cat_string.push(parseInt(val?.categoryId))
            }
            val?.subCategoryList?.forEach((subValue, subIdx)=>{
              if(!categoryArray?.includes(subValue?.subCategoryId)){
                new_cat_string.push(parseInt(subValue?.subCategoryId))
              }
            })
          })
        }else if(catType === 'category'){
          let parentCategoryId = categoryTree[pIdx]?.parentCategoryId;
          if(!categoryArray?.includes(parentCategoryId)){
            new_cat_string.push(parseInt(parentCategoryId))
          }
          categoryTree[pIdx]?.categoryList[cIdx]?.subCategoryList?.forEach((val, index)=>{
              if(!categoryArray?.includes(val?.subCategoryId)){
                new_cat_string.push(parseInt(val?.subCategoryId))
              }
          })
        }
        else if(catType === 'subcategory'){
          let parentCategoryId = categoryTree[pIdx]?.parentCategoryId;
          let ccategoryId = categoryTree[pIdx]?.categoryList[cIdx]?.categoryId;

          if(!categoryArray?.includes(parentCategoryId)){
            new_cat_string.push(parseInt(parentCategoryId))
          }
          if(!categoryArray?.includes(ccategoryId)){
            new_cat_string.push(parseInt(ccategoryId))
          }
        }
        categoryArray?.map((catItem) => {
          cat_string += catItem + ",";
        });
        cat_string += value + "," + new_cat_string?.join();
        setCategoryArray([...categoryArray, value, ...new_cat_string]);
      }
      
      setFilter({ ...filter, [filterType]: cat_string });
      setRefreshFlag(true);
      // refreshPageList();
    } else if (filterType === "keyword") {
      setFilter({ ...filter, [filterType]: value });
      setRefreshFlag(true);
      // refreshPageList();
    } else if (filterType === "sort") {
      if (value === "Newly published") {
        setFilter({ ...filter, [filterType]: "new" });
      } else if (value === "Old to New") {
        setFilter({ ...filter, [filterType]: "old" });
      } else if (value === "Price : low to high") {
        setFilter({ ...filter, [filterType]: "lowPrice" });
      } else if (value === "Price : high to low") {
        setFilter({ ...filter, [filterType]: "highPrice" });
      }
      setRefreshFlag(true);
      // refreshPageList();
    } else if (filterType === "price") {
      setFilter({ ...filter, [filterType]: value });
      setRefreshFlag(true);
      // refreshPageList();
    }
  };
  const [urlPrefix, setUrlPrefix] = useState(
    `${conf.apiAssetUrl}/${companyData?.frontFolder}/thumbnail`
  );
  const onRemoveFromWishlist = (courseId) => {
    if (student) {
      RemoveFromWishlist(courseId).then((res) => {
        toast.error(res?.message)
        refreshWishlist();
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  const refreshWishlist = () => {
    if (student) {
      GetWishlistIdsList().then((res) => {
        setWishlistIds(res?.data?.wishlist)
      }).catch((err) => {
        console.log(err);
      })
    }
  }
  const OnAddToWishlist = (courseId) => {
    let courseArray = [courseId];
    let data = JSON.stringify(courseArray)
    if (student) {
      AddToWishlist({ courseIdArray: data }).then((res) => {
        toast.success(res?.message);
        refreshWishlist();
      }).catch((err) => {
        console.log(err);
      })
    }
  }
  useEffect(() => {
    refreshWishlist();
  }, [])
  useEffect(() => {
    if (id) {
      setCategoryArray([parseInt(id)]);
    }
    setLoading(true);
    GetCategoryHierarchy()
      .then((res) => {
        setCategoryTree(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    GetFeaturedInstructors()
      .then((res) => {
        setInstructorList(res?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    GetTrendingCourses()
      .then((res) => {
        setTrendingCourseList(res?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (id) {
      let cat_string = id.toString();
      let filter_data = {
        page: 1,
        instructorArray: "",
        categoryArray: cat_string,
        keyword: searchParams.get('keyword') ?? "",
        sort: "new",
        price: "all",
        limit: "9",
        studentCode: student?.studentCode ?? -1
      }
      setLoading(true);
      GetCourseList(filter_data)
        .then((res) => {
          setPaginatedData(res.data);
          setCourseList(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if(searchParams.get('keyword')){
      let filter_data = {
        page: 1,
        instructorArray: "",
        categoryArray: "",
        keyword: searchParams.get('keyword') ?? "",
        sort: "new",
        price: "all",
        limit: "9",
        studentCode: student?.studentCode ?? -1
      }
      setLoading(true);
      GetCourseList(filter_data)
        .then((res) => {
          setPaginatedData(res.data);
          setCourseList(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      const data = {
        page: 1,
        limit: 9,
        studentCode: student?.studentCode ?? -1
      };
      setLoading(true);
      GetCourseList(data)
        .then((res) => {
          setCourseList(res?.data?.data);
          setPaginatedData(res?.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }, [])
  return (
    <>
      <Head title={`${"Course List"}`} />
      <div className="main-wrapper footer-separate">
        <section className="course-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                {/* <!-- Filter --> */}
                <div className="showing-list">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="d-flex align-items-center">
                        <div className="view-icons">
                          <Link
                            to={""}
                            className={`grid-view ${listType === "grid" ? "active" : ""
                              }`}
                            onClick={() => setListType("grid")}
                          >
                            <i className="feather-grid"></i>
                          </Link>
                          <Link
                            to={""}
                            className={`list-view ${listType === "list" ? "active" : ""
                              }`}
                            onClick={() => setListType("list")}
                          >
                            <i className="feather-list"></i>
                          </Link>
                        </div>
                        <div className="show-result">
                          <h4>
                            Showing {pagianatedData?.pageStartCount}-
                            {pagianatedData?.pageEndCount} of{" "}
                            {pagianatedData?.totalItemCount} results
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="show-filter add-course-info ">
                        <form action="#">
                          <div className="row gx-2 align-items-center">
                            <div className="col-md-6 col-item">
                              <div className=" search-group">
                                <i className="feather-search"></i>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Search our courses"
                                  onChange={(e) => {
                                    handleFilterChange(
                                      "keyword",
                                      e.target.value
                                    );
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-item">
                              <div className="input-block select-form mb-0">
                                <RSelect
                                  options={[
                                    {
                                      value: "Newly published",
                                      label: "Newly published",
                                    },
                                    {
                                      value: "Old to New",
                                      label: "Old to New",
                                    },
                                    {
                                      value: "Price : low to high",
                                      label: "Price : low to high",
                                    },
                                    {
                                      value: "Price : high to low",
                                      label: "Price : high to low",
                                    },
                                  ]}
                                  onChange={(selectedOption) => {
                                    handleFilterChange(
                                      "sort",
                                      selectedOption.value
                                    );
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- /Filter --> */}

                <div className="row">
                  {
                    isLoading ? <div className="course-row-shimmer">
                      <CourseBlockShimmer />
                      <CourseBlockShimmer />
                      <CourseBlockShimmer />
                      <CourseBlockShimmer />
                      <CourseBlockShimmer />
                      <CourseBlockShimmer />
                      <CourseBlockShimmer />
                      <CourseBlockShimmer />
                    </div> :
                      courseList?.length > 0 && !isLoading ? (
                        courseList.map((course, index) => {
                          return (
                            listType === "grid" ? (
                              <div className="col-lg-4 col-md-6 d-flex" key={index}>
                                <div className="course-box course-design d-flex ">
                                  <div className="product">
                                    <div className="product-img">
                                      <Link
                                        target="_blank"
                                        to={`/course-details/${course?.courseCode}/${course?.courseSlug}`}
                                      > 
                                        <img
                                          className="img-fluid"
                                          alt="Img"
                                          src={`${urlPrefix}/${course.courseThumbnail}`}
                                          onError={(e) => e.target.src = defaultThumbnail}  // Set fallback image if error
                                        />
                                      </Link>
                                      <div className="price">
                                        <h3>
                                          {course?.courseDiscountedPrice ==
                                            0 ? (
                                            "FREE"
                                          ) : (
                                            <>
                                              ₹{course?.courseDiscountedPrice}{" "}
                                              <span>
                                                ₹{course?.coursePrice}
                                              </span>{" "}
                                            </>
                                          )}
                                        </h3>
                                      </div>
                                    </div>
                                    <div className="product-content">
                                      <div className="course-group d-flex">
                                        <div className="course-group-img d-flex">
                                          <Link
                                            target="_blank"
                                            to={`/instructor-details/${course?.instructorCode}`}
                                          >
                                            <img
                                              src={`${conf.apiAssetUrl}/${companyData?.frontFolder}/kyc/${JSON.parse(`${course?.instructorNames}`)[0]?.employeeImage}`}
                                              alt="Instructor"
                                              className="img-fluid"
                                              onError={(e) => e.target.src = defaultInstructorImage}  // Set fallback image if error
                                            />
                                          </Link>
                                          <div className="course-name">
                                            <h4>
                                              <Link
                                                to={`/instructor-details/${course?.instructorCode}`}
                                              >
                                                {course?.instructorNames
                                                  ? JSON.parse(
                                                    course?.instructorNames
                                                  )[0]?.name
                                                  : ""}
                                              </Link>
                                            </h4>
                                            <p>Instructor</p>
                                          </div>
                                        </div>
                                        <div className="course-share d-flex align-items-center justify-content-center">
                                          {course?.isPurchased === "NO" && <Link to="">
                                            {wishlistIds?.includes(course?.courseId) ? <i className='fa-solid fa-heart' onClick={() => onRemoveFromWishlist(course?.courseId)}></i> :
                                              <i className='fa-regular fa-heart' onClick={() => OnAddToWishlist(course?.courseId)}></i>
                                            }</Link>
                                          }
                                        </div>
                                      </div>
                                      <h3 className="title two-line-title">
                                        <Link
                                        
                                        target="_blank"
                                          to={`/course-details/${course?.courseCode}/${course?.courseSlug}`}
                                        >
                                          {course?.courseTitle}
                                        </Link>
                                      </h3>
                                      <div className="course-info d-flex align-items-center">
                                        <div className="rating-img d-flex align-items-center">
                                          <img src={icon01} alt="Img" />
                                          {course?.lessonCount}+ Lesson
                                        </div>
                                        <div className="course-view d-flex align-items-center">
                                          <img src={icon02} alt="Img" />
                                          <p>
                                            {minuteToHrs(
                                              course?.lessonDuration
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="row grid-course-bottom-row">
                                      {course?.rating == 0 || course?.rating == 5 ? (
                                        <div className="rating m-0 col-sm-5 ps-2">
                                          <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                                          <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                                          <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                                          <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                                          <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                                          <span className="d-inline-block average-rating">
                                            <span>(5.0)</span>
                                          </span>
                                        </div>
                                      ) : (
                                        <div className="rating m-0 col-sm-5 ps-2">
                                          <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                                          {course?.rating >= 2 ? (
                                            <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                                          ) :
                                            course?.rating < 2 && course.rating > 1 ?
                                              <i className="fas fa-star-half-alt" style={{ color: '#FFD43B' }}></i>
                                              : <i className="fas fa-star" ></i>}
                                          {course?.rating >= 3 ? (
                                            <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                                          ) :
                                            course?.rating < 3 && course.rating > 2 ?
                                              (
                                                <i className="fas fa-star-half-alt" style={{ color: '#FFD43B' }}></i>
                                              ) : <i className="fas fa-star"></i>}
                                          {course?.rating >= 4 ? (
                                            <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                                          ) :
                                            course?.rating < 4 && course.rating > 3 ?
                                              (
                                                <i className="fas fa-star-half-alt" style={{ color: '#FFD43B' }}></i>
                                              ) : <i className="fas fa-star"></i>}
                                          {course?.rating >= 5 ? (
                                            <i className="fas fa-star filled" ></i>
                                          ) :
                                            course?.rating < 5 && course.rating > 4 ?
                                              (
                                                <i className="fas fa-star-half-alt" style={{ color: '#FFD43B' }}></i>
                                              ) : <i className="fas fa-star"></i>}

                                          <span className="d-inline-block average-rating">
                                            <span>({course?.rating ?? 5.0})</span>
                                          </span>
                                        </div>
                                      )}
                                      <div className="col-sm-7 all-btn all-category d-flex align-items-center">
                                        <Link
                                        
                                        target="_blank"
                                          to={
                                            course?.isPurchased === 'YES' ?
                                              `/student/course-read/${course?.courseCode}` :
                                              `/course-details/${course?.courseCode}`}
                                          className="btn btn-primary"
                                        >
                                          {course?.isPurchased === 'YES' ?
                                            'View Course' :
                                            'BUY NOW'
                                          }
                                        </Link>
                                      </div>
                                      </div>
                                      
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div
                                className="col-lg-12 col-md-12 d-flex"
                                key={index}
                              >
                                <div className="course-box course-design list-course d-flex">
                                  <div className="product">
                                    <div className="product-img">
                                      <Link
                                      
                                        target="_blank"
                                        to={`/course-details/${course?.courseCode}/${course?.courseSlug}`}
                                      >
                                        <img
                                          className="img-fluid"
                                          alt="Img"
                                          src={`${urlPrefix}/${course.courseThumbnail}`}
                                          onError={(e) => e.target.src = defaultThumbnail}  // Set fallback image if error
                                        />
                                      </Link>
                                      <div className="price">
                                        <h3>
                                          {course?.courseDiscountedPrice ==
                                            0 ? (
                                            "FREE"
                                          ) : (
                                            <>
                                              ₹{course?.courseDiscountedPrice}{" "}
                                              <span>
                                                ₹{course?.coursePrice}
                                              </span>{" "}
                                            </>
                                          )}
                                        </h3>
                                      </div>
                                    </div>
                                    <div className="product-content">
                                      <div className="head-course-title">
                                        <h3 className="title">
                                          <Link
                                          
                                        target="_blank"
                                            to={`/course-details/${course?.courseCode}/${course?.courseSlug}`}
                                          >
                                            {course?.courseTitle}
                                          </Link>
                                        </h3>
                                        <div className="all-btn all-category d-flex align-items-center">
                                          <Link
                                          
                                        target="_blank"
                                            to={
                                              course?.isPurchased === 'YES' ?
                                                `/student/course-read/${course?.courseCode}` :
                                                `/course-details/${course?.courseCode}/${course?.courseSlug}`}
                                            className="btn btn-primary"
                                          >
                                            {course?.isPurchased === 'YES' ?
                                              'View Course' :
                                              'BUY NOW'
                                            }

                                          </Link>
                                        </div>
                                      </div>
                                      <div className="course-info border-bottom-0 pb-0 d-flex align-items-center">
                                        <div className="rating-img d-flex align-items-center">
                                          <img src={icon01} alt="Img" />
                                          <p>{course?.lessonCount}+ Lesson</p>
                                        </div>
                                        <div className="course-view d-flex align-items-center">
                                          <img src={icon02} alt="Img" />
                                          <p>
                                            {minuteToHrs(
                                              course?.lessonDuration
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                      {course?.rating == 0 || course?.rating == 5 ? (
                                        <div className="rating m-0">
                                          <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                                          <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                                          <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                                          <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                                          <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                                          <span className="d-inline-block average-rating">
                                            <span>(5.0)</span>
                                          </span>
                                        </div>
                                      ) : (
                                        <div className="rating m-0">
                                          <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                                          {course?.rating >= 2 ? (
                                            <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                                          ) :
                                            course?.rating < 2 && course.rating > 1 ?
                                              <i className="fas fa-star-half-alt" style={{ color: '#FFD43B' }}></i>
                                              : <i className="fas fa-star" ></i>}
                                          {course?.rating >= 3 ? (
                                            <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                                          ) :
                                            course?.rating < 3 && course.rating > 2 ?
                                              (
                                                <i className="fas fa-star-half-alt" style={{ color: '#FFD43B' }}></i>
                                              ) : <i className="fas fa-star"></i>}
                                          {course?.rating >= 4 ? (
                                            <i className="fas fa-star filled" style={{ color: '#FFD43B' }}></i>
                                          ) :
                                            course?.rating < 4 && course.rating > 3 ?
                                              (
                                                <i className="fas fa-star-half-alt" style={{ color: '#FFD43B' }}></i>
                                              ) : <i className="fas fa-star"></i>}
                                          {course?.rating >= 5 ? (
                                            <i className="fas fa-star filled" ></i>
                                          ) :
                                            course?.rating < 5 && course.rating > 4 ?
                                              (
                                                <i className="fas fa-star-half-alt" style={{ color: '#FFD43B' }}></i>
                                              ) : <i className="fas fa-star"></i>}

                                          <span className="d-inline-block average-rating">
                                            <span>({course?.rating ?? 5.0})</span>
                                          </span>
                                        </div>
                                      )}
                                      <div className="course-group d-flex mb-0">
                                        <div className="course-group-img d-flex">
                                          <Link
                                            to={`/instructor-details/${course?.instructorCode}`}
                                          >
                                            <img
                                              src={`${conf.apiAssetUrl}/${companyData?.frontFolder}/kyc/${JSON.parse(`${course?.instructorNames}`)[0]?.employeeImage}`}
                                              alt="Instructor"
                                              className="img-fluid"
                                              onError={(e) => e.target.src = defaultInstructorImage}  // Set fallback image if error
                                            />
                                          </Link>
                                          <div className="course-name">
                                            <h4>
                                              <Link
                                                to={`/instructor-details/${course?.instructorCode}`}
                                              >
                                                {course?.instructorNames
                                                  ? JSON.parse(
                                                    course?.instructorNames
                                                  )[0]?.name
                                                  : ""}
                                              </Link>
                                            </h4>
                                            <p>Instructor</p>
                                          </div>
                                        </div>
                                        <div className="course-share d-flex align-items-center justify-content-center">
                                          {course?.isPurchased === "NO" && <Link to="">
                                            {wishlistIds?.includes(course?.courseId) ? <i className='fa-solid fa-heart' onClick={() => onRemoveFromWishlist(course?.courseId)}></i> :
                                              <i className='fa-regular fa-heart' onClick={() => OnAddToWishlist(course?.courseId)}></i>
                                            }</Link>
                                          }
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          );
                        })
                      ) : (
                        <div className="course-not-found-div">
                          <img src={courseNotFoundImg} className="course-not-found" alt="" />
                        </div>
                      )
                  }
                </div>

                {/* <!-- /pagination --> */}
                <Pagination
                  runFunction={paginationCourseList}
                  itemPerPage={9}
                  totalItems={pagianatedData?.totalItemCount || 0}
                  paginate={paginate}
                  currentPage={Number(pagianatedData?.currentPageNumber)}
                  pageStartCount={pagianatedData?.pageStartCount}
                  pageEndCount={pagianatedData?.pageEndCount}
                />
                {/* <!-- /pagination --> */}
              </div>
              <div className="col-lg-3 theiaStickySidebar">
                <div className="filter-clear">
                  <div className="clear-filter d-flex align-items-center">
                    <h4>
                      <i className="feather-filter"></i>Filters
                    </h4>
                    <div className="clear-text">
                      <p
                        onClick={onHandleReset}
                        className="clickable-btn hover-orange"
                      >
                        CLEAR
                      </p>
                    </div>
                  </div>

                  {/* <!-- Search Filter --> */}
                  <div className="card search-filter categories-filter-blk">
                    <div className="card-body">
                      <div className="filter-widget mb-0">
                        <div className="categories-head d-flex align-items-center">
                          <h4>Course categories</h4>
                          {/* <i className="fas fa-angle-down"></i> */}
                        </div>
                        {categoryTree?.length > 0 ? (
                          categoryTree?.map((parentCategory, pIdx) => {
                            return (
                              <div key={pIdx}>
                                <Accordion className="border-0 p-0">
                                  <Accordion.Item
                                    eventKey="0"
                                    className="border-0 p-0"
                                  >
                                    <Accordion.Header className="pe-2 border-0 pt-0 ">
                                      <label className="custom_check col-12">
                                        <input
                                          type="checkbox"
                                          checked={categoryArray?.includes(
                                            parentCategory?.parentCategoryId
                                          )}
                                          name="select_specialist"
                                          onChange={() => {
                                            handleFilterChange(
                                              "categoryArray",
                                              parentCategory?.parentCategoryId,
                                              'parent',
                                              pIdx,
                                              0,
                                              0
                                            );
                                          }}
                                        />
                                        <span className="checkmark"></span>{" "}
                                        {parentCategory?.parentCategoryName}
                                      </label>
                                    </Accordion.Header>
                                    <Accordion.Body className="border-0 pt-0">
                                      {parentCategory?.categoryList?.length >
                                        0 ? (
                                        parentCategory?.categoryList?.map(
                                          (category, cIdx) => {
                                            return (
                                              <span key={cIdx}>
                                                <label key={cIdx} className="custom_check col-10 ms-2">
                                                  <input
                                                    checked={categoryArray?.includes(
                                                      category?.categoryId
                                                    )}
                                                    type="checkbox"
                                                    name="select_specialist"
                                                    onChange={() => {
                                                      handleFilterChange(
                                                        "categoryArray",
                                                        category?.categoryId,
                                                        'category',
                                                        pIdx,
                                                        cIdx,
                                                        0
                                                      );
                                                    }}
                                                  />
                                                  <span className="checkmark"></span>{" "}
                                                  {category?.categoryName}{" "}
                                                </label>
                                                {category?.subCategoryList
                                                  ?.length > 0 ? (
                                                  category?.subCategoryList?.map(
                                                    (subCategory, sIdx) => {
                                                      return (
                                                        <label key={sIdx} className="custom_check col-8 ms-4">
                                                          <input
                                                            type="checkbox"
                                                            checked={categoryArray?.includes(
                                                              subCategory?.subCategoryId
                                                            )}
                                                            name="select_specialist"
                                                            onChange={() => {
                                                              handleFilterChange(
                                                                "categoryArray",
                                                                subCategory?.subCategoryId,
                                                                'subcategory',
                                                                pIdx,
                                                                cIdx,
                                                                sIdx
                                                              );
                                                            }}
                                                          />
                                                          <span className="checkmark"></span>{" "}
                                                          {
                                                            subCategory?.subCategoryName
                                                          }
                                                        </label>
                                                      );
                                                    }
                                                  )
                                                ) : (
                                                  <></>
                                                )}
                                              </span>
                                            );
                                          }
                                        )
                                      ) : (
                                        <></>
                                      )}
                                    </Accordion.Body>
                                  </Accordion.Item>
                                </Accordion>
                              </div>
                            );
                          })
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <!-- /Search Filter --> */}

                  {/* <!-- Search Filter --> */}
                  <div className="card search-filter">
                    <div className="card-body">
                      <div className="filter-widget mb-0">
                        <div className="categories-head d-flex align-items-center">
                          <h4>Instructors</h4>
                          <i className="fas fa-angle-down"></i>
                        </div>
                        {instructorList?.length > 0 ? (
                          instructorList?.map((ins, index) => {
                            if (ins?.totalCourses > 0) {
                              return (
                                <div key={index}>
                                  <label className="custom_check">
                                    <input
                                      type="checkbox"
                                      name="select_specialist"
                                      onChange={() => {
                                        handleFilterChange(
                                          "instructorArray",
                                          ins?.employeeId
                                        );
                                      }}
                                    />
                                    <span className="checkmark"></span>{" "}
                                    {ins?.instructorName} ({ins?.totalCourses}
                                    )
                                  </label>
                                </div>
                              );
                            }
                          })
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <!-- /Search Filter --> */}

                  {/* <!-- Search Filter --> */}
                  <div className="card search-filter ">
                    <div className="card-body">
                      <div className="filter-widget mb-0">
                        <div className="categories-head d-flex align-items-center">
                          <h4>Price</h4>
                          <i className="fas fa-angle-down"></i>
                        </div>
                        <div>{/* <PriceRangeSlider /> */}</div>
                        <div>
                          <label className="custom_check custom_one mb-0">
                            <input
                              type="radio"
                              name="select_specialist"
                              checked={filter.price === "paid"}
                              onChange={() => {
                                handleFilterChange("price", "paid");
                              }}
                            />
                            <span className="checkmark"></span> Paid
                          </label>
                        </div>
                        <div>
                          <label className="custom_check custom_one mb-0">
                            <input
                              type="radio"
                              name="select_specialist"
                              checked={filter.price === "free"}
                              onChange={() => {
                                handleFilterChange("price", "free");
                              }}
                            />
                            <span className="checkmark"></span> Free
                          </label>
                        </div>
                        <div>
                          <label className="custom_check custom_one mb-0">
                            <input
                              type="radio"
                              name="select_specialist"
                              checked={filter.price === "all"}
                              onChange={() => {
                                handleFilterChange("price", "all");
                              }}
                            />
                            <span className="checkmark"></span> All
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- /Search Filter --> */}

                  {/* <!-- Latest Posts --> */}
                  {/* <!-- /Latest Posts --> */}
                </div>
              </div>
            </div>

            <div className="row mt-2">
              <TrendingCoursesGrid />
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default CourseList;
