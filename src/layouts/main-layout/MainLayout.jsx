import React from "react";
import { Outlet } from "react-router-dom";
import Head from "./head/Head";
import Header from "./head/Header";
import { useAuthCompany } from "../../services/AppServices";
// import Footer from "./footer/Footer";
import HeaderStrip from "../../components/landingPage/HeaderStrip";
import NavBar from "../../components/landingPage/NavBar";
import AuthStudent from "../../services/StudentServices";
import Footer from "../../components/landingPage/Footer";

const MainLayout = ({ title, ...props }) => {
  const { companyData } = useAuthCompany();
  const { student, logout } = AuthStudent();
  return (
    <>
      <Head
        title={!title && "Loading"}
      />
      {/* <Header companyData={companyData} /> */}
      <HeaderStrip
        companyData={companyData}
        student={student}
        logout={logout}
      />
      <NavBar companyData={companyData}
        student={student} />
      <Outlet />
      {/* <Footer companyData={companyData} /> */}
      <Footer companyData={companyData} />
    </>
  );
};
export default MainLayout;
