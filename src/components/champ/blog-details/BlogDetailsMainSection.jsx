
import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { BiCheck } from 'react-icons/bi';
import { FaCalendarWeek, FaComments } from 'react-icons/fa';
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

import ResentPostImg from '../../../assets/img/quad-champs/blog/rpost-thumb1.png'
import BlogDetailsImg from '../../../assets/img/quad-champs/blog/online-education-concept-blog.png'
import AuthorImg from '../../../assets/img/quad-champs/blog/default_usr.jpg'
const BlogDetailsMainSection = () => {
  return (

    <>
      <section className="blog-details-area py-5 my-5 ">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="row  bg-white  p-2 rounded-3">
                <div className="position-relative mb-4 d-flex justify-content-center align-items-center">
                  <div className="bog-main-img">
                    <img
                      src={BlogDetailsImg}
                      alt="Blog Thumbnail"
                      className="img-fluid rounded"
                    />
                  </div>

                  <div className="position-absolute bottom-0 start-0 m-3">
                    <Link
                      to="/blog-details"
                      className="badge blog-tage  px-3 py-2 text-white text-uppercase"

                    >
                      Education
                    </Link>
                  </div>
                </div>


                <ul className="list-inline d-flex flex-wrap gap-4 mb-4">
                  <li className="d-flex align-items-center">
                    <div className="author-img">
                      <img
                        src={AuthorImg}
                        alt="Author"

                      />
                    </div>


                    <span className="fw-medium">Anjelina Watson</span>
                  </li>
                  <li className="d-flex align-items-center text-muted">
                    <FaCalendarWeek className="me-2 icon"  />
                    18 January, 2025
                  </li>
                  <li className="d-flex align-items-center text-muted">
                    <FaComments className="me-2 icon"  />
                    (1) Comments
                  </li>
                </ul>
                <h2 className=" fw-semibold mb-3">
                  <Link to="/blog-details" className="text-dark text-decoration-none">
                    Trends that are shaping the Learning experience
                  </Link>
                </h2>

                <p className="text-muted mb-4">
                  Globally engage cross-media leadership skills before cross-media innovation...
                </p>
                <p className="text-muted mb-4">
                  Dramatically harness cross-platform best practices whereas business services...
                </p>

                <blockquote className="blockquote ps-5 border-start border-4 mb-5">
                  <p className="mb-0 fw-medium">
                    “Globally engage cross-media leadership skills before cross-media great opportunities.”
                  </p>
                </blockquote>

                <h3 className="h3 fw-semibold mt-4 mb-3">Learn Benefits</h3>
                <p className="text-muted mb-4">
                  Globally engage cross-media leadership skills... visionary models.
                </p>


                <div className="row mb-5">
                  {[...Array(3)].map((_, colIndex) => (
                    <div className="col-md-4" key={colIndex}>
                      <ul className="list-unstyled list">
                        {['Professional Team Member', 'Solutions the Clients Problems', 'Extra Facilities Sales Increase']
                          .map((item, i) => (
                            <li key={i} className='list-item'>
                              <BiCheck  className="me-2" />
                              {item}
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>

              
                <div className="row mb-4 align-items-center">
                  <div className="col-md-6">
                    <ul className="list-inline ">
                      {['Technology', 'Education', 'Learning'].map((tag, idx) => (
                        <li key={idx} className="list-inline-item ">
                          <Link to="#" className="badge bg-light text-muted">
                            {tag}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-md-6 text-end">
                    <ul className="list-inline mb-0">
                      <li className="list-inline-item"><Link to="#"><FaFacebookF color="#ff740a" /></Link></li>
                      <li className="list-inline-item"><Link to="#"><FaXTwitter color="#ff740a" /></Link></li>
                      <li className="list-inline-item"><Link to="#"><FaLinkedinIn color="#ff740a" /></Link></li>
                     
                    </ul>
                  </div>
                </div>

               
                <div className="d-flex justify-content-between border-top border-bottom py-4">
                  <Link to="#" className="text-dark fw-medium previous">
                  <GrLinkPrevious className='me-2' />
                    Previous Posts
                  </Link>
                  <Link to="#" className="fw-medium next">
                    Next Posts
                   <GrLinkNext className='mx-2' />
                  </Link>
                </div>


                <div className="mt-5">
                  <h3 className="h4 fw-semibold mb-4">Comments (1)</h3>
                  <div className="bg-light p-4 rounded mb-4 d-flex">
                    <div className="user-img">
                       <img
                      src={AuthorImg}
                      alt="Author"
                      className=" rounded-circle"
                      width={60}
                    />
                    </div>
                  
                    <div>
                      <h5 className="fw-semibold mb-1">Md. Saifur Rahman</h5>
                      <small className="text-muted">12 August, 2024</small>
                      <p className="mt-2 mb-1 text-muted">
                        Media leadership skills before cross-media innovation...
                      </p>
                      <Link to="#" className="small text-uppercase fw-bold" style={{ color: '#ff740a' }}>
                        Reply
                      </Link>
                    </div>
                  </div>
                </div>

              
                <div className="comment-form mt-5">
                  <h3 className="h4 fw-semibold mb-3">Post a Comment</h3>
                  <p className="mb-4 text-muted">
                    Your email address will not be published. So, don’t worry.
                  </p>
                  <form action="#" method="POST">
                    <div className="mb-3">
                      <textarea
                        name="comment-message"
                        className="form-control"
                        rows={4}
                        placeholder="Write Comments..."
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <input
                          type="text"
                          name="comment-name"
                          className="form-control"
                          placeholder="Enter your Name *"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <input
                          type="email"
                          name="comment-email"
                          className="form-control"
                          placeholder="Your E-Mail *"
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        name="comment-website"
                        className="form-control"
                        placeholder="Website URL"
                      />
                    </div>
                    <div className="form-check mb-3">
                      <input className="form-check-input" type="checkbox" id="rememberMe" />
                      <label className="form-check-label text-muted" htmlFor="rememberMe">
                        Save my information in this browser for next comments
                      </label>
                    </div>
                    <a type="submit" className="champ-common-btn ">
                     <span className='btn-txt'>Submit Comment</span> 
                    </a>
                  </form>
                </div>
              </div>
            </div>


            <div className="col-lg-4 mt-4 mt-lg-0">
              <div className="blog-right-sidebar" >
                <div className="widget-categories-box ">
                  <h4 className="sidebar-title mb-4">Recent Posts</h4>

                  {[1, 2, 3, 4].map((_, i) => (
                    <div className="widget-recent-post d-flex mb-3" key={i}>
                      <div className="rpost-thumb me-3">
                        <Link to={'/blogs-details'}>
                          <img src={ResentPostImg} alt="post thumb" />
                        </Link>
                      </div>
                      <div className="rpost-content">
                        <div className="rpost-title">
                          <h4 className="mb-1">
                            <Link to={'/blogs-details'}>How Gamification is Changing the Way...</Link>
                          </h4>
                          <span className="text-muted small">20 Feb, 2025</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="widget-tags-box mt-5">
                    <h4 className="sidebar-title">Tags</h4>
                    <div className="tags-container d-flex flex-wrap gap-2">
                      {['Education', 'Learning', 'Gamification', 'Technology', 'Training', 'eLearning'].map((tag, index) => (
                        <a to="#" key={index} className="tag-link">
                          {tag}
                        </a>
                      ))}
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>




  )
}

export default BlogDetailsMainSection




