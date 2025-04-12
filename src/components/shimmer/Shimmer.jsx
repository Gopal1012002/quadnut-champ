import React from "react";

const Shimmer = () => {
  return <div>Shimmer</div>;
};

const CourseBlockShimmer = () => {
  return (
    <>
      <div className="course-block-long">
        <div className="course-block-long-left shine"></div>
        <div className="course-block-long-right">
          <div className="course-block-long-right-top shine"></div>
          <div className="course-block-long-right-medium shine"></div>
          <div className="course-block-long-right-bottom shine"></div>
        </div>
      </div>
    </>
  );
};


const CourseSmallBoxShimmer = () => {
  return (<>
    <div className="row">
      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
        <div className="shine course-feature-box-shimmer mx-auto"></div>
      </div>
      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
        <div className="shine course-feature-box-shimmer mx-auto"></div>
      </div>
      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
        <div className="shine course-feature-box-shimmer mx-auto"></div>
      </div>
      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
        <div className="shine course-feature-box-shimmer mx-auto"></div>
      </div>
      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
        <div className="shine course-feature-box-shimmer mx-auto"></div>
      </div>
      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
        <div className="shine course-feature-box-shimmer mx-auto"></div>
      </div>
    </div>
  </>)
}

const NotificationShimmer = () => {
  return (
      <div className="row">
        <div className="col-md-12">
          <div className="notification-block-long shine my-2"></div>
          <div className="notification-block-long shine my-2"></div>
          <div className="notification-block-long shine my-2"></div>
          <div className="notification-block-long shine my-2"></div>
          <div className="notification-block-long shine my-2"></div>
        </div>
      </div>
  );
}

export { Shimmer, CourseBlockShimmer, CourseSmallBoxShimmer, NotificationShimmer };
