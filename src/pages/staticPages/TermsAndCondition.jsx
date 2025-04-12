import React, { useEffect, useState } from "react";
import Head from "../../layouts/main-layout/head/Head";
import { GetTnCPage, useAuthCompany } from "../../services/AppServices";

const TermsAndCondition = () => {
  const { companyData } = useAuthCompany();
    const [isLoading, setLoading] = useState(false);
    const [staticPageData, setStaticPageData] = useState('');
  
    useEffect(() => {
      setLoading(true);
      GetTnCPage().then((res) => {
        setStaticPageData(res?.data?.data)
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setLoading(false)
      })
    }, [])
  return (
    <>
      <Head title="Terms & Conditions" />
      {/* <!-- Breadcrumb --> */}
      <div className="page-banner  footer-separate">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h1 className="mb-0">Terms & Conditions</h1>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Breadcrumb --> */}

      {/* <!-- Help Details --> */}
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
            {
                staticPageData ? <div dangerouslySetInnerHTML={{__html:staticPageData?.staticPageContent}} /> :
              <div className="terms-content">
                <div className="terms-text">
                  <h3>
                  {companyData?.websiteName}
                  {/* : <span>15th of May, 2024</span> */}
                  </h3>
                  <h4>Welcome to Our Terms & Conditions</h4>
                  <p>
                    These Terms & Conditions govern your access to and use of
                    {companyData?.websiteName}. By using our platform, you agree to comply with these
                    terms. If you have any questions or concerns, please contact
                    us.
                  </p>
                </div>
                <div className="terms-text">
                  <h5>1. Acceptance of Terms</h5>
                  <p>
                    By accessing {companyData?.websiteName}, you confirm that you accept and agree to
                    these Terms & Conditions. If you do not agree, you must not
                    use our platform.
                  </p>

                  <h5>2. User Responsibilities</h5>
                  <p>
                    As a user, you are responsible for ensuring that your
                    actions on the platform comply with applicable laws and
                    regulations. Any misuse or unauthorized activities may
                    result in termination of access.
                  </p>

                  <h5>3. Modification of Terms</h5>
                  <p>
                    {companyData?.websiteName} reserves the right to amend these Terms & Conditions
                    at any time. Updates will be posted here, and registered
                    users will be notified via email.
                  </p>
                </div>
                <div className="terms-text">
                  <h4>Key Features of {companyData?.websiteName}</h4>
                  <ul>
                    <li>
                      Seamless user experience with over 60+ integrated
                      features.
                    </li>
                    <li>
                      Multiple ready-to-use modules for enhanced functionality.
                    </li>
                    <li>Access to exclusive tools and resources.</li>
                    <li>Comprehensive user support and guidance.</li>
                  </ul>
                </div>
                <div className="terms-text">
                  <h4>Changes to Terms</h4>
                  <p>
                    If we make any significant changes to our Terms &
                    Conditions, we will notify all users by email and update
                    this page accordingly.
                  </p>
                  <p>
                    If you have any questions or require clarification, please
                    reach out to us at{" "}
                    <a href={`mailto:support@{${companyData?.email}}.com`}>{companyData?.email}</a>.
                  </p>
                </div>
              </div>}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Help Details --> */}
    </>
  );
};

export default TermsAndCondition;
