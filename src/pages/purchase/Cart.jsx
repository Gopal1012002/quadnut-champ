import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/common/Breadcrumb";
import Head from "../../layouts/main-layout/head/Head";
import {
  DeleteCourseFromCartService,
  GetSudentCartService,
} from "../../services/StudentServices";
import conf from "../../conf/conf";
import { useAuthCompany } from "../../services/AppServices";
import icon02 from "../../assets/img/icon/icon-02.svg";
import icon01 from "../../assets/img/icon/icon-01.svg";
import { minuteToHrs } from "../../utils/dynamic.util";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import emptyCartImg from "../../assets/img/emptyCart.png";

const Cart = () => {
  const { companyData } = useAuthCompany();
  const [urlPrefix, setUrlPrefix] = useState(
    `${conf.apiAssetUrl}/${companyData?.frontFolder}`
  );
  const [courseList, setCourseList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [subTotal, setSubTotal] = useState(0);

  const refreshCartList = () => {
    setLoading(true);
    GetSudentCartService()
      .then((res) => {
        if (res.data && res.data?.cartData?.length > 0) {
          setCourseList(res.data?.cartData);
        } else {
          setCourseList([]);
        }
        let course_price = 0;
          res?.data?.cartData?.map((course) => {
            course_price += course?.courseDiscountedPrice;
          });
        setSubTotal(course_price);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteCart = (id) => {
    setLoading(true);
    DeleteCourseFromCartService(id)
      .then((res) => {
        toast.success(res?.message);
        refreshCartList();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    refreshCartList();
  }, []);
  return (
    <>
      {/* <Breadcrumb data={breadCrumbData} /> */}
      <Head title="Cart" />
      <section class="course-content cart-widget mt-5">
        <div class="container">
          <div class="student-widget">
            <div class="student-widget-group">
              <div class="row">
                <div class="col-lg-12">
                  <div class="cart-head">
                    <h4>Your cart ( {courseList?.length ?? 0} items )</h4>
                  </div>
                  {
                    courseList?.length > 0 && <div class="cart-group pt-0 mt-0">
                    <div class="row mt-0">
                      {isLoading ? <>
                      <div className="cart-block-long-right-top shine my-2"></div>
                      <div className="cart-block-long-right-top shine my-2"></div>
                      <div className="cart-block-long-right-top shine my-2"></div>
                      </> : courseList?.length > 0 &&
                        courseList?.map((course, index) => {
                          return (
                              <div key={index} class="col-lg-12 col-md-12 d-flex">
                                <div class="course-box course-design list-course d-flex">
                                  <div class="product">
                                    <div class="product-img">
                                      <Link to="">
                                        <img
                                          class="img-fluid"
                                          alt="Img"
                                          src={`${urlPrefix}/thumbnail/${course?.courseThumbnail}`}
                                        />
                                      </Link>
                                      {course?.courseDiscountedPrice == 0 ? (
                                        <div class="price">
                                          <h3 class="free-color">FREE</h3>
                                        </div>
                                      ) : (
                                        <div class="price">
                                          <h3>
                                            ₹{course?.courseDiscountedPrice}{" "}
                                            <span>₹{course?.coursePrice}</span>
                                          </h3>
                                        </div>
                                      )}
                                    </div>
                                    <div class="product-content">
                                      <div class="head-course-title">
                                        <h3 class="title">
                                          <Link to="">
                                            {course?.courseTitle}
                                          </Link>
                                        </h3>
                                      </div>
                                      <div class="course-info d-flex align-items-center border-bottom-0 pb-0">
                                        <div class="rating-img d-flex align-items-center">
                                          <img src={icon01} alt="Img" />
                                          <p>{course?.lessonCount}+ Lesson</p>
                                        </div>
                                        <div class="course-view d-flex align-items-center">
                                          <img src={icon02} alt="Img" />
                                          <p>
                                            {minuteToHrs(
                                              course?.lessonDuration
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                      <div class="rating">
                                        <i class="fas fa-star filled"></i>
                                        <i class="fas fa-star filled"></i>
                                        <i class="fas fa-star filled"></i>
                                        <i class="fas fa-star filled"></i>
                                        <i class="fas fa-star"></i>
                                        <span class="d-inline-block average-rating">
                                          <span>4.0</span>
                                          (15)
                                        </span>
                                      </div>
                                    </div>
                                    <div class="cart-remove">
                                      <Link
                                        to=""
                                        onClick={() =>
                                          handleDeleteCart(course?.courseId)
                                        }
                                        class="btn btn-primary"
                                      >
                                        Remove
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                          );
                        })}
                    </div>
                  </div>
                  }
                  
                  <div class="cart-total">
                    <div class="row">
                      {courseList?.length > 0 && (
                        <div class="col-lg-12 col-md-12">
                          <div class="cart-subtotal">
                            <p>
                              Subtotal <span>₹ {subTotal}</span>
                            </p>
                          </div>
                        </div>
                      )}
                      {courseList?.length > 0 && (
                        <div class={`col-lg-6 col-md-6`}>
                          <div class="check-outs">
                            <Link to="/student/checkout" class="btn btn-primary">
                              Checkout
                            </Link>
                          </div>
                        </div>
                      )}

                      {!isLoading && courseList?.length === 0 && (
                        <div className="text-center ">
                          <img
                            src={emptyCartImg}
                            className="w-25 py-0 my-0 mx-auto"
                          />
                        </div>
                      )}

                      <div
                        class={`${
                          courseList?.length > 0
                            ? "col-lg-6 col-md-6"
                            : "col-lg-12 col-md-12"
                        } `}
                      >
                        <div class="condinue-shop">
                        <Link to="/course-list"  class="btn btn-primary">
                        Continue Shopping
                        </Link>
                        </div>
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

export default Cart;
