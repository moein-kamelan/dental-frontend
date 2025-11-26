import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import ContactInfo from "../../../components/templates/Main/Contact/ContactInfo/ContactInfo";
import ContactForm from "../../../components/templates/Main/AboutUs/ContactForm/ContactForm";
import { useGetAllClinics } from "../../../services/useClinics";
import ClinicMap from "../../../components/templates/Main/AboutUs/GoogleMap/ClinicMap";
import type { Clinic } from "../../../types/types";

function Contact() {
  const { data: clinics } = useGetAllClinics(1, 10);

  return (
    <>
      <Breadcrumb />
      <ContactInfo />
      <ContactForm clinics={clinics?.data?.clinics} />
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 py-12 container mx-auto">
        {clinics?.data?.clinics?.map((clinic: Clinic) => (
          <ClinicMap key={clinic.id} clinic={clinic} />
        ))}
      </div>
    </>
  );
}

export default Contact;
