import axios from "axios";
// import Cookies from 'js-cookie'
import conf from '../conf/conf.js'
import Cookies from 'js-cookie'
import base64 from "react-native-base64";
import { useState } from "react";
import { setFavicon } from "../utils/dynamic.util.js";


const BaseUrl = conf.apiBaseUrl;


export async function getAppConfig(domain) {
    // const response = await axios.get(`${BaseUrl}user/front/config/${'www.startupify.co.in'}`,
    const response = await axios.get(`${BaseUrl}user/front/config/${'www.champ.quadnut.org'}`,
      // const response = await axios.get(`${BaseUrl}user/front/config/${domain}`,
  //  const response = await axios.get(`${BaseUrl}user/front/config/${'www.getyourlms.com'}`,
        {
            headers: {
                "Content-Type": "application/json"
            },
        }
    );
    return await response.data; 
}

export function useAuthCompany() {
    const getCompany = () => {
      const companyString = Cookies.get("company-info");
      let company_detail = "";
      if (companyString) {
        company_detail = JSON.parse(base64.decode(companyString));
      }
      return company_detail;
    };
  
    const [company, setCompany] = useState(getCompany());
  
    const saveCompanyData = (companyData) => {
      Cookies.set("company-info", base64.encode(JSON.stringify(companyData)), { expires: 1 });
      Cookies.set("company-id", companyData.affiliate_id, { expires: 1 });
      setFavicon(`${conf.apiAssetUrl}/${companyData.frontFolder}/favicon/${companyData.favicon}`)
      setCompany(companyData);
    };
  
    return {
      setCompanyData: saveCompanyData,
      companyData: company,
    };
  }


/**************************************** Front Page details ************************/
export async function GetFrontDynamicDetails() {
  const companyString = Cookies.get("company-info")
  const companyData = JSON.parse(base64.decode(companyString));
  const response = await axios.get(`${BaseUrl}user/front/dynamic-details/${companyData?.affiliate_id}`,
      {
          headers: {
              "Content-Type": "application/json"
          },
      }
  );
  return await response.data;
}

/**************************************** Course Services ****************************/
export async function CourseSearchService(textString) {
  const companyString = Cookies.get("company-info")
  const companyData = JSON.parse(base64.decode(companyString));
  const response = await axios.get(`${BaseUrl}user/front/search-courses/${companyData?.affiliate_id}/${textString}`,
      {
          headers: {
              "Content-Type": "application/json"
          },
      }
  );
  return await response.data;
}

export async function GetFeaturedCourses(id) {
  const companyString = Cookies.get("company-info")
  const companyData = JSON.parse(base64.decode(companyString));
  const response = await axios.get(`${BaseUrl}user/front/featured-course/${companyData?.affiliate_id}`,
      {
          headers: {
              "Content-Type": "application/json"
          },
          params:{
            studentCode:id ?? -1
          }
      }
  );
  return await response.data;
}

export async function GetFeaturedReviews() {
  const companyString = Cookies.get("company-info")
  const companyData = JSON.parse(base64.decode(companyString));
  const response = await axios.get(`${BaseUrl}student/featured-review-list/${companyData?.affiliate_id}`,
      {
          headers: {
              "Content-Type": "application/json"
          },
      }
  );
  return await response.data;
}

export async function GetFeaturedReviewByCourse(id) {
  const companyString = Cookies.get("company-info")
  const companyData = JSON.parse(base64.decode(companyString));
  const response = await axios.get(`${BaseUrl}student/featured-review-course/${id}`,
      {
          headers: {
              "Content-Type": "application/json"
          },
      }
  );
  return await response.data;
}

export async function GetTrendingCourses(id) {
  const companyString = Cookies.get("company-info")
  const companyData = JSON.parse(base64.decode(companyString));
  const response = await axios.get(`${BaseUrl}user/front/trending-course/${companyData?.affiliate_id}?studentCode=${id ?? -1}`,
      {
          headers: {
              "Content-Type": "application/json"
          },
      }
  );
  return await response.data;
}

export async function GetCourseList(data) {
  const companyString = Cookies.get("company-info")
  const companyData = JSON.parse(base64.decode(companyString));
  const response = await axios.get(`${BaseUrl}user/front/courses/${companyData?.affiliate_id}`,
      {
          headers: {
              "Content-Type": "application/json"
          },
          params:{
            page:data.page,
            instructorArray:data.instructorArray,
            categoryArray: data.categoryArray,
            keyword: data.keyword,
            sort: data.sort,
            price: data.price,
            limit: data.limit,
            studentCode: data.studentCode
          }
      }
  );
  return await response.data;
}

export async function GetCourseDetailsById(id, studentCode) {
  const companyString = Cookies.get("company-info")
  const companyData = JSON.parse(base64.decode(companyString));
  const response = await axios.get(`${BaseUrl}user/front/course-details/${companyData?.affiliate_id}/${id}`,
      {
          headers: {
              "Content-Type": "application/json"
          },
          params:{
            studentCode:studentCode ?? -1
          }
      }
  );
  return await response.data;
}


export async function GetCourseDetailsByCourseId(id) {
  const response = await axios.get(`${BaseUrl}user/front/course-details-id/${id}`,
      {
          headers: {
              "Content-Type": "application/json"
          },
      }
  );
  return await response.data;
}

/************************************ Sub Category list *******************************/
export async function GetSubCategoryList() {
  const companyString = Cookies.get("company-info")
  const companyData = JSON.parse(base64?.decode(companyString));
  const response = await axios.get(`${BaseUrl}user/front/sub-category/${companyData?.affiliate_id}`,
      {
          headers: {
              "Content-Type": "application/json"
          },
      }
  );
  return await response.data;
}

export async function GetCategoryHierarchy() {
  const companyString = Cookies.get("company-info")
  const companyData = JSON.parse(base64.decode(companyString));
  const response = await axios.get(`${BaseUrl}user/front/category-hierarchy/${companyData?.affiliate_id}`,
      {
          headers: {
              "Content-Type": "application/json"
          },
      }
  );
  return await response.data;
}

export async function GetSegmentHierarchy() {
  const companyString = Cookies.get("company-info")
  const companyData = JSON.parse(base64.decode(companyString));
  const response = await axios.get(`${BaseUrl}user/front/segment-hierarchy/${companyData?.affiliate_id}`,
      {
          headers: {
              "Content-Type": "application/json"
          },
      }
  );
  return await response.data;
}


/************************************** Instructor MASTER FRONT *********************/
export async function GetFeaturedInstructors() {
  const companyString = Cookies.get("company-info")
  const companyData = JSON.parse(base64.decode(companyString));
  const response = await axios.get(`${BaseUrl}user/front/featured-instructors/${companyData?.affiliate_id}`,
      {
          headers: {
              "Content-Type": "application/json"
          },
      }
  );
  return await response.data;
}

export async function GetInstructorDetails(id) {
  const companyString = Cookies.get("company-info")
  const companyData = JSON.parse(base64.decode(companyString));
  const response = await axios.get(`${BaseUrl}user/front/instructor-details/${id}/${companyData?.affiliate_id}`,
      {
          headers: {
              "Content-Type": "application/json"
          },
      }
  );
  return await response.data;
}

export async function GetInstructorCourseList(data) {
  const companyString = Cookies.get("company-info")
  const companyData = JSON.parse(base64.decode(companyString));
  const response = await axios.get(`${BaseUrl}user/front/instructor-courses/${companyData?.affiliate_id}/${data?.id}`,
      {
          headers: {
              "Content-Type": "application/json"
          },
          params:{
            page:data.page
          }
      }
  );
  return await response.data;
}

/************************************** Mock test controllers ********************/
export async function GetMockTestDetails(slug) {
  const companyString = Cookies.get("company-info")
  const companyData = JSON.parse(base64.decode(companyString));
  const studentString = Cookies.get("student-info");
  let studentCode = "null"
  if(studentString){
    const studentData = JSON.parse(base64.decode(studentString));
    studentCode = studentData?.studentCode
  }
  const response = await axios.get(`${BaseUrl}student/get-mock-details/${companyData?.affiliate_id}/${studentCode}/${slug}`,
      {
          headers: {
              "Content-Type": "application/json"
          },
      }
  );
  return await response.data;
}


/**************************************** Static Pages Services ******************************/
export async function GetPrivacyPolicy() {
  const companyString = Cookies.get("company-info")
  const companyData = JSON.parse(base64.decode(companyString));
  const response = await axios.get(`${BaseUrl}user/front/privacy-policy/${companyData?.affiliate_id}`,
      {
          headers: {
              "Content-Type": "application/json"
          }
      }
  );
  return await response.data;
}

export async function GetTnCPage() {
  const companyString = Cookies.get("company-info")
  const companyData = JSON.parse(base64.decode(companyString));
  const response = await axios.get(`${BaseUrl}user/front/terms-conditions/${companyData?.affiliate_id}`,
      {
          headers: {
              "Content-Type": "application/json"
          }
      }
  );
  return await response.data;
}