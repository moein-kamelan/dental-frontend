import { NavLink } from "react-router-dom";

function AdminDashboardSidebarLink({
  to,
  icon,
  title,
  end,
}: {
  to: string;
  icon: string;
  title: string;
  end?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center  space-x-3 p-3 rounded-lg text-sm ${
          isActive ? "bg-white/10 hover:bg-white/30" : "hover:bg-white/20"
        }  transition`
      }
    >
      <i className={icon}></i>
      <span>{title}</span>
    </NavLink>
  );
}

export default AdminDashboardSidebarLink;
