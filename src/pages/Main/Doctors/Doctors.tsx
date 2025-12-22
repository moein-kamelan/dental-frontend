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
  const totalDoctors = doctors?.meta?.total || 0;

  return (
    <>
      <Breadcrumb searchForm={<SearchForm doctors={doctors} />} />

      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container mx-auto px-4">
          {/* Header Section with Stats */}
          {!isLoading && hasDoctors && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 md:mb-12"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-estedad-verybold text-dark mb-2">
                    تیم پزشکی ما
                  </h2>
                  <p className="text-paragray font-estedad-medium">
                    با پزشکان متخصص و مجرب ما آشنا شوید
                  </p>
                </div>
                <div className="flex items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl">
                    <i className="fas fa-user-md text-accent text-xl"></i>
                  </div>
                  <div>
                    <p className="text-2xl font-estedad-bold text-dark">
                      {totalDoctors}
                    </p>
                    <p className="text-xs text-paragray font-estedad-medium">
                      پزشک فعال
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {isLoading ? (
            <LoadingState text="در حال بارگذاری پزشکان..." />
          ) : hasDoctors ? (
            <>
              {/* Doctors Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
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
