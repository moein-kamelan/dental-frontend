import React from "react";
import { motion } from "motion/react";
import type { Clinic } from "../../../../types/types";
import { getImageUrl } from "../../../../utils/helpers";

import type { Doctor } from "../../../../types/types";

interface ClinicSelectionStepProps {
  clinics: Clinic[];
  isLoading: boolean;
  onSelectClinic: (clinic: Clinic) => void;
  preselectedDoctor?: Doctor | null;
}

export function ClinicSelectionStep({
  clinics,
  isLoading,
  onSelectClinic,
  preselectedDoctor,
}: ClinicSelectionStepProps) {
  // اگر یک دکتر از قبل انتخاب شده باشد، فقط کلینیک‌هایی که این دکتر در آنها کار می‌کند فعال هستند
  const getIsClinicEnabled = (clinic: Clinic): boolean => {
    if (!preselectedDoctor) return true;
    const doctorClinics = preselectedDoctor.clinics?.map((dc) => dc.clinic.id) || [];
    return doctorClinics.includes(clinic.id);
  };
  return (
    <motion.div
      className="flex h-full flex-col"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      <h2 className="mb-5 text-center text-xl font-iran-sans-bold text-dark">
        انتخاب کلینیک
      </h2>

      {isLoading ? (
        <div className="grid h-full grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-40 rounded-2xl bg-gray-200/70 animate-pulse"
            />
          ))}
        </div>
      ) : clinics.length === 0 ? (
        <div className="flex h-full items-center justify-center text-gray-500">
          کلینیکی یافت نشد
        </div>
      ) : (
        <div className="grid h-full grid-cols-1 sm:grid-cols-2 gap-4">
          {clinics.map((clinic) => {
            const isEnabled = getIsClinicEnabled(clinic);
            return (
            <button
              key={clinic.id}
              onClick={() => isEnabled && onSelectClinic(clinic)}
              disabled={!isEnabled}
              className={`group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border-2 text-right shadow-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 ${
                isEnabled
                  ? "border-gray-200 bg-white/90 hover:-translate-y-0.5 hover:border-accent hover:shadow-xl active:scale-[0.98] cursor-pointer"
                  : "border-gray-300 bg-gray-100/50 opacity-60 cursor-not-allowed"
              }`}
            >
              {/* تصویر کلینیک */}
              <div className="relative h-54 w-full overflow-hidden">
                {clinic.image ? (
                  <>
                    <img
                      src={getImageUrl(clinic.image)}
                      alt={clinic.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute inset-0 bg-accent/40 opacity-0 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-100" />
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/10 via-secondary/10 to-primary/10 text-accent">
                    <i className="fas fa-clinic-medical text-3xl" />
                  </div>
                )}

                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
                  <div className="max-w-[70%]">
                    <div className="inline-flex items-center gap-3 rounded-full bg-secondary px-3 py-1  text-white shadow-lg shadow-black/40">
                      <i className="fas fa-clinic-medical " />
                      <span className="max-w-[150px] truncate font-estedad-medium">
                        {clinic.name}
                      </span>
                    </div>
                  </div>
                  {clinic._count?.doctors ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-2 py-0.5 text-[12px] font-medium text-gray-700 shadow-sm">
                      <i className="fas fa-user-md text-[12px] text-accent" />
                      <span>{clinic._count.doctors} پزشک</span>
                    </span>
                  ) : null}
                </div>
              </div>

              {/* اطلاعات کلینیک */}
              <div className="flex flex-1 flex-col gap-1 bg-gradient-to-b from-accent/10 via-accent/5 to-accent/10 px-4 py-3 text-dark transition-colors duration-300 group-hover:from-accent/20 group-hover:via-accent/10 group-hover:to-accent/20 ">
                {clinic.description && (
                  <p className="line-clamp-2  leading-relaxed text-gray-700 font-iran-sans-bold text-sm">
                    {clinic.description}
                  </p>
                )}

                <div className="mt-1 space-y-2  text-gray-700">
                  {clinic.address && (
                    <div className="flex items-center gap-1.5">
                      <span className="mt-0.5 inline-flex size-5 items-center justify-center rounded-full bg-white/40  text-accent">
                        <i className="fas fa-map-marker-alt" />
                      </span>
                      <span className="line-clamp-2 font-estedad-light text-[12px]  ">
                        {clinic.address}
                      </span>
                    </div>
                  )}
                  {clinic.phoneNumber && (
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex size-5 items-center justify-center rounded-full bg-white/40  text-accent">
                        <i className="fas fa-phone" />
                      </span>
                      <span
                        dir="ltr"
                        className="font-estedad-light tracking-wide text-[12px]  "
                      >
                        {clinic.phoneNumber}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {!isEnabled && preselectedDoctor && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-500/20 backdrop-blur-sm z-10">
                  <span className="text-sm font-estedad-medium text-gray-600 bg-white/90 px-3 py-1 rounded-full">
                    این پزشک در این کلینیک فعال نیست
                  </span>
                </div>
              )}
            </button>
          );
          })}
        </div>
      )}
    </motion.div>
  );
}
