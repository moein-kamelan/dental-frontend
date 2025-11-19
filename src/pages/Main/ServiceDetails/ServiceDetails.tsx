import React from "react";
import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import StickyBox from "react-sticky-box";
import SearchBox from "../../../components/modules/Main/SearchBox/SearchBox";
import CategoryBox from "../../../components/modules/Main/CategoryBox/CategoryBox";
import RecentPosts from "../../../components/modules/Main/RecentPosts/RecentPosts";
import TagsBox from "../../../components/modules/Main/TagsBox/TagsBox";
import CommentsBox from "../../../components/modules/Main/CommentsBox/CommentsBox";
import CommentForm from "../../../components/modules/Main/CommentForm/CommentForm";
import { useParams } from "react-router-dom";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import { useGetServiceByIdentifier } from "../../../services/useServices";
function ServiceDetails() {
  const { slug } = useParams();
  const { data: service, isLoading } = useGetServiceByIdentifier(
    slug as string
  );
  console.log(service);

  if (isLoading) return <LoadingState text="در حال بارگذاری جزئیات خدمات..." />;

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
                  <div className="absolute bottom-0 left-8 transform  translate-y-1/3 size-17.5 bg-accent text-white rounded-lg flex items-center justify-center ">
                    <i className="fas fa-heartbeat text-3xl "></i>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-[28px] font-estedad-semibold text-dark mb-6">
                    {service?.data?.service?.title}
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
                        <i className="fas fa-check-circle text-accent text-2xl mt-1"></i>
                        به طور چشمگیری زیرساخت های جایگزین را از طریق سازگار با
                        عقب گرد ایجاد کنید
                      </li>
                      <li
                        className="flex items-start gap-3 text-paragray 
                                    font-estedad-semibold"
                      >
                        <i className="fas fa-check-circle text-accent text-2xl mt-1"></i>
                        اطلاعات اقتصادی مناسب بدون ترازهای قابل نگهداری
                      </li>
                      <li
                        className="flex items-start gap-3 text-paragray 
                                    font-estedad-semibold"
                      >
                        <i className="fas fa-check-circle text-accent text-2xl mt-1"></i>
                        به طور مشترک اطلاعات کلاس جهانی را پس از اصول محوری به
                        اشتراک بگذارید
                      </li>
                      <li
                        className="flex items-start gap-3 text-paragray 
                                    font-estedad-semibold"
                      >
                        <i className="fas fa-check-circle text-accent text-2xl mt-1"></i>
                        شبکه‌سازی مشترک بهترین شیوه‌های آجر-و-کلیک از طریق
                        اقتصادی مناسب
                      </li>
                      <li
                        className="flex items-start gap-3 text-paragray 
                                    font-estedad-semibold"
                      >
                        <i className="fas fa-check-circle text-accent text-2xl mt-1"></i>
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
                    <i className="fas fa-eye text-4xl text-accent "></i>
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
                    <i className="fas fa-heartbeat text-4xl text-accent "></i>
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
                    <i className="fas fa-capsules text-4xl text-accent "></i>
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
                  className="flex-1 bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-accent hover:shadow-lg transition flex items-center justify-center gap-3"
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
                  className="flex-1 bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-accent hover:shadow-lg transition flex items-center justify-center gap-3"
                >
                  <i className="fas fa-file-word text-3xl text-secondary"></i>
                  <div>
                    <span className="font-estedad-light text-paragray">
                      {" "}
                      دانلود{" "}
                    </span>
                    <span className="font-estedad-light text-dark">Doc</span>
                  </div>
                </a>
              </div>

              <CommentsBox />
              <CommentForm />
            </div>

            {/* <!-- Sidebar --> */}

            <StickyBox
              offsetTop={120}
              offsetBottom={20}
              className="max-lg:!static"
            >
              <div className="lg:col-span-1 space-y-6">
                <SearchBox isServiceCategory />
                <CategoryBox
                  categories={service?.data?.service?.categories || []}
                  isServiceCategory
                />
                <RecentPosts />
              </div>
            </StickyBox>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServiceDetails;
