import { Link, NavLink, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import API from "../services/api";
import { toast } from "react-toastify";

function NavBar() {
  const { user, loading, refetch } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [authState, setAuthState] = useState(user);
  const menuRef = useRef(null);
  
  useEffect(() => {
    setAuthState(user);
  }, [user]);

  const handleLogout = async () => {
    try {
      await API.post("/users/logout");
      toast.success("Logged out. Come back soon to book your joy!");
      refetch();
     
      navigate("/login", {
        replace: true,
      });
     
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className="relative group px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/20 hover:backdrop-blur-sm hover:shadow-lg text-emerald-800 hover:text-emerald-600 font-medium"
        >
          <span className="relative z-10 flex items-center gap-2">
            🏠 Home
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/30 to-green-300/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about-us"
          className="relative group px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/20 hover:backdrop-blur-sm hover:shadow-lg text-emerald-800 hover:text-emerald-600 font-medium"
        >
          <span className="relative z-10 flex items-center gap-2">
            ℹ️ About Us
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/30 to-green-300/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact-us"
          className="relative group px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/20 hover:backdrop-blur-sm hover:shadow-lg text-emerald-800 hover:text-emerald-600 font-medium"
        >
          <span className="relative z-10 flex items-center gap-2">
            📞 Contact Us
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/30 to-green-300/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      {/* Glass Effect Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-100/80 via-emerald-100/80 to-green-100/80 backdrop-blur-md border-b border-white/20 shadow-lg">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-2 left-10 w-4 h-4 bg-emerald-300 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-4 right-20 w-3 h-3 bg-green-300 rounded-full opacity-25 animate-bounce"></div>
          <div className="absolute bottom-2 left-1/3 w-2 h-2 bg-emerald-400 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-3 right-1/4 w-3 h-3 bg-green-400 rounded-full opacity-20 animate-bounce"></div>
        </div>

        <div className="relative max-w-screen-xl mx-auto px-2 xs:px-3 sm:px-4 lg:px-4">
          <div className="flex items-center justify-between h-16 xs:h-18 sm:h-20">
            {/* Mobile Menu Button */}
            <div className="lg:hidden flex-shrink-0 relative" ref={menuRef}>
              <button
                onClick={toggleMobileMenu}
                className="group relative p-2 xs:p-2.5 sm:p-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg hover:bg-white/30 hover:shadow-xl transition-all duration-300 text-emerald-700 hover:text-emerald-600"
              >
                <div className="relative z-10">
                  <svg
                    className="h-5 w-5 xs:h-6 xs:w-6 transition-transform duration-300 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                    />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/20 to-green-300/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              {/* Mobile Dropdown Menu with Glass Effect */}
              {isMobileMenuOpen && (
                <div className="absolute left-0 top-full mt-3 z-50 w-72 xs:w-80 transform transition-all duration-300 ease-out opacity-100 scale-100">
                  <div className="bg-gradient-to-br from-white/90 via-emerald-50/90 to-green-50/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 p-4 xs:p-6">
                    <ul className="space-y-2 xs:space-y-3">
                      {navLinks}
                    </ul>
                    {/* Decorative elements */}
                    <div className="absolute top-2 right-2 w-3 h-3 bg-emerald-400 rounded-full opacity-30 animate-pulse"></div>
                    <div className="absolute bottom-2 left-2 w-2 h-2 bg-green-400 rounded-full opacity-40 animate-bounce"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Logo + Title with enhanced styling */}
            <div className="flex-shrink-0 flex-1 min-w-0">
              <Link to="/" className="group flex items-center justify-center">
                <div className="relative">
                  <span className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700 transition-all duration-300 group-hover:from-emerald-500 group-hover:to-green-600">
                    🌿 PRAKRITI POOJA 2025 🌿
                  </span>
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-extrabold text-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm">
                    🌿 PRAKRITI POOJA 2025 🌿
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation with Glass Effect */}
            <div className="hidden lg:flex items-center">
              <nav className="mr-8">
                <ul className="flex space-x-2">
                  {navLinks}
                </ul>
              </nav>
            </div>

            {/* Auth Button with enhanced design */}
            <div className="flex items-center flex-shrink-0">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="group relative overflow-hidden p-2 xs:p-2.5 sm:p-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mr-1 xs:mr-2 lg:mr-0"
                  title="Logout"
                >
                  {/* Animated background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                  
                  {/* Button content */}
                  <span className="relative z-10 flex items-center">
                    <span className="text-sm xs:text-base sm:text-lg">🚪</span>
                    <span>Logout</span>
                  </span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="group relative overflow-hidden p-2 xs:p-2.5 sm:p-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mr-1 xs:mr-2 lg:mr-0"
                  title="Login"
                >
                  {/* Animated background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                  
                  {/* Button content */}
                  <span className="relative z-10 flex items-center">
                    <span className="text-sm xs:text-base sm:text-lg">🔐</span>
                    <span>Login</span>
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Spacer div to prevent content from hiding behind fixed navbar */}
      <div className="h-16 xs:h-18 sm:h-20"></div>
    </>
  );
}

export default NavBar;