import { motion } from "motion/react";
import React, { useState } from "react";
import CustomInput from "../../../../modules/CustomInput/CustomInput";

function ContactForm() {
  const [fullName , setFullName] = useState<string>("")
  const [email , setEmail] = useState<string>("")
  const [phone , setPhone] = useState<string>("")
  const [subject , setSubjec] = useState<string>("")
  const [services , setServices] = useState<string>("")
  const [messages , setMessages] = useState<string>("")
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            className=""
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="">
              <img
                src="images/contact_img.jpg"
                alt="contact"
                className="rounded-2xl max-lg:w-7/10 mx-auto max-h-[450px]"
              />
            </div>
          </motion.div>

          <motion.div
            className=""
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className=" ">
              <h2 className="text-3xl font-bold text-dark mb-8">
                پیام خود را ارسال کنید
              </h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <CustomInput placeholder="نام*" value={fullName}  onChange={setFullName}/>
                  <CustomInput placeholder="ایمیل آدرس*" value={email}  onChange={setEmail}/>
                  <CustomInput placeholder="شماره موبایل*" value={phone}  onChange={setPhone}/>
                  <CustomInput placeholder="موضوع*" value={subject}  onChange={setSubjec}/>
                </div>
                <CustomInput placeholder="خدمات" value={services}  onChange={setServices}/>
                <CustomInput isTextArea rows={5} placeholder="پیام*" className="rounded-xl" value={messages}  onChange={setMessages}/>

               
                <button type="submit" className="max-md:w-full main-btn">
                  ارسال کنید
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
