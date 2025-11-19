import { NavLink, useNavigate } from "react-router-dom";

function AdminDashBaordHeader({ title, backButton }: { title?: string, backButton?: boolean }) {
  const navigate = useNavigate();
  if (!title && !backButton) {
    return null;
  }
  return (
    <div className="relative pb-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        {backButton ? (
          <button className="purple-btn" onClick={() => navigate(-1)}>
            <i className="fas fa-arrow-right"></i> <span>بازگشت</span>
          </button>
        ) : (

        <h2 className="text-xl md:text-2xl font-estedad-semibold relative inline-block group">
          <span className="relative z-10 bg-linear-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
            {title}
          </span>
        </h2>
        )}
        <div className="flex items-center  space-x-4 ">
          <button className="size-10 flex items-center justify-center shadow-sm bg-gray-50 hover:bg-gray-300 rounded-full">
            <i className="fas fa-bell text-gray-600 "></i>
          </button>

          {/* <!-- Profile Dropdown --> */}
          <div className="relative">
            <button
              onClick={() => false}
              className="flex items-center  gap-4 bg-gray-50 hover:bg-gray-300  py-2 px-5 rounded-lg transition  shadow-sm"
            >
              <img
                src="https://ui-avatars.com/api/?name=Admin&background=4F46E5&color=fff"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col ml-6 ">
                <span className="text-dark text-lg font-iran-yekan-bold">
                  معین کاملان
                </span>
                <span className=" font-iran-yekan-medium text-paragray">
                  مدیر
                </span>
              </div>
              <i className="fas fa-chevron-down text-gray-600 "></i>
            </button>
            {/* <div
              id="profileDropdown"
              className="dropdown-content absolute right-0 mt-2 w-48 bg-white  rounded-lg shadow-lg py-2 z-50"
            >
              <NavLink to={""} className="block px-4 py-2 hover:bg-gray-100  ">
                پروفایل
              </NavLink>
              <NavLink to={""} className="block px-4 py-2 hover:bg-gray-100  ">
                تنظیمات
              </NavLink>
              <hr className="my-2 border-gray-200 " />
              <NavLink
                to={""}
                className="block px-4 py-2 text-red-500 hover:bg-gray-100 "
              >
                خروج
              </NavLink>
            </div> */}
          </div>
        </div>
      </div>
      {/* Border با gradient زیبا */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-linear-to-r from-purple-400 via-purple-500 to-purple-600 rounded-full shadow-lg shadow-purple-500/50"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent"></div>
      {/* دایره‌های تزئینی در ابتدا و انتهای border */}
      <div className="absolute bottom-0 left-0 w-3 h-3 -translate-x-1/2 translate-y-1/2 bg-linear-to-r from-purple-400 to-purple-600 rounded-full shadow-md shadow-purple-500/50"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 translate-x-1/2 translate-y-1/2 bg-linear-to-r from-purple-400 to-purple-600 rounded-full shadow-md shadow-purple-500/50"></div>
    </div>
  );
}

export default AdminDashBaordHeader;
