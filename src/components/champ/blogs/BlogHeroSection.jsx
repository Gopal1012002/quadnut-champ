
import React from 'react'
import BlogHeroImg from '../../../assets/img/quad-champs/blog/blog-list-hero.png'
const BlogHeroSection = () => {
  return (
    <section className="blog-hero-section ">
      <div className="container">
        <div className="row align-items-center ">
          <div className="col-lg-6 mb-4 mt-lg-0">
           
            <div className="hero_content">
              <h5>
                <i className="fa-regular fa-star" />
               Read by 26,00+ Curious Minds
              </h5>
              <h1>Ideas That Inspire</h1>
              <h1>Insights for <span>2025</span></h1>
              <p>
                Explore stories, tips, and trends shaping the future of learning and growth.
              </p>

              <div className="hero-button">
                <div className="hero-btn">
                  <a href="#latest-articles">
                    EXPLORE ARTICLES
                    <i className="flaticon flaticon-right-arrow" />
                  </a>
                </div>
              </div>
            </div>

          </div>
         
          <div className="col-lg-6 mt-4 mt-lg-0 ">

            <div className="hero-thumb">
              <img src={BlogHeroImg} className='img-fluid' />
            </div>


          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogHeroSection