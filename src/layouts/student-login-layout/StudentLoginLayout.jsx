import React from "react";
import { Outlet } from "react-router-dom";

const StudentLoginLayout = ({ title, ...props }) => {
  return (
    <>
      {/* <Head title={!title && "Register"} /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};
export default StudentLoginLayout;
