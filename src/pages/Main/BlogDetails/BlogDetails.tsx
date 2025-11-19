import StickyBox from "react-sticky-box";
import SearchBox from "../../../components/modules/Main/SearchBox/SearchBox";
import CategoryBox from "../../../components/modules/Main/CategoryBox/CategoryBox";
import RecentPosts from "../../../components/modules/Main/RecentPosts/RecentPosts";
import CommentForm from "../../../components/modules/Main/CommentForm/CommentForm";
import CommentsBox from "../../../components/modules/Main/CommentsBox/CommentsBox";
import { useParams } from "react-router-dom";
import { useGetArticleBySlug } from "../../../services/useArticles";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import BlogDetailsHeader from "../../../components/templates/BlogDetails/BlogDetailsHeader/BlogDetailsHeader";
import BlogDetailsTagsAndShare from "../../../components/templates/BlogDetails/BlogDetailsTagsAndShare/BlogDetailsTagsAndShare";
import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";

function BlogDetails() {
  const { slug } = useParams();

  const { data: article, isLoading } = useGetArticleBySlug(slug as string);
  console.log(article);

  if (isLoading) return <LoadingState text="در حال بارگذاری مقاله..." />;

  return (
    <>
      <Breadcrumb />
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8 items-start">
            {/* <!-- Main Content --> */}
            <div className="lg:col-span-3">
              <div className="">
                {/* <!-- Image --> */}
                <div className="relative">
                  <img
                    src={
                      article?.data?.article?.coverImage ||
                      "/images/blog_dtls-1.jpg"
                    }
                    alt="blog"
                    className="w-full  object-cover"
                  />
                </div>

                {/* <!-- Header Info --> */}
                <BlogDetailsHeader
                  title={article?.data?.article?.title}
                  categories={article?.data?.article?.categories}
                  createdAt={article?.data?.article?.createdAt}
                  updatedAt={article?.data?.article?.updatedAt}
                  commentsCount={article?.data?.article?.commentsCount}
                  likesCount={article?.data?.article?.likesCount}
                  sharesCount={article?.data?.article?.sharesCount}
                  author={article?.data?.article?.author}
                />

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
                    از طریق بهترین شیوه های تعاونی به طور مشترک اطلاعات کلاس
                    جهانی را به اشتراک بگذارید پس از آمادگی وب مبتنی بر اصول.
                    بهترین شبکه‌سازی آجرها و کلیک‌ها اقدامات از طریق اقتصادی
                    سالم.
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
                      شبکه‌سازی مشترک بهترین شیوه‌های آجر-و-کلیک از طریق اقتصادی
                      مناسب
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
                    از طریق بهترین شیوه های تعاونی به طور مشترک اطلاعات کلاس
                    جهانی را به اشتراک بگذارید پس از آمادگی وب مبتنی بر اصول.
                    بهترین شبکه‌سازی آجرها و کلیک‌ها اقدامات از طریق اقتصادی
                    سالم.
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
                    "انواع مختلفی از معابر Lorem Ipsum وجود دارد در دسترس است،
                    اما اکثریت به نوعی با تغییراتی در قسمت ها دچار تغییر شده
                    اند.
                  </div>

                  <p>
                    به سادگی متن ساختگی صنعت چاپ و حروفچینی است. شده است صنعت
                    است متن ساختگی استاندارد از دهه 1500، زمانی که یک چاپگر
                    ناشناس یک گالری از نوع را گرفت و آن را به هم زد تا درست کند
                    یک نوع کتاب نمونه
                  </p>

                  <p>
                    به سادگی متن ساختگی صنعت چاپ و حروفچینی. لورم ایپسوم دارد
                    این صنعت در حال حاضر یک مانع است متن ساختگی استاندارد از سال
                    1500 تاکنون.
                  </p>
                </div>

                <BlogDetailsTagsAndShare />
                <div className="flex flex-col gap-8">
                  <CommentsBox />
                  <CommentForm />
                </div>
              </div>
            </div>

            <StickyBox className="max-lg:static!">
              <div className="lg:col-span-1 space-y-6">
                <SearchBox isArticleCategory />
                <CategoryBox
                  categories={article?.data?.article?.categories}
                  isArticleCategory
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

export default BlogDetails;
