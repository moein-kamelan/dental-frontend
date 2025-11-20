import React from 'react'
import QuickStats from '../../../components/templates/AdminDashboard/AdminDashboardHome/QuickStats/QuickStats'
import WelcomeSection from '../../../components/templates/AdminDashboard/AdminDashboardHome/WelcomeSection/WelcomeSection'
import AdminDashBaordHeader from '../../../components/modules/AdminDashboard/AdminDashBaordHeader/AdminDashBaordHeader'
import AdditionalStats from '../../../components/templates/AdminDashboard/AdminDashboardHome/AdditionalStats/AdditionalStats'

function AdminDashboardHome() {
  return (
    <main>
    <AdminDashBaordHeader title="نمای کلی داشبورد" />
    <WelcomeSection />
    <QuickStats />
    <AdditionalStats />
    </main>
  )
}

export default AdminDashboardHome
