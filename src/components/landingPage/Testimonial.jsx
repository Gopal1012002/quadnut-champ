import user16 from "../../assets/img/user/user16.jpg";
import DecorationImg from '../../assets/img/landing-page/shape.png'
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import '../../assets/css/TestimonialSection.css'
import OwlCarousel from "react-owl-carousel";
import AOS from "aos";
import "aos/dist/aos.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const testimonials = [
    {
        id: 1,
        name: "John Doe",
        text: "Full-Stack Developer",
        data: "The React course was fantastic! The instructor explained everything clearly, and the hands-on projects helped me land my first frontend developer job. The real-world examples made it easy to grasp advanced concepts like state management and hooks. I highly recommend this course to anyone looking to start a career in frontend development."
    },
    {
        id: 2,
        name: "Jane Smith",
        text: "Backend Engineer",
        data: "I loved the Node.js course! The modules were well-structured, and now I can build scalable APIs with Express and MongoDB confidently. The real-world projects helped me understand RESTful API development better, and I even implemented authentication and authorization on my own. A must-learn course for backend enthusiasts!"
    },
    {
        id: 3,
        name: "Mike Johnson",
        text: "HR Professional",
        data: "The HR Analytics course provided deep insights into employee engagement and retention strategies. It has helped me make better data-driven decisions at work. The instructor broke down complex analytics into simple concepts, and the case studies provided excellent industry insights. Now, I can confidently analyze workforce trends using data."
    },
    {
        id: 4,
        name: "Emily Davis",
        text: "Cybersecurity Enthusiast",
        data: "The Ethical Hacking course was an eye-opener! I learned how to secure systems and protect sensitive data from cyber threats. The practical labs were invaluable, giving me real hands-on experience in penetration testing and vulnerability assessment. This course is perfect for anyone looking to get into cybersecurity."
    },
    {
        id: 5,
        name: "Robert Brown",
        text: "Laravel Developer",
        data: "This Laravel course made backend development so much easier. The practical projects and real-world scenarios were incredibly useful. Learning about MVC architecture, authentication, and database migrations helped me become a more efficient developer. Now, I feel confident building complex web applications from scratch!"
    },
    {
        id: 6,
        name: "Sarah Wilson",
        text: "Civil Services Aspirant",
        data: "The General Studies and Current Affairs course was a game-changer for my UPSC preparation. The structured approach helped me improve my scores significantly! The well-researched material covered everything in-depth, and the regular quizzes ensured I retained the information effectively. Highly recommended for serious aspirants!"
    },
    {
        id: 7,
        name: "David White",
        text: "Data Scientist",
        data: "The Python for Data Science course gave me a strong foundation in machine learning. The hands-on assignments were challenging but rewarding. I learned data cleaning, visualization, and model building using pandas and scikit-learn. The final capstone project really helped me apply all my learning in a real-world scenario!"
    },
    {
        id: 8,
        name: "Laura Green",
        text: "Marketing Specialist",
        data: "The Digital Marketing Masterclass taught me the latest trends in SEO, content marketing, and PPC ads. My campaigns now perform way better! The case studies and campaign optimization techniques gave me the confidence to handle large-scale marketing projects effectively. This course is a must for aspiring marketers!"
    },
    {
        id: 9,
        name: "James Black",
        text: "AI Engineer",
        data: "The Deep Learning course helped me understand neural networks and implement AI models. I even built my own chatbot using TensorFlow! Learning about CNNs and RNNs expanded my knowledge in AI, and the hands-on coding assignments were very insightful. This course has truly been a stepping stone for my career in AI!"
    }
];


const TestimonialCard = ({ item, height }) => {
    const [tiltStyle, setTiltStyle] = useState({});

    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();

        const x = ((clientX - left) / width - 0.5) * 10; // Tilt range (-10 to 10)
        const y = ((clientY - top) / height - 0.5) * -10; // Tilt range (-10 to 10)

        setTiltStyle({ transform: `rotateX(${y}deg) rotateY(${x}deg)` });
    };

    const handleMouseLeave = () => {
        setTiltStyle({ transform: "rotateX(0deg) rotateY(0deg)", transition: "transform 0.6s ease-out" });
    };
    return (
        <div key={item.id} className="col-xl-12 pt-md-2 px-0">
            <div
                className={`card w-100 testimonial-card p-4 mx-0 ${height && "height-maintain"}`}
                style={tiltStyle}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div className="row gy-3">
                    <div className="col-xl-12">
                        {/* Profile Start */}
                        <div className="d-flex gap-3 align-items-center">
                            <div className="testimonial-profile-box p-2">
                                <img src={user16} alt="img" className="img-fluid" />
                            </div>
                            <div>
                                <p className="mb-0 fs-15 fw-bold">{item.name}</p>
                                <p className="fs-14 mb-0">{item.text}</p>
                            </div>
                        </div>
                        {/* Profile End */}
                    </div>
                    <div className="col-xl-12">
                        <p className="mb-0 fs-14 para-align-justify">{item.data}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}



const TestimonialColumn = ({ items, delay }) => {
    return (
        <motion.div
            className="testimonial-column"
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{
                repeat: Infinity,
                duration: 25,
                ease: "linear",
                delay: delay,
            }}
        >
            {items.map((item) => <TestimonialCard item={item} height={false} />)}
        </motion.div>
    );
};

const TestimonialSection = () => {
    useEffect(() => {
        AOS.init();
    }, []);
    return (<>
        <section className='pt-md-5 mb-4'>
            <div className="container">
                <div className="row gy-3">
                    <div className="col-xl-12 mb-2 text-center d-flex justify-content-center align-items-center flex-column">
                        <div className='tittle-box'>
                            <div className='deco-img d-none d-md-block'>
                                <img src={DecorationImg} alt="icon" />
                            </div>
                            <h1 className='mb-2 fw-bold'>What our Student Says</h1>
                        </div>
                        <p>Real Students. Real Experiences. Real Impact</p>
                    </div>
                    <div className="row d-none d-md-flex">
                        {[0, 1, 2].map((colIndex) => (
                            <div key={colIndex} className="col-md-4 ">
                                <div className="testimonial-wrapper ">
                                    <TestimonialColumn
                                        items={testimonials.slice(colIndex * 3, colIndex * 3 + 3)}
                                        delay={colIndex * 2}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="row d-block d-md-none testimonial-section-part">
                        <OwlCarousel
                            className="owl-theme mentoring-course"
                            loop
                            margin={10}
                            nav
                            smartSpeed={500}
                            data-aos="fade-up"
                            autoplay={true}  // Enable auto-rotation
                            autoplayTimeout={3000}  // Set interval in milliseconds (3 seconds)
                            autoplayHoverPause={true}  // Pause on hover
                            responsive={{
                                0: { items: 1 },
                                600: { items: 2 },
                                1000: { items: 3 },
                            }}
                        >
                            {testimonials?.length > 0 &&
                                testimonials?.map((item) => {
                                    return (
                                        <TestimonialCard item={item} height={true} />
                                    );
                                })}
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </section>

    </>);
};

export default TestimonialSection;

