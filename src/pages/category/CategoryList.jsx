import React, { useEffect, useState } from "react";
import {
  GetCategoryHierarchy,
  useAuthCompany,
} from "../../services/AppServices";
import AOS from "aos";
import OwlCarousel from "react-owl-carousel";
import "aos/dist/aos.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link, useLocation, useParams } from "react-router-dom";
import Head from "../../layouts/main-layout/head/Head";
import conf from "../../conf/conf";
import SwipeableScroll from "../../components/swipe/SwipeableScroll";
const CategoryList = () => {
  let { id } = useParams();
  const location = useLocation(); // Provides the current location object
  // Initial state based on URL
  const { companyData } = useAuthCompany();
  const [categoryTree, setCategoryTree] = useState();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [currentType, setCurrentType] = useState("parent");
  const [parentList, setParentList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [urlPrefix, setUrlPrefix] = useState(
    `${conf.apiAssetUrl}/${companyData?.frontFolder}/thumbnail`
  );
  const [breadCrumbData, setBreadCrumbData] = useState([
    {
      title: "Home",
      link: "/",
      categoryIndex: "",
    },
    {
      title: "Category",
      link: "",
      categoryIndex: "",
    },
  ]);
  const onHandleCategoryChange = (index, type) => {
    if (type === "parent") {
      setCategoryList(parentList[index]?.categoryList);
    } else if (type === "category") {
      setSubCategoryList(categoryList[index]?.subCategoryList);
    }
  };
  const [length, setLength] = useState(breadCrumbData?.length || 0);
  const handleCategoryToSubCategory = (index) => {
    setCurrentType("category");
    setSelectedCategory(index);
    setSubCategoryList(
      categoryTree[selectedCategory]?.categoryList[index]?.subCategoryList
    );
    setBreadCrumbData([
      ...breadCrumbData,
      {
        title: categoryTree[selectedCategory]?.parentCategoryName,
        link: "",
        categoryIndex: "",
      },
    ]);
    setLength(length + 1);
  };
  const reset = () => {
    setCurrentType("parent");
    setCategoryList(categoryTree[0]?.categoryList);
    // setBreadCrumbData([])
    setBreadCrumbData([...breadCrumbData.slice(0, 2)]);
    setLength(length - 1);
    setSelectedCategory(0);
  };
  useEffect(() => {
    if (companyData) {
      // setUrlPrefix(`${conf.apiAssetUrl}/${companyData?.frontFolder}/thumbnail`);
      setLoading(true);
      setSubCategoryList([])
      GetCategoryHierarchy()
        .then((res) => {
          setCategoryTree(res?.data);
          setParentList(res?.data);
          setCategoryList(res?.data[0]?.categoryList);
          if (id) {
            res?.data?.map((parentCateg) => {
              if (parentCateg?.parentCategoryId == id) {
                setCategoryList(parentCateg?.categoryList);
                if(parentCateg && parentCateg?.categoryList?.length>0){
                  setSubCategoryList(
                    parentCateg?.categoryList[0]?.subCategoryList
                  );
                setCurrentType("category");
                }else {
                  setSubCategoryList([])
                }
                
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [companyData, location]);
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <div className="page-content">
        <Head title={`Catgeory List`} />
        <div className="breadcrumb-bar breadcrumb-bar-info pt-5 mt-1">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12">
                <div className="breadcrumb-list">
                  <h3 className="breadcrumb-title">
                    {breadCrumbData[length - 1]?.title}{" "}
                  </h3>
                  <nav aria-label="breadcrumb" className="page-breadcrumb">
                    <ol className="breadcrumb">
                      {breadCrumbData.map((item, index) => {
                        if (index === length - 1) {
                          return (
                            <li
                              key={index}
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              {breadCrumbData[length - 1]?.title}
                            </li>
                          );
                        } else if (index === length - 2) {
                          return (
                            <li key={index} className="breadcrumb-item">
                              <Link
                                to={item?.link}
                                onClick={(e) => {
                                  e.preventDefault();
                                  reset();
                                  // setCurrentType("parent");
                                  // handleBack(index, item?.categoryIndex,  item?.link)
                                }}
                              >
                                {item?.title}
                              </Link>
                            </li>
                          );
                        } else {
                          return (
                            <li key={index} className="breadcrumb-item">
                              <Link
                                to={item?.link}
                                onClick={() => {
                                  // handleBack(index, item?.categoryIndex,  item?.link)
                                }}
                              >
                                {item?.title}
                              </Link>
                            </li>
                          );
                        }
                      })}
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="category-tab">
                <ul className="nav nav-justified">
                  {isLoading ? (
                    <div className="row-categories-shimmer">
                      <div className="categories-list-blocks shine"></div>
                      <div className="categories-list-blocks shine"></div>
                      <div className="categories-list-blocks shine"></div>
                      <div className="categories-list-blocks shine"></div>
                    </div>
                    
                  ) : (
                    <>
                      {!isLoading && currentType === "parent" && (
                        <SwipeableScroll
                          parentList={parentList}
                          selectedCategory={selectedCategory}
                          setSelectedCategory={(e) => {
                            setSelectedCategory(e);
                          }}
                          onHandleCategoryChange={(index, type) => {
                            setSelectedCategory(index);
                            onHandleCategoryChange(index, "parent");
                          }}
                        />
                      )}
                      {!isLoading && currentType === "category" && (
                        <SwipeableScroll
                          parentList={categoryList}
                          selectedCategory={selectedCategory}
                          setSelectedCategory={(e) => {
                            setSelectedCategory(e);
                          }}
                          onHandleCategoryChange={(index, type) => {
                            setSelectedCategory(index);
                            onHandleCategoryChange(index, "category");
                          }}
                        />
                      )}
                    </>
                  )}
                </ul>
              </div>

              {/* <!-- Category List --> */}
              <div className="tab-content">
                <div className="tab-pane fade show active" id="graphics">
                  <div className="row">
                    {categoryList?.length > 0 &&
                      currentType === "parent" &&
                      categoryList.map((category, index) => {
                        return (
                          <div
                            className="col-lg-4 col-md-6"
                            key={category?.categoryId}
                          >
                            <div className="category-box">
                              <div className="category-title">
                                <div className="category-img custom-category-style">
                                  <img
                                    src={`${urlPrefix}/${category?.categoryImage}`}
                                    alt="Img"
                                  />
                                </div>
                                <h5>
                                  <Link
                                    to={""}
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      handleCategoryToSubCategory(
                                        // category?.categoryId
                                        index
                                      );
                                    }}
                                  >
                                    {category?.categoryName}
                                  </Link>
                                </h5>
                              </div>
                              <div className="cat-count">
                                <span>{category?.courseCount}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  {
                    isLoading ?
                    <div className="row">
                      <div className="row-categories-shimmer">
                      <div className="categories-blocks-shimmer shine"></div>
                      <div className="categories-blocks-shimmer shine"></div>
                      <div className="categories-blocks-shimmer shine"></div>
                      <div className="categories-blocks-shimmer shine"></div>
                    </div>
                    </div> :
                    <div className="row">
                    {subCategoryList?.length > 0 &&
                      currentType === "category" &&
                      subCategoryList.map((category) => {
                        return (
                          <div
                            className="col-lg-4 col-md-6"
                            key={category?.subCategoryId}
                          >
                            <div className="category-box">
                              <div className="category-title">
                                <div className="category-img custom-category-style">
                                  <img
                                    src={`${urlPrefix}/${category?.subCategoryImage}`}
                                    alt="Img"
                                  />
                                </div>
                                <h5>
                                  <Link
                                    to={`/course-list/${category?.subCategoryId}`}
                                  >
                                    {category?.subCategoryName}
                                  </Link>
                                </h5>
                              </div>
                              <div className="cat-count">
                                <span>{category?.courseCount}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  }
                  
                </div>
              </div>

              {/* <!-- /Category List --> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
