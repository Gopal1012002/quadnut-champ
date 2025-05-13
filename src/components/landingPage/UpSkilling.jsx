import React from 'react'
import UpskillHero from './UpskillHero'
import SearchSection from './SearchSection'
import UpskillCatagories from './UpskillCatagories'
import TrendingCourses from '../courses/TrendingCourses'
import TrendsCourse from './Trendscourse'
import TestimonialSection from './TestimonialSection'
import Faq from './Faq'
import Head from '../../layouts/main-layout/head/Head'


function UpSkilling() {
  return (
    <>
    <Head title="Upskilling - Advancing through continuous learning" />
    <UpskillHero/>
    {/* <SearchSection/> */}
    <UpskillCatagories/>
    {/* <TrendsCourse/> */}
    {/* <TestimonialSection/> */}
    <Faq />
    </>
  )
}

export default UpSkilling