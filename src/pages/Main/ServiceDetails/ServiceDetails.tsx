import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import StickyBox from "react-sticky-box";
import SearchBox from "../../../components/modules/Main/SearchBox/SearchBox";
import CategoryBox from "../../../components/modules/Main/CategoryBox/CategoryBox";
import RecentPosts from "../../../components/modules/Main/RecentPosts/RecentPosts";
import CommentsBox from "../../../components/modules/Main/CommentsBox/CommentsBox";
import CommentForm from "../../../components/modules/Main/CommentForm/CommentForm";
import { useParams } from "react-router-dom";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import { useGetServiceByIdentifier } from "../../../services/useServices";
import { getImageUrl } from "../../../utils/helpers";
import SEO from "../../../components/SEO/SEO";
import { generateServiceSchema } from "../../../utils/structuredData";
function ServiceDetails() {
  const { slug } = useParams();
  const { data: service, isLoading } = useGetServiceByIdentifier(
    slug as string
  );
  console.log(service);

  if (isLoading) return <LoadingState text="در حال بارگذاری جزئیات خدمات..." />;

  const serviceTitle = service?.data?.service?.title
    ? `${service.data.service.title} - کلینیک دندان پزشکی طاها`
    : "خدمات دندانپزشکی - کلینیک دندان پزشکی طاها";
  const serviceDescription = service?.data?.service?.description
    ? service.data.service.description.replace(/<[^>]*>/g, "").substring(0, 160)
    : "خدمات تخصصی دندانپزشکی در کلینیک طاها";

  // Structured Data for Service
  const siteUrl = import.meta.env.VITE_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "");
  const serviceSchema = service?.data?.service ? generateServiceSchema({
    name: service.data.service.title,
    description: serviceDescription,
    image: service.data.service.coverImage ? getImageUrl(service.data.service.coverImage) : undefined,
    url: `${siteUrl}/services/${slug}`,
    provider: {
      name: "کلینیک دندان پزشکی طاها",
      url: `${siteUrl}/home`,
    },
    areaServed: "ایران",
    serviceType: "خدمات دندانپزشکی",
  }) : undefined;

  return (
    <>
      <SEO
        title={serviceTitle}
        description={serviceDescription}
        keywords={`${service?.data?.service?.title}, خدمات دندانپزشکی, کلینیک طاها`}
        image={service?.data?.service?.coverImage ? getImageUrl(service.data.service.coverImage) : undefined}
        url={`/services/${slug}`}
        structuredData={serviceSchema}
      />
      <Breadcrumb />

      <section className="pt-6 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8 items-start">
            {/* <!-- Main Content --> */}
            <div className="lg:col-span-3 space-y-8">
              <div className=" overflow-hidden">
                {/* <!-- Main Image with Icon --> */}
                <div className="relative ">
                  {service?.data?.service?.coverImage ? (
                    <img
                      src={getImageUrl(service.data.service.coverImage)} 
                      alt={service?.data?.service?.title}
                      className="w-8/10 mx-auto h-150 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="w-8/10 mx-auto h-150 rounded-xl bg-gray-100 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <div className="flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                            <i className="fas fa-image text-gray-400 text-2xl"></i>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm font-estedad-light">
                          تصویر خدمات
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <h3 className="text-[28px] font-estedad-semibold text-dark mb-6">
                    {service?.data?.service?.title}
                  </h3>

                  <div className="text-dark font-estedad-light text-lg leading-relaxed article-content">
                    <div
                      className="py-8 px-10"
                      dangerouslySetInnerHTML={{
                        __html: service?.data?.service?.description,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* <!-- Gallery --> */}
              {/* <div className="grid md:grid-cols-3 gap-6">
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
              </div> */}

              {/* <!-- Process Cards --> */}
              {/* <div className="grid md:grid-cols-3 gap-6">
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
              </div> */}

              {/* <!-- Download Links --> */}
              {/* <div className="flex gap-4">
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
              </div> */}

              <CommentsBox serviceId={service?.data?.service?.id} />
              <CommentForm serviceId={service?.data?.service?.id} />
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
                <RecentPosts
                  services={service?.data?.service?.services || []}
                />
              </div>
            </StickyBox>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServiceDetails;
