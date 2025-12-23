import { useSearchParams } from "react-router-dom";
import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import SearchForm from "../../../components/templates/Main/Services/SearchForm";
import ServiceCard from "../../../components/modules/Main/ServiceCard/ServiceCard";
import { useGetAllServices } from "../../../services/useServices";
import MainPagination from "../../../components/modules/MainPagination/MainPagination";
import EmptyState from "../../../components/modules/Main/EmptyState/EmptyState";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import type { Service } from "../../../types/types";

function Services() {
  const [searchParams, setSearchParams] = useSearchParams();

  // خواندن مقادیر از URL
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "9");
  const search = searchParams.get("search") || "";
  const categorySlug = searchParams.get("categorySlug") || "";
  const { data: services, isLoading } = useGetAllServices(
    page,
    limit,
    search,
    undefined,
    categorySlug
  );

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      page: newPage.toString(),
      limit: limit.toString(),
      search: search,
      categorySlug: categorySlug,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasServices =
    services?.data?.services && services.data.services.length > 0;

  return (
    <>
      <Breadcrumb searchForm={<SearchForm services={services} />} />

      <section className="pt-10 pb-20">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <LoadingState text="در حال بارگذاری خدمات..." />
          ) : hasServices ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services?.data?.services?.map((service: Service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>

              <div className="mt-10">
                <MainPagination
                  meta={services?.meta}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <EmptyState
              icon="fas fa-tooth"
              title="هیچ سرویسی یافت نشد"
              description="در حال حاضر هیچ خدمت دندانپزشکی ثبت نشده است. لطفاً بعداً مراجعه کنید."
            />
          )}
        </div>
      </section>
    </>
  );
}

export default Services;
