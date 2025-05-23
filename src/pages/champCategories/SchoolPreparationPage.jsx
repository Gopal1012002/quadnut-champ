import React from 'react'


import SchoolPreparationHeroSection from '../../components/champ/Categories/SchoolPreparation/SchoolPreparationHeroSection'
import PrimaryGrades from '../../components/champ/Categories/SchoolPreparation/PrimaryGrades'
import SeniorGrades from '../../components/champ/Categories/SchoolPreparation/SeniorGrade'
import AcademicToolsSupport from '../../components/champ/Categories/SchoolPreparation/AcademicToolsSupport'

const SchoolPreparationPage = () => {
  return (
    <>
   <SchoolPreparationHeroSection/>
    <PrimaryGrades/>
    <SeniorGrades/>
    <AcademicToolsSupport/>
    </>
  )
}

export default SchoolPreparationPage