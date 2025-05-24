import React from 'react'
import FoundationHero from '../../components/champ/Categories/Foundations/FoundationHero'
import DualfocusCurriculum from '../../components/champ/Categories/Foundations/DualfocusCurriculum'
import StrategicLearning from '../../components/champ/Categories/Foundations/StrategicLearning'
import DedicatedpracticeMentorship from '../../components/champ/Categories/Foundations/DedicatedpracticeMentorship'

function FoundationPage() {
  return (
    <div>
      <FoundationHero/>
      <DualfocusCurriculum/>
      <StrategicLearning/>
      <DedicatedpracticeMentorship/>
    </div>
  )
}

export default FoundationPage