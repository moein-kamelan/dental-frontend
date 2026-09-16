import { useAppSelector } from '../../../../../redux/typedHooks'
import { formatPersianNameForGreeting } from '../../../../../utils/helpers'

function WelcomeSection() {
  const { data: user } = useAppSelector((state) => state.user);
  const formattedName = formatPersianNameForGreeting(user?.firstName);
  const isSecretary = user?.role === "SECRETARY";
  
  return (
    <div className="admin-welcome rounded-2xl p-5 md:p-7 mb-8">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl md:text-2xl font-iran-yekan-bold mb-2">خوش آمدید {formattedName ? `${formattedName} عزیز` : ''}!
        </h2>
        {isSecretary ? (
          <p className="text-white/80 font-iran-yekan-medium text-sm md:text-base">
            آماده‌اید تا نوبت‌های امروز را مدیریت کنید؟
          </p>
        ) : (
        <p className="text-white/80 font-iran-yekan-medium text-sm md:text-base">
          امروز یک روز عالی برای مدیریت کسب و کار شماست.
        </p>
        )}
      </div>
      <div className="hidden md:block">
        <i className="fas fa-tooth text-6xl text-white/40"></i>
      </div>
    </div>
  </div>
  )
}

export default WelcomeSection
