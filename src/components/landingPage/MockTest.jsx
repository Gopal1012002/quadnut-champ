import React, { useEffect, useState } from 'react'
import './mocktest/mocktest.css'
import { MockTestHero } from './mocktest/MockTestHero'
import { MockTestCard } from './mocktest/MockTestCard'
import WhyMockTest from './mocktest/WhyMockTest'
import WhatMockTest from './mocktest/WhatMockTest'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import { GetMockTestList } from '../../services/AppServices'
import { toast } from 'react-toastify'
import Head from '../../layouts/main-layout/head/Head'
import RSelect from "../../components/common/RSelect";
import Pagination from '../common/Pagination'
import { CourseBlockShimmer } from '../shimmer/Shimmer'

const MockTest = () => {
    const [listType, setListType] = useState("grid")
    const [filterData, setFilterData] = useState({ page: 1, limit: 6, keyword: "", type: "" });
    const [mockData, setMockData] = useState();
    const [pagianatedData, setPagianatedData] = useState();
    const [isLoading, setLoading] = useState({ search: false, load: false })
    
  const paginate = (pageNumber) =>{};
    useEffect(() => {
        setLoading({ ...isLoading, load: true });
        GetMockTestList({ page: 1, limit: 6 }).then((res) => {
            setMockData(res?.data?.data)
            setPagianatedData(res?.data)
        }).catch((err) => {
            toast.error(err?.response?.data?.message)
        }).finally(() => {
            setLoading({ ...isLoading, load: false });
        })
    }, [])

    const paginationCourseList = (limit, page) => {
        setFilterData({ ...filterData, page: page, });
        // setRefreshFlag(true);
    };

    const onHandleSearch = () => {
        setLoading({ ...isLoading, search: true });
        GetMockTestList(filterData).then((res) => {
            setMockData(res?.data?.data)
            setPagianatedData(res?.data)
        }).catch((err) => {
            toast.error(err?.response?.data?.message)
        }).finally(() => {
            setLoading({ ...isLoading, search: false });
        })
    }

    return (
        <>
            <Head title="Mock Tests" />
            <MockTestHero />
            <WhatMockTest />
            <WhyMockTest />
            <div className="container pb-5">
                <div className="d-flex align-items-center justify-content-between my-4">
                    <span className='d-flex flex-row align-items-center'>
                        <div className="view-icons">
                            <Link
                                to={""}
                                className={`grid-view ${listType === "grid" ? "active" : ""
                                    }`}
                                onClick={() => setListType("grid")}
                            >
                                <i className="feather-grid"></i>
                            </Link>
                        </div>
                        <div className="show-result ">
                            <h4>
                                Showing {pagianatedData?.pageStartCount}-
                                {pagianatedData?.pageEndCount} of{" "}
                                {pagianatedData?.totalItemCount} results
                            </h4>
                        </div>
                    </span>
                    <div className="d-flex flex-row align-items-center">
                        <div className=" search-group me-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search our mock tests"
                                onChange={(e) => setFilterData({ ...filterData, "keyword": e.target.value })}
                            />
                        </div>
                        <div className="">
                            <div className="input-block select-form mb-0">
                                <RSelect
                                    options={[
                                        {
                                            value: "Paid",
                                            label: "Paid",
                                        },
                                        {
                                            value: "Free",
                                            label: "Free",
                                        }
                                    ]}
                                    onChange={(selectedOption) => {
                                        setFilterData({ ...filterData, type: selectedOption.value })
                                    }}
                                />
                            </div>
                        </div>


                        <Button className="btn btn-sm bg-primary p-2 ms-2 border-0" onClick={onHandleSearch} disabled={isLoading?.search}>
                            <FaSearch /> {!isLoading.search ? "Search" : "Searching..."}
                        </Button>
                    </div>
                </div>

                {
                    isLoading?.load ? <div className="course-row-shimmer">
                      <CourseBlockShimmer />
                      <CourseBlockShimmer />
                      <CourseBlockShimmer />
                      <CourseBlockShimmer />
                      <CourseBlockShimmer />
                      <CourseBlockShimmer />
                      <CourseBlockShimmer />
                      <CourseBlockShimmer />
                    </div> :

                <>
                <div className="row g-4">
                    {
                        mockData?.length > 0 && mockData?.map((mock, index) => {
                            return (<div key={index} className="col-lg-4">
                                <MockTestCard data={mock} />
                            </div>)
                        })
                    }
                </div>
                <Pagination
                    runFunction={paginationCourseList}
                    itemPerPage={6}
                    totalItems={pagianatedData?.totalItemCount || 0}
                    paginate={paginate}
                    currentPage={Number(pagianatedData?.currentPageNumber)}
                    pageStartCount={pagianatedData?.pageStartCount}
                    pageEndCount={pagianatedData?.pageEndCount}
                /></> }
            </div>
       
        </>
    )
}
export default MockTest