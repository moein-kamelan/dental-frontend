import React from "react";
import { motion } from "motion/react";
import StatItem from "../../../../components/templates/Main/Dashboard/Profile/StatItem/StatItem";
import { useAppSelector } from "../../../../redux/typedHooks";
import { Link } from "react-router-dom";
import { useGetMyAppointmentsStats } from "../../../../services/useAppointments";

function Profile() {
  const user = useAppSelector((state) => state.user.data);
  
  // Get appointment statistics
  const { data: statsData, isLoading: isLoadingStats } = useGetMyAppointmentsStats();
  const stats = statsData?.data?.stats || {
    approved: 0,
    pending: 0,
    canceled: 0,
  };
  
  return (
    <div className="space-y-3">
      {/* Stats Section - Compact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-base font-bold text-dark mb-2" style={{ fontFamily: 'var(--font-vazir)' }}>
          آمار نوبت‌ها
        </h2>
        <div className="grid grid-cols-3 gap-2 max-w-2xl">
          <StatItem 
            title="تأیید شده"
            value={isLoadingStats ? 0 : stats.approved}
            icon="far fa-check-circle"
            gradient={{
              from: "var(--color-accent)",
              to: "var(--color-tertiary)"
            }}
          />
          <StatItem 
            title="در انتظار"
            value={isLoadingStats ? 0 : stats.pending}
            icon="far fa-clock"
            gradient={{
              from: "var(--color-secondary)",
              to: "var(--color-semantic-yellow)"
            }}
          />
          <StatItem 
            title="لغو شده"
            value={isLoadingStats ? 0 : stats.canceled}
            icon="far fa-times-circle"
            gradient={{
              from: "var(--color-semantic-red)",
              to: "#e63946"
            }}
          />
        </div>
      </motion.div>

      {/* Profile Details - Compact Grid Layout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-50 to-white px-4 py-2.5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold text-dark flex items-center gap-2" style={{ fontFamily: 'var(--font-vazir)' }}>
              <i className="fas fa-user-circle text-accent text-sm"></i>
              <span>اطلاعات پروفایل</span>
            </h3>
            <Link
              to="/dashboard/profile-edit"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors text-xs font-semibold"
              style={{ fontFamily: 'var(--font-vazir)' }}
            >
              <i className="fas fa-edit text-xs"></i>
              <span>ویرایش</span>
            </Link>
          </div>
        </div>

        {/* Profile Content - 2 Column Grid */}
        <div className="p-4">
          <div className="grid md:grid-cols-2 gap-3">
            {/* Name */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-lg shrink-0">
                <i className="fas fa-user text-accent text-xs"></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 mb-0.5" style={{ fontFamily: 'var(--font-vazir)' }}>
                  نام و نام خانوادگی
                </p>
                <p className="text-sm font-semibold text-dark" style={{ fontFamily: 'var(--font-vazir)' }}>
                  {user?.firstName} {user?.lastName}
                </p>
              </div>
            </div>

            {/* National Code */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg shrink-0">
                <i className="fas fa-id-card text-primary text-xs"></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 mb-0.5" style={{ fontFamily: 'var(--font-vazir)' }}>
                  کد ملی
                </p>
                <p className="text-sm font-semibold text-dark" style={{ fontFamily: 'var(--font-vazir)' }}>
                  {user?.nationalCode || <span className="text-gray-400 font-normal">ثبت نشده</span>}
                </p>
              </div>
            </div>

            {/* Gender */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-center w-8 h-8 bg-secondary/10 rounded-lg shrink-0">
                <i className={`fas ${user?.gender === "FEMALE" ? "fa-venus" : "fa-mars"} text-secondary text-xs`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 mb-0.5" style={{ fontFamily: 'var(--font-vazir)' }}>
                  جنسیت
                </p>
                <p className="text-sm font-semibold text-dark" style={{ fontFamily: 'var(--font-vazir)' }}>
                  {user?.gender === "MALE" ? "مرد" : user?.gender === "FEMALE" ? "زن" : <span className="text-gray-400 font-normal">ثبت نشده</span>}
                </p>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-lg shrink-0">
                <i className="fas fa-phone text-accent text-xs"></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 mb-0.5" style={{ fontFamily: 'var(--font-vazir)' }}>
                  شماره همراه
                </p>
                <p className="text-sm font-semibold text-dark" style={{ fontFamily: 'var(--font-vazir)' }}>
                  {user?.phoneNumber || <span className="text-gray-400 font-normal">ثبت نشده</span>}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Profile;
