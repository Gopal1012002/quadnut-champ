import React from 'react'
import ResentPostImg from '../../../assets/img/quad-champs/blog/rpost-thumb1.png'
import BlogImg1 from '../../../assets/img/quad-champs/into-video/blog-img1png.png'
import BlogImg2 from '../../../assets/img/quad-champs/into-video/blog-img2.png'
import BlogImg3 from '../../../assets/img/quad-champs/into-video/blog-img3.png'
import TestiprofileImg from '../../../assets/img/quad-champs/into-video/testi-autor1.png';
import BlogbtnImg from '../../../assets/img/quad-champs/into-video/blog-icon1.png';
import { Link } from 'react-router-dom';


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
     {
        id: 4,
        date: '05 Feb',
        img: BlogImg3,
        author: 'Rohan Patel',
        title: 'Top Tools Every Online Student Should Use',
    },
];


const BlogMainSection = () => {
    return (
        <section className="blog-main-section py-5 my-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="row">
                             {blogData.map((blog) => (
                                    <div className="col-md-6 col-lg-6" key={blog.id}>
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
                            
                            <div className="pagination-menu">
                                <ul>
                                    <li>
                                        <a href="#">1</a>
                                    </li>
                                    <li>
                                        <a href="#">2</a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa-solid fa-angle-right" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mt-4 mt-lg-0">
                        <div className="blog-right-sidebar">
                            <div className="widget-categories-box">
                                <h4 className="sidebar-title">Recent Posts</h4>
                                <div className="widget-recent-post d-flex">
                                    <div className="rpost-thumb">
                                        <Link to={'/blogs-details'}>
                                            <img
                                                src={ResentPostImg}
                                                alt="post thumb"
                                            />
                                        </Link>
                                    </div>
                                    <div className="rpost-content">
                                        <div className="rpost-title">
                                            <h4>
                                                <Link href="#">How Gamification is Changing the Way...</Link>
                                            </h4>
                                            <span>20 Feb, 2025</span>
                                        </div>
                                    </div>
                                </div>
                                 <div className="widget-recent-post d-flex">
                                    <div className="rpost-thumb">
                                        <Link to={'/blogs-details'}>
                                            <img
                                                src={ResentPostImg}
                                                alt="post thumb"
                                            />
                                        </Link>
                                    </div>
                                    <div className="rpost-content">
                                        <div className="rpost-title">
                                            <h4>
                                               <Link to={'/blogs-details'}>How Gamification is Changing the Way...</Link>
                                            </h4>
                                            <span>20 Feb, 2025</span>
                                        </div>
                                    </div>
                                </div>
                                 <div className="widget-recent-post d-flex">
                                    <div className="rpost-thumb">
                                        <Link to={'/blogs-details'}>
                                            <img
                                                src={ResentPostImg}
                                                alt="post thumb"
                                            />
                                        </Link>
                                    </div>
                                    <div className="rpost-content">
                                        <div className="rpost-title">
                                            <h4>
                                              <Link href="/blogs-details#">How Gamification is Changing the Way...</Link>
                                            </h4>
                                            <span>20 Feb, 2025</span>
                                        </div>
                                    </div>
                                </div>
                                 <div className="widget-recent-post d-flex">
                                    <div className="rpost-thumb">
                                        <Link to={'#'}>
                                            <img
                                                src={ResentPostImg}
                                                alt="post thumb"
                                            />
                                        </Link>
                                    </div>
                                    <div className="rpost-content">
                                        <div className="rpost-title">
                                            <h4>
                                                <Link to={'/blogs-details'}>How Gamification is Changing the Way...</Link>
                                            </h4>
                                            <span>20 Feb, 2025</span>
                                        </div>
                                    </div>
                                </div>
                               
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default BlogMainSection