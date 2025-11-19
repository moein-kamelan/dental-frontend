import React from "react";
import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import ContactInfo from "../../../components/templates/Main/Contact/ContactInfo/ContactInfo";
import ContactForm from "../../../components/templates/Main/AboutUs/ContactForm/ContactForm";
import GoogleMap from "../../../components/templates/Main/AboutUs/GoogleMap/ClinicMap";
import { useGetAllClinics } from "../../../services/useClinics";
import ClinicMap from "../../../components/templates/Main/AboutUs/GoogleMap/ClinicMap";

function Contact() {
  const { data: clinics } = useGetAllClinics(1, 10);

  return (
    <>
      <Breadcrumb />
      <ContactInfo />
      <ContactForm clinics={clinics?.data?.clinics} />
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 py-12 container mx-auto">
        <ClinicMap clinics={clinics?.data?.clinics} />
        <ClinicMap clinics={clinics?.data?.clinics} />
      </div>
    </>
  );
}

export default Contact;
