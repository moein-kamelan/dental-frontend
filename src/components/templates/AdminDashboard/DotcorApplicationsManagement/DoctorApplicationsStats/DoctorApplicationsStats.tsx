import { useGetDoctorApplicationsStats } from "../../../../../services/useDoctorApplications";

function DoctorApplicationsStats() {
  const { data: statsData, isLoading } = useGetDoctorApplicationsStats();

  const stats = statsData?.data || {
    total: 0,
    read: 0,
    unread: 0,
  };

  const statsCards = [
    {
      title: "کل درخواست‌ها",
      value: stats.total,
      icon: "far fa-envelope",
      bgColor: "bg-blue-100",
      iconColor: "text-primary",
      isLoading: isLoading,
    },
    {
      title: "خوانده شده",
      value: stats.read,
      icon: "far fa-envelope-open",
      bgColor: "bg-green-100",
      iconColor: "text-green-500",
      isLoading: isLoading,
    },
    {
      title: "خوانده نشده",
      value: stats.unread,
      icon: "far fa-envelope",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-500",
      isLoading: isLoading,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
      {statsCards.map((card, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 font-estedad-light text-sm">
                {card.title}
              </p>
              {card.isLoading ? (
                <div className="mt-2 h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                <h3 className="text-2xl font-estedad-semibold mt-2">
                  {card.value.toLocaleString("fa-IR")}
                </h3>
              )}
            </div>
            <div
              className={`w-12 h-12 shrink-0 ${card.bgColor} rounded-lg flex items-center justify-center`}
            >
              <i className={`${card.icon} ${card.iconColor} text-xl`}></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DoctorApplicationsStats;
