import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import DecorationImg from "../../../assets/img/landing-page/shape.png";
import HeroImg from "../../../assets/img/landing-page/sucess-stoories.png";
import Shape1 from "../../../assets/img/landing-page/sucess-shap1.png";
import Shape2 from "../../../assets/img/landing-page/ss-shape2.png";
import TestimonialVideoCard from "./TestimonialvideoCard";
import { GetVideoReviewList } from "../../../services/StudentServices";
import Head from "../../../layouts/main-layout/head/Head";

function SucessStories() {
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    setLoading(true);
    GetVideoReviewList().then((res) => {

    }).catch((err) => {

    }).finally(() => {
      setLoading(false)
    })
  }, [])

  // Testimonials data array
  const testimonialsData = [
    {
      videoSrc: "https://startupify.co.in:5300/storage/Star1/content/video-1744360601853-535817522.mp4",
      imageSrc: "https://img.freepik.com/free-photo/front-view-sign-language-concept_23-2148572467.jpg?uid=R179690245&ga=GA1.1.1210744585.1744884787&semt=ais_hybrid&w=740",
      name: "Anjali",
      description: "From BCA Student to Data Analyst at a FinTech Startup",
    },
    {
      videoSrc: "https://videocdn.cdnpk.net/videos/3f05b82c-b98f-41d9-8f67-52e54520eb2a/horizontal/previews/watermarked/small.mp4",
      imageSrc: "https://img.freepik.com/free-photo/pleased-friendly-handsome-caucasian-man-casual-outfit-showing-thumbs-up-as-rate-something-good-smiling-nod-agreement-give-positive-feedback-thinking-something-is-excellent_176420-37057.jpg?uid=R179690245&ga=GA1.1.1210744585.1744884787&semt=ais_hybrid&w=740",
      name: "Abhinav Sinha",
      description: "Freelance Web Developer",
    },
    {
      videoSrc: "https://startupify.co.in:5300/storage/Star1/content/video-1744360601853-535817522.mp4",
      imageSrc: "https://img.freepik.com/free-photo/proud-you-did-great-portrait-happy-impressed-attractive-supportive-armenian-girl-wearing-orange-tshirt-show-thumbsup-approval-agree-gesture-liking-awesome-prom-outfit-friend-bought-smiling_176420-56070.jpg?uid=R179690245&ga=GA1.1.1210744585.1744884787&semt=ais_hybrid&w=740",
      name: "Simran",
      description: "Careers into UI/UX with Confidence",
    },
    {
      videoSrc: "https://startupify.co.in:5300/storage/Star1/content/video-1744360601853-535817522.mp4",
      imageSrc: "https://img.freepik.com/free-photo/smiling-man-with-thumbs-up_1187-5818.jpg?uid=R179690245&ga=GA1.1.1210744585.1744884787&semt=ais_hybrid&w=740",
      name: "Ayush Dubey",
      description: "Digital Marketer",
    },
  ];

  const [playingIndex, setPlayingIndex] = useState(null);

  const handleTogglePlay = (index) => {
    setPlayingIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <Head title="Success Stories" />
      <section>
        <div className="container-fluid px-0">
          <div className="sucess-bg pb-3">
            <div className="row">
              <div className="col-lg-7 d-flex flex-column">
                <div className="py-1 px-2 ss-tittle rounded-1">
                  <p className="mb-0 text-white">Where Ambition Meets Achievement</p>
                </div>
                <div className="mt-md-3 fw-bold tr-hero-heading">
                  <h1>From Learners to Leaders – Real Stories from Real Achievers</h1>
                </div>
                <div>
                  <p>
                    At QuadNut, our success lies in your journey. From high-school achievers cracking national exams to
                    graduates launching successful tech careers, our learners are proof that passion, training, and
                    guidance can transform lives
                  </p>
                  <p>
                    We proudly present some of our most inspiring success stories from the QuadNut Champs and QuadNut
                    Professional programs
                  </p>
                </div>
              </div>
              <div className="col-lg-5  d-flex justify-content-center">
                <div className="tr-hero-box">
                  <div className="tr-hero-shape-box hero-shape1 up-down">
                    <img src={Shape1} alt="shape-icon" className="img-fluid" style={{ width: "130px" }} />
                  </div>
                  <div className="tr-hero-shape-box ss-shape2 zoom-out">
                    <img src={Shape2} alt="shape-icon" className="img-fluid" />
                  </div>
                  <img src={HeroImg} alt="image" className="img-fluid" style={{ width: "500px" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container py-5">
          <div className="row align-items-center">
            {/* Heading Title */}
            <div className="col-xl-12 text-center d-flex justify-content-center align-items-center flex-column">
              <div className="tittle-box">
                <div className="deco-img d-none d-md-block">
                  <img src={DecorationImg} alt="icon" />
                </div>
                <h1 className="mb-2 fw-bold">Featured Success Stories</h1>
              </div>
              <p>How QuadNut learners achieved their goals</p>
            </div>
            {/* Heading Title End */}
          </div>

          <div className="row g-4 mt-1">
            {testimonialsData.map((testimonial, index) => (
              <div className="col-lg-3 col-md-6" key={index}>
                <TestimonialVideoCard
                  index={index}
                  isPlaying={playingIndex === index}
                  onTogglePlay={handleTogglePlay}
                  videoSrc={testimonial.videoSrc}
                  imageSrc={testimonial.imageSrc}
                  name={testimonial.name}
                  description={testimonial.description}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default SucessStories;
