import React from "react";
import DecorationImg from "../../../assets/img/landing-page/shape.png";
import TrackImg1 from "../../../assets/img/landing-page/megaphone.png";
import TrackImg2 from "../../../assets/img/landing-page/diversity.png";
import TrackImg3 from "../../../assets/img/landing-page/online-course.png";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Day3Img1 from '../../../assets/img/landing-page/MEAN-Stack.png'
import Day3Img2 from '../../../assets/img/landing-page/Cloud-Computing.jpg'
import Day3Img3 from '../../../assets/img/landing-page/Cybersecurity.jpg'
import Day3Img4 from '../../../assets/img/landing-page/Personality-Development.jpg'
import Day3Img5 from '../../../assets/img/landing-page/Graphic-Design.jpg'
import Day3Img6 from '../../../assets/img/landing-page/Google-Workspace.jpg'
import LongtrainnigImg1 from '../../../assets/img/landing-page/AI-ML.jpg'
import LongtrainnigImg2 from '../../../assets/img/landing-page/Blockchain-Development.jpg'
import LongtrainnigImg3 from '../../../assets/img/landing-page/DataScience-with-Python.jpg'
import LongtrainnigImg4 from '../../../assets/img/landing-page/IOT.jpg'
import LongtrainnigImg5 from '../../../assets/img/landing-page/Full-Stack-Web-Development.jpg'
import LongtrainnigImg6 from '../../../assets/img/landing-page/digital-marketing.jpg'
import LongtrainnigImg7 from '../../../assets/img/landing-page/UI-UX.jpg'
import LongtrainnigImg8 from '../../../assets/img/landing-page/Project-Management.jpg'
import LongtrainnigImg9 from '../../../assets/img/landing-page/ContentWriting-Blogging.jpg'
import LongtrainnigImg10 from '../../../assets/img/landing-page/FinTech-Essentials.png'
import LongtrainnigImg11 from '../../../assets/img/landing-page/E-commerceManagement.png'

function OurOfferings() {
  return (
    <>
      <section>
        <div className="container">
          <div className="row gy-md-4 gy-3">
            {/* heading tittle start */}
            <div className="col-xl-12 text-center d-flex justify-content-center align-items-center flex-column">
              <div className="tittle-box">
                <div className="deco-img d-none d-md-block">
                  <img src={DecorationImg} alt="icon" />
                </div>
                <h1 className="mb-2 fw-bold ">Our Offerings</h1>
              </div>
              <p className="section-heading">
                Empowering You with Tailored Solutions for Every Goal.
              </p>
            </div>
            {/* heading tittle end */}

            <div className="col-xl-12 ">
              <div class="mt-3 tab-session ">
                <ul
                  class="nav nav-pills justify-content-md-center gap-3 gap-md-4  mb-4"
                  role="tablist"
                >
                  <li class="nav-item tab-item-set" role="presentation">
                    <a
                      class="nav-link active p-0"
                      data-bs-toggle="pill"
                      href="#menu1"
                    >
                      <div class="tab-box active-tab px-5">
                        <img src={TrackImg1} alt="" className="w-36" />
                        <h6 className="mb-0 mt-2 lh-base">
                          1-Day  Seminars
                        </h6>
                      </div>
                    </a>
                  </li>
                  <li class="nav-item tab-item-set " role="presentation">
                    <a class="nav-link p-0" data-bs-toggle="pill" href="#menu2">
                      <div class="tab-box px-5 ">
                        <img src={TrackImg2} alt="" className="w-36" />
                        <h6 className="mb-0 mt-2 lh-base">
                          3-Day  Workshops
                        </h6>
                      </div>
                    </a>
                  </li>
                  <li class="nav-item tab-item-set" role="presentation">
                    <a class="nav-link p-0" data-bs-toggle="pill" href="#menu3">
                      <div class="tab-box px-5 ">
                        <img src={TrackImg3} alt="" className="w-36" />
                        <h6 className="mb-0 mt-2 lh-base">
                          30–45 Day 
                          Long-Term Training
                        </h6>
                      </div>
                    </a>
                  </li>
                </ul>

                {/* {/ tab content section html /} */}

                <div class="tab-content pt-md- pb-md-5">
                  <div
                    id="menu1"
                    class="tab-pane tab-dd-box container active show fade"
                  >
                    <div className="row pt-md-4 tranning-list gy-3">
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div
                          className="card border-0 h-100 tranning-box-bg1"
                        >
                          <div className="card-body pb-0">
                            <div className="tranning-list-img-box">
                              <img
                                src={LongtrainnigImg1}
                                alt="image"
                                className="img-fluid rounded-3"
                              />
                            </div>
                            <div
                              className="border-0 px-3 py-1 rounded-5 mt-3 fw-bold tranning-type-bg text-white"
                              style={{ width: "fit-content" }}
                            >
                              Tech
                            </div>
                            <div className="my-3">
                              <h4 className="mb-0">Future of AI & ML</h4>
                            </div>
                            <div className="traning-list-para">
                              <p className="para-align-justify mb-0">
                                The future of AI and ML promises smarter, more
                                adaptive technologies that reshape industries
                                and daily life. They will drive innovation,
                                automation, and deeper human-machine
                                collaboration.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div
                          className="card border-0 h-100 tranning-box-bg2"
                         
                        >
                          <div className="card-body pb-0">
                            <div className="tranning-list-img-box">
                              <img
                                src={LongtrainnigImg6}
                                alt="image"
                                className="img-fluid rounded-3"
                              />
                            </div>
                            <div
                              className="border-0 px-3 py-1 rounded-5 mt-3 fw-bold tranning-type-bg text-white"
                              style={{ width: "fit-content" }}
                            >
                              Non-Tech
                            </div>
                            <div className="my-3">
                              <h4 className="mb-0">
                                The Power of Digital Marketing
                              </h4>
                            </div>
                            <div className="traning-list-para">
                              <p className="para-align-justify mb-0">
                                Digital marketing empowers brands to reach and
                                engage global audiences with precision and
                                creativity. It drives growth, builds
                                relationships, and delivers measurable success
                                across platforms.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div
                          className="card border-0 h-100 tranning-box-bg1"
                        
                        >
                          <div className="card-body pb-0">
                            <div className="tranning-list-img-box">
                              <img
                                src="https://img.freepik.com/free-photo/man-using-laptop-work-connect-with-others_23-2149369111.jpg?uid=R179690245&ga=GA1.1.1210744585.1744884787&semt=ais_hybrid&w=740"
                                alt="image"
                                className="img-fluid rounded-3"
                              />
                            </div>
                            <div
                              className="border-0 px-3 py-1 rounded-5 mt-3 fw-bold tranning-type-bg text-white"
                              style={{ width: "fit-content" }}
                            >
                              Tech
                            </div>
                            <div className="my-3">
                              <h4 className="mb-0">Blockchain 101</h4>
                            </div>
                            <div className="traning-list-para">
                              <p className="para-align-justify mb-0">
                                Blockchain is a decentralized digital ledger
                                that securely records transactions across
                                multiple computers. It ensures transparency,
                                security, and trust without the need for a
                                central authority.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div
                          className="card border-0 h-100 tranning-box tranning-box-bg2"
                          
                        >
                          <div className="card-body pb-0">
                            <div
                              className="tranning-list-img-box"
                              style={{ overflow: "hidden" }}
                            >
                              <img
                                src={LongtrainnigImg9}
                                alt="image"
                                className="img-fluid rounded-3"
                              />
                            </div>
                            <div
                              className="border-0 px-3 py-1 rounded-5 mt-3 fw-bold tranning-type-bg text-white"
                              style={{ width: "fit-content" }}
                            >
                              Non-Tech
                            </div>
                            <div className="my-3">
                              <h4 className="mb-0">
                                Personal Branding for the Digital Age
                              </h4>
                            </div>
                            <div className="traning-list-para">
                              <p className="para-align-justify mb-0">
                                Personal branding in the digital age means
                                crafting a strong, authentic online presence to
                                showcase your skills and values. It helps you
                                build trust, expand your network, and unlock new
                                opportunities.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="menu2" class="tab-pane tab-dd-box container fade">
                    <div className="row pt-md-4 tranning-list gy-3">
                      <div className="col-md-6 col-lg-4">
                        <div
                          className="card border-0 h-100"
                         
                        >
                          <div className="card-body pb-0">
                            <div className="tranning-list-img-box tranning-box-bg1">
                              <img
                                src={Day3Img1}
                                alt="image"
                                className="img-fluid rounded-3"
                              />
                            </div>
                            <div
                              className="border-0 px-3 py-1 rounded-5 mt-3 fw-bold tranning-type-bg text-white"
                              style={{ width: "fit-content" }}
                            >
                              Tech
                            </div>
                            <div className="my-3">
                              <h4 className="mb-0"> MERN/MEAN Stack</h4>
                            </div>
                            <div className="traning-list-para">
                              <p className="para-align-justify mb-0">
                                MERN and MEAN stacks are powerful
                                JavaScript-based frameworks for building
                                dynamic, full-stack web applications. They
                                streamline development by using a single
                                language across front-end and back-end.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4">
                        <div
                          className="card border-0 h-100 tranning-box-bg2"
                         
                        >
                          <div className="card-body pb-0">
                            <div className="tranning-list-img-box">
                              <img
                                src={Day3Img2}
                                alt="image"
                                className="img-fluid rounded-3"
                              />
                            </div>
                            <div
                              className="border-0 px-3 py-1 rounded-5 mt-3 fw-bold tranning-type-bg text-white"
                              style={{ width: "fit-content" }}
                            >
                              Tech
                            </div>
                            <div className="my-3">
                              <h4 className="mb-0">Cloud Computing</h4>
                            </div>
                            <div className="traning-list-para">
                              <p className="para-align-justify mb-0">
                                Cloud computing delivers on-demand access to
                                computing resources like servers, storage, and
                                software over the internet. It enables greater
                                flexibility, scalability, and cost-efficiency
                                for businesses and individuals.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4">
                        <div
                          className="card border-0 h-100 tranning-box-bg1"
                       
                        >
                          <div className="card-body pb-0">
                            <div className="tranning-list-img-box">
                              <img
                                src={Day3Img3}
                                alt="image"
                                className="img-fluid rounded-3"
                              />
                            </div>
                            <div
                              className="border-0 px-3 py-1 rounded-5 mt-3 fw-bold tranning-type-bg text-white"
                              style={{ width: "fit-content" }}
                            >
                              Tech
                            </div>
                            <div className="my-3">
                              <h4 className="mb-0">Cybersecurity</h4>
                            </div>
                            <div className="traning-list-para">
                              <p className="para-align-justify mb-0">
                                Cybersecurity protects systems, networks, and
                                data from digital attacks, theft, and damage. It
                                is essential for safeguarding privacy,
                                maintaining trust, and ensuring the resilience
                                of technology infrastructures.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4">
                        <div
                          className="card border-0 h-100 tranning-box tranning-box-bg2"
                          
                        >
                          <div className="card-body pb-0">
                            <div
                              className="tranning-list-img-box"
                              style={{ overflow: "hidden" }}
                            >
                              <img
                                src={Day3Img4}
                                alt="image"
                                className="img-fluid rounded-3"
                              />
                            </div>
                            <div
                              className="border-0 px-3 py-1 rounded-5 mt-3 fw-bold tranning-type-bg text-white"
                              style={{ width: "fit-content" }}
                            >
                              Non-Tech
                            </div>
                            <div className="my-3">
                              <h4 className="mb-0">Personality Development</h4>
                            </div>
                            <div className="traning-list-para">
                              <p className="para-align-justify mb-0">
                                Personality development focuses on improving
                                behavior, communication, and mindset. It helps
                                individuals build confidence, enhance
                                relationships, and achieve personal growth.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4">
                        <div
                          className="card border-0 h-100 tranning-box tranning-box-bg1"
                          
                        >
                          <div className="card-body pb-0">
                            <div
                              className="tranning-list-img-box"
                              style={{ overflow: "hidden" }}
                            >
                              <img
                                src={Day3Img5}
                                alt="image"
                                className="img-fluid rounded-3"
                              />
                            </div>
                            <div
                              className="border-0 px-3 py-1 rounded-5 mt-3 fw-bold tranning-type-bg text-white"
                              style={{ width: "fit-content" }}
                            >
                              Non-Tech
                            </div>
                            <div className="my-3">
                              <h4 className="mb-0">Graphic Design</h4>
                            </div>
                            <div className="traning-list-para">
                              <p className="para-align-justify mb-0">
                                Graphic design is the art of visually
                                communicating ideas through typography, imagery,
                                color, and layout. It shapes brand identities,
                                enhances user experiences, and brings creative
                                visions to life.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4">
                        <div
                          className="card border-0 h-100 tranning-box tranning-box-bg2"
                          
                        >
                          <div className="card-body pb-0">
                            <div
                              className="tranning-list-img-box"
                              style={{ overflow: "hidden" }}
                            >
                              <img
                                src={Day3Img6}
                                alt="image"
                                className="img-fluid rounded-3"
                              />
                            </div>
                            <div
                              className="border-0 px-3 py-1 rounded-5 mt-3 fw-bold tranning-type-bg text-white"
                              style={{ width: "fit-content" }}
                            >
                              Non-Tech
                            </div>
                            <div className="my-3">
                              <h4 className="mb-0">Google Workspace</h4>
                            </div>
                            <div className="traning-list-para">
                              <p className="para-align-justify mb-0">
                                Google Workspace is a cloud-based suite of
                                productivity and collaboration tools like Gmail,
                                Docs, Drive, and Meet. It helps teams work
                                smarter, communicate seamlessly, and stay
                                organized from anywhere.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>





                  <div id="menu3" class="tab-pane tab-dd-box container fade">
                    <div className="row pt-md-4 tranning-list gy-3">
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div
                          className="card border-0 h-100 tranning-box-bg1"
                        
                        >
                          <div className="card-body pb-0">
                            <div className="tranning-list-img-box">
                              <img
                                src={LongtrainnigImg1}
                                alt="image"
                                className="img-fluid rounded-3"
                              />
                            </div>
                            <div
                              className="border-0 px-3 py-1 rounded-5 mt-3 fw-bold tranning-type-bg text-white"
                              style={{ width: "fit-content" }}
                            >
                              Tech
                            </div>
                            <div className="my-3">
                              <h4 className="mb-0">
                                Artificial Intelligence & Machine Learning
                              </h4>
                            </div>
                            <div className="traning-list-para">
                              <p className="para-align-justify mb-0">
                                Artificial Intelligence and Machine Learning
                                enable machines to mimic human intelligence and
                                learn from data. They drive innovation across
                                industries by automating tasks and uncovering
                                insights.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div
                          className="card border-0 h-100 tranning-box-bg2"
                         
                        >
                          <div className="card-body pb-0">
                            <div className="tranning-list-img-box">
                              <img
                                src={LongtrainnigImg2}
                                alt="image"
                                className="img-fluid rounded-3"
                              />
                            </div>
                            <div
                              className="border-0 px-3 py-1 rounded-5 mt-3 fw-bold tranning-type-bg text-white"
                              style={{ width: "fit-content" }}
                            >
                              Tech
                            </div>
                            <div className="my-3">
                              <h4 className="mb-0">Blockchain Development</h4>
                            </div>
                            <div className="traning-list-para">
                              <p className="para-align-justify mb-0">
                                Blockchain development focuses on building
                                secure, decentralized systems that ensure
                                transparency and data integrity. It’s
                                revolutionizing industries by enabling trust
                                without the need for intermediaries.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div
                          className="card border-0 h-100 tranning-box-bg1"
                        
                        >
                          <div className="card-body pb-0">
                            <div className="tranning-list-img-box">
                              <img
                                src={LongtrainnigImg3}
                                alt="image"
                                className="img-fluid rounded-3"
                              />
                            </div>
                            <div
                              className="border-0 px-3 py-1 rounded-5 mt-3 fw-bold tranning-type-bg text-white"
                              style={{ width: "fit-content" }}
                            >
                              Tech
                            </div>
                            <div className="my-3">
                              <h4 className="mb-0">Data Science with Python</h4>
                            </div>
                            <div className="traning-list-para">
                              <p className="para-align-justify mb-0">
                                Data Science with Python uses powerful libraries
                                and tools to analyze and interpret complex data.
                                It enables insights, predictions, and automation
                                across various industries.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div
                          className="card border-0 h-100 tranning-box tranning-box-bg2"
                     
                        >
                          <div className="card-body pb-0">
                            <div
                              className="tranning-list-img-box"
                              style={{ overflow: "hidden" }}
                            >
                              <img
                                src={LongtrainnigImg4}
                                alt="image"
                                className="img-fluid rounded-3"
                              />
                            </div>
                            <div
                              className="border-0 px-3 py-1 rounded-5 mt-3 fw-bold tranning-type-bg text-white"
                              style={{ width: "fit-content" }}
                            >
                              Tech
                            </div>
                            <div className="my-3">
                              <h4 className="mb-0">IoT & Embedded Systems</h4>
                            </div>
                            <div className="traning-list-para">
                              <p className="para-align-justify mb-0">
                                IoT and Embedded Systems integrate physical
                                devices with digital networks for smart
                                automation. They enable real-time data
                                collection, control, and enhanced functionality
                                across various industries.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div
                          className="card border-0 h-100 tranning-box tranning-box-bg1"
                        
                        >
                          <div className="card-body pb-0">
                            <div
                              className="tranning-list-img-box"
                              style={{ overflow: "hidden" }}
                            >
                              <img
                                src={LongtrainnigImg5}
                                alt="image"
                                className="img-fluid rounded-3"
                              />
                            </div>
                            <div
                              className="border-0 px-3 py-1 rounded-5 mt-3 fw-bold tranning-type-bg text-white"
                              style={{ width: "fit-content" }}
                            >
                              Tech
                            </div>
                            <div className="my-3">
                              <h4 className="mb-0">
                                Full-Stack Web Development
                              </h4>
                            </div>
                            <div className="traning-list-para">
                              <p className="para-align-justify mb-0">
                                Full-stack web development involves building
                                both the front-end and back-end of web
                                applications. It combines skills in design,
                                coding, and database management to create
                                complete, functional websites.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div
                          className="card border-0 h-100 tranning-box tranning-box-bg1"
                         
                        >
                          <div className="card-body pb-0">
                            <div
                              className="tranning-list-img-box"
                              style={{ overflow: "hidden" }}
                            >
                              <img
                                src={LongtrainnigImg6}
                                alt="image"
                                className="img-fluid rounded-3"
                              />
                            </div>
                            <div
                              className="border-0 px-3 py-1 rounded-5 mt-3 fw-bold tranning-type-bg text-white"
                              style={{ width: "fit-content" }}
                            >
                              Non-Tech
                            </div>
                            <div className="my-3">
                              <h4 className="mb-0">Digital Marketing</h4>
                            </div>
                            <div className="traning-list-para">
                              <p className="para-align-justify mb-0">
                                Digital marketing uses online platforms and
                                strategies to promote products and engage with
                                audiences. It leverages tools like social media,
                                SEO, and email campaigns to drive growth and
                                visibility.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div
                          className="card border-0 h-100 tranning-box tranning-box-bg2"
                      
                        >
                          <div className="card-body pb-0">
                            <div
                              className="tranning-list-img-box"
                              style={{ overflow: "hidden" }}
                            >
                              <img
                                src={LongtrainnigImg7}
                                alt="image"
                                className="img-fluid rounded-3"
                              />
                            </div>
                            <div
                              className="border-0 px-3 py-1 rounded-5 mt-3 fw-bold tranning-type-bg text-white"
                              style={{ width: "fit-content" }}
                            >
                              Non-Tech
                            </div>
                            <div className="my-3">
                              <h4 className="mb-0">
                                UI/UX Design Fundamentals
                              </h4>
                            </div>
                            <div className="traning-list-para">
                              <p className="para-align-justify mb-0">
                                UI/UX design fundamentals focus on creating
                                intuitive, user-friendly interfaces and seamless
                                experiences. They blend aesthetics and
                                functionality to ensure products are both
                                visually appealing and easy to use.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div
                          className="card border-0 h-100 tranning-box tranning-box-bg1"
                 
                        >
                          <div className="card-body pb-0">
                            <div
                              className="tranning-list-img-box"
                              style={{ overflow: "hidden" }}
                            >
                              <img
                                src={LongtrainnigImg8}
                                alt="image"
                                className="img-fluid rounded-3"
                              />
                            </div>
                            <div
                              className="border-0 px-3 py-1 rounded-5 mt-3 fw-bold tranning-type-bg text-white"
                              style={{ width: "fit-content" }}
                            >
                              Non-Tech
                            </div>
                            <div className="my-3">
                              <h4 className="mb-0">
                                Project Management Basics (Agile & Scrum)
                              </h4>
                            </div>
                            <div className="traning-list-para">
                              <p className="para-align-justify mb-0">
                                Project Management basics with Agile and Scrum
                                emphasize iterative progress and team
                                collaboration. They focus on flexibility,
                                continuous improvement, and delivering value in
                                shorter cycles.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div
                          className="card border-0 h-100 tranning-box tranning-box-bg2"
                    
                        >
                          <div className="card-body pb-0">
                            <div
                              className="tranning-list-img-box"
                              style={{ overflow: "hidden" }}
                            >
                              <img
                                src={LongtrainnigImg9}
                                alt="image"
                                className="img-fluid rounded-3"
                              />
                            </div>
                            <div
                              className="border-0 px-3 py-1 rounded-5 mt-3 fw-bold tranning-type-bg text-white"
                              style={{ width: "fit-content" }}
                            >
                              Non-Tech
                            </div>
                            <div className="my-3">
                              <h4 className="mb-0">
                                Content Writing & Blogging
                              </h4>
                            </div>
                            <div className="traning-list-para">
                              <p className="para-align-justify mb-0">
                                Content writing and blogging involve creating
                                engaging, informative, and well-researched
                                articles for online audiences. They help drive
                                traffic, build brand authority, and foster
                                reader connections.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div
                          className="card border-0 h-100 tranning-box tranning-box-bg1"
                       
                        >
                          <div className="card-body pb-0">
                            <div
                              className="tranning-list-img-box"
                              style={{ overflow: "hidden" }}
                            >
                              <img
                                src={LongtrainnigImg10}
                                alt="image"
                                className="img-fluid rounded-3"
                              />
                            </div>
                            <div
                              className="border-0 px-3 py-1 rounded-5 mt-3 fw-bold tranning-type-bg text-white"
                              style={{ width: "fit-content" }}
                            >
                              Non-Tech
                            </div>
                            <div className="my-3">
                              <h4 className="mb-0">FinTech Essentials</h4>
                            </div>
                            <div className="traning-list-para">
                              <p className="para-align-justify mb-0">
                                FinTech essentials involve the integration of
                                technology into financial services to enhance
                                efficiency and accessibility. It includes
                                innovations like digital payments, blockchain,
                                and online banking solutions.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div
                          className="card border-0 h-100 tranning-box tranning-box-bg2"
                         
                        >
                          <div className="card-body pb-0">
                            <div
                              className="tranning-list-img-box"
                              style={{ overflow: "hidden" }}
                            >
                              <img
                                src={LongtrainnigImg11}
                                alt="image"
                                className="img-fluid rounded-3"
                              />
                            </div>
                            <div
                              className="border-0 px-3 py-1 rounded-5 mt-3 fw-bold tranning-type-bg text-white"
                              style={{ width: "fit-content" }}
                            >
                              Non-Tech
                            </div>
                            <div className="my-3">
                              <h4 className="mb-0">E-commerce Management</h4>
                            </div>
                            <div className="traning-list-para">
                              <p className="para-align-justify mb-0">
                                E-commerce management involves overseeing online
                                business operations, from product listings to
                                customer service. It focuses on maximizing
                                sales, improving user experience, and
                                streamlining processes.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default OurOfferings;
