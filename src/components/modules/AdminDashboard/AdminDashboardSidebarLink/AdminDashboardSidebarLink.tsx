import { NavLink } from "react-router-dom";

function AdminDashboardSidebarLink({
  to,
  icon,
  title,
  end,
  onClick,
}: {
  to: string;
  icon: string;
  title: string;
  end?: boolean;
  onClick?: () => void;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center space-x-3 p-3 rounded-lg text-sm whitespace-nowrap ${
          isActive ? "bg-white/10 hover:bg-white/30" : "hover:bg-white/20"
        } transition`
      }
    >
      <i className={icon}></i>
      <span>{title}</span>
    </NavLink>
  );
}

export default AdminDashboardSidebarLink;
