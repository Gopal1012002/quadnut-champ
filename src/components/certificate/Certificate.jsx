import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/certificate.css";
import { GetCertificateByCertificateIdService } from "../../services/StudentServices";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Hourglass } from "react-loader-spinner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Certificate = () => {
    const [isLoading, setLoading] = useState(false);
    const { id } = useParams();
    const [certificateDetails, setCertificateDetails] = useState({});
    const certificateRef = useRef();
  
    useEffect(() => {
      setLoading(true);
      GetCertificateByCertificateIdService(id)
        .then((res) => {
          setCertificateDetails(res?.data);
  
          // Trigger PDF generation after data is fetched
          setTimeout(() => generatePDF(), 1000); // Delay to ensure the content is rendered
        })
        .catch((err) => {
          toast.error(err?.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);
  
    const generatePDF = () => {
      const certificateElement = certificateRef.current;
      if (certificateElement) {
        html2canvas(certificateElement, { scale: 2 }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("landscape", "px", "a4");
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
          pdf.save(`Certificate-${id}.pdf`);
        });
      }
    };
  return (
    <>
      {isLoading ? (
        <div className="loader-div">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#F66962", "#72a1ed"]}
          />
        </div>
      ) : !certificateDetails ? (
        <div>
          <h5>No Certificate Found !!</h5>
        </div>
      ) : (
        <div
          className=" d-flex align-items-center"
          ref={certificateRef}
          style={{ width: "100%", height: "100vh" }}
        >
          <div class="container pm-certificate-container">
            <div class="outer-border"></div>
            <div class="inner-border"></div>

            <div class="pm-certificate-border col-xs-12">
              <div class="row pm-certificate-header">
                <div class="pm-certificate-title cursive col-xs-12 text-center">
                  <h2> {certificateDetails?.companyName} </h2>
                </div>
              </div>

              <div class="row pm-certificate-body">
                <div class="pm-certificate-block">
                  <div class="col-xs-12">
                    <div class="row">
                      <div class="col-xs-2">{/* <!-- LEAVE EMPTY --> */}</div>
                      <div class="pm-certificate-name underline margin-0 col-xs-8 text-center">
                        <span class="pm-name-text bold">
                          {certificateDetails?.studentName}
                        </span>
                      </div>
                      <div class="col-xs-2">{/* <!-- LEAVE EMPTY --> */}</div>
                    </div>
                  </div>

                  <div class="col-xs-12">
                    <div class="row">
                      <div class="col-xs-2">{/* <!-- LEAVE EMPTY --> */}</div>
                      <div class="pm-earned col-xs-8 text-center">
                        <span class="pm-earned-text padding-0 block cursive">
                          has earned
                        </span>
                        <span class="pm-credits-text block bold sans">
                          Completion Certificate
                        </span>
                      </div>
                      <div class="col-xs-2">{/* <!-- LEAVE EMPTY --> */}</div>
                      <div class="col-xs-12"></div>
                    </div>
                  </div>

                  <div class="col-xs-12">
                    <div class="row">
                      <div class="col-xs-2">{/* <!-- LEAVE EMPTY --> */}</div>
                      <div class="pm-course-title col-xs-8 text-center">
                        <span class="pm-earned-text block cursive">
                          while completing the training course entitled
                        </span>
                      </div>
                      <div class="col-xs-2">{/* <!-- LEAVE EMPTY --> */}</div>
                    </div>
                  </div>

                  <div class="col-xs-12">
                    <div class="row">
                      <div class="col-xs-2">{/* <!-- LEAVE EMPTY --> */}</div>
                      <div class="pm-course-title underline col-xs-8 text-center">
                        <span class="pm-credits-text block bold sans">
                          {certificateDetails?.courseTitle}
                        </span>
                      </div>
                      <div class="col-xs-2">{/* <!-- LEAVE EMPTY --> */}</div>
                    </div>
                  </div>
                </div>

                <div class="col-xs-12">
                  <div class="row">
                    <div class="pm-certificate-footer row">
                      <div class="col-xl-4 col-xs-4 pm-certified col-xs-4 text-center">
                        <span class="pm-credits-text block sans"></span>
                        <span class="pm-empty-space block underline"></span>
                        <span class="bold block">
                          CEO - {certificateDetails?.companyName}
                        </span>
                      </div>
                      <div class="col-xl-4 col-xs-4">
                        {/* <!-- LEAVE EMPTY --> */}
                      </div>
                      <div class="col-xl-4 col-xs-4 pm-certified col-xs-4 text-center">
                        <span class="pm-credits-text block sans">
                          {/* Date Completed */}
                        </span>
                        <span class="pm-empty-space block underline"></span>
                        <span class="bold block">Date: 12-12-2024</span>
                        <span
                          class="bold block text-small fs-10"
                          style={{ fontSize: "10px" }}
                        >
                          Cert. #{id}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Certificate;
