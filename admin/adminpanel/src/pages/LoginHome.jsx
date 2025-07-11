// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { validatePhone } from "../utils/validatePhone";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth.js";

function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { refetch } = useAuth();

  const handleLogin = async () => {
    if (!validatePhone(phone)) {
      toast.error("Please enter a valid 10-digit Indian phone number");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }

    try {
      await API.post("/users/login", { phone, password });
      await refetch();
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/");
        navigate(0);
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-green-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-emerald-200/30 to-green-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-40 w-64 h-64 bg-gradient-to-br from-emerald-300/25 to-green-300/25 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-br from-green-300/20 to-emerald-300/20 rounded-full blur-2xl animate-pulse delay-500"></div>

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-emerald-400 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-green-400 rounded-full opacity-40 animate-bounce delay-300"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-emerald-500 rounded-full opacity-50 animate-bounce delay-700"></div>
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-green-500 rounded-full opacity-35 animate-bounce delay-1000"></div>
      </div>

      {/* Main Login Container */}
      <div className="relative w-full max-w-md">
        {/* Glass Morphism Card */}
        <div className="bg-gradient-to-br from-white/90 via-emerald-50/90 to-green-50/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 relative overflow-hidden">
          {/* Card decorative elements */}
          <div className="absolute top-4 right-4 w-3 h-3 bg-emerald-400 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-2 h-2 bg-green-400 rounded-full opacity-40 animate-pulse delay-500"></div>
          <div className="absolute top-1/2 left-2 w-1 h-1 bg-emerald-500 rounded-full opacity-50 animate-pulse delay-1000"></div>

          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg relative group">
                <span className="text-3xl">🌿</span>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md"></div>
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 rounded-full"></div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700 mb-2">
               Hey Admin! 👋
            </h2>
            <p className="text-emerald-700/70 font-medium">
              Secure login to manage your platform
            </p>
          </div>

          {/* Phone Input */}
          <div className="mb-6">
            <label className="block text-emerald-800 text-sm font-semibold mb-3">
              Phone Number
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-emerald-500 group-focus-within:text-emerald-600 transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-sm border border-emerald-200/50 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition-all duration-300 text-emerald-800 placeholder-emerald-500/70 shadow-lg hover:shadow-xl group-focus-within:bg-white/90"
              />
              {/* Input glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/20 to-green-200/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-8">
            <label className="block text-emerald-800 text-sm font-semibold mb-3">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-emerald-500 group-focus-within:text-emerald-600 transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-12 pr-14 py-4 bg-white/70 backdrop-blur-sm border border-emerald-200/50 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition-all duration-300 text-emerald-800 placeholder-emerald-500/70 shadow-lg hover:shadow-xl group-focus-within:bg-white/90"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-emerald-500 hover:text-emerald-600 transition-colors duration-200 group"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {/* Input glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/20 to-green-200/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>

          {/* Enhanced Login Button */}
          <button
            onClick={handleLogin}
            className="group relative w-full overflow-hidden py-4 px-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 mb-6"
          >
            {/* Animated background overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>

            {/* Button content */}
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span className="text-lg">🚀</span>
              <span>Login to Continue</span>
            </span>
          </button>

          {/* Stylized Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gradient-to-r from-emerald-200 to-green-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-6 py-2 bg-gradient-to-r from-white/80 to-emerald-50/80 backdrop-blur-sm text-emerald-600 font-medium rounded-full border border-emerald-200/50">
                or
              </span>
            </div>
          </div>

          {/* Enhanced Links */}
          <div className="space-y-4">
            <div className="flex flex-col  justify-between gap-4">
              <Link
                to="/forgot-password"
                className="group relative overflow-hidden px-4 py-2 bg-gradient-to-r from-emerald-100/70 to-green-100/70 backdrop-blur-sm text-emerald-700 font-semibold rounded-xl border border-emerald-200/50 hover:border-emerald-300 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg transform hover:scale-[1.02]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                    />
                  </svg>
                  Forgot Password?
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/30 to-green-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-emerald-600/70 font-medium">
              By signing in, you agree to our{" "}
              <span className="text-emerald-700 font-semibold">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-emerald-700 font-semibold">
                Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
