import React from 'react'
import IitHero from '../../components/champ/Categories/IIT-JEE/IitHero'
import Head from "../../../src/layouts/main-layout/head/Head"
import LiveRecorded from '../../components/champ/Categories/IIT-JEE/LiveRecorded'
import EverythingFoundation from '../../components/champ/Categories/IIT-JEE/EverythingFoundation'
import MotivationalGuidance from '../../components/champ/Categories/IIT-JEE/MotivationalGuidance'

function IITPage() {
    return (
        <>
            <Head title='IIT-JEE' />
            <IitHero />
            <LiveRecorded />
            <EverythingFoundation />
            <MotivationalGuidance />
        </>
    )
}

export default IITPage