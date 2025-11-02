import React from "react";
import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import FAQItem from "../../../components/modules/Main/FAQItem/FAQItem";

function FAQ() {
  return (
    <>
      <Breadcrumb />

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 ">
            <div className="space-y-4">
              <FAQItem />
              <FAQItem />
              <FAQItem />
            </div>
            <div className="space-y-4">
              <FAQItem />
              <FAQItem />
              <FAQItem />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12 ">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* <!-- Text Section --> */}
            <div className="lg:col-span-1">
              <h3 className=" font-estedad-verybold text-4xl text-dark mb-6">
                آیا سوالی دارید؟
              </h3>
              <div className="space-y-4 text-paragray font-estedad-light text-justify leading-relaxed">
                <p>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است
                </p>
                <p>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد
                </p>
              </div>
              <a
                href="contact.html"
                className="inline-block bg-primary text-white px-8 py-3 rounded-full hover:bg-deepblue   mt-6 main-btn "
              >
                تماس با ما
              </a>
            </div>

            {/* <!-- Form Section --> */}
            <div className="lg:col-span-2">
              <form className=" ">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <input
                      type="text"
                      placeholder="نام"
                      className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="ایمیل آدرس"
                      className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="شماره همراه"
                      className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="موضوع"
                      className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="خدمات"
                    className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="mb-6">
                  <textarea
                    rows={5}
                    placeholder="پیام"
                    className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-primary text-white px-8 py-4 rounded-full hover:bg-deepblue   main-btn max-sm:w-full"
                >
                  ارسال درخواست
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FAQ;
