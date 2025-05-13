import mission from "../../../assets/img/landing-page/mission.png";
import vision from "../../../assets/img/landing-page/vision.png";

function VisionMission() {
  return (
    <>
      <section className="p-0 p-sm-5 bg-gradient3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-6 p-4 d-flex justify-content-center align-items-center">
              <h2>
                Where creativity meets technology — building the future of learning, one experience at a time.
              </h2>
            </div>
            <div className="col-md-12 col-lg-6 p-4 para-align-justify">
              <p className="mb-1">
                At Quatdunt, we believe that education should be accessible, engaging, and effective. As a forward-thinking team of developers, designers, and educators, we’ve dedicated ourselves to creating powerful learning management systems that redefine how knowledge is shared and consumed. Our platform is built with modern learners and educators in mind—intuitive, customizable, and packed with features that enhance every stage of the learning journey. Whether it's online courses, assessments, or progress tracking, Quatdunt ensures a seamless and impactful experience.
              </p>

            </div>
            <div className="col-md-12 col-lg-6 p-4">
              <img
                src={vision}
                alt="img"
                className="img-fluid mission-vision-img"
              />
              <h1 className="mt-3">Our Vision</h1>
              <div className="para-align-justify">
                <p className="mb-2">
                  At <b>QuadNut</b>, our <b>Vision</b> is to be a <b>Global Leader</b> in <b>Skill Development and Professional Training</b>, empowering individuals with <b>Industry-Driven Expertise</b> to excel in their careers. We are committed to delivering High-Quality Education and Training Programs that bridge the gap between Academic Knowledge and Real-World Applications.
                </p>
                <p className="mb-2">
                  Our focus extends to College-Level Courses and Specialized Training Programs, catering to both Technical and Non-Technical Backgrounds. We aim to equip students and professionals with Cutting-Edge Skills in areas such as Information Technology (IT), Business Management, Digital Skills, and Emerging Technologies.
                </p>
                <p className="mb-2">
                At the School Level, we emphasize STEM (Science, Technology, Engineering, and Mathematics) Education, fostering Innovation, Problem-Solving, and Analytical Thinking from an early stage. Through STEM-Focused Learning, we inspire young minds to explore Technology and Science-Driven Career Paths, laying a strong foundation for Future Success.
                </p>
              </div>

            </div>
            <div className="col-md-12 col-lg-6 p-4">
              <img
                src={mission}
                alt="img"
                className="img-fluid mission-vision-img"
              />
              <h1 className="mt-3">Our Mission</h1>
              <div className="para-align-justify">
                <p className="mb-2">
                  Our Mission is to Empower Individuals by providing Industry-Relevant, Skill-Based Education that leads to Transformative Career Opportunities, Professional Growth, and Long-Term Success. By collaborating with Industry Experts, Academic Institutions, and Corporate Leaders, we ensure that our learners gain Practical Exposure, Hands-On Experience, and a Competitive Edge in today’s rapidly evolving Job Market.
                </p>
                <p className="mb-2">
                  At <b>QuadNut</b>, we don’t just Educate—we Innovate, Inspire, and Transform Careers, making learners Confident, Capable, and Future-Rea
                </p>

              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default VisionMission;
