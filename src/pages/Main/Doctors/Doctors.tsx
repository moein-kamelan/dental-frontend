import { useState } from "react";
import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import DoctorCard from "../../../components/modules/Main/DoctorCard/DoctorCard";
import SearchForm from "../../../components/templates/Main/Services/SearchForm";
import { useGetAllDoctors } from "../../../hooks/useDoctors";
import MainPagination from "../../../components/modules/Main/MainPagination/MainPagination";
import EmptyState from "../../../components/modules/Main/EmptyState/EmptyState";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import type { Doctor } from "../../../types/types";

function Doctors() {
  const [page, setPage] = useState(1);
  const [limit] = useState(12);

  const { data: doctors, isLoading } = useGetAllDoctors(page, limit);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasDoctors = doctors?.data?.doctors && doctors.data.doctors.length > 0;

  return (
    <>
      <Breadcrumb />
      <SearchForm doctors={doctors} />

      <section className="py-20">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <LoadingState text="در حال بارگذاری پزشکان..." />
          ) : hasDoctors ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {doctors?.data?.doctors?.map((doctor: Doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>

              <MainPagination
                meta={doctors?.meta}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <EmptyState
              icon="fas fa-user-md"
              title="هیچ پزشکی یافت نشد"
              description="در حال حاضر هیچ پزشکی در سیستم ثبت نشده است. لطفاً بعداً مراجعه کنید."
            />
          )}
        </div>
      </section>
    </>
  );
}

export default Doctors;
