import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useGetAllClinics } from "../../../../services/useClinics";
import { useClinicSelection } from "../../../../contexts/useClinicSelection";
import type { Clinic } from "../../../../types/types";
import { getImageUrl } from "../../../../utils/helpers";

function ClinicSelectionModal() {
  const { isModalOpen, closeModal, selectClinic, selectedClinic } =
    useClinicSelection();
  const { data: clinicsData, isLoading } = useGetAllClinics(1, 100);
  const clinics: Clinic[] = clinicsData?.data?.clinics || [];

  useEffect(() => {
    if (!isModalOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen, closeModal]);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/40 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* عنوان */}
          <motion.p
            className="mb-14 text-center text-white/90 text-2xl sm:text-3xl font-estedad-medium tracking-wide select-none"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
          >
            کلینیک مورد نظر خود را انتخاب کنید
          </motion.p>

          {/* آیکون‌های کلینیک */}
          <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-20 px-4">
            {isLoading
              ? [1, 2].map((i) => (
                  <div key={i} className="flex flex-col items-center gap-5">
                    <div className="h-52 w-52 sm:h-64 sm:w-64 rounded-full bg-white/10 animate-pulse" />
                    <div className="h-6 w-28 rounded bg-white/10 animate-pulse" />
                  </div>
                ))
              : clinics.map((clinic, index) => {
                  const isActive = selectedClinic?.id === clinic.id;
                  return (
                    <motion.button
                      key={clinic.id}
                      onClick={() => selectClinic(clinic)}
                      className="group flex flex-col items-center gap-5 outline-none cursor-pointer"
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        delay: 0.1 + index * 0.08,
                        duration: 0.35,
                        ease: "easeOut",
                      }}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* دایره آیکون */}
                      <div
                        className={`relative flex h-52 w-52 sm:h-64 sm:w-64 items-center justify-center rounded-full border-3 transition-all duration-300 overflow-hidden
                          ${
                            isActive
                              ? "border-accent bg-accent/20 shadow-[0_0_25px_rgba(var(--accent-rgb,34,197,94),0.4)]"
                              : "border-white/25 bg-white/10 group-hover:border-white/50 group-hover:bg-white/20 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                          }`}
                      >
                        {clinic.image ? (
                          <img
                            src={getImageUrl(clinic.image)}
                            alt={clinic.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <i
                            className={`fas fa-clinic-medical text-7xl sm:text-8xl transition-colors duration-300 ${
                              isActive
                                ? "text-accent"
                                : "text-white/70 group-hover:text-white"
                            }`}
                          />
                        )}

                        {/* تیک انتخاب */}
                        {isActive && (
                          <motion.div
                            className="absolute bottom-1 right-1 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 15,
                            }}
                          >
                            <i className="fas fa-check text-lg" />
                          </motion.div>
                        )}
                      </div>

                      {/* اسم کلینیک */}
                      <span
                        className={`text-xl sm:text-2xl font-estedad-medium transition-colors duration-300 max-w-[280px] text-center leading-relaxed ${
                          isActive
                            ? "text-accent"
                            : "text-white/80 group-hover:text-white"
                        }`}
                      >
                        {clinic.name}
                      </span>

                      {/* تعداد پزشکان */}
                      {clinic._count?.doctors ? (
                        <span
                          className={`text-base transition-colors duration-300 ${
                            isActive
                              ? "text-accent/70"
                              : "text-white/40 group-hover:text-white/60"
                          }`}
                        >
                          {clinic._count.doctors} پزشک
                        </span>
                      ) : null}
                    </motion.button>
                  );
                })}
          </div>

          {/* لینک رد کردن */}
          <motion.button
            onClick={closeModal}
            className="mt-14 text-lg text-white/40 hover:text-white/70 transition-colors duration-200 cursor-pointer select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            بعداً انتخاب می‌کنم
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ClinicSelectionModal;
