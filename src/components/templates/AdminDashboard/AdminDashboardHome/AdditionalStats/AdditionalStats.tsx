import React from 'react'
import { useGetAdminDashboardStats } from '../../../../../services/useUsers'

function AdditionalStats() {
  const { data: statsData, isLoading } = useGetAdminDashboardStats();

  const serverStatus = statsData?.data?.serverStatus || {
    cpu: 0,
    ram: 0,
    storage: 0
  };

  const systemStatus = statsData?.data?.systemStatus || {
    uptime: 0,
    todayVisits: 0,
    onlineUsers: 0
  };

  const latestTransactions = statsData?.data?.latestTransactions || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
    <div className="bg-white  p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-estedad-semibold mb-4 ">
        وضعیت سرور
      </h3>
      {isLoading ? (
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 ">CPU</span>
            <div className="w-32 bg-gray-200  rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  serverStatus.cpu < 50 ? 'bg-green-500' : 
                  serverStatus.cpu < 80 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${serverStatus.cpu}%` }}
              ></div>
            </div>
            <span className="text-gray-600 ">{serverStatus.cpu}٪</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 ">RAM</span>
            <div className="w-32 bg-gray-200  rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  serverStatus.ram < 50 ? 'bg-blue-500' : 
                  serverStatus.ram < 80 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${serverStatus.ram}%` }}
              ></div>
            </div>
            <span className="text-gray-600 ">{serverStatus.ram}٪</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 ">Storage</span>
            <div className="w-32 bg-gray-200  rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  serverStatus.storage < 50 ? 'bg-purple-500' : 
                  serverStatus.storage < 80 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${serverStatus.storage}%` }}
              ></div>
            </div>
            <span className="text-gray-600 ">{serverStatus.storage}٪</span>
          </div>
        </div>
      )}
    </div>

    <div className="bg-white  p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-estedad-semibold mb-4 ">آخرین تراکنش‌ها</h3>
            {isLoading ? (
              <div className="space-y-4">
                <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : latestTransactions.length > 0 ? (
              <div className="space-y-4">
                {latestTransactions.map((transaction: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center  space-x-3">
                      <div className={`w-8 h-8 ${transaction.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'} rounded-full flex items-center justify-center`}>
                        <i className={`fas ${transaction.type === 'deposit' ? 'fa-arrow-down text-green-500' : 'fa-arrow-up text-red-500'}`}></i>
                      </div>
                      <div>
                        <p className=" ">{transaction.type === 'deposit' ? 'واریز وجه' : 'برداشت وجه'}</p>
                        <p className="text-sm text-gray-500 ">{transaction.time}</p>
                      </div>
                    </div>
                    <span className={transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'}>
                      {transaction.type === 'deposit' ? '+' : '-'}{transaction.amount?.toLocaleString("fa-IR")} تومان
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <i className="fas fa-inbox text-4xl mb-2"></i>
                <p>تراکنشی وجود ندارد</p>
              </div>
            )}
        </div>



    <div className="bg-white  p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-estedad-semibold mb-4 ">
        وضعیت سیستم
      </h3>
      {isLoading ? (
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 ">آپتایم</span>
            <span className="text-green-500">{systemStatus.uptime}٪</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 ">بازدید امروز</span>
            <span className="text-blue-500">{systemStatus.todayVisits?.toLocaleString("fa-IR")}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 ">کاربران آنلاین</span>
            <span className="text-purple-500">{systemStatus.onlineUsers?.toLocaleString("fa-IR")}</span>
          </div>
        </div>
      )}
    </div>
  </div>
  )
}

export default AdditionalStats
