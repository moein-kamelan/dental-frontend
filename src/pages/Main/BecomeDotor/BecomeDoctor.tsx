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
                    ? "bg-primary text-white shadow-md"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                <i className="fas fa-user-md ml-2"></i>
                دکتر شوید
              </button>
              <button
                onClick={() => setActiveTab("nurse")}
                className={`px-6 py-3 rounded-lg font-estedad-semibold transition-all duration-300 ${
                  activeTab === "nurse"
                    ? "bg-primary text-white shadow-md"
                    : "text-gray-600 hover:text-primary"
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
                <BecomeDoctorContent />
                <BecomeDoctorForm />
              </>
            ) : (
              <>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-[26px] sm:text-[32px] md:text-[44px] text-right font-estedad-verybold text-primary mb-4">
                      نرس شوید !
                    </h3>
                    <p className="text-paragray leading-relaxed mb-4">
                      در کلینیک دندانپزشکی ما، ما متعهد به حفاظت از حریم خصوصی و اطلاعات شخصی شما هستیم.
                      این خط‌مشی رازداری توضیح می‌دهد که در زمان جمع‌آوری، استفاده و
                      اشتراک‌گذاری اطلاعات شما شما از خدمات ما استفاده می کنید با استفاده از
                      خدمات ما، شما با شرایط این حریم خصوصی موافقت می کنید و سیاست به اشتراک
                      گذاری
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-estedad-semibold text-lg md:text-2xl text-primary mb-4">
                      وظایف نرس
                    </h3>
                    <p className="text-paragray leading-relaxed mb-4">
                      کلینیک دندانپزشکی ما، ما متعهد به حفاظت از حریم خصوصی و اطلاعات شخصی شما هستیم.
                      این خط مشی رازداری توضیح می دهد که چگونه ما.
                    </p>
                    <ul className="space-y-4 text-paragray">
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check-circle text-[22px] text-secondary"></i>
                        <span className="font-estedad-semibold">
                          فرم ثبت نام آسان و داده های پردازش را فراهم می کند.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check-circle text-[22px] text-secondary"></i>
                        <span className="font-estedad-semibold">
                          ثبت آسان و پردازش داده ها را برای سازماندهی فراهم می کند.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check-circle text-[22px] text-secondary"></i>
                        <span className="font-estedad-semibold">
                          بیشتر فراهم می کند ثبت نام آسان و.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <BecomeDoctorForm />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default BecomeDoctor;
