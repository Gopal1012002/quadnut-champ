import React from 'react'
import DecorationImg from "../../../assets/img/landing-page/shape.png";
import WhojoinImg from '../../../assets/img/landing-page/whojoin-img1.png'

function WhoJoin() {
    return (
        <>
            <section>
                <div className="container">
                    <div className="row py-md-5 py-4 gy-md-4 gy-3">
                        {/* heading tittle start */}
                        <div className="col-xl-12 text-center d-flex justify-content-center align-items-center flex-column">
                            <div className='tittle-box'>
                                <div className='deco-img d-none d-md-block'>
                                    <img src={DecorationImg} alt="icon" />
                                </div>
                                <h1 className='mb-2 text-center mt-3  fw-bold '>Who Can Join?</h1>
                            </div>
                            <p className='section-heading'>We Cover Both Tech & Non-Tech Verticals</p>
                        </div>
                        {/* heading tittle end */}
                        <div className="col-xl-12 mt-1">
                            <h4 className='text-center'>We cater to students from diverse academic backgrounds</h4>
                        </div>
                        <div className="col-xl-12">
                            <div className="row">
                                <div className="col-lg-12">
                                    {/* box-1 */}
                                    <div className='category-items-box'>
                                        <div className='category-itemss'>
                                            <a href="#">
                                                <span>
                                                    <img src={WhojoinImg} alt="icon" />
                                                </span> BBA
                                            </a>

                                        </div>
                                        <div className='category-itemss item-2'>
                                            <a href="#">
                                                <span>
                                                    <img src={WhojoinImg} alt="icon" />
                                                </span>  BCA
                                            </a>

                                        </div>
                                        <div className='category-itemss item-3'>
                                            <a href="#">
                                                <span>
                                                    <img src={WhojoinImg} alt="icon" />
                                                </span> B.Com
                                            </a>

                                        </div>


                                    </div>





                                    {/* box-2 */}
                                    <div className='category-items-box'>
                                        <div className='category-itemss item-5'>
                                            <a href="#">
                                                <span>
                                                    <img src={WhojoinImg} alt="icon" />
                                                </span> BSc (Non-Tech)
                                            </a>

                                        </div>
                                        <div className='category-itemss item-4'>
                                            <a href="#">
                                                <span>
                                                    <img src={WhojoinImg} alt="icon" />
                                                </span>   BA
                                            </a>

                                        </div>
                                        <div className='category-itemss item-3'>
                                            <a href="#">
                                                <span>
                                                    <img src={WhojoinImg} alt="icon" />
                                                </span> B.Ed
                                            </a>

                                        </div>
                                        <div className='category-itemss item-2'>
                                            <a href="#">
                                                <span>
                                                    <img src={WhojoinImg} alt="icon" />
                                                </span> B.F.A
                                            </a>

                                        </div>

                                    </div>
                                    {/* box-3 */}
                                    <div className='category-items-box'>
                                        <div className='category-itemss '>
                                            <a href="#">
                                                <span>
                                                    <img src={WhojoinImg} alt="icon" />
                                                </span> B.J.M.C
                                            </a>

                                        </div>
                                        <div className='category-itemss item-2'>
                                            <a href="#">
                                                <span>
                                                    <img src={WhojoinImg} alt="icon" />
                                                </span>   MBA
                                            </a>

                                        </div>
                                        <div className='category-itemss item-3'>
                                            <a href="#">
                                                <span>
                                                    <img src={WhojoinImg} alt="icon" />
                                                </span>  M.Com
                                            </a>

                                        </div>
                                        <div className='category-itemss item-4'>
                                            <a href="#">
                                                <span>
                                                    <img src={WhojoinImg} alt="icon" />
                                                </span>   M.A
                                            </a>

                                        </div>
                                        <div className='category-itemss item-5'>
                                            <a href="#">
                                                <span>
                                                    <img src={WhojoinImg} alt="icon" />
                                                </span> M.Ed
                                            </a>

                                        </div>
                                        <div className='category-itemss item-2'>
                                            <a href="#">
                                                <span>
                                                    <img src={WhojoinImg} alt="icon" />
                                                </span>  PGDM
                                            </a>

                                        </div>
                                        <div className='category-itemss item-3'>
                                            <a href="#">
                                                <span>
                                                    <img src={WhojoinImg} alt="icon" />
                                                </span>  MJMC
                                            </a>

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

export default WhoJoin