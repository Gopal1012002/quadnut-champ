import React, { useState } from "react";
import logo from '../../assets/img/defaultLogo.png'
import error01 from "../../assets/img/error-01.png";
import { Link } from "react-router-dom";
import { useAuthCompany } from "../../services/AppServices";
import conf from "../../conf/conf";

const NotFound = () => {
  const { companyData } = useAuthCompany();
  const [urlPrefix, setUrlPrefix] = useState(`${conf.apiAssetUrl}/${companyData?.frontFolder}/logos/${companyData?.logo}`)
  return (
    <div className="main-wrapper">
      <div className="error-box">
        <div className="error-logo">
          <Link to="/">
            <img src={urlPrefix} onError={(e) => e.target.src = logo} className="img-fluid" alt="Logo" />
          </Link>
        </div>
        <div className="error-box-img">
          <img src={error01} alt="Img" className="img-fluid" />
        </div>
        <h3 className="h2 mb-3"> Oh No! Error 404</h3>
        <p className="h4 font-weight-normal">
          This page you requested counld not found. May the force be with you!
        </p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
