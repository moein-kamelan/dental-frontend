import { useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import Breadcrumb from "../../../components/modules/Main/Breadcrumb/Breadcrumb";
import DoctorCard from "../../../components/modules/Main/DoctorCard/DoctorCard";
import SearchForm from "../../../components/templates/Main/Services/SearchForm";
import { useGetAllDoctors } from "../../../services/useDoctors";
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
      <Breadcrumb searchForm={<SearchForm doctors={doctors} />} />

      <section className="pt-6 pb-12 md:pt-8 md:pb-16 lg:pt-10 lg:pb-20 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <LoadingState text="در حال بارگذاری پزشکان..." />
          ) : hasDoctors ? (
            <>
              {/* Doctors Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
              >
                {doctors?.data?.doctors?.map((doctor: Doctor, index: number) => (
                  <motion.div
                    key={doctor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <DoctorCard doctor={doctor} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {doctors?.meta && doctors.meta.totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-12 md:mt-16"
                >
                <MainPagination
                  meta={doctors?.meta}
                  onPageChange={handlePageChange}
                />
                </motion.div>
              )}
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
