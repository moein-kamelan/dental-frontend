import React from 'react'
import Breadcrumb from '../../../components/modules/Main/Breadcrumb/Breadcrumb'
import ContactInfo from '../../../components/templates/Main/Contact/ContactInfo/ContactInfo'
import ContactForm from '../../../components/templates/Main/AboutUs/ContactForm/ContactForm'
import GoogleMap from '../../../components/templates/Main/AboutUs/GoogleMap/GoogleMap'

function Contact() {
  return (
    <>
    <Breadcrumb/>
    <ContactInfo/>
    <ContactForm/>
    <GoogleMap/>
    </>
  )
}

export default Contact