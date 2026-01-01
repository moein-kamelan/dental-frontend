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
  const { data: service, isLoading } = useGetServiceByIdentifier(slug as string);

  if (isLoading)
    return <LoadingState text="در حال بارگذاری جزئیات خدمات..." />;

  const serviceTitle = service?.data?.service?.title
    ? `${service.data.service.title} - کلینیک دندان پزشکی طاها`
    : "خدمات دندانپزشکی - کلینیک دندان پزشکی طاها";

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
          name: "کلینیک دندان پزشکی طاها",
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
