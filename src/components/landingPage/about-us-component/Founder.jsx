import bannerImg from "../../../assets/img/landing-page/banner-shap-2.png";
import nextImg from "../../../assets/img/landing-page/next.png";
// import founderImg from "../../../assets/img/landing-page/founder.jpg";
import founderImg from "../../../assets/img/landing-page/profile-photo.jpg";
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";
function Founder() {
  return (
    <>
      <section className="py-5 p-sm-5 ">
        <div className="container">
          <div className="row gy-3">
            <div className="col-lg-5 col-md-12 p-lg-3 d-flex justify-content-center">
              <img
                src={founderImg}
                alt="founder"
                className="img-fluid rounded "
              />
            </div>

            
            <div className="col-md-12 col-lg-7 pt-md-4 ">


              <div className="mt-3">
                <h1> Mr.Avinash Mishra</h1>
                <h5>
                  <span className="color-grey">Founder of QuadNut</span>
                </h5>
              </div>

              <div className="para-align-justify">
                <p className="mb-2">
                  As the founder of QUADNUT, I am incredibly proud of the journey we've embarked on, one that has been shaped by our passion for empowering individuals with the skills and knowledge needed to succeed in an ever-evolving world.
                </p>


                <p className="mb-2">
                  From our meticulously crafted curriculum to our hands-on learning approach, every element of our programs is designed to ensure that our students don’t just learn – they thrive. Whether through a short seminar, an immersive workshop, or an in-depth long-term training program, our goal is to empower individuals at all stages of their career, from young learners to seasoned professionals.
                </p>
                <p className="mb-2">
                  We believe that skill development is the key to unlocking untapped potential, and it is with this philosophy that QUADNUT continues to grow and evolve. With the support of a talented team, a diverse set of offerings, and a growing community of learners, I am confident that we are helping to create a future where skills truly matter.
                </p>
                <p className="fs-18">
                  <FaQuoteLeft color="grey" className="me-1" />
                  Thank you for choosing to be a part of this exciting journey with us. We are committed to your growth, success, and continuous learning.
                  <FaQuoteRight color="grey" className="ms-1" />
                </p>
              </div>


            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Founder;
