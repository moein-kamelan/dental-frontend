import { useGetAppointmentsStats } from "../../../../../services/useAppointments";

function AppointmentsStats() {
  const { data: statsData, isLoading } = useGetAppointmentsStats();

  const stats = statsData?.data?.stats || {
    total: 0,
    pending: 0,
    awaitingApproval: 0,
    finalApproved: 0,
    canceled: 0,
    todayAppointments: 0,
  };

  const statsCards = [
    {
      title: "کل نوبت‌ها",
      value: stats.total,
      icon: "far fa-calendar-check",
      bgColor: "bg-blue-100",
      iconColor: "text-primary",
      isLoading: isLoading,
    },
    {
      title: "در انتظار تأیید منشی",
      value: stats.awaitingApproval ,
      icon: "far fa-clock",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
      isLoading: isLoading,
    },
    {
      title: "تأیید شده",
      value: stats.finalApproved,
      icon: "far fa-check-circle",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      isLoading: isLoading,
    },
    {
      title: "لغو شده",
      value: stats.canceled,
      icon: "far fa-times-circle",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
      isLoading: isLoading,
    },
    {
      title: "نوبت‌های امروز",
      value: stats.todayAppointments,
      icon: "fa fa-calendar-day",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      isLoading: isLoading,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-3  mb-8">
      {statsCards.map((card, index) => (
        <div
          key={index}
          className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition flex items-center justify-between"
        >
          <div className="flex items-center justify-between w-full">
            <div>
              <p className="text-gray-500 font-estedad-light text-[12px]">
                {card.title}
              </p>
              {card.isLoading ? (
                <div className="mt-2 h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                <h3 className="text-xl font-estedad-semibold mt-2">
                  {card.value?.toLocaleString("fa-IR")}
                </h3>
              )}
            </div>
            <div
              className={`w-8 h-8 shrink-0 ${card.bgColor} rounded-lg flex items-center justify-center`}
            >
              <i className={`${card.icon} ${card.iconColor} `}></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AppointmentsStats;
