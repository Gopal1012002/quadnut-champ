import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BtnImg from '../../../src/assets/img/quad-champs/button-img/book-icon.png'
import SectiontittleImg from '../../assets/img/quad-champs/about/section-tittle-img.png'
import FeaturesImg2 from '../../assets/img/quad-champs/into-video/features-img-2.png'
import AboutcheckIcon from '../../assets/img/quad-champs/about/about-icon.png'
import KeyShape1 from '../../../src/assets/img/quad-champs/into-video/activite-shape2.png'
import BlogImg1 from '../../../src/assets/img/quad-champs/into-video/blog-img1png.png'
import BlogImg2 from '../../../src/assets/img/quad-champs/into-video/blog-img2.png'
import BlogImg3 from '../../../src/assets/img/quad-champs/into-video/blog-img3.png'
import TestiprofileImg from '../../assets/img/quad-champs/into-video/testi-autor1.png';
import BlogbtnImg from '../../assets/img/quad-champs/into-video/blog-icon1.png';

const blogData = [
    {
        id: 1,
        date: '22 Jan',
        img: BlogImg1,
        author: 'Soheb Siddique',
        title: '10 Proven Strategies to Excel in Online Learning',
    },
    {
        id: 2,
        date: '30 Jan',
        img: BlogImg2,
        author: 'Anjali Mehra',
        title: 'How to Stay Motivated During Online Classes',
    },
    {
        id: 3,
        date: '05 Feb',
        img: BlogImg3,
        author: 'Rohan Patel',
        title: 'Top Tools Every Online Student Should Use',
    },
];

function ChampBlog() {
    return (
        <>
            <section className='champ-blog mt-5'>
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-xl-12 d-flex justify-content-center position-relative ">
                            <div className='key-shape1'>
                                <img src={KeyShape1} alt="shape" className='img-fluid zoom' />
                            </div>
                            <div className='w-75 d-flex justify-content-center flex-column align-items-center'>
                                <div>
                                    <span><img src={SectiontittleImg} alt="book-icon" className='img-fluid me-1' /></span><span className='about-txt'>LATEST BLOG</span>
                                </div>
                                <h2 className='text-center mt-2 lh-base'>Read the Latest Insights and <br />
                                    Updates Educate Blog</h2>
                            </div>
                        </div>
                        <div className="col-xl-12">
                            <div className="row">
                                {blogData.map((blog) => (
                                    <div className="col-md-6 col-lg-4" key={blog.id}>
                                        <div className="champ-blog-card hover-img-box">
                                            <div className="blog-img-box position-relative">
                                                <div className="blog-date">
                                                    <span>{blog.date}</span>
                                                </div>
                                               <div className='hover-effect-img'>
                                                 <img src={blog.img} alt="blog" className="rounded-2" />
                                               </div>
                                            </div>
                                            <div className="d-flex gap-2 mt-3 align-items-center">
                                                <div className="blog-post-profile">
                                                    <img src={TestiprofileImg} alt="profile" className="img-fluid" />
                                                </div>
                                                <div>
                                                    <p className="mb-0">{blog.author}</p>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <h5>{blog.title}</h5>
                                            </div>
                                            <div className="blog-btn">
                                                <Link to="/blogs-details">
                                                    Continue Reading <img src={BlogbtnImg} alt="arrow-icon" />
                                                </Link>
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

export default ChampBlog