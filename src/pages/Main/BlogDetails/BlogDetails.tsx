import React from "react";
import StickyBox from "react-sticky-box";
import SearchBox from "../../../components/modules/Main/SearchBox/SearchBox";
import CategoryBox from "../../../components/modules/Main/CategoryBox/CategoryBox";
import RecentPosts from "../../../components/modules/Main/RecentPosts/RecentPosts";
import TagsBox from "../../../components/modules/Main/TagsBox/TagsBox";
import CommentForm from "../../../components/modules/Main/CommentForm/CommentForm";
import CommentsBox from "../../../components/modules/Main/CommentsBox/CommentsBox";

function BlogDetails() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8 items-start">
          {/* <!-- Main Content --> */}
          <div className="lg:col-span-3">
            <div className="">
              {/* <!-- Image --> */}
              <div className="relative">
                <img
                  src="/images/blog_dtls-1.jpg"
                  alt="blog"
                  className="w-full  object-cover"
                />
              </div>

              {/* <!-- Header Info --> */}
              <div className="px-8 pt-8 ">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <ul className="flex flex-wrap gap-6 text-paragray">
                    <li>
                      <span className="bg-accent text-white px-4 py-2 rounded-[10px] text-sm font-estedad-light ">
                        پزشکی
                      </span>
                    </li>
                    <li className="flex items-center gap-2 font-estedad-light">
                      <i className="far fa-user text-accent"></i>ادمین
                    </li>
                    <li className="flex items-center gap-2 font-estedad-light">
                      <i className="far fa-calendar-alt text-accent"></i>۲۲ مهر
                      ۱۴۰۲
                    </li>
                  </ul>
                  <ul className="flex flex-wrap gap-6 text-paragray">
                    <li className="flex items-center gap-2 font-estedad-light">
                      <i className="far fa-comment"></i>۰۵
                    </li>
                    <li className="flex items-center gap-2 font-estedad-light">
                      <i className="far fa-heart text-red-500"></i>۲۰
                    </li>
                    <li className="flex items-center gap-2 font-estedad-light">
                      <i className="fas fa-share-alt"></i>۱۵
                    </li>
                  </ul>
                </div>
                <h2 className="text-3xl font-estedad-semibold text-dark">
                  نکات ارزشمندی که به شما کمک می کند بهتر شوید
                </h2>
              </div>

              {/* <!-- Content --> */}
              <div className="p-8 space-y-6 text-paragray leading-relaxed font-estedad-light">
                <p>
                  به طور چشمگیری زیرساخت های جایگزین را از طریق سازگار با عقب
                  گرد ایجاد کنید آمادگی وب به طور کامل بدون استفاده از اطلاعات
                  اقتصادی مناسب ترازهای قابل نگهداری اجباراً الزامات به حداکثر
                  رساندن منابع را از طریق ایجاد کنید بهترین شیوه های تعاونی به
                  صورت مشترک سندیکا
                </p>

                <p>
                  از طریق بهترین شیوه های تعاونی به طور مشترک اطلاعات کلاس جهانی
                  را به اشتراک بگذارید پس از آمادگی وب مبتنی بر اصول. بهترین
                  شبکه‌سازی آجرها و کلیک‌ها اقدامات از طریق اقتصادی سالم.
                </p>

                <p>
                  به طور چشمگیری زیرساخت های جایگزین را از طریق سازگار با عقب
                  گرد ایجاد کنید آمادگی وب به طور کامل بدون استفاده از اطلاعات
                  اقتصادی مناسب ترازهای قابل نگهداری اجباراً الزامات به حداکثر
                  رساندن منابع را از طریق ایجاد کنید بهترین شیوه های تعاونی به
                  صورت مشترک سندیکا
                </p>

                <ul className="space-y-3 font-estedad-semibold text-paragray list-disc list-inside">
                  <li
                    className="flex items-start gap-3 text-paragray 
                                    font-estedad-semibold"
                  >
                    <i className="fas fa-check-circle text-accent text-2xl mt-1"></i>
                    به طور چشمگیری زیرساخت های جایگزین را از طریق سازگار با عقب
                    گرد ایجاد کنید
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
                    شبکه‌سازی مشترک بهترین شیوه‌های آجر-و-کلیک از طریق اقتصادی
                    مناسب
                  </li>
                  <li
                    className="flex items-start gap-3 text-paragray 
                                    font-estedad-semibold"
                  >
                    <i className="fas fa-check-circle text-accent text-2xl mt-1"></i>
                    اجباراً الزامات به حداکثر رساندن منابع را از طریق ایجاد کنید
                  </li>
                </ul>

                <p>
                  از طریق بهترین شیوه های تعاونی به طور مشترک اطلاعات کلاس جهانی
                  را به اشتراک بگذارید پس از آمادگی وب مبتنی بر اصول. بهترین
                  شبکه‌سازی آجرها و کلیک‌ها اقدامات از طریق اقتصادی سالم.
                </p>

                <p>
                  به طور چشمگیری زیرساخت های جایگزین را از طریق سازگار با عقب
                  گرد ایجاد کنید آمادگی وب به طور کامل بدون استفاده از اطلاعات
                  اقتصادی مناسب ترازهای قابل نگهداری اجباراً الزامات به حداکثر
                  رساندن منابع را از طریق ایجاد کنید بهترین شیوه های تعاونی به
                  صورت مشترک سندیکا
                </p>

                {/* <!-- Quote --> */}
                <div className="bg-[#d4af3730] rounded-sm text-dark text-lg font-estedad-semibold border-r-4 border-accent p-6 my-8 italic">
                  "انواع مختلفی از معابر Lorem Ipsum وجود دارد در دسترس است، اما
                  اکثریت به نوعی با تغییراتی در قسمت ها دچار تغییر شده اند.
                </div>

                <p>
                  به سادگی متن ساختگی صنعت چاپ و حروفچینی است. شده است صنعت است
                  متن ساختگی استاندارد از دهه 1500، زمانی که یک چاپگر ناشناس یک
                  گالری از نوع را گرفت و آن را به هم زد تا درست کند یک نوع کتاب
                  نمونه
                </p>

                <p>
                  به سادگی متن ساختگی صنعت چاپ و حروفچینی. لورم ایپسوم دارد این
                  صنعت در حال حاضر یک مانع است متن ساختگی استاندارد از سال 1500
                  تاکنون.
                </p>
              </div>

              {/* <!-- Tags and Share --> */}
              <div className="p-8    flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-3 items-center">
                  <a
                    href="#"
                    className="bg-[#d6dde2] text-paragray text-sm px-4 py-1.5 rounded-full hover:bg-accent hover:text-white transition"
                  >
                    نوبت دهی
                  </a>
                  <a
                    href="#"
                    className="bg-[#d6dde2] text-paragray text-sm px-4 py-1.5 rounded-full hover:bg-accent hover:text-white transition"
                  >
                    دکترها
                  </a>
                  <a
                    href="#"
                    className="bg-[#d6dde2] text-paragray text-sm px-4 py-1.5 rounded-full hover:bg-accent hover:text-white transition"
                  >
                    سلامتی
                  </a>
                  <a
                    href="#"
                    className="bg-[#d6dde2] text-paragray text-sm px-4 py-1.5 rounded-full hover:bg-accent hover:text-white transition"
                  >
                    بیمارستان
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-dark ">اشتراک گذاری : </span>
                  <a
                    href="#"
                    className="text-secondary hover:text-deepblue text-xl"
                  >
                    <i className="fab fa-facebook-f text-base"></i>
                  </a>
                  <a
                    href="#"
                    className="text-secondary hover:text-deepblue text-xl opacity-80"
                  >
                    <i className="fab fa-twitter text-base"></i>
                  </a>
                  <a
                    href="#"
                    className="text-pink-600 hover:text-pink-700 text-xl"
                  >
                    <i className="fab fa-instagram-square text-base"></i>
                  </a>
                </div>
              </div>

              <CommentsBox />
              <CommentForm />
            </div>
          </div>


          <StickyBox
            offsetTop={120}
            offsetBottom={20}
            className="max-lg:!static"
          >
            <div className="lg:col-span-1 space-y-6">
              <SearchBox />
              <CategoryBox />
              <RecentPosts />
              <TagsBox />
            </div>
          </StickyBox>
        </div>
      </div>
    </section>
  );
}

export default BlogDetails;
