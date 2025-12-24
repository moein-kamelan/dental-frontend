import React, { useState } from "react";
import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import BecomeDoctorContent from "../../../components/templates/Main/BecomeDoctor/BecomeDoctorContent/BecomeDoctorContent";
import BecomeDoctorForm from "../../../components/templates/Main/BecomeDoctor/BecomeDoctorForm/BecomeDoctorForm";

function BecomeDoctor() {
  const [activeTab, setActiveTab] = useState<"doctor" | "nurse">("doctor");

  return (
    <>
      <Breadcrumb
        title="همکاری با ما"
        items={[
          { label: "خانه", path: "/home" },
          { label: "همکاری با ما", path: "/become-doctor" },
        ]}
      />
      <section className="pt-2 pb-4 md:pt-3 md:pb-6 ">
        <div className="container mx-auto px-4">
          {/* Tabs */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex bg-gray-100 rounded-lg p-1 gap-2">
              <button
                onClick={() => setActiveTab("doctor")}
                className={`px-6 py-3 rounded-lg font-estedad-semibold transition-all duration-300 ${
                  activeTab === "doctor"
                    ? "bg-accent text-white shadow-md hover:bg-accent/90"
                    : "text-gray-600 hover:text-accent"
                }`}
              >
                <i className="fas fa-user-md ml-2"></i>
                دکتر شوید
              </button>
              <button
                onClick={() => setActiveTab("nurse")}
                className={`px-6 py-3 rounded-lg font-estedad-semibold transition-all duration-300 ${
                  activeTab === "nurse"
                    ? "bg-accent text-white shadow-md hover:bg-accent/90"
                    : "text-gray-600 hover:text-accent"
                }`}
              >
                <i className="fas fa-user-nurse ml-2"></i>
                نرس شوید
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {activeTab === "doctor" ? (
              <>
             <BecomeDoctorContent type="doctor" />
            <BecomeDoctorForm applicationType="DENTIST" />
              </>
            ) : (
              <>
                <BecomeDoctorContent type="nurse" />
                <BecomeDoctorForm applicationType="NURSE" />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default BecomeDoctor;
