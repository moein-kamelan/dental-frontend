import React from "react";
import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import BecomeDoctorContent from "../../../components/templates/Main/BecomeDoctor/BecomeDoctorContent/BecomeDoctorContent";
import BecomeDoctorForm from "../../../components/templates/Main/BecomeDoctor/BecomeDoctorForm/BecomeDoctorForm";

function BecomeDoctor() {
  return (
    <>
      <Breadcrumb
        title="ثبت نام پزشک"
        items={[
          { label: "خانه", path: "/home" },
          { label: "ثبت نام پزشک", path: "/become-doctor" },
        ]}
      />
      <section className="pt-2 pb-4 md:pt-3 md:pb-6 ">
        <div className="container mx-auto px-4">
          <div className="mb-12"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
             <BecomeDoctorContent />
            <BecomeDoctorForm />
           
          </div>
        </div>
      </section>
    </>
  );
}

export default BecomeDoctor;
