import React, { useEffect, useState } from "react";
import Head from "../../layouts/main-layout/head/Head";
import Breadcrumb from "../../components/common/Breadcrumb";
import { GetInstructorDetails } from "../../services/AppServices";
import { useParams } from "react-router-dom";
import InstructorSidebar from "../../components/instructor/InstructorSidebar";
import InstructorProfile from "../../components/instructor/InstructorProfile";
import InstructorCourses from "../../components/instructor/InstructorCourses";

const InstructorDetails = () => {
  const { id } = useParams();
  const [tab, setTab] = useState("1");
  const [isLoading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  useEffect(() => {
    setLoading(true);
    GetInstructorDetails(id)
      .then((res) => {
        setInstructorData(res?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const handleTab = (tabId) => {
    setTab(tabId);
  };
  const breadCrumbData = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Instructor",
      link: "",
    },
  ];
  return (
    <>
      <Head title={`${instructorData?.name}`} />
      <Breadcrumb data={breadCrumbData} />
      <div className="main-wrapper">
        <div class="page-content">
          <div class="container">
            <div class="row">
              {/* <!-- sidebar --> */}
              <InstructorSidebar
                instructorData={instructorData}
                handleTab={handleTab}
                tab={tab}
              />
              {tab === "1" ? (
                <InstructorProfile instructorData={instructorData} />
              ) : (
                <InstructorCourses instructorData={instructorData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorDetails;
