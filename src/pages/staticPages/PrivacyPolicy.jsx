import React, { useEffect, useState } from "react";
import Head from "../../layouts/main-layout/head/Head";
import { GetPrivacyPolicy, useAuthCompany } from "../../services/AppServices";

const PrivacyPolicy = () => {
  const { companyData } = useAuthCompany();
  const [isLoading, setLoading] = useState(false);
  const [staticPageData, setStaticPageData] = useState('');

  useEffect(() => {
    setLoading(true);
    GetPrivacyPolicy().then((res) => {
      setStaticPageData(res?.data?.data)
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false)
    })
  }, [])


  return (
    <>
      <Head title="Privacy Policy" />
      {/* <!-- Breadcrumb --> */}
      <div className="page-banner  footer-separate">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h1 className="mb-0"> {staticPageData ? staticPageData?.staticPageHeading : 'Privacy Policy'} </h1>
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
                      </h3>
                      <h4>Privacy Policy</h4>
                      <p>
                        {companyData?.websiteName} is committed to protecting your privacy. This Privacy
                        Policy outlines the types of information we collect, how it
                        is used, and the steps we take to ensure your information is
                        secure.
                      </p>
                    </div>
                    <div className="terms-text">
                      <h5>1. Information We Collect</h5>
                      <p>
                        We collect personal and non-personal information to provide
                        and improve our services. This may include:
                      </p>
                      <ul>
                        <li>
                          Personal details such as your name, email address, and
                          contact information.
                        </li>
                        <li>
                          Technical data like your IP address, browser type, and
                          device information.
                        </li>
                        <li>
                          Usage data to understand how you interact with our
                          platform.
                        </li>
                      </ul>
                    </div>
                    <div className="terms-text">
                      <h5>2. How We Use Your Information</h5>
                      <p>
                        Your information is used to enhance your experience on our
                        platform, including but not limited to:
                      </p>
                      <ul>
                        <li>Providing personalized services and support.</li>
                        <li>Improving platform performance and functionality.</li>
                        <li>Ensuring the security of our users and systems.</li>
                        <li>
                          Sending updates, notifications, and promotional materials
                          (with your consent).
                        </li>
                      </ul>
                    </div>
                    <div className="terms-text">
                      <h5>3. Sharing Your Information</h5>
                      <p>
                        We do not sell or share your personal information with third
                        parties except in the following cases:
                      </p>
                      <ul>
                        <li>
                          When required by law or to comply with legal obligations.
                        </li>
                        <li>
                          To trusted service providers that assist us in operating
                          our platform, under strict confidentiality agreements.
                        </li>
                        <li>
                          In case of a business transfer, such as a merger or
                          acquisition.
                        </li>
                      </ul>
                    </div>
                    <div className="terms-text">
                      <h5>4. Data Security</h5>
                      <p>
                        We take reasonable measures to protect your personal
                        information from unauthorized access, loss, misuse, or
                        alteration. However, no system can guarantee absolute
                        security.
                      </p>
                    </div>
                    <div className="terms-text">
                      <h5>5. Your Rights</h5>
                      <p>As a user, you have the right to:</p>
                      <ul>
                        <li>Access the personal information we hold about you.</li>
                        <li>
                          Request corrections to inaccurate or incomplete data.
                        </li>
                        <li>
                          Request the deletion of your personal data where
                          applicable.
                        </li>
                        <li>Opt out of receiving non-essential communications.</li>
                      </ul>
                    </div>
                    <div className="terms-text">
                      <h4>Changes to This Privacy Policy</h4>
                      <p>
                        We may update this Privacy Policy from time to time. Any
                        changes will be reflected on this page, and registered users
                        will be notified of significant updates.
                      </p>
                      <p>
                        For questions or concerns about this Privacy Policy, please
                        contact us at{" "}
                        <a href={`mailto:support@{${companyData?.email}}.com`}>{companyData?.email}</a>.
                      </p>
                    </div>
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
      {/* <!-- /Help Details --> */}
    </>
  );
};

export default PrivacyPolicy;
