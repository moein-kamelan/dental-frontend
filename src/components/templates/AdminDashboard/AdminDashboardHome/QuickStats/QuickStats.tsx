import React from 'react'
import { useGetAdminDashboardStats } from '../../../../../services/useUsers'

function QuickStats() {
  const { data: statsData, isLoading } = useGetAdminDashboardStats();

  const usersStats = statsData?.data?.users || {
    total: 0,
    changePercent: 0,
    isIncrease: true
  };

  const appointmentsStats = statsData?.data?.appointments || {
    total: 0,
    changePercent: 0,
    isIncrease: true
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 md:gap-6 mb-8">
    <div className="bg-white  p-6 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 font-estedad-lightbold">
            کل کاربران
          </p>
          {isLoading ? (
            <div className="mt-2 h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
          ) : (
            <h3 className="text-2xl font-estedad-semibold mt-2 ">
              {usersStats.total?.toLocaleString("fa-IR")}
            </h3>
          )}
        </div>
        <div className="w-12 h-12 shrink-0 bg-blue-100  rounded-lg flex items-center justify-center">
          <i className="fas fa-users text-primary text-xl"></i>
        </div>
      </div>
      {!isLoading && (
        <div className={`mt-4 flex items-center ${usersStats.isIncrease ? 'text-green-500' : 'text-red-500'}`}>
          <i className={`fas ${usersStats.isIncrease ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
          <span className="mr-2">
            {Math.abs(usersStats.changePercent)}٪ {usersStats.isIncrease ? 'افزایش' : 'کاهش'}
          </span>
        </div>
      )}
    </div>

    <div className="bg-white  p-6 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 font-estedad-lightbold text-nowrap md:text-sm">
            نوبت های رزرو شده{" "}
            <span className="relative -top-2 text-xs  ">
              (ماه اخیر )
            </span>
          </p>
          {isLoading ? (
            <div className="mt-2 h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
          ) : (
            <h3 className="text-2xl font-estedad-semibold mt-2 ">
              {appointmentsStats.total?.toLocaleString("fa-IR")}
            </h3>
          )}
        </div>
        <div className="w-12 h-12 shrink-0 bg-orange-100  rounded-lg flex items-center justify-center">
          <i className="fas fa-tasks text-orange-500 text-xl"></i>
        </div>
      </div>
      {!isLoading && (
        <div className={`mt-4 flex items-center ${appointmentsStats.isIncrease ? 'text-green-500' : 'text-red-500'}`}>
          <i className={`fas ${appointmentsStats.isIncrease ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
          <span className="mr-2">
            {Math.abs(appointmentsStats.changePercent)}٪ {appointmentsStats.isIncrease ? 'افزایش' : 'کاهش'}
          </span>
        </div>
      )}
    </div>

  </div>
  )
}

export default QuickStats
