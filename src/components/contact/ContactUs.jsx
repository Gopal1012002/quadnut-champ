import React from 'react'


import BookSession from '../landingPage/BookSession'
import Head from '../../layouts/main-layout/head/Head'
 
const ContactUs = () => {
    return (<>
        <Head title='Contact Us' />
        <div className="container py-5 mocktest">
            <div className="row align-items-center">
                <div className="col-lg-12 text-center text-lg-center px-5">
                    <h1 className="fw-bold heading"> Get in Touch With QuadNut</h1>
                    <h4 className="subheading"> We’re Here to Help</h4>
                    <p className='text-justify text-lg-justified'>
                       Have a question, suggestion, or need support? Our team at QuadNut is ready to assist you. Whether you're looking for more information about our services, want to collaborate, or simply have a query — just fill out the contact form, and we’ll get back to you as soon as possible.
                    </p>
                    <button className="btn btn-box mt-3 btn-custom">Contact Us</button>
                </div>
                <div className="col-lg-12 py-2 my-2">
                    <BookSession />
                </div>
            </div>
        </div>
    </>)
}
 
export default ContactUs
 