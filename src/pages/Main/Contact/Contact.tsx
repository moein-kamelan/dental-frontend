import { motion } from "motion/react";
import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import ReviewForm from "../../../components/templates/Main/AboutUs/ReviewForm/ReviewForm";
import { useGetAllClinics } from "../../../services/useClinics";
import ClinicMap from "../../../components/templates/Main/AboutUs/GoogleMap/ClinicMap";
import ContactMessageForm from "../../../components/templates/Main/AboutUs/ContactForm/ContactMessageForm";
import type { Clinic } from "../../../types/types";

function Contact() {
  const { data: clinics } = useGetAllClinics(1, 10);
  const clinicsList = clinics?.data?.clinics || [];

  return (
    <>
      <Breadcrumb />
      
      {/* Main Content: Maps and Contact Form */}
      <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid xl:grid-cols-12 gap-8 ">
              {/* Contact Form Section - Right Side (4 columns) - First in RTL */}
              <div className="xl:col-span-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="lg:sticky lg:top-8"
                >
                  <ContactMessageForm />
                </motion.div>
              </div>

              {/* Maps Section - Left Side (8 columns) - Second in RTL */}
              <div className="xl:col-span-8 flex flex-col gap-y-6 ">
                {clinicsList.length > 0 ? (
                  <motion.div
                    className="grow h-full flex flex-col"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <div className="mb-6 lg:mt-9">
                      <h3 className="text-2xl md:text-3xl font-estedad-bold text-dark mb-2">
              موقعیت کلینیک‌های ما
            </h3>
                      <p className="text-paragray text-sm md:text-base">
                        برای مشاهده موقعیت دقیق کلینیک‌ها روی نقشه کلیک کنید
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 grow ">
                      {clinicsList.map((clinic: Clinic, index: number) => (
                        <motion.div
                          className="flex flex-col "
                          key={clinic.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true, amount: 0.2 }}
                        >
                          <div className="grow bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                            <ClinicMap clinic={clinic} />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center py-16 bg-gray-50 rounded-2xl">
                    <i className="fas fa-map-marker-alt text-4xl text-gray-400 mb-4"></i>
                    <p className="text-paragray font-estedad-light text-lg">
                      کلینیکی ثبت نشده است
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
      </section>

      {/* Review Form Section - Bottom */}
      <section className=" ">
        <ReviewForm />
      </section>
    </>
  );
}

export default Contact;
