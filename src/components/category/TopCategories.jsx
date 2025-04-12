import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import AOS from "aos";
import "aos/dist/aos.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { GetSubCategoryList, useAuthCompany } from "../../services/AppServices";
import conf from "../../conf/conf";
import { Link, useNavigate } from "react-router-dom";

const TopCategories = () => {
  const navigate = useNavigate()
  const { companyData } = useAuthCompany();
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [urlPrefix, setUrlPrefix] = useState("");

  useEffect(() => {
    if (companyData) {
      setUrlPrefix(`${conf.apiAssetUrl}/${companyData?.frontFolder}/thumbnail`);
      setLoading(true);
      GetSubCategoryList()
        .then((res) => setSubCategoryList(res?.data))
        .finally(() => setLoading(false));
    }
  }, [companyData]);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <section className="section how-it-works">
        <div className="container">
          <div className="section-header aos" data-aos="fade-up">
            <div className="section-sub-head">
              <span>Favourite Course</span>
              <h2>Top Category</h2>
            </div>
            <div className="all-btn all-category d-flex align-items-center">
              <Link to="/category-list" className="btn btn-primary">
                All Categories
              </Link>
            </div>
          </div>
          <div className="section-text aos" data-aos="fade-up">
            <p>
              Top categories represent the most popular and sought-after areas of interest or services that people frequently explore. These categories are curated based on user preferences, trending topics, or market demands, ensuring a diverse range of options.
            </p>
          </div>
          {
            loading ?
              <div className="course-box-div">
                <div className="course-box-shimmer shine ">

                </div>
                <div className="course-box-shimmer shine  d-none d-sm-block">

                </div>
                <div className="course-box-shimmer shine  d-none d-md-block">

                </div>
                <div className="course-box-shimmer shine d-none d-lg-block">

                </div>
              </div> :
              !loading && (
                <OwlCarousel
                  className="owl-theme mentoring-course"
                  loop
                  margin={10}
                  nav
                  smartSpeed={500}
                  autoplay={true}  // Enable auto-rotation
                  autoplayTimeout={2000}  // Set interval in milliseconds (3 seconds)
                  autoplayHoverPause={true}  // Pause on hover
                  data-aos="fade-up"
                  responsive={{
                    0: { items: 1 },
                    600: { items: 2 },
                    1000: { items: subCategoryList?.length > 4 ? 4 : subCategoryList?.length },
                  }}
                >
                  {subCategoryList?.length > 0 &&
                    subCategoryList?.map((catData, index) => (
                      <div key={index} className="feature-box text-center" style={{ minHeight: "270px" }} >
                        <div className="feature-bg" style={{ minHeight: "270px" }}>
                          <div className="feature-header">
                            <div className="feature-icon">
                              <img
                                src={`${urlPrefix}/${catData?.webImage}`}
                                alt="Img"
                                className="clickable-btn"
                                onClick={() => navigate(`course-list/${catData?.categoryId}`)}
                              />
                            </div>
                            <div className="feature-cont">
                              <Link to={`course-list/${catData?.categoryId}`}>
                                <div className="feature-text">
                                  {catData?.categoryName}
                                </div>
                              </Link>
                            </div>
                          </div>
                          <p>{catData?.instructorCount} Instructors</p>
                        </div>
                      </div>
                    ))}
                </OwlCarousel>
              )
          }
          { }
        </div>
      </section>
    </>
  );
};


export default TopCategories;
