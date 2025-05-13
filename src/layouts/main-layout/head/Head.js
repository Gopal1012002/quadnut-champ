import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useAuthCompany } from "../../../services/AppServices";

const Head = ({ title = "QuadNut", description }) => {
  const [dTitle, setDTitle] = useState("QuadNut");
  const { companyData } = useAuthCompany();
  useEffect(() => {
    if (companyData?.websiteName) {
      setDTitle(companyData.websiteName);
    }
  }, [companyData]); 

  return (
    <Helmet>
      <title>{title ? `${title} | ${dTitle}` : dTitle}</title>
      <meta name="description" content={description || " A comprehensive LMS designed to streamline online education and training. It provides a user-friendly platform for organizations, institutions, and businesses to create, manage, and deliver courses efficiently."} />
    </Helmet>
  );
};

export default Head;
