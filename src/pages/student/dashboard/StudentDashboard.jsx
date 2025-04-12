import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../components/common/Breadcrumb";
import user16 from "../../../assets/img/user/user16.jpg";
import StudentDashboardComponent from "../../../components/student/studentDashboard/StudentDashboardComponent";
import StudentSettings from "../../../components/student/StudentSettings";
import StudentSideBar from "../../../components/student/StudentSideBar";
import AuthStudent, { StudentPopupCheckService } from "../../../services/StudentServices";
import Head from "../../../layouts/main-layout/head/Head";
import StudentProfileView from "../../../components/student/studentProfile/StudentProfileView";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import StudentReviews from "../../../components/student/studentReviews/StudentReviews";
import StudentQuizAttempts from "../../../components/student/studentQuizAttempts/StudentQuizAttempts";
import StudentOrderList from "../../../components/student/studentOrderList/StudentOrderList";
import StudentCertificate from "../../../components/student/studentCertificate/StudentCertificate";
import StudentWishList from "../../../components/student/studentWishlist/StudentWishlist";
import StudentSupport from "../../../components/student/studentSupport/StudentSupport";
import StudentMockTest from "../../../components/student/studentMockTest/StudentMockTest";
import EnrolledCourses from "../../../components/student/studentDashboard/EnrolledCourses";
import Cookies from "js-cookie";
import conf from "../../../conf/conf";
import { useAuthCompany } from "../../../services/AppServices";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { ImCross } from "react-icons/im";
import CountdownTimer from "../../../components/popups/CountDown";
import PopupOne from "../../../components/popups/PopupOne";
import PopupThree from "../../../components/popups/PopupThree";
import PopupTwo from "../../../components/popups/PopupTwo";

const AuthType = "student";

const StudentDashboard = () => {
  const { companyData } = useAuthCompany();
  const navigate = useNavigate();
  const [popupData, setPopupData] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [urlPrefix, setUrlPrefix] = useState(`${conf.apiAssetUrl}/${companyData?.frontFolder}/content`)
  const location = useLocation();
  const pathname = location.pathname;
  const search = location.search;
  const isStudentPage = pathname === "/awlms/student";
  const hasProfileParam = new URLSearchParams(search).has("profile");
  const hasEnrolledCoursesParam = new URLSearchParams(search).has("courses");
  const hasDashboardParam = new URLSearchParams(search).has("dashboard");
  const hasReviewsParam = new URLSearchParams(search).has("reviews");
  const hasQuizParam = new URLSearchParams(search).has("quiz-attempts");
  const hasOrderHistory = new URLSearchParams(search).has("order-history");
  const hasCertificateTab = new URLSearchParams(search).has("certificate-list");
  const haswishlistTab = new URLSearchParams(search).has("wishlist")
  const hasSupportTab = new URLSearchParams(search).has("support")

  const { student } = AuthStudent();
  const [currentTab, setCurrentTab] = useState("Dashboard");

  const openPopupNotification = (data) => {
    setModalOpen(true);
    setPopupData(data)
  }


  const onClosePopupNotification = () => {
    setModalOpen(false);
    setPopupData(null);
  }

  const setCurrentFunc = (tab) => {
    setCurrentTab(tab);
  };
  // setSearchParams({'tab':'courses'})

  useEffect(() => {
    StudentPopupCheckService().then((res) => {
      if (res?.data?.length > 0) {

        let isPopupExists = Cookies.get(AuthType + "-popups")
        if (isPopupExists) {
          let popupArr = isPopupExists?.split(",");
          let i = 0;
          while ((i < popupArr?.length) && popupArr?.includes(String(res?.data[i]?.popupId))) {
            i++;
          }
          if (i < res?.data?.length) {
            popupArr.push(`${res?.data[i]?.popupId}`)
            Cookies.set(AuthType + "-popups", popupArr.join(), { expires: 1 })
            openPopupNotification(res?.data[i])
          }
        } else {
          Cookies.set(AuthType + "-popups", `${res?.data[0]?.popupId}`, { expires: 1 })
          openPopupNotification(res?.data[0])
        }
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
    })
  }, [])


  const breadCrumbData = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Student",
      link: "",
    },
  ];
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabFromUrl = params.get("tab"); // Get "tab" from URL

    if (tabFromUrl) {
      setCurrentTab(tabFromUrl);
    } else if (hasProfileParam) {
      setCurrentTab("MyProfile");
    } else if (hasEnrolledCoursesParam) {
      setCurrentTab("EnrolledCourses");
    } else if (hasDashboardParam) {
      setCurrentTab("Dashboard");
    } else if (hasReviewsParam) {
      setCurrentTab("Reviews");
    } else if (hasQuizParam) {
      setCurrentTab("MyQuizAttempts");
    } else if (hasOrderHistory) {
      setCurrentTab("OrderHistory");
    } else if (hasCertificateTab) {
      setCurrentTab("CertificateList");
    } else if (haswishlistTab) {
      setCurrentTab("Wishlist");
    } else if (hasSupportTab) {
      setCurrentTab("Support");
    }
  }, [location]);

  return (
    <>
      <Head title={`${student?.name}`} />
      <Breadcrumb data={breadCrumbData} />
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            {/* <!-- sidebar --> */}
            <StudentSideBar
              current={currentTab}
              setCurrentFunc={setCurrentFunc}
            />
            {currentTab == "Dashboard" && <StudentDashboardComponent />}
            {currentTab == "Settings" && <StudentSettings />}
            {currentTab == "MyProfile" && <StudentProfileView />}
            {currentTab == "EnrolledCourses" && <EnrolledCourses />}
            {currentTab == "Reviews" && <StudentReviews />}
            {currentTab == "MyQuizAttempts" && <StudentQuizAttempts />}
            {currentTab == "OrderHistory" && <StudentOrderList />}
            {currentTab == "CertificateList" && <StudentCertificate />}
            {currentTab == "Wishlist" && <StudentWishList />}
            {currentTab == "Support" && <StudentSupport />}
            {currentTab == "EnrolledMocks" && <StudentMockTest />}
          </div>
        </div>
      </div>

      <Modal show={modalOpen} onHide={onClosePopupNotification} centered size="lg" backdrop="static">
        <ModalBody className="p-0">
          {
            popupData?.popupType === 'IMAGE' ? <div className={`popup-image text-center mx-auto ${popupData?.popupIsURL === 'YES' ? 'clickable-btn' : ''}`}
            >
              <a href={popupData?.popupIsURL === 'YES' ? `${popupData?.popupURL}` : '#'} target="_blank">
                <img src={`${urlPrefix}/${popupData?.popupFileName}`} />
              </a>
            </div> : popupData?.popupTemplateNo === 'Template 3' ?  <PopupThree heading={popupData?.popupHeading} isLink={popupData?.popupIsURL} link={popupData?.popupURL} description={popupData?.popupText} /> :
            popupData?.popupTemplateNo === 'Template 2' ? <PopupTwo heading={popupData?.popupHeading} isLink={popupData?.popupIsURL} link={popupData?.popupURL} description={popupData?.popupText} /> :
            <PopupOne heading={popupData?.popupHeading} isLink={popupData?.popupIsURL} link={popupData?.popupURL} description={popupData?.popupText} />
          }
          <span className="notification-cross-close-btn clickable-btn">
            <ImCross size={'20'} className="text-bold" onClick={onClosePopupNotification} />
          </span>
          {popupData?.popupIsURL === 'YES' && <CountdownTimer endTime={popupData?.popupEndTime} />}
        </ModalBody>
      </Modal>
    </>
  );
};

export default StudentDashboard;
