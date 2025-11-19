import { useSearchParams } from "react-router-dom";
import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import DoctorCard from "../../../components/modules/Main/DoctorCard/DoctorCard";
import SearchForm from "../../../components/templates/Main/Services/SearchForm";
import { useGetAllDoctors } from "../../../hooks/useDoctors";
import MainPagination from "../../../components/modules/MainPagination/MainPagination";
import EmptyState from "../../../components/modules/Main/EmptyState/EmptyState";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import type { Doctor } from "../../../types/types";

function Doctors() {
  const [searchParams, setSearchParams] = useSearchParams();

  // خواندن مقادیر از URL
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "8");
  const search = searchParams.get("search") || "";

  const { data: doctors, isLoading } = useGetAllDoctors(page, limit, search);

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      page: newPage.toString(),
      limit: limit.toString(),
      search: search,
    });
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

              <div className="mt-10">
                <MainPagination
                  meta={doctors?.meta}
                  onPageChange={handlePageChange}
                />
              </div>
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
