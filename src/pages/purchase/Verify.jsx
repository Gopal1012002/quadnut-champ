import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { VerifyOrderPhonepeService } from "../../services/StudentServices";
import { toast } from "react-toastify";
import Head from "../../layouts/main-layout/head/Head";
import successIconGif from "../../assets/img/success.gif";
import paymentFailedIcon from "../../assets/img/paymentFailed.webp";
import Confetti from "react-confetti";

const Verify = () => {
  const { id } = useParams();
  const [paymentResult, setPaymentResult] = useState("");
  const [isLaoding, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  useEffect(() => {
    setLoading(true);
    VerifyOrderPhonepeService(id)
      .then((res) => {
        setPaymentResult(res?.data?.code);
      })
      .catch((err) => {
        setPaymentResult(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  return (
    <>
      <Head title="Verify Order" />
      {paymentResult === "PAYMENT_SUCCESS" && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          recycle={false}
        />
      )}

      <section className="course-content cart-widget mt-5">
        {isLaoding ? (
          <>
            <div className="text-center">
              <div className="row d-flex justify-content-center">
                <div
                  className="block-box-shimmer shine col-lg-4 col-md-6 col-sm-10 col-xs-12"
                  style={{ height: "400px" }}
                ></div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="text-center">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-4 col-md-6 col-sm-10 col-xs-12">
                  <div className="rounded">
                    <div className="card-body">
                      <div className="cart-head mb-4">
                        <h2
                          className={`${
                            paymentResult === "PAYMENT_SUCCESS"
                              ? "text-green"
                              : paymentResult === "PAYMENT_PENDING"
                              ? "text-primary"
                              : "text-primary"
                          }  fs-2`}
                        >
                          {paymentResult === "PAYMENT_SUCCESS"
                            ? "Payment Succeeded !! "
                            : paymentResult === "PAYMENT_PENDING"
                            ? "Payment is Pending !!"
                            : paymentResult === "PAYMENT_DECLINED"
                            ? "Payment Declined !! "
                            : paymentResult === "INTERNAL_SERVER_ERROR"
                            ? "Payment Gateway Error  !!"
                            : paymentResult === "PAYMENT_ERROR"
                            ? "Payment Error Occurred  !!"
                            : paymentResult === "TRANSACTION_NOT_FOUND"
                            ? "Transaction Not Found !!"
                            : paymentResult === "TIMED_OUT"
                            ? "Payment Time Out"
                            : ""}
                        </h2>
                      </div>
                      <div className="order-verify-div mb-4">
                        <img
                          src={
                            paymentResult === "PAYMENT_SUCCESS"
                              ? successIconGif
                              : paymentFailedIcon
                          }
                          alt="Payment Success"
                          className="img-fluid"
                        />
                      </div>
                      <p className="text-muted">
                        {paymentResult === "PAYMENT_SUCCESS"
                          ? "Thank you for your payment. You will receive a confirmation email shortly."
                          : paymentResult === "PAYMENT_DECLINED"
                          ? "Payment is declined by the user. Please try to complete the payment steps again."
                          : paymentResult === "PAYMENT_PENDING"
                          ? "Payment status is pending. Please try to check the status after few minutes."
                          : paymentResult === "INTERNAL_SERVER_ERROR"
                          ? "Please refresh the page. Some error occurred at the server side."
                          : "Payment completion failed. Please try to complete the payment steps again."}
                      </p>
                      <Link to="/" className="btn btn-primary mt-3">
                        Go to Homepage
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Verify;
