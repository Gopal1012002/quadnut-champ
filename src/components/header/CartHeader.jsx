import React, { useEffect, useState } from "react";
import { DeleteCourseFromCartService, GetSudentCartService } from "../../services/StudentServices";
import { useAuthCompany } from "../../services/AppServices";
import conf from "../../conf/conf";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CartHeader = () => {
  const { companyData } = useAuthCompany();
  const [isLoading, setLoading] = useState(false)
  const [subTotal, setSubTotal] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [urlPrefix, setUrlPrefix] = useState(
    `${conf.apiAssetUrl}/${companyData?.frontFolder}/thumbnail`
  );
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
  const refreshCartList = () => {
    GetSudentCartService().then((res) => {
      setCartData(res?.data?.cartData);
      let course_price = 0;
          res?.data?.cartData?.map((course) => {
            course_price += course?.courseDiscountedPrice;
          });
        setSubTotal(course_price);
    });
  }
  useEffect(() => {
    refreshCartList()
  }, []);
  return (
    <>
      <div className="wish-header">
        <Link to="/student/cart">View Cart</Link>
        {cartData?.length > 0 && <Link to="/student/checkout" className="float-end">
          Checkout
        </Link>}
        
      </div>
      <div className="wish-content" style={{height:'fit-content',paddingRight:'10px', maxHeight:'300px'}}>
        <ul>
          {cartData?.length > 0 ?
            cartData?.map((course, index) => {
              return (
                <li key={index}>
                  <div className="media">
                    <div className="d-flex media-wide">
                      <div className="avatar">
                        <Link to={`/course-details/${course?.courseCode}`}>
                          <img
                            alt="Img"
                            src={`${urlPrefix}/${course?.courseThumbnail}`}
                          />
                        </Link>
                      </div>
                      <div className="media-body">
                        <h6>
                          <Link to={`/course-details/${course?.courseCode}`}>
                            {course?.courseTitle}
                          </Link>
                        </h6>

                        <p>By {JSON.parse(course?.instructorNames)[0]?.name}</p>
                        <h5>
                          {course?.courseDiscountedPrice === 0 ? (
                            <div className="text-success">FREE</div>
                          ) : (
                            <>
                              ₹{course?.courseDiscountedPrice}{" "}
                              <span>₹{course?.coursePrice}</span>
                            </>
                          )}
                        </h5>
                      </div>
                    </div>
                    <div className="remove-btn">
                      <Link to="#" className="btn" onClick={() =>handleDeleteCart(course?.courseId)}>
                        Remove
                      </Link>
                    </div>
                  </div>
                </li>
              );
            }) 
            : <div className="text-secondary border fs-8 rounded-1 mt-3 mt-0 pt-0 text-center"> Cart Is Empty</div>  }
        </ul>
        {
          cartData?.length > 0  && <div className="total-item">
          <h5>Total : ₹ {subTotal}</h5>
        </div>
        }
        
      </div>
    </>
  );
};

export default CartHeader;
