import React from 'react'
import SectiontittleImg from '../../assets/img/quad-champs/about/section-tittle-img.png'
import FeaturesImg1 from '../../assets/img/quad-champs/into-video/features-img-1.png'
import FeaturesImg2 from '../../assets/img/quad-champs/into-video/features-img-2.png'
import AboutcheckIcon from '../../assets/img/quad-champs/about/about-icon.png'
import BtnImg from '../../../src/assets/img/quad-champs/button-img/book-icon.png'
import KeyShape1 from '../../../src/assets/img/quad-champs/into-video/activite-shape2.png'
import academicSupportIcon from '../../assets/img/quad-champs/our-key-feature/academic-support.png';
import stemLearningIcon from '../../assets/img/quad-champs/our-key-feature/STEM-based-and-practical-learning-integration.png';
import virtualLabIcon from '../../assets/img/quad-champs/our-key-feature/virtual-labs-for-real-world-experience.png';
import learningPathIcon from '../../assets/img/quad-champs/our-key-feature/customized-learning-paths.png';
import affordableExcellenceIcon from '../../assets/img/quad-champs/our-key-feature/affordable-excellence.png';
import skillOrientedIcon from '../../assets/img/quad-champs/our-key-feature/skill-oriented-approach.png';


const keyFeatures = [
    {
        icon: academicSupportIcon,
        title: "360° Academic Support",
        description: "We provide a holistic learning experience that aligns with the K–12 school curriculum while also preparing students for competitive exams like IIT-JEE and NEET.",
    },
    {
        icon: stemLearningIcon,
        title: "STEM Based and Practical Learning Integration",
        description: "Our hands-on learning approach promotes “learning by doing,” helping students connect concepts with real-world applications.",
    },
    {
        icon: virtualLabIcon,
        title: "Virtual Labs for Real-World Experience",
        description: "State-of-the-art virtual labs offer immersive, interactive experiences that reinforce theoretical knowledge through simulated practical experiments.",
    },
    {
        icon: learningPathIcon,
        title: "Customized Learning Paths",
        description: "Each student receives a personalized learning journey tailored to their academic strengths, needs, and aspirations.",
    },
    {
        icon: affordableExcellenceIcon,
        title: "Affordable Excellence",
        description: "We are committed to delivering high-quality education at an accessible price, ensuring that excellence is never out of reach.",
    },
    {
        icon: skillOrientedIcon,
        title: "Skill Oriented Approach",
        description: "Beyond academics, we focus on developing essential 21st-century skills, including problem-solving, critical thinking, and collaboration, to prepare students for future challenges.",
    },
];




function ChampkeyFeatures() {
    return (
        <>
            <section className='champ-key-features mt-5'>
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-xl-12 d-flex justify-content-center position-relative ">
                            <div className='key-shape1'>
                                <img src={KeyShape1} alt="shape" className='img-fluid zoom' />
                            </div>
                            <div className='px-4 d-flex justify-content-center flex-column align-items-center'>
                                <div>
                                    <span><img src={SectiontittleImg} alt="book-icon" className='img-fluid me-1' /></span><span className='about-txt'>Key Features</span>
                                </div>
                                <h2 className='text-center mt-2'>Key Features That Define QuadNut Champs</h2>
                               <p className='fs-15 text-center'>At QuadNut Champs, we believe in nurturing brilliance one concept at a time. Our platform is designed to provide a holistic and futuristic learning experience that integrates school curriculum, foundational courses, and STEM based practical learning. We focus on building core academic strength while preparing students for real-world challenges and competitive exams through experiential learning, personalized support, and technology enabled resources. 
                            </p>
                                {/* <p>At QuadNut Champs, we nurture brilliance with a future-ready learning approach blending curriculum, foundational skills, and hands-on STEM education.</p> */}
                            </div>



                        </div>

                      
                        {/* <div className="col-md-6 d-b ">
                            <div className='features-box '>
                                <div className='features-img'>
                                    <img src={FeaturesImg1} alt="image" className='img-fluid' />
                                </div>
                                <div className=''>
                                    <h2 className='text-center text-xl-start'>Live Tuition Classes</h2>
                                    <ul className='mt-4'>
                                        <li className='pb-3 d-flex gap-1'><div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>Learning with Multimedia & Interactivity</div></li>
                                        <li className='pb-3 d-flex gap-1'><div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>Learning with Multimedia & Interactivity</div></li>
                                        <li className='pb-3 d-flex gap-1'><div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>Learning with Multimedia & Interactivity</div></li>
                                    </ul>
                                    <div className='w-100  d-flex justify-content-center justify-content-xl-start'>
                                        <div className='champ-btn-type2 mt-2'>
                                            <a href="#">
                                                Explore Features <span className='btn-txt'><i class="fa-solid fa-arrow-right"></i></span>
                                            </a>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-6 ">
                            <div className='features-box '>
                                <div className='features-img'>
                                    <img src={FeaturesImg2} alt="image" className='img-fluid' />
                                </div>
                                <div className=''>
                                    <h2 className='text-center text-xl-start'>Recorded Courses</h2>
                                    <ul className='mt-4'>
                                        <li className='pb-3 d-flex gap-1'><div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>Learning with Multimedia & Interactivity</div></li>
                                        <li className='pb-3 d-flex gap-1'><div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>Learning with Multimedia & Interactivity</div></li>
                                        <li className='pb-3 d-flex gap-1'><div><img src={AboutcheckIcon} alt="icon" className='me-2' /></div><div>Learning with Multimedia & Interactivity</div></li>
                                    </ul>
                                    <div className='w-100  d-flex justify-content-center justify-content-xl-start'>
                                        <div className='champ-btn-type2 mt-2'>
                                            <a href="#">
                                                Explore Features <span className='btn-txt'><i class="fa-solid fa-arrow-right"></i></span>
                                            </a>

                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div> */}

                        <div className="col-xl-12 my-5">
                            <div className="row g-3">
                                {keyFeatures.map((feature, index) => (
                                    <div className="col-md-6 col-lg-4" key={index}>
                                        <div className="card p-3 features-card border-0 rounded-0">
                                            <div className="row gy-2 px-md-4">
                                                <div className="col-xl-12 d-flex justify-content-center align-items-center">
                                                    <div className="key-features-img-box">
                                                        <img src={feature.icon} alt="icon" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-12 text-center">
                                                    <h4 className="mb-0 lh-base">{feature.title}</h4>
                                                </div>
                                                <div className="col-xl-12">
                                                    <p className="mb-0 fs-14 features-card-txt text-center">
                                                        {feature.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>




            </section>




        </>
    )
}

export default ChampkeyFeatures