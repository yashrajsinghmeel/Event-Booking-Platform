import { Outlet, NavLink, useLocation, matchPath } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import './DashboardLayout.css'

function DashboardLayout() {
  const { user } = useAuth();
  const safeUser = user || { name: "Guest" };
  const location = useLocation();
  const isBookActive =
    matchPath("/dashboard", location.pathname) ||
    matchPath("/dashboard/book", location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 relative overflow-hidden">
      {/* Animated background elements - matching hero section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-5 left-5 sm:top-10 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-20 right-8 sm:top-32 sm:right-16 w-10 h-10 sm:w-16 sm:h-16 bg-emerald-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-16 left-8 sm:bottom-20 sm:left-20 w-8 h-8 sm:w-12 sm:h-12 bg-green-300 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute bottom-20 right-5 sm:bottom-32 sm:right-10 w-16 h-16 sm:w-24 sm:h-24 bg-emerald-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-6 h-6 sm:w-8 sm:h-8 bg-green-400 rounded-full opacity-15 animate-ping"></div>
        <div className="absolute top-1/4 right-1/3 w-10 h-10 sm:w-14 sm:h-14 bg-emerald-400 rounded-full opacity-20 animate-pulse"></div>
      </div>

      {/* Top permanent dashboard nav - Enhanced design */}
      <div className="relative z-10 bg-white/70 backdrop-blur-lg shadow-xl border-b border-green-200/50">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-6">
          {/* Mobile Layout */}
          <div className="flex flex-col sm:hidden">
            {/* Mobile Header */}
            <div className="flex justify-between items-center p-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🌿</span>
                <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-green-700">
                  Dashboard
                </h2>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full shadow-md">
                <span className="text-xs">👋</span>
                <span className="text-green-700 font-semibold text-sm truncate max-w-20">
                  {safeUser.name}
                </span>
              </div>
            </div>
            
            {/* Mobile Navigation */}
            <div className="flex gap-1 p-2 overflow-x-auto">
              <NavLink
                to="/dashboard/validate"
                className={
                  isBookActive
                    ? "group relative px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-full shadow-lg transform scale-105 transition-all duration-300 text-xs whitespace-nowrap"
                    : "group relative px-3 py-2 bg-white/50 backdrop-blur-sm text-green-700 font-semibold rounded-full shadow-md hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-600 hover:text-white transition-all duration-300 text-xs whitespace-nowrap"
                }
              >
                <span className="relative z-10 flex items-center gap-1">
                  <span className="text-xs">🎯</span>
                  QR Scanner
                </span>
                {isBookActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 opacity-20 rounded-full animate-pulse"></div>
                )}
              </NavLink>

              <NavLink
                to="/dashboard/settings"
                className={({ isActive }) =>
                  isActive
                    ? "group relative px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-full shadow-lg transform scale-105 transition-all duration-300 text-xs whitespace-nowrap"
                    : "group relative px-3 py-2 bg-white/50 backdrop-blur-sm text-green-700 font-semibold rounded-full shadow-md hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-600 hover:text-white transition-all duration-300 text-xs whitespace-nowrap"
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10 flex items-center gap-1">
                      <span className="text-xs">⚙️</span>
                      Settings
                    </span>
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 opacity-20 rounded-full animate-pulse"></div>
                    )}
                  </>
                )}
              </NavLink>

              <NavLink
                to="/dashboard/user"
                className={({ isActive }) =>
                  isActive
                    ? "group relative px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-full shadow-lg transform scale-105 transition-all duration-300 text-xs whitespace-nowrap"
                    : "group relative px-3 py-2 bg-white/50 backdrop-blur-sm text-green-700 font-semibold rounded-full shadow-md hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-600 hover:text-white transition-all duration-300 text-xs whitespace-nowrap"
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10 flex items-center gap-1">
                      <span className="text-xs">👤</span>
                      Profile
                    </span>
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 opacity-20 rounded-full animate-pulse"></div>
                    )}
                  </>
                )}
              </NavLink>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex justify-between items-center p-4 md:p-6">
            {/* Dashboard Title */}
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌿</span>
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-green-700">
                Dashboard
              </h2>
            </div>

            {/* Navigation Links */}
            <div className="flex gap-1 md:gap-2">
              <NavLink
                to="/dashboard/validate"
                className={
                  isBookActive
                    ? "group relative px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-full shadow-lg transform scale-105 transition-all duration-300 text-sm md:text-base"
                    : "group relative px-4 md:px-6 py-2 md:py-3 bg-white/50 backdrop-blur-sm text-green-700 font-semibold rounded-full shadow-md hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-600 hover:text-white hover:scale-105 transition-all duration-300 text-sm md:text-base"
                }
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-sm">🎯 </span>
                  <span className="hidden md:inline">QR Scanner</span>
                  <span className="md:hidden">QR Scanner</span>
                </span>
                {isBookActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 opacity-20 rounded-full animate-pulse"></div>
                )}
              </NavLink>

              <NavLink
                to="/dashboard/settings"
                className={({ isActive }) =>
                  isActive
                    ? "group relative px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-full shadow-lg transform scale-105 transition-all duration-300 text-sm md:text-base"
                    : "group relative px-4 md:px-6 py-2 md:py-3 bg-white/50 backdrop-blur-sm text-green-700 font-semibold rounded-full shadow-md hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-600 hover:text-white hover:scale-105 transition-all duration-300 text-sm md:text-base"
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="text-sm">⚙️</span>
                      <span className="hidden md:inline">Settings</span>
                      <span className="md:hidden">Settings</span>
                    </span>
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 opacity-20 rounded-full animate-pulse"></div>
                    )}
                  </>
                )}
              </NavLink>

              <NavLink
                to="/dashboard/user"
                className={({ isActive }) =>
                  isActive
                    ? "group relative px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-full shadow-lg transform scale-105 transition-all duration-300 text-sm md:text-base"
                    : "group relative px-4 md:px-6 py-2 md:py-3 bg-white/50 backdrop-blur-sm text-green-700 font-semibold rounded-full shadow-md hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-600 hover:text-white hover:scale-105 transition-all duration-300 text-sm md:text-base"
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="text-sm">👤</span>
                      <span className="hidden md:inline">User Info</span>
                      <span className="md:hidden">Profile</span>
                    </span>
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 opacity-20 rounded-full animate-pulse"></div>
                    )}
                  </>
                )}
              </NavLink>
            </div>

            {/* User Welcome */}
            <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full shadow-md">
              <span className="text-sm">👋</span>
              <span className="text-green-700 font-semibold">
                Welcome, {safeUser.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Render the selected page */}
      <div className="relative z-10 max-w-6xl mx-auto p-2 sm:p-4 lg:p-6">
        <div className="bg-white/30 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-green-200/50 p-3 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>

      
    </div>
  );
}

export default DashboardLayout;