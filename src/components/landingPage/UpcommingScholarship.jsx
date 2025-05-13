import React, { useEffect } from 'react'
import OwlCarousel from "react-owl-carousel";
import AOS from "aos";
import "aos/dist/aos.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import defaultThumbnail from "../../assets/img/landing-page/scholarship-1.png"
import { Link } from 'react-router-dom';
import { useAuthCompany } from '../../services/AppServices';
import conf from '../../conf/conf';

function UpcommingScholarship({ data }) {
    const {companyData} = useAuthCompany();

    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <>
            {
                data && data?.length > 0 &&
                <section>
                    <div className="container">
                        <div className="row">
                            <OwlCarousel
                                className="owl-theme mentoring-course mt-0"
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
                                    600: { items: data?.length >= 2 ? 2 : data?.length },
                                    800: { items: data?.length >= 3 ? 3 : data?.length },
                                    1000: { items: data?.length >= 4 ? 4 : data?.length },
                                }}
                            >
                                {data?.length > 0 && data?.map((item, index) => {
                                    return (<div className="col-md-12 col-lg-12" key={index}>
                                        <div class="card exm-time-box">
                                            <div className="up-coming-schlor-ship">
                                                {
                                                    item?.thumbnailFileName ? 
                                                    <img
                                                    className="card-img-top"
                                                    src={`${conf.apiAssetUrl}/${companyData?.frontFolder}/thumbnail/${item?.thumbnailFileName}`}
                                                    onError={(e) => { e.target.src = defaultThumbnail; }}
                                                    alt="Card image"
                                                /> : 
                                                <img
                                                    className="card-img-top"
                                                    src={defaultThumbnail}
                                                    alt="Card image"
                                                />
                                                }
                                            </div>


                                            <div class="card-body">
                                                <h6 class="card-title fw-bold">{item?.scholarshipName} </h6>
                                                <div className='paragraph-container'>
                                                    <p class="card-text">{item?.scholarshipShortDescription}</p>

                                                </div>
                                                <Link to={`/scholarship/${item?.slug}`} className='mt-3'>
                                                    <button class="cta">
                                                        <span>Register</span>
                                                        <svg width="15px" height="10px" viewBox="0 0 13 10">
                                                            <path d="M1,5 L11,5"></path>
                                                            <polyline points="8 1 12 5 8 9"></polyline>
                                                        </svg>
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>)
                                })}
                            </OwlCarousel>
                        </div>
                    </div>
                </section>}

        </>
    )
}

export default UpcommingScholarship