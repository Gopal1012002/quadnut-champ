import React, { useEffect, useState } from 'react'
import DecorationImg from '../../assets/img/landing-page/shape.png'
import NontcechImg from '../../assets/img/landing-page/tech-courses.png'
import TechImg from '../../assets/img/landing-page/nontech-courses.png'
import { GetParentCategoryList, useAuthCompany } from '../../services/AppServices';
import conf from '../../conf/conf';
import { Link } from 'react-router-dom';
import techCourseIcon from '../../assets/img/landing-page/software-development.jpeg';
import nonTechCourseIcon from '../../assets/img/landing-page/management.jpeg'

function UpskillCatagories() {
    const [isLoading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState();
    const {companyData} = useAuthCompany();
    const urlPrefix = `${conf.apiAssetUrl}/${companyData?.frontFolder}/thumbnail`;
    useEffect(() => {
        setLoading(true);
        GetParentCategoryList().then((res) => {
            setCategoryData(res?.data);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }, [])
    return (
        <>
            <section className='mt-md-5 mb-5'>
                <div className="container">
                    <div className="row gy-3">
                        {/* heading tittle start */}
                        <div className="col-xl-12 text-center d-flex justify-content-center align-items-center flex-column">
                            <div className='tittle-box'>
                                <div className='deco-img d-none d-md-block'>
                                    <img 
                                        src={DecorationImg}
                                    alt="icon" />
                                </div>
                                <h1 className='mb-2 fw-bold'>Explore Our Categories</h1>
                            </div>
                            <p>Smart Solutions for Your Needs</p>
                        </div>
                        {/* heading tittle end */}
                        {
                            !isLoading && categoryData?.length > 0 ?
                                categoryData?.map((category, index) => {
                                    return (<div key={index} className="col-md-6">
                                        <div className="card w-100 h-100 rounded-0">
                                            <div className="card-body p-4 w-100 d-flex flex-column align-items-center justify-content-center">
                                                <img src={`${urlPrefix}/${category?.image}`}      
                                                    onError={(e)=>e.target.src = techCourseIcon}
                                                    alt="img" className='img-fluid' 
                                                    style={{ width: "450px" }} />
                                                <p className='mt-3 text-center'> {category?.description} </p>
                                                <div className='mt-3'>
                                                    <Link to={`/category-list/${category?.catId}`}>
                                                        <div className="btn btn-primary py-2 px-3 rounded-5">{category?.name}</div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)
                                })
                                : <></>
                        }

                    </div>
                </div>

            </section>
        </>
    )
}

export default UpskillCatagories