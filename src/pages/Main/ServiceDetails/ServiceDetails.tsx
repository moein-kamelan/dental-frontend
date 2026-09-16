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
import DoctorCard from "../../../components/modules/Main/DoctorCard/DoctorCard";
import { useClinicSelection } from "../../../contexts/useClinicSelection";

function ServiceDetails() {
  const { slug } = useParams();
  const { data: service, isLoading } = useGetServiceByIdentifier(slug as string);
  const { selectedClinic } = useClinicSelection();

  if (isLoading)
    return <LoadingState text="در حال بارگذاری جزئیات خدمات..." />;

  const serviceTitle = service?.data?.service?.title
    ? `${service.data.service.title} - ${selectedClinic?.name || "کلینیک دندان‌پزشکی"}`
    : `خدمات دندانپزشکی - ${selectedClinic?.name || "کلینیک دندان‌پزشکی"}`;

  const serviceDescription = service?.data?.service?.description
    ? service.data.service.description
        .replace(/<[^>]*>/g, "")
        .substring(0, 160)
    : "خدمات تخصصی دندانپزشکی در کلینیک طاها";

  const siteUrl =
    import.meta.env.VITE_SITE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");

  const serviceSchema = service?.data?.service
    ? generateServiceSchema({
        name: service.data.service.title,
        description: serviceDescription,
        image: service.data.service.coverImage
          ? getImageUrl(service.data.service.coverImage)
          : undefined,
        url: `${siteUrl}/services/${slug}`,
        provider: {
          name: selectedClinic?.name || "کلینیک دندان‌پزشکی",
          url: `${siteUrl}/home`,
        },
        areaServed: "ایران",
        serviceType: "خدمات دندانپزشکی",
      })
    : undefined;

  return (
    <>
      <SEO
        title={serviceTitle}
        description={serviceDescription}
        keywords={`${service?.data?.service?.title}, خدمات دندانپزشکی, کلینیک طاها`}
        image={
          service?.data?.service?.coverImage
            ? getImageUrl(service.data.service.coverImage)
            : undefined
        }
        url={`/services/${slug}`}
        structuredData={serviceSchema}
      />

      <Breadcrumb />

      <section className="pt-6 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8 items-start">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              <div className="overflow-hidden">
                <div className="p-8">
                  {/* FLOAT IMAGE */}
                  {service?.data?.service?.coverImage && (
                    <img
                      src={getImageUrl(service.data.service.coverImage)}
                      alt={service?.data?.service?.title}
                      className="
                        md:float-right
                        w-[260px] h-[260px]
                        md:ml-8 mb-6
                        rounded-full
                        object-cover
                        mx-auto md:mx-0
                      "
                    />
                  )}

                  <h3 className="text-[28px] font-estedad-semibold text-dark mb-6">
                    {service?.data?.service?.title}
                  </h3>

                  <div className="text-dark font-estedad-light text-lg leading-relaxed article-content [&_p]:text-justify">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: service?.data?.service?.description,
                      }}
                    />
                  </div>
                </div>
              </div>

              <section className="rounded-3xl border border-main-border-color bg-white p-5 md:p-8 shadow-sm" aria-labelledby="service-doctors-title">
                <div className="mb-6">
                  <span className="text-accent text-sm font-semibold">تیم درمان</span>
                  <h2 id="service-doctors-title" className="mt-2 text-2xl md:text-3xl font-bold text-dark">
                    پزشکان ارائه‌دهنده این خدمت
                  </h2>
                </div>
                {service?.data?.service?.doctors?.length ? (
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {service.data.service.doctors.map((doctor: import("../../../types/types").Doctor) => (
                      <DoctorCard key={doctor.id} doctor={doctor} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl bg-background-warm px-5 py-8 text-center text-paragray">
                    در حال حاضر پزشکی برای این خدمت در این کلینیک ثبت نشده است.
                  </div>
                )}
              </section>

              <CommentsBox serviceId={service?.data?.service?.id} />
              <CommentForm serviceId={service?.data?.service?.id} />
            </div>

            {/* Sidebar */}
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
