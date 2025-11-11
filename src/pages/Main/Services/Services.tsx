import { useState } from "react";
import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import SearchForm from "../../../components/templates/Main/Services/SearchForm";
import ServiceCard from "../../../components/modules/Main/ServiceCard/ServiceCard";
import { useGetAllServices } from "../../../hooks/useServices";
import MainPagination from "../../../components/modules/Main/MainPagination/MainPagination";
import EmptyState from "../../../components/modules/Main/EmptyState/EmptyState";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import type { Service } from "../../../types/types";

function Services() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data: services, isLoading } = useGetAllServices(page, limit);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasServices =
    services?.data?.services && services.data.services.length > 0;

  return (
    <>
      <Breadcrumb />
      <SearchForm services={services} />

      <section className="py-20">
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

              <MainPagination
                meta={services?.meta}
                onPageChange={handlePageChange}
              />
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
