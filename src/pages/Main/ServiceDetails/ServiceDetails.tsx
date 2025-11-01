import React from "react";
import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import StickyBox from "react-sticky-box"

function ServiceDetails() {
  return (
    <>
      <Breadcrumb />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8 items-start">
            {/* <!-- Main Content --> */}
            <div className="lg:col-span-3 space-y-8">
              <div className=" overflow-hidden">
                {/* <!-- Main Image with Icon --> */}
                <div className="relative ">
                  <img
                    src="/images/service_dtls-1.jpg"
                    alt="service"
                    className="w-full  object-cover aspect-2/1 rounded-[10px]"
                  />
                  <div className="absolute bottom-0 left-8 transform  translate-y-1/3 size-17.5 bg-primary text-white rounded-lg flex items-center justify-center ">
                    <i className="fas fa-heartbeat text-3xl "></i>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-[28px] font-estedad-semibold text-dark mb-6">
                    جراحی تست قلب هولتر
                  </h3>

                  <div className="space-y-6 font-estedad-light text-paragray leading-relaxed">
                    <p>
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                      و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه
                      روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای
                      شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف
                      بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه
                      درصد گذشته حال و آینده
                    </p>

                    <p>
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                      و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه
                      روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای
                      شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف
                      بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه
                      درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می
                      طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه
                      ای علی الخصوص طراحان خلاقی
                    </p>

                    <ul className="space-y-3 font-estedad-semibold text-paragray list-disc list-inside">
                      <li
                        className="flex items-start gap-3 text-paragray 
                                    font-estedad-semibold"
                      >
                        <i className="fas fa-check-circle text-primary text-2xl mt-1"></i>
                        به طور چشمگیری زیرساخت های جایگزین را از طریق سازگار با
                        عقب گرد ایجاد کنید
                      </li>
                      <li
                        className="flex items-start gap-3 text-paragray 
                                    font-estedad-semibold"
                      >
                        <i className="fas fa-check-circle text-primary text-2xl mt-1"></i>
                        اطلاعات اقتصادی مناسب بدون ترازهای قابل نگهداری
                      </li>
                      <li
                        className="flex items-start gap-3 text-paragray 
                                    font-estedad-semibold"
                      >
                        <i className="fas fa-check-circle text-primary text-2xl mt-1"></i>
                        به طور مشترک اطلاعات کلاس جهانی را پس از اصول محوری به
                        اشتراک بگذارید
                      </li>
                      <li
                        className="flex items-start gap-3 text-paragray 
                                    font-estedad-semibold"
                      >
                        <i className="fas fa-check-circle text-primary text-2xl mt-1"></i>
                        شبکه‌سازی مشترک بهترین شیوه‌های آجر-و-کلیک از طریق
                        اقتصادی مناسب
                      </li>
                      <li
                        className="flex items-start gap-3 text-paragray 
                                    font-estedad-semibold"
                      >
                        <i className="fas fa-check-circle text-primary text-2xl mt-1"></i>
                        اجباراً الزامات به حداکثر رساندن منابع را از طریق ایجاد
                        کنید
                      </li>
                    </ul>

                    <p>
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                      و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه
                      روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای
                      شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف
                      بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه
                      درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می
                      طلبد
                    </p>

                    <h3 className="text-[28px] font-estedad-semibold text-dark mt-8 mb-4">
                      توانایی‌ها
                    </h3>

                    <p>
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                      و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه
                      روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای
                      شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف
                      بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه
                      درصد گذشته حال و آینده
                    </p>

                    <p>
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                      و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه
                      روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای
                      شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف
                      بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه
                      درصد گذشته حال و آینده
                    </p>
                  </div>
                </div>
              </div>

              {/* <!-- Gallery --> */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="relative group cursor-pointer ">
                  <img
                    src="/images/service_dtls-3.jpg"
                    alt="gallery"
                    className="rounded-2xl w-full  object-cover h-[250px]"
                  />
                  <div className="absolute inset-0 bg-primary/70 opacity-0 invisible group-hover:visible group-hover:opacity-100  transition rounded-2xl flex items-center justify-center scale-80 group-hover:scale-100 duration-500">
                    <div className="rounded-full border-2 border-white flex items-center justify-center p-5 ">
                      <i className="fa fa-plus text-white text-4xl   "></i>
                    </div>
                  </div>
                </div>
                <div className="relative group cursor-pointer ">
                  <img
                    src="/images/service_dtls-4.jpg"
                    alt="gallery"
                    className="rounded-2xl w-full  object-cover h-[250px]"
                  />
                  <div className="absolute inset-0 bg-primary/70 opacity-0 invisible group-hover:visible group-hover:opacity-100  transition rounded-2xl flex items-center justify-center scale-80 group-hover:scale-100 duration-500">
                    <div className="rounded-full border-2 border-white flex items-center justify-center p-5 ">
                      <i className="fa fa-plus text-white text-4xl   "></i>
                    </div>
                  </div>
                </div>
                <div className="relative group cursor-pointer ">
                  <img
                    src="/images/service_dtls-5.jpg"
                    alt="gallery"
                    className="rounded-2xl w-full  object-cover h-[250px]"
                  />
                  <div className="absolute inset-0 bg-primary/70 opacity-0 invisible group-hover:visible group-hover:opacity-100  transition rounded-2xl flex items-center justify-center scale-80 group-hover:scale-100 duration-500">
                    <div className="rounded-full border-2 border-white flex items-center justify-center p-5 ">
                      <i className="fa fa-plus text-white  text-4xl   "></i>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Process Cards --> */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className=" rounded-2xl  text-center ">
                  <div className="w-20 h-20  bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-eye text-4xl text-primary "></i>
                  </div>
                  <h5 className="font-estedad-verybold text-dark text-2xl mb-3">
                    نوبت دهی
                  </h5>
                  <p className="text-paragray font-estedad-light">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                  </p>
                </div>
                <div className=" rounded-2xl  text-center ">
                  <div className="w-20 h-20  bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-heartbeat text-4xl text-primary "></i>
                  </div>
                  <h5 className="font-estedad-verybold text-dark text-2xl mb-3">
                    چکاپ فوری
                  </h5>
                  <p className="text-paragray font-estedad-light">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                  </p>
                </div>
                <div className=" rounded-2xl  text-center ">
                  <div className="w-20 h-20  bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-capsules text-4xl text-primary "></i>
                  </div>
                  <h5 className="font-estedad-verybold text-dark text-2xl mb-3">
                    پیگیری آزمایش
                  </h5>
                  <p className="text-paragray font-estedad-light">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                  </p>
                </div>
              </div>

              {/* <!-- Download Links --> */}
              <div className="flex gap-4">
                <a
                  href="#"
                  className="flex-1 bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-primary hover:shadow-lg transition flex items-center justify-center gap-3"
                >
                  <i className="fas fa-file-pdf text-3xl text-red-600"></i>
                  <div>
                    <span className="font-estedad-light text-paragray">
                      {" "}
                      دانلود{" "}
                    </span>
                    <span className="font-estedad-light text-dark">PDF</span>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex-1 bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-primary hover:shadow-lg transition flex items-center justify-center gap-3"
                >
                  <i className="fas fa-file-word text-3xl text-blue-600"></i>
                  <div>
                    <span className="font-estedad-light text-paragray">
                      {" "}
                      دانلود{" "}
                    </span>
                    <span className="font-estedad-light text-dark">Doc</span>
                  </div>
                </a>
              </div>

              {/* <!-- Comments --> */}
              <div className="section-border p-4 md:p-7.5">
                <div></div>
                <h2 className="text-2xl font-estedad-semibold ">
                  مجموع دیدگاه (۰۴)
                </h2>

                <div className="space-y-6">
                  <div className="border-t-[1.5px] border-[rgba(94,91,91,0.09)] pt-6 mt-6 ">
                    <div className="grid  sm:grid-cols-[auto_1fr]  gap-4 ">
                      <img
                        src="../../../../public/images/comment-1.png"
                        alt="reviewer"
                        className="size-20 rounded-full shrink-0 justify-self-center"
                      />
                      <div className="flex-1  space-y-2.5">
                        <div className="flex items-start justify-between  flex-wrap  gap-4">
                          <div className="space-y-2.5">
                            <h4 className="font-estedad-semibold text-xl">
                              محسن دادار
                            </h4>

                            <div className="flex gap-1 text-yellow-400">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                          </div>

                          <span className="text-sm text-paragray flex items-center gap-x-1.5 font-estedad-light">
                            <i className="far fa-clock "></i>۴ ساعت پیش
                          </span>
                        </div>
                        <p className="text-paragray font-estedad-light">
                          اما اکثریت دچار تغییراتی به شکلی شده اند، با شوخی
                          تزریقی، یا کلمات خود را حتی کمی باور پذیر به نظر می
                          رسد.
                        </p>
                        <a
                          href="#"
                          className="bg-primary text-white inline-flex items-center gap-2 py-2 px-5 rounded-full"
                        >
                          <i className="fa fa-reply-all mr-1"></i>پاسخ
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="border-t-[1.5px] border-[rgba(94,91,91,0.09)] pt-6 mt-6 ">
                    <div className="grid  sm:grid-cols-[auto_1fr] gap-4 mr-16">
                      <img
                        src="../../../../public/images/comment-1.png"
                        alt="reviewer"
                        className="size-20 rounded-full shrink-0 justify-self-center"
                      />
                      <div className="flex-1 space-y-2.5">
                        <div className="flex items-start justify-between flex-wrap gap-4">
                          <div className="space-y-2.5">
                            <h4 className="font-estedad-semibold text-xl">
                              محسن دادار
                            </h4>

                            <div className="flex gap-1 text-yellow-400">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                          </div>

                          <span className="text-sm text-paragray flex items-center gap-x-1.5 font-estedad-light">
                            <i className="far fa-clock "></i>۴ ساعت پیش
                          </span>
                        </div>
                        <p className="text-paragray font-estedad-light">
                          اما اکثریت دچار تغییراتی به شکلی شده اند، با شوخی
                          تزریقی، یا کلمات خود را حتی کمی باور پذیر به نظر می
                          رسد.
                        </p>
                        <a
                          href="#"
                          className="bg-primary text-white inline-flex items-center gap-2 py-2 px-5 rounded-full"
                        >
                          <i className="fa fa-reply-all mr-1"></i>پاسخ
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="border-t-[1.5px] border-[rgba(94,91,91,0.09)] pt-6 mt-6 ">
                    <div className="grid  sm:grid-cols-[auto_1fr]  gap-4 ">
                      <img
                        src="../../../../public/images/comment-1.png"
                        alt="reviewer"
                        className="size-20 rounded-full shrink-0 justify-self-center"
                      />
                      <div className="flex-1  space-y-2.5">
                        <div className="flex items-start justify-between  flex-wrap  gap-4">
                          <div className="space-y-2.5">
                            <h4 className="font-estedad-semibold text-xl">
                              محسن دادار
                            </h4>

                            <div className="flex gap-1 text-yellow-400">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                          </div>

                          <span className="text-sm text-paragray flex items-center gap-x-1.5 font-estedad-light">
                            <i className="far fa-clock "></i>۴ ساعت پیش
                          </span>
                        </div>
                        <p className="text-paragray font-estedad-light">
                          اما اکثریت دچار تغییراتی به شکلی شده اند، با شوخی
                          تزریقی، یا کلمات خود را حتی کمی باور پذیر به نظر می
                          رسد.
                        </p>
                        <a
                          href="#"
                          className="bg-primary text-white inline-flex items-center gap-2 py-2 px-5 rounded-full"
                        >
                          <i className="fa fa-reply-all mr-1"></i>پاسخ
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="border-t-[1.5px] border-[rgba(94,91,91,0.09)] pt-6 mt-6 ">
                    <div className="grid  sm:grid-cols-[auto_1fr] gap-4 mr-16">
                      <img
                        src="../../../../public/images/comment-1.png"
                        alt="reviewer"
                        className="size-20 rounded-full shrink-0 justify-self-center"
                      />
                      <div className="flex-1 space-y-2.5">
                        <div className="flex items-start justify-between flex-wrap gap-4">
                          <div className="space-y-2.5">
                            <h4 className="font-estedad-semibold text-xl">
                              محسن دادار
                            </h4>

                            <div className="flex gap-1 text-yellow-400">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                          </div>

                          <span className="text-sm text-paragray flex items-center gap-x-1.5 font-estedad-light">
                            <i className="far fa-clock "></i>۴ ساعت پیش
                          </span>
                        </div>
                        <p className="text-paragray font-estedad-light">
                          اما اکثریت دچار تغییراتی به شکلی شده اند، با شوخی
                          تزریقی، یا کلمات خود را حتی کمی باور پذیر به نظر می
                          رسد.
                        </p>
                        <a
                          href="#"
                          className="bg-primary text-white inline-flex items-center gap-2 py-2 px-5 rounded-full"
                        >
                          <i className="fa fa-reply-all mr-1"></i>پاسخ
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="border-t-[1.5px] border-[rgba(94,91,91,0.09)] pt-6 mt-6 ">
                    <div className="grid  sm:grid-cols-[auto_1fr]  gap-4 ">
                      <img
                        src="../../../../public/images/comment-1.png"
                        alt="reviewer"
                        className="size-20 rounded-full shrink-0 justify-self-center"
                      />
                      <div className="flex-1  space-y-2.5">
                        <div className="flex items-start justify-between  flex-wrap  gap-4">
                          <div className="space-y-2.5">
                            <h4 className="font-estedad-semibold text-xl">
                              محسن دادار
                            </h4>

                            <div className="flex gap-1 text-yellow-400">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                          </div>

                          <span className="text-sm text-paragray flex items-center gap-x-1.5 font-estedad-light">
                            <i className="far fa-clock "></i>۴ ساعت پیش
                          </span>
                        </div>
                        <p className="text-paragray font-estedad-light">
                          اما اکثریت دچار تغییراتی به شکلی شده اند، با شوخی
                          تزریقی، یا کلمات خود را حتی کمی باور پذیر به نظر می
                          رسد.
                        </p>
                        <a
                          href="#"
                          className="bg-primary text-white inline-flex items-center gap-2 py-2 px-5 rounded-full"
                        >
                          <i className="fa fa-reply-all mr-1"></i>پاسخ
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="border-t-[1.5px] border-[rgba(94,91,91,0.09)] pt-6 mt-6 ">
                    <div className="grid  sm:grid-cols-[auto_1fr] gap-4 mr-16">
                      <img
                        src="../../../../public/images/comment-1.png"
                        alt="reviewer"
                        className="size-20 rounded-full shrink-0 justify-self-center"
                      />
                      <div className="flex-1 space-y-2.5">
                        <div className="flex items-start justify-between flex-wrap gap-4">
                          <div className="space-y-2.5">
                            <h4 className="font-estedad-semibold text-xl">
                              محسن دادار
                            </h4>

                            <div className="flex gap-1 text-yellow-400">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                          </div>

                          <span className="text-sm text-paragray flex items-center gap-x-1.5 font-estedad-light">
                            <i className="far fa-clock "></i>۴ ساعت پیش
                          </span>
                        </div>
                        <p className="text-paragray font-estedad-light">
                          اما اکثریت دچار تغییراتی به شکلی شده اند، با شوخی
                          تزریقی، یا کلمات خود را حتی کمی باور پذیر به نظر می
                          رسد.
                        </p>
                        <a
                          href="#"
                          className="bg-primary text-white inline-flex items-center gap-2 py-2 px-5 rounded-full"
                        >
                          <i className="fa fa-reply-all mr-1"></i>پاسخ
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Comment Form --> */}
              <div className="p-4 md:p-7.5 section-border rounded-[10px]">
                <h2 className="text-2xl font-estedad-semibold text-dark mb-6">
                  ارسال دیدگاه
                </h2>
                <div className="flex gap-1 mb-6">
                  <i className="fas fa-star text-yellow-400 text-xl cursor-pointer"></i>
                  <i className="fas fa-star text-yellow-400 text-xl cursor-pointer"></i>
                  <i className="fas fa-star text-yellow-400 text-xl cursor-pointer"></i>
                  <i className="fas fa-star text-yellow-400 text-xl cursor-pointer"></i>
                  <i className="fas fa-star text-yellow-400 text-xl cursor-pointer"></i>
                </div>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="نام..."
                      className="px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"
                    />
                    <input
                      type="email"
                      placeholder="ایمیل..."
                      className="px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-primary"
                    />
                  </div>
                  <textarea
                    rows={4}
                    placeholder="ارسال دیدگاه..."
                    className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary"
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-primary text-white px-8 py-4 rounded-full hover:bg-deepblue transition font-semibold"
                  >
                    ارسال سریع
                  </button>
                </form>
              </div>
            </div>

            {/* <!-- Sidebar --> */}

            <StickyBox offsetTop={120} offsetBottom={20} className="max-lg:!static">
   <div className="lg:col-span-1 space-y-6">
              {/* <!-- Search --> */}
              <div className="section-border  p-6">
                <h4 className="font-estedad-semibold text-2xl text-dark mb-4">جستجو</h4>
                <form className="flex justify-between items-center gap-2    px-3 py-2.5 border-2 border-[#5e5b5b17] rounded-full w-full">
                  <input
                    type="text"
                    placeholder="جستجو..."
                    className=" focus:outline-none h-10 w-2/3"
                  />
                  <button className="bg-primary text-white size-9 rounded-full hover:bg-secondary transition shrink-0">
                    <i className="fas fa-search"></i>
                  </button>
                </form>
              </div>

              {/* <!-- Categories --> */}
              <div className=" section-border text-dark p-6">
                <h5 className="main-header">دسته‌بندی</h5>
                <ul className="space-y divide-y-2 divide-main-border-color">
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-between text-dark hover:text-primary transition p-4"
                    >
                      اورولوژی
                      <i className="fa fa-angle-left text-paragray"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-between text-dark hover:text-primary transition p-4"
                     >
                      متخصص زنان و
                      زایمان
                      <i className="fa fa-angle-left text-paragray"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-between text-dark hover:text-primary transition p-4"
                    >
                      پزشکی
                      <i className="fa fa-angle-left text-paragray"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-between text-dark hover:text-primary transition p-4"
                    >
                      اطفال
                      <i className="fa fa-angle-left text-paragray"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-between text-dark hover:text-primary transition p-4"
                    >
                      تست کرونا
                      <i className="fa fa-angle-left text-paragray"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-between text-dark hover:text-primary transition p-4"
                    >
                      دندانپزشکی
                      <i className="fa fa-angle-left text-paragray"></i>
                    </a>
                  </li>
                </ul>
              </div>

              {/* <!-- Recent Posts --> */}
              <div className="section-border  p-6">
                <h5 className="main-header mb-4">پست‌های جدید</h5>
                <ul className="space-y-4">
                  <li className="flex gap-3  ">
                    <img
                      src="/images/blog_dtls-2.jpg"
                      alt="post"
                      className="size-20 rounded-lg object-cover shrink-0"
                    />
                    <div className="">
                      <p className="font-estedad-light text-paragray mb-2 ">
                        <i className="fas fa-calendar-alt ml-1 text-primary "></i>۲۲ مهر ۱۴۰۲
                      </p>
                      <a
                        href="#"
                        className=" text-dark hover:text-primary w-full line-clamp-2 "
                      >
                        نکات ارزشمندی یبشسیب سشبسی یبشیسب
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3  ">
                    <img
                      src="/images/blog_dtls-2.jpg"
                      alt="post"
                      className="size-20 rounded-lg object-cover shrink-0"
                    />
                    <div>
                      <p className="font-estedad-light text-paragray mb-2 ">
                        <i className="fas fa-calendar-alt ml-1 text-primary "></i>۲۲ مهر ۱۴۰۲
                      </p>
                      <a
                        href="#"
                        className=" text-dark hover:text-primary w-full line-clamp-2"
                      >
                        نکات ارزشمندی
                      </a>
                    </div>
                  </li>
                 
                </ul>
              </div>

              {/* tags */}
                <div className=" section-border text-dark p-6">
                <h5 className="main-header">برچسب مقالات</h5>
                <ul className="flex items-center flex-wrap gap-2">
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-between text-dark hover:text-primary transition py-2 px-4 rounded-full border-2 border-main-border-color text-sm"
                    >
                      اورولوژی
                      
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-between text-dark hover:text-primary transition py-2 px-4 rounded-full border-2 border-main-border-color text-sm"
                     >
                      متخصص زنان و
                      زایمان
                      
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-between text-dark hover:text-primary transition py-2 px-4 rounded-full border-2 border-main-border-color text-sm"
                    >
                      پزشکی
                      
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-between text-dark hover:text-primary transition py-2 px-4 rounded-full border-2 border-main-border-color text-sm"
                    >
                      اطفال
                      
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-between text-dark hover:text-primary transition py-2 px-4 rounded-full border-2 border-main-border-color text-sm"
                    >
                      تست کرونا
                      
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-between text-dark hover:text-primary transition py-2 px-4 rounded-full border-2 border-main-border-color text-sm"
                    >
                      دندانپزشکی
                      
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            </StickyBox>
            
            
         
          </div>
        </div>
      </section>
    </>
  );
}

export default ServiceDetails;
