import React from "react";
import { Outlet } from "react-router-dom";
import Head from "../main-layout/head/Head";
import Header from "../main-layout/head/Header";
import { useAuthCompany } from "../../services/AppServices";
// import Footer from "../main-layout/footer/Footer";
import Footer from "../../components/landingPage/Footer";
import HeaderStrip from "../../components/landingPage/HeaderStrip";
import NavBar from "../../components/landingPage/NavBar";
import AuthStudent from "../../services/StudentServices";

const StudentLayout = ({ title, ...props }) => {
  const { companyData } = useAuthCompany();
  const {student, logout} = AuthStudent()
  return (
    <>
      <Head title={!title && "Loading"} />
      {/* <Header companyData={companyData} /> */}
      <HeaderStrip
        companyData={companyData}
        student={student}
        logout={logout}
      />
      <NavBar />
      <Outlet />
      {/* <Footer companyData={companyData} /> */}
      <Footer companyData={companyData} />
      {/* <Footer /> */}
    </>
  );
};
export default StudentLayout;
