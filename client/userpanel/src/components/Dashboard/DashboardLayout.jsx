import { Outlet, NavLink, useLocation, matchPath } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function DashboardLayout() {
 const { user } = useAuth();
const safeUser = user || { name: "Guest" };

  const location = useLocation();
   const isBookActive = 
      matchPath("/dashboard", location.pathname) ||
      matchPath("/dashboard/book", location.pathname);

  return (
    <div className="min-h-screen bg-[linear-gradient(to_right,rgba(67,139,71,0.3),rgba(244,196,48,0.3),rgba(47,102,50,0.3))]">
      {/* Top permanent dashboard nav */}
      <div className="bg-green-100 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <div className="flex gap-4">
            <NavLink
              to="/dashboard/book"
              className={  
                isBookActive
                  ? "font-bold text-green-700 border-b-2 border-green-700 pb-1"
                  : "text-green-700 hover:text-green-900"
              }
            >
              Book Tickets
            </NavLink>
            <NavLink
              to="/dashboard/tickets"
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-green-700 border-b-2 border-green-700 pb-1"
                  : "text-green-700 hover:text-green-900"
              }
            >
              Your Tickets
            </NavLink>
            <NavLink
              to="/dashboard/user"
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-green-700 border-b-2 border-green-700 pb-1"
                  : "text-green-700 hover:text-green-900"
              }
            >
              User Info
            </NavLink>
          </div>
        </div>
      </div>

      {/* Render the selected page */}
      <div className="max-w-6xl mx-auto p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
