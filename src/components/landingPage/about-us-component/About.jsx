import nextImg from "../../../assets/img/landing-page/next.png";
import officeView1 from "../../../assets/img/landing-page/office-view-1.jpg";
import officeView2 from "../../../assets/img/landing-page/office-view-2.jpg";
import bannerImg from "../../../assets/img/landing-page/banner-shap-2.png";
import Head from "../../../layouts/main-layout/head/Head";

function About() {
  return (
    <>
      <Head title="About Us" />
      <section className="about-bg">
        <div className="container about-section px-3 px-md-0 ">
          <div className="row align-items-center">
            <div className="col-lg-6 py-5 p-sm-5">
              <h1>About Quadnut</h1>
              <p className="mt-4 para-align-justify ">
                QUADNUT, powered by Multiventrix Global Pvt. Ltd., is a forward-thinking skill development and training organization committed to empowering the next generation of professionals. We specialize in offering cutting-edge training programs that are designed to meet the evolving demands of industries worldwide. Our mission is to bridge the gap between traditional education and practical, job-ready skills by providing a platform where learners can unlock their true potential.
              </p>
              <p className="mt-2 para-align-justify">
                With a focus on fostering innovation, enhancing employability, and nurturing entrepreneurial spirit, we have curated a comprehensive range of training programs for students from both IT and Non-IT backgrounds. Our unique blend of expert guidance, industry-relevant curriculum, and hands-on training ensures that participants are not just prepared for the job market but also equipped to thrive in dynamic professional environments.
              </p>
              <a
                className="btn btn-box text-white border-0   mt-3 fs-18"
                href="#"
                role="button"
              >
                Request A Quote
                <img src={nextImg} className="img-fluid btn-img ms-1" />
              </a>
            </div>
            <div className="col-lg-6 py-5 p-md-5 d-flex justify-content-center align-item-center">
              <div className="container about-img  px-0  img-position">
                <img
                  src={officeView1}
                  alt="Boardroom"
                  className="img-fluid  w-75 img1"
                />
                <img
                  src={officeView2}
                  alt="Team meeting"
                  className="img-fluid img2-position"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
