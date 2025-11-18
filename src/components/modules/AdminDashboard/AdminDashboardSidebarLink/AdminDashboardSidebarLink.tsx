import React from 'react'
import { NavLink } from 'react-router-dom'

function AdminDashboardSidebarLink({ to, icon, title }: { to: string, icon: string, title: string }) {
  return (
    <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center  space-x-3 p-3 rounded-lg ${
        isActive ? "bg-white/10 hover:bg-white/30" : "hover:bg-white/20"
      }  transition`
    }
  >
    <i className={icon}></i>
    <span>{title}</span>
  </NavLink>
  )
}

export default AdminDashboardSidebarLink
