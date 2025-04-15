import React, { useEffect, useState } from "react";
import Head from "../../layouts/main-layout/head/Head";
import AuthStudent, {
  CreateOrderPhonepeService,
  GetCityList,
  GetCountryList,
  GetStateList,
  GetSudentCartService,
  StudentProfileService,
} from "../../services/StudentServices";
import { useAuthCompany } from "../../services/AppServices";
import conf from "../../conf/conf";
import { MdLock } from "react-icons/md";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select/base";
import RSelect from "../../components/common/RSelect";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

const Checkout = () => {
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const { companyData } = useAuthCompany();
  const { student } = AuthStudent();
  const [originalPrice, setOriginalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [urlPrefix, setUrlPrefix] = useState(
    `${conf.apiAssetUrl}/${companyData?.frontFolder}`
  );
  const [courseList, setCourseList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [countryList, setCountryList] = useState([]);
  const [currentCountry, setCurrentCountry] = useState({});
  const [stateList, setStateList] = useState([]);
  const [currentState, setCurrentState] = useState({});
  const [cityList, setCityList] = useState([]);
  const [currentCity, setCurrentCity] = useState({});

  const onCreateOrder = (e) => { 
    setLoading(true);
    e.stateId = currentState?.id;
    e.countryId = currentCountry?.id;
    e.stateName = currentState?.value;
    e.countryName = currentCountry?.value;
    // e.callbackUrl = `${conf.baseUrl}${conf.basename}/student/verify-order`;
    e.callbackUrl = `https://champ.quadnut.org${conf.basename}/student/verify-order`;
    e.courseIdArray = JSON.stringify(
      courseList?.map((course) => course?.courseId)
    );
    CreateOrderPhonepeService(e)
      .then((res) => {
        if (res?.statusCode == 201) {
          toast.success(res?.message);
          navigate('/student/dashboard')
        } else {
          toast.success(res?.message);
          const paymentUrl = res.data.url;
          window.location.href = paymentUrl;
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const clickSubmit = () => {
    document.getElementById("submitButton").click();
  };

  useEffect(() => {
    setLoading(true)
    StudentProfileService().then((res) => {
      setValue("firstName", res?.data?.firstName);
      setValue("lastName", res?.data?.lastName);
      setValue("phone", res?.data?.studentContactNo);
      setValue("address1", res?.data?.studentPermanentAddress);
      setValue("pinCode", res?.data?.studentPostalcode);
      setValue("country",  res?.data?.studentCountryName)
      setValue("state", res?.data?.studentStateName)
      setCurrentCountry({
        value: res?.data?.studentCountryName,
        label: res?.data?.studentCountryName,
        id: res?.data?.studentCountry
      })
      setCurrentState({
        value: res?.data?.studentStateName,
        label: res?.data?.studentStateName,
        id: res?.data?.studentState
      })
    }).catch(()=>{
      console.log('error')
    }).finally(()=>setLoading(false))
  }, []);

  useEffect(() => {
    setLoading(true);
    GetCountryList()
      .then((res) => {
        let country_array = [];
        res?.data?.map((country) => {
          country_array.push({
            value: country.name,
            label: country.name,
            id: country.countryId,
          });
        });
        setCountryList(country_array);
        setStateList([]);
        setCityList([]);
        setCurrentCountry({});
        setCurrentState({});
        setCurrentCity({});
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (currentCountry?.id) {
      setLoading(true);
      GetStateList(currentCountry?.id)
        .then((res) => {
          let state_array = [];
          res?.data?.map((state) => {
            state_array.push({
              value: state.name,
              label: state.name,
              id: state.stateId,
            });
          });
          setStateList(state_array);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [currentCountry]);

  useEffect(() => {
    setLoading(true);
    GetSudentCartService()
      .then((res) => {
        if (res.data && res.data?.cartData?.length > 0) {
          setCourseList(res.data?.cartData);
          let temp_discount_price = 0;
          let temp_original_price = 0;
          res?.data?.cartData?.map((cart) => {
            temp_discount_price += cart?.courseDiscountedPrice;
            temp_original_price += cart?.coursePrice;
          });
          setTotalPrice(temp_discount_price);
          setOriginalPrice(temp_original_price);
          setTotalDiscount(temp_original_price - temp_discount_price);
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
  }, []);
  return (
    <>
      <Head title="Checkout" />
      <section class="course-content checkout-widget mt-5">
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              {/* <!-- Billing Address --> */}
              <div class="student-widget">
                <div class="student-widget-group add-course-info">
                  <div class="cart-head">
                    <h4>Billing Address</h4>
                  </div>
                  <div class="checkout-form">
                    <form onSubmit={handleSubmit(onCreateOrder)}>
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="input-block">
                            <label class="form-control-label">First Name</label>
                            <input
                              {...register("firstName", {
                                required: "First Name is required",
                              })}
                              type="text"
                              class="form-control"
                              placeholder="Enter your first Name"
                            />
                            {errors.firstName && (
                              <div className="error-italic">
                                {" "}
                                {errors.firstName.message}{" "}
                              </div>
                            )}
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="input-block">
                            <label class="form-control-label">Last Name</label>
                            <input
                              {...register("lastName", {
                                required: "Last Name is required",
                              })}
                              type="text"
                              class="form-control"
                              placeholder="Enter your last Name"
                            />
                            {errors.lastName && (
                              <div className="error-italic">
                                {" "}
                                {errors.lastName.message}{" "}
                              </div>
                            )}
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="input-block">
                            <label class="form-control-label">
                              Phone Number
                            </label>
                            <input
                              {...register("phone", {
                                required: "Phoen number is required",
                                pattern: {
                                  value: /^[6-9]\d{9}$/,
                                  message: "Please enter a valid phone number",
                                },
                              })}
                              type="text"
                              class="form-control"
                              placeholder="Phone Number"
                            />
                            {errors.phone && (
                              <div className="error-italic">
                                {" "}
                                {errors.phone.message}{" "}
                              </div>
                            )}
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="input-block">
                            <label class="form-control-label">
                              Address Line 1
                            </label>
                            <input
                              {...register("address1", {
                                required: "Address is required",
                              })}
                              type="text"
                              class="form-control"
                              placeholder="Address"
                            />
                            {errors.address1 && (
                              <div className="error-italic">
                                {" "}
                                {errors.address1.message}{" "}
                              </div>
                            )}
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="input-block">
                            <label class="form-control-label">
                              Address Line 2 (Optional)
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Address"
                            />
                          </div>
                        </div>
                        <div class="col-lg-4">
                          <div className="form-group">
                            <label
                              className="form-control-label"
                              htmlFor="affiliate_country"
                            >
                              Country<code>*</code>
                            </label>
                            <div className="form-control-wrap">
                              {/* Use Controller to manage RSelect for affiliate_country */}
                              <Controller
                                name="country"
                                control={control}
                                rules={{ required: "Country is required" }} // Validation rule
                                render={({ field }) => (
                                  <RSelect
                                    {...field}
                                    options={countryList}
                                    placeholder="Select Country"
                                    onChange={(selectedOption) => {
                                      field.onChange(selectedOption?.value); // Pass value for form control
                                      setCurrentCountry(selectedOption); // Store full object for further use
                                      setValue("country", selectedOption.id, {
                                        shouldValidate: true,
                                      });
                                    }}
                                    value={countryList?.find(
                                      (country) => country.value === field.value
                                    )}
                                  />
                                )}
                              />

                              {/* Display validation error */}
                              {errors.country && (
                                <span className="error-italic">
                                  {errors.country.message}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-4">
                          <div class="input-block">
                            <label class="form-control-label">State</label>
                            <div className="form-control-wrap">
                              {/* Use Controller to manage RSelect for affiliate_country */}
                              <Controller
                                name="state"
                                control={control}
                                rules={{ required: "State is required" }} // Validation rule
                                render={({ field }) => (
                                  <RSelect
                                    {...field}
                                    options={stateList}
                                    placeholder="Select State"
                                    onChange={(selectedOption) => {
                                      field.onChange(selectedOption?.value); // Pass value for form control
                                      setCurrentState(selectedOption); // Store full object for further use
                                      setValue("state", selectedOption?.value, {
                                        shouldValidate: true,
                                      }); // Update form state with validation
                                    }}
                                    value={stateList.find(
                                      (option) => option.value === field.value
                                    )}
                                  />
                                )}
                              />

                              {/* Display validation error */}
                              {errors.state && (
                                <span className="error-italic">
                                  {errors.state.message}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div class="col-lg-4">
                          <div class="input-block">
                            <label class="form-control-label">
                              Zip/Postal Code
                            </label>
                            <input
                              type="text"
                              {...register("pinCode", {
                                required: "Zip code is required",
                                pattern: {
                                  value: /^\d{6}$/,
                                  message: "Pincode must be exactly 6 digits",
                                },
                              })}
                              class="form-control sm"
                              style={{ minHeight: "38px" }}
                            />
                            {errors.pinCode && (
                              <div className="error-italic">
                                {" "}
                                {errors.pinCode.message}{" "}
                              </div>
                            )}
                          </div>
                        </div>
                        <div class="col-md-12 col-lg-10">
                          <div class="input-block ship-check mb-0">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              name="remember"
                            />
                            Save this information for next time
                          </div>
                        </div>
                      </div>
                      <button type="submit" id="submitButton" class="d-none">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              {/* <!-- /Billing Address --> */}

              {/* <!-- /Payment Method --> */}
              <div class="student-widget pay-method">
                <div class="student-widget-group add-course-info">
                  <div class="cart-head">
                    <h4>Order details ({courseList?.length} courses)</h4>
                  </div>
                  <div class="checkout-form">
                    {courseList?.length > 0 &&
                      courseList?.map((course) => {
                        return (
                          <>
                            <div className="mx-1 d-flex flex-row checkout-course-div">
                              <div className="course-div-image">
                                <img
                                  src={`${urlPrefix}/thumbnail/${course?.courseThumbnail}`}
                                  className=""
                                  alt=""
                                />
                              </div>
                              <div className="course-title-div d-flex align-items-center text-dark">
                                <span className=" text-wrap">
                                  {course?.courseTitle}
                                </span>
                              </div>
                              <div className="course-price-div text-soft d-flex align-items-center justify-content-end pe-2">
                                <ul>
                                  <li className="d-flex flex-row justify-content-end fs-10 text-soft">
                                    <div>₹{course.courseDiscountedPrice}</div>
                                  </li>
                                  <li className="d-flex flex-row justify-content-end fs-10 text-soft">
                                    <div className="text-decoration-line-through">
                                      {" "}
                                      ₹{course.coursePrice}
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </div>
                </div>
              </div>
              {/* <!-- /Payment Method --> */}
            </div>
            <div class="col-lg-4 theiaStickySidebar">
              <div class="student-widget select-plan-group">
                <div class="student-widget-group">
                  <div class="plan-header">
                    <h4>Summary</h4>
                  </div>
                  <div class="benifits-feature">
                    <ul>
                      <li className="d-flex flex-row justify-content-between">
                        <div>Original Price :</div>
                        <div>₹ {originalPrice}</div>
                      </li>
                      <li className="d-flex flex-row justify-content-between border-bottom pb-2">
                        <div>
                          Discounts ({totalPrice === 0 ? '100' : (( 100 * totalDiscount) / originalPrice).toFixed(2)}%Off)  : 
                        </div>
                        <div>- ₹ {totalDiscount}</div>
                      </li>
                      <li className="d-flex flex-row justify-content-between border-bottom pb-2">
                        <div>
                          {" "}
                          <b>Total : </b>({courseList?.length} Courses){" "}
                        </div>
                        <div>
                          <b> ₹ {totalPrice}</b>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="plan-change">
                    <Link to="" class="btn btn-primary" onClick={clickSubmit}>
                      <MdLock size={25} />
                      {isLoading ? (
                        <Spinner size="sm" color="light" />
                      ) : (
                        "Complete Checkout"
                      )}
                    </Link>
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

export default Checkout;
