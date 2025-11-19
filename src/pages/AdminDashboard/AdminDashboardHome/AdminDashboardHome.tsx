import React from 'react'
import QuickStats from '../../../components/templates/AdminDashboard/AdminDashboardHome/QuickStats/QuickStats'
import WelcomeSection from '../../../components/templates/AdminDashboard/AdminDashboardHome/WelcomeSection/WelcomeSection'
import AdminDashBaordHeader from '../../../components/modules/AdminDashboard/AdminDashBaordHeader/AdminDashBaordHeader'
import AdditionalStats from '../../../components/templates/AdminDashboard/AdminDashboardHome/AdditionalStats/AdditionalStats'

function AdminDashboardHome() {
  return (
    <main>
    <WelcomeSection />
    <AdminDashBaordHeader title="نمای کلی داشبورد" />
    <QuickStats />
    <AdditionalStats />
    </main>
  )
}

export default AdminDashboardHome
