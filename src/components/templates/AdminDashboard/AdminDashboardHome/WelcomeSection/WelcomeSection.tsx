import React from 'react'

function WelcomeSection() {
  return (
    <div className="bg-linear-to-r from-purple-400 to-purple-600  rounded-xl p-4 md:p-6 mb-8 text-white">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl md:text-2xl font-iran-yekan-bold mb-2">
          خوش آمدید، مدیر عزیز!
        </h2>
        <p className="text-white/80 font-iran-yekan-medium text-sm md:text-base">
          امروز یک روز عالی برای مدیریت کسب و کار شماست.
        </p>
      </div>
      <div className="hidden md:block">
        <i className="fas fa-rocket text-6xl text-white/40"></i>
      </div>
    </div>
  </div>
  )
}

export default WelcomeSection
