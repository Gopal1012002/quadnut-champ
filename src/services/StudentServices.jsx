import axios from "axios";
// import Cookies from 'js-cookie'
import conf from "../conf/conf.js";
import Cookies from "js-cookie";
import base64 from "react-native-base64";
import { useState } from "react";
import { useAuthCompany } from "./AppServices.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// constant declaration
const AuthType = "student";
const BaseUrl = conf.apiBaseUrl;

const AuthRedirect = "/student/dashboard";
const AuthLogin = "/student-login";

const StudentAuthRedirect = "/student/dashboard";

/********************* Student Auth ************/
export default function AuthStudent() {
  const navigate = useNavigate();

  const getToken = () => {
    const tokenString = Cookies.get(AuthType + "-accessToken");
    let studentToken = tokenString;
    return studentToken;
  };

  const getStudent = () => {
    const studentString = Cookies.get(AuthType + "-info");
    let student_detail = "";
    if (studentString) {
      student_detail = JSON.parse(base64.decode(studentString));
    }
    return student_detail;
  };

  const [token, setToken] = useState(getToken());
  const [student, setStudent] = useState(getStudent());

  const saveToken = (studentData, token) => {
    Cookies.set(AuthType + "-accessToken", token, { expires: 1 });
    Cookies.set(
      AuthType + "-info",
      base64.encode(JSON.stringify(studentData)),
      { expires: 1 }
    );
    setToken(token);
    setStudent(studentData);

    if (Cookies.get(AuthType + "-accessToken") !== "") {
      let ccode = localStorage.getItem('ccode')
      let mcode = Cookies.get('mock-slug');
      localStorage.removeItem('ccode')
      if (mcode) {
        Cookies.remove('mock-slug')
        navigate(`/mock-details/${mcode}`)
        return;
      }
      if (ccode) {
        navigate(`/course-details/${ccode}`)
      } else {
        navigate(AuthRedirect);
      }
    }
  };
  const logout = () => {
    logoutStudent()
      .then((res) => {
        toast.success(res?.message);
      })
      .catch((err) => {
        toast.success("Log out successful");
      })
      .finally(() => {
        Cookies.remove(AuthType + "-accessToken");
        Cookies.remove(AuthType + "-info");
        navigate(AuthLogin);
      });
  };
  const http = axios.create({
    baseURL: BaseUrl + "",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return {
    setToken: saveToken,
    token,
    student,
    getToken,
    http,
    logout,
  };
}

export async function logoutStudent() {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(`${BaseUrl}student/logout`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.data;
}

export async function RegisterStudentService(data) {
  const affiliateId = Cookies.get("company-id");
  data.affiliateId = affiliateId;
  const response = await axios.post(`${BaseUrl}student/registration`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.data;
}

export async function LoginStudentService(data) {
  const affiliateId = Cookies.get("company-id");
  data.affiliateId = affiliateId;
  const response = await axios.post(`${BaseUrl}student/login`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.data;
}

export async function StudentOtpVerifyService(data) {
  const affiliateId = Cookies.get("company-id");
  data.affiliateId = affiliateId;
  const response = await axios.post(`${BaseUrl}student/otp-verify`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.data;
}

/*************************************** Student Forgot Password Start *********/

export async function StudentForgotPasswordOtpSend(data) {
  const affiliateId = Cookies.get("company-id");
  data.affiliateId = affiliateId;
  const response = await axios.post(
    `${BaseUrl}student/forgot-password-send`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.data;
}

export async function StudentForgotPasswordOtpVerify(data) {
  const affiliateId = Cookies.get("company-id");
  data.affiliateId = affiliateId;
  const response = await axios.post(
    `${BaseUrl}student/forgot-password-verify`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.data;
}

export async function StudentForgotPasswordUpdate(data) {
  const affiliateId = Cookies.get("company-id");
  data.affiliateId = affiliateId;
  const response = await axios.post(
    `${BaseUrl}student/forgot-password-update`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.data;
}
/*************************************** Student Forgot Password End *********/

/************************************** Student two factor toggle start *********************/
export async function StudentTwoFactorToggleService(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.put(
    `${BaseUrl}student/two-factor-toggle`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.data;
}

/************************************** Student two factor toggle End  *********************/

/************************************** Student log history toggle start *********************/
export async function StudentLogHistoryToggleService(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.put(
    `${BaseUrl}student/log-history-toggle`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.data;
}

export async function StudentLoginLogHistory(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(
    `${BaseUrl}student/login-log`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: data.limit ?? 10,
        page: data.page ?? 1
      }
    }
  );
  return await response.data;
}

/************************************** Student two factor toggle End  *********************/

/************************************** Student password update start *********************/
export async function StudentPasswordUpdateService(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.put(`${BaseUrl}student/password-update`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.data;
}

/************************************** Student password update End  *********************/

/************************************** Student profile data *********************/
export async function StudentProfileService() {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(`${BaseUrl}student/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.data;
}

export async function StudentProfileUpdateService(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.put(`${BaseUrl}student/profile-upload`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.data;
}

export async function StudentProfileImageRemoveService() {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.delete(`${BaseUrl}student/profile-image`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.data;
}

export async function StudentUpdateSocialProfileService(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.put(`${BaseUrl}student/social-accounts`,
    data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.data;
}

/************************************ Student Course Purchase Master *******************/
export async function GetSudentCartService() {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(`${BaseUrl}student/cart`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.data;
}

export async function CourseAddToCartService(id) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.put(
    `${BaseUrl}student/cart/${id}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.data;
}

export async function DeleteCourseFromCartService(id) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.delete(`${BaseUrl}student/cart/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.data;
}

export async function CreateOrderPhonepeService(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.post(
    `${BaseUrl}student/create-order-phonepe`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.data;
}

export async function VerifyOrderPhonepeService(id) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.post(
    `${BaseUrl}student/verify-order-phonepe/${id}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.data;
}

export async function GetOrderList(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(
    `${BaseUrl}student/order-history`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        "page": data.page ?? 1,
        "limit": data.limit ?? 8
      }
    }
  );
  return await response.data;
}

export async function GenerateInvoiceOrder(id) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(
    `${BaseUrl}student/generate-invoice/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.data;
}

/*********************************** Country - state - city List  ***************************/
export async function GetCountryList() {
  const response = await axios.get(`${BaseUrl}admin/country`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.data;
}

export async function GetStateList(id) {
  const response = await axios.get(`${BaseUrl}admin/state/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.data;
}

export async function GetCityList(id) {
  const response = await axios.get(`${BaseUrl}admin/city/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.data;
}

/********************************* Student enrolled Course List **************/
export async function GetStudentEnrolledCourseList(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(`${BaseUrl}student/enrolled-courses`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      limit: data.limit,
      page: data.page
    }
  });
  return await response.data;
}

export async function GetStudentEnrolledCourseDetailsByCode(code) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(`${BaseUrl}student/enrolled-course/${code}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.data;
}

/************************************ Quiz Master ************************/
export async function GetQuizData(lessonId) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(`${BaseUrl}student/quiz/${lessonId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.data;
}

export async function QuizStartService(lessonId) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(`${BaseUrl}student/quiz-start/${lessonId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.data;
}
export async function QuizSubmitService(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.post(`${BaseUrl}student/quiz-submit`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  return await response.data;
}

export async function GetAllQuizAttempts(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(`${BaseUrl}student/quiz-attempt-list`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: data.page ?? 1,
        limit: data.limit ?? 8,
        type: data.type ?? 'QUIZ'
      }
    });
  return await response.data;
}


/************************************ Student Course Completion ************************/

export async function GetCourseCompletePercentage(courseCode) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(`${BaseUrl}student/lesson-complete-percentage/${courseCode}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  return await response.data;
}

export async function GetCompletedLessons(courseCode) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(`${BaseUrl}student/lesson-complete/${courseCode}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  return await response.data;
}

export async function ToggleCompletedLesson(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.put(`${BaseUrl}student/lesson-complete/${data.lessonId}/${data.chapterIndex}/${data.lessonIndex}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  return await response.data;
}

/************************************************* Course Review ***********************/
export async function GeAllReviewListByCourseCode(courseCode) {
  const response = await axios.get(`${BaseUrl}student/review-list/${courseCode}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    });
  return await response.data;
}

export async function GetParticularStudentReviewByCourseCode(courseCode) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(`${BaseUrl}student/review/${courseCode}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  return await response.data;
}

export async function AddUpdateCourseReview(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.post(`${BaseUrl}student/review`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  return await response.data;
}

export async function GetStudentReviewList(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(`${BaseUrl}student/student-review-list`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: data.limit ?? 9,
        page: data.page ?? 1
      }
    });
  return await response.data;
}

export async function AddVideoTestimonialService(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.post(`${BaseUrl}student/video-review`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  return await response.data;
}


/************************************ Certificate Services ***********************************/
export async function GetCertificateStatusService(courseCode) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(`${BaseUrl}student/generate-certificate/${courseCode}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  return await response.data;
}

export async function GetCertificateByCertificateIdService(cid) {
  const response = await axios.get(`${BaseUrl}student/certificate/${cid}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    });
  return await response.data;
}

export async function GetCertificateListByStudent(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(`${BaseUrl}student/student-certificate`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: data?.page ?? 1,
        limit: data?.limit ?? 8
      }
    });
  return await response.data;
}

/************************ Wishlist ********************/

export async function AddToWishlist(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.post(`${BaseUrl}student/wishlist`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  return await response.data;
}

export async function GetWishlistIdsList() {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(`${BaseUrl}student/wishlist-ids`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  return await response.data;
}

export async function RemoveFromWishlist(id) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.delete(`${BaseUrl}student/wishlist/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  return await response.data;
}

export async function GetWishlistData(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(`${BaseUrl}student/wishlist`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: data.limit ?? 9,
        page: data.page ?? 1
      }
    });
  return await response.data;
}

export async function MoveWishlistToCart(id) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.put(`${BaseUrl}student/wishlist/${id}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  return await response.data;
}

/****************************** Student Support **********************/
export async function GetStudentSupportTicketList(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(`${BaseUrl}student/support`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: data.limit ?? 10,
        page: data?.page ?? 1,
        status: data?.status
      }
    });
  return await response.data;
}

// export async function PostStudentSupportTicket(id, data) {
//   const token = Cookies.get(AuthType + "-accessToken");
//   const response = await axios.post(`${BaseUrl}student/support/${id}`,
//     data,
//     {headers: {
//       "Content-Type": "multipart/form-data",
//       Authorization: `Bearer ${token}`,
//     }
//   });
//   return await response.data;
// }

export async function PostStudentSupportTicket(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.post(`${BaseUrl}student/support`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    });
  return await response.data;
}

export async function PostStudentSupportTicketReply(id, data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.post(`${BaseUrl}student/support/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    });
  return await response.data;
}

export async function GetStudentChatReplies(id, data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(`${BaseUrl}student/support/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: data?.data,
        page: data?.page
      }
    });
  return await response.data;
}

export async function GetStudentNextChatReplies(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(`${BaseUrl}student/support-next/${data.id}/${data.lId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
  return await response.data;
}

export async function CloseSupportTicket(id) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.delete(`${BaseUrl}student/support/${id}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    });
  return await response.data;
}

/**************************************** Student Notification ***************************/
export async function GetNotificationList(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(`${BaseUrl}student/notification-list`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: data?.limit ?? 8,
        page: data?.page ?? 1,
        type: data?.type ?? 'ALL'
      }
    });
  return await response.data;
}

export async function ToggleNotificationStatus(id) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.delete(`${BaseUrl}student/notification/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  return await response.data;
}

export async function ReadAllNotifications() {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.delete(`${BaseUrl}student/notification`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  return await response.data;
}

/***************************************** Student Mock Services *************************/

export async function CheckMockTestPurchased(slug) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(`${BaseUrl}student/is-mock-purchased/${slug}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  return await response.data;
}

export async function CreateMockOrderPhonepe(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.post(
    `${BaseUrl}student/create-mock-order-phonepe`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.data;
}

export async function VerifyMockOrderPhonepeService(id) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(
    `${BaseUrl}student/verify-mock-order-phonepe/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.data;
}

export async function GetMockQuestions(id) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(
    `${BaseUrl}student/get-mock-questions/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.data;
}

export async function StartMockTestService(id) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(
    `${BaseUrl}student/start-mock-questions/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.data;
}

export async function SubmitMockTestService(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.post(
    `${BaseUrl}student/submit-mock-test/`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.data;
}

export async function StudentMockTestRegistrationList(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(
    `${BaseUrl}student/mock-registration-history`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: data.limit,
        page: data.page
      }
    }
  );
  return await response.data;
}

export async function MockTestLeaderboard(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(
    `${BaseUrl}student/mock-leaderboard/${data?.slug}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.data;
}


export async function MockAttemptLogServices(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.post(
    `${BaseUrl}student/mock-attempt-log`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.data;
}

export async function GenerateMockCertificate(id) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(
    `${BaseUrl}student/mock-qualify-certificate/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.data;
}


/************************************ Student Dashboard ************************/
export async function StudentDashboardService(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(
    `${BaseUrl}student/student-dashboard`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        type: data.type,
        fromDate: data?.fromDate,
        toDate: data?.toDate
      }
    }
  );
  return await response.data;
}

/************************************** Student Popup Check  ********************************************/
export async function StudentPopupCheckService() {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(
    `${BaseUrl}student/student-popup-campaign`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }
  );
  return await response.data;
}

/************************************** Student Demo session request ****************/
export async function CreateDemoSessionRequestService(data) {
  const affiliateId = Cookies.get("company-id");
  data.affiliateId = affiliateId;
  const response = await axios.post(
    `${BaseUrl}user/demo-session-enquiry`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      }
    }
  );
  return await response.data;
}

/************************************** Student Streak Services ****************/
export async function AddStudentLoggedInStreak() {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(
    `${BaseUrl}student/student-streak-logged-in`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }
  );
  return await response.data;
}

export async function StudenStreakDataService(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(
    `${BaseUrl}student/student-streak-data`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        year: data?.year
      }
    }
  );
  return await response.data;
}

/**************************** Student Review *****************************/
export async function AddVideoReviewService(data, callback) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.post(
    `${BaseUrl}student/video-review`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        callback(progress);
      },
    }
  );
  return await response.data;
}

/********************************** Student Coins Services ********************/
export async function StudentCoinsBalanceService() {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(
    `${BaseUrl}student/get-coins-bal`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }
  );
  return await response.data;
}

export async function CourseCompletionCoinsTransferService(id) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(
    `${BaseUrl}student/course-completion-coins/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }
  );
  return await response.data;
}

export async function CoinsTxnListService(data) {
  const token = Cookies.get(AuthType + "-accessToken");
  const response = await axios.get(
    `${BaseUrl}student/coin-txn-list`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: data?.limit ?? 10,
        page: data?.page ?? 1
      }
    }
  );
  return await response.data;
}

export async function GetVideoReviewList() {
  const companyString = Cookies.get("company-info")
  const companyData = JSON.parse(base64.decode(companyString));
  const response = await axios.get(
    `${BaseUrl}student/featured-video-review-list/${companyData?.affiliate_id}`,
    {
      headers: {
        "Content-Type": "application/json",
      }
    }
  );
  return await response.data;
}