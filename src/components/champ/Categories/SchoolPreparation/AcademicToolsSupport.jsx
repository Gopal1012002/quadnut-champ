import React from 'react'

import SectiontittleImg from '../../../../assets/img/quad-champs/about/section-tittle-img.png'
import KeyShape1 from '../../../../../src/assets/img/quad-champs/into-video/activite-shape2.png'
import WeeklyBoosterIcon from '../../../../assets/img/quad-champs/classes/reinforcement-learning.png'
import DailyPracticeIcon from '../../../../assets/img/quad-champs/classes/checklist.png'
import DoubtSolvingIcon from '../../../../assets/img/quad-champs/classes/communications.png'
import RecordedVideoIcon from '../../../../assets/img/quad-champs/classes/video-lesson.png'
import MentorshipIcon from '../../../../assets/img/quad-champs/classes/mentorship.png'
import AssessmentsIcon from '../../../../assets/img/quad-champs/classes/assessment.png'
import styles from './EducationMindMap.module.css';



const features = [
    { title: "Weekly Booster Tests to reinforce learning", icon: WeeklyBoosterIcon },
    { title: "Daily Practice Papers (DPPs) for revision", icon: DailyPracticeIcon },
    { title: "Doubt-Solving Sessions to clear hurdles in real time", icon: DoubtSolvingIcon },
    { title: "Live + Recorded Video Lectures for flexible learning", icon: RecordedVideoIcon },
    { title: "One-on-One Mentorship with expert faculty for personalized guidance", icon: MentorshipIcon },
    { title: "Periodic Assessments aligned with school exam patterns", icon: AssessmentsIcon }
];


const AcademicToolsSupport = () => {
    return (
        <section className='py-5'>
            <div className="container">
                <div className="row">
                    <div className="col-xl-12 d-flex justify-content-center position-relative ">
                        <div className='key-shape1'>
                            <img src={KeyShape1} alt="shape" className='img-fluid zoom' />
                        </div>
                        <div className='px-4 d-flex justify-content-center flex-column align-items-center'>
                            <div>
                                <span><img src={SectiontittleImg} alt="book-icon" className='img-fluid me-1' /></span><span className='about-txt'>Academic Tools & Support</span>
                            </div>
                            <h2 className='text-center mt-2'>Comprehensive Academic Tools & Support</h2>
                            <p className='fs-15 text-center'>To ensure continuous progress, our program include.Whether it’s scoring better marks in school or preparing for future milestones, QuadNut Champs ensures every learner has the support and resources needed to succeed.</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-4">
                    {features.map((feature, idx) => (
                        <div key={idx} className="col-md-6 col-lg-4 mb-4">
                            <div className={`card ${styles.featureCard}`}>
                                <div className={styles.cardContent}>
                                    <div className={styles.imgBox}>
                                        <img src={feature.icon} className="img-fluid" alt={feature.title} />
                                    </div>
                                    <h5 className="card-title">{feature.title}</h5>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

        </section>
    )
}

export default AcademicToolsSupport