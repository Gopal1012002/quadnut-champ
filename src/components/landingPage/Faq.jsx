import React, { useState, useRef,useEffect } from "react";
import DecorationImg from '../../assets/img/landing-page/shape.png'
import { Accordion } from 'react-bootstrap'

const faqData = [
    {
        question: "What is the difference between Tech and Non-Tech courses at QuadNut?",
        answer:
            "Our Tech courses focus on domains like AI, Cybersecurity, Web Development, and Data Science, involving hands-on coding and project work. Non-Tech courses are designed for areas like Digital Marketing, UI/UX, FinTech, and Content Writing—ideal for learners without a coding background.",
    },
    {
        question: "Who can enroll in these upskilling programs?",
        answer:
            "Anyone! Our programs are open to school graduates, college students, working professionals, and job seekers. You don’t need prior experience—just curiosity and willingness to learn.",
    },
    {
        question: "Are these courses beginner-friendly?",
        answer:
            " Yes, most of our courses are structured to start with basics and gradually move to advanced concepts. We offer foundational modules and provide support throughout your learning journey.",
    },
    {
        question: "What is the duration of these courses?",
        answer:
            "Our training formats include One-Day Seminars, Three-Day Workshops, and Long-Term Training Programs lasting 30–45 days, depending on the course type and learning goals.",
    },
    {
        question: "Will I get a certificate after completing the course?",
        answer:
            "Yes, every participant receives an industry-recognized Certificate of Completion after fulfilling the course requirements and project submissions.",
    },
    {
        question: "Are these programs taught by industry professionals?",
        answer:
            "Absolutely. Our trainers include alumni of IITs, NITs, IIMs, and professionals from top MNCs—ensuring practical insight and relevant industry experience.",
    },
    {
        question: "Do I need to appear for any entrance test to join?",
        answer:
            "No, there's no entrance test. Just choose your course and enroll. Some advanced programs may have a short orientation to guide you better.",
    },
    {
        question: "Will there be hands-on projects and real-time learning?",
        answer:
            "Yes, project-based learning is a key part of our curriculum. Whether it's building a web app or creating a marketing campaign, you'll work on practical assignments throughout.",
    },
    {
        question: "Does QuadNut provide placement assistance?",
        answer:
            "Yes, we offer dedicated placement support including resume building, mock interviews, and employer connections to help you transition smoothly into your career.",
    },
    {
        question: "How can I enroll and start learning?",
        answer:
            "Simply click on the `Explore Courses` button, select your preferred program, and register online. Our team will connect with you for onboarding and support.",
    },
];

function Faq() {
    const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.maxHeight =
          activeIndex === index ? `${ref.scrollHeight}px` : "0px";
      }
    });
  }, [activeIndex]);
    return (
        <>
            <section>

                <div className="container">
                    <div className="row">
                        {/* heading tittle start */}
                        <div className="col-xl-12 text-center d-flex justify-content-center align-items-center flex-column">
                            <div className='tittle-box'>
                                <div className='deco-img d-none d-md-block'>
                                    <img src={DecorationImg} alt="icon" />
                                </div>
                                <h1 className='mb-2 fw-bold'>Frequently Ask Question </h1>
                            </div>
                            <p>Question you might ask about our services.</p>
                        </div>

                        {/* heading tittle end */}
                        <div className="col-xl-12">
                            <section className="ko-faq-section">
                                <div className="ko-container">
                                    <div className="ko-faq-accordion">
                                        {faqData.map((faq, index) => (
                                            <div className="ko-accordion-item" key={index}>
                                                <div
                                                    className={`ko-accordion-item-header ${activeIndex === index ? "active" : ""
                                                        }`}
                                                    onClick={() => toggleAccordion(index)}
                                                >
                                                    {faq.question}
                                                </div>
                                                <div
                                                    className="ko-accordion-item-body"
                                                    style={{
                                                        maxHeight:
                                                            activeIndex === index ? "200px" : "0",
                                                        overflow: "hidden",
                                                        transition: "max-height 0.3s ease",
                                                    }}
                                                >
                                                    <p className="ko-accordion-item-body-content">{faq.answer}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </div>

                    </div>
                </div>

            </section >
        </>
    )
}

export default Faq