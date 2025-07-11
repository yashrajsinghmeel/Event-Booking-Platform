// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import API from "../services/api";
import { validatePhone } from "../utils/validatePhone";
import { toast } from "react-toastify";

function Signup() {
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!validatePhone(phone)) {
      toast.error("Please enter a valid 10-digit Indian phone number.");
      return;
    }
    if (!username.trim()) {
      toast.error("Username is required.");
      return;
    }
    try {
      const res = await API.post("/users/register/send-otp", {
        phone,
        username,
      });
      localStorage.setItem("temp_userId", res.data.userId);
      localStorage.setItem("temp_phone", phone);
      toast.success("OTP sent successfully!");
      navigate("/verify");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-green-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-emerald-200/30 to-green-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-10 w-72 h-72 bg-gradient-to-br from-green-200/25 to-emerald-200/25 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-60 w-96 h-96 bg-gradient-to-br from-emerald-300/20 to-green-300/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-gradient-to-br from-green-300/25 to-emerald-300/25 rounded-full blur-2xl animate-pulse delay-700"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/5 w-4 h-4 bg-emerald-400 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute top-2/5 right-1/4 w-3 h-3 bg-green-400 rounded-full opacity-50 animate-bounce delay-500"></div>
        <div className="absolute bottom-1/3 left-2/5 w-2 h-2 bg-emerald-500 rounded-full opacity-60 animate-bounce delay-1000"></div>
        <div className="absolute bottom-2/5 right-1/5 w-3 h-3 bg-green-500 rounded-full opacity-45 animate-bounce delay-300"></div>
        <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-emerald-600 rounded-full opacity-70 animate-bounce delay-1500"></div>
      </div>

      {/* Main Signup Container */}
      <div className="relative w-full max-w-md">
        {/* Glass Morphism Card */}
        <div className="bg-gradient-to-br from-white/90 via-emerald-50/90 to-green-50/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 relative overflow-hidden">
          {/* Card decorative elements */}
          <div className="absolute top-6 right-6 w-3 h-3 bg-emerald-400 rounded-full opacity-40 animate-pulse"></div>
          <div className="absolute bottom-6 left-6 w-2 h-2 bg-green-400 rounded-full opacity-50 animate-pulse delay-700"></div>
          <div className="absolute top-1/3 left-3 w-1 h-1 bg-emerald-500 rounded-full opacity-60 animate-pulse delay-1200"></div>
          <div className="absolute bottom-1/3 right-3 w-1 h-1 bg-green-500 rounded-full opacity-55 animate-pulse delay-400"></div>
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg relative group">
                <span className="text-3xl">🎉</span>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-md"></div>
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-25 transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 rounded-full"></div>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700 mb-2">
              Join Our Community ✨
            </h2>
            <p className="text-emerald-700/70 font-medium">Start your spiritual journey today</p>
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            {/* Phone Input */}
            <div className="space-y-3">
              <label className="block text-emerald-800 text-sm font-semibold">
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
              <p className="text-xs text-emerald-600/80 px-1 flex items-center gap-1 font-medium">
                <span>📱</span>
                <span>We'll send you an OTP to verify</span>
              </p>
            </div>

            {/* Username Input */}
            <div className="space-y-3">
              <label className="block text-emerald-800 text-sm font-semibold">
                Username
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  className="w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-sm border border-emerald-200/50 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition-all duration-300 text-emerald-800 placeholder-emerald-500/70 shadow-lg hover:shadow-xl group-focus-within:bg-white/90"
                />
                {/* Input glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/20 to-green-200/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Enhanced Send OTP Button */}
            <div className="pt-4">
              <button
                onClick={handleSignup}
                className="group relative w-full overflow-hidden py-4 px-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
              >
                {/* Animated background overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                
                {/* Button content */}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="text-lg">📲</span>
                  <span>Send OTP</span>
                </span>
              </button>
            </div>
          </div>

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

          {/* Enhanced Login Link */}
          <div className="text-center">
            <p className="text-sm text-emerald-700/80 font-medium mb-4">
              Already have an account?
            </p>
            <Link
              to="/login"
              className="group relative overflow-hidden inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-100/70 to-green-100/70 backdrop-blur-sm text-emerald-700 font-semibold rounded-xl border border-emerald-200/50 hover:border-emerald-300 transition-all duration-300 gap-2 hover:shadow-lg transform hover:scale-[1.02]"
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
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Login Here
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/30 to-green-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            </Link>
          </div>

          {/* Enhanced Footer */}
          <div className="mt-8 pt-6 border-t border-emerald-200/30">
            <p className="text-xs text-center text-emerald-600/70 font-medium">
              By signing up, you agree to our{" "}
              <span className="text-emerald-700 font-semibold">Terms of Service</span> and{" "}
              <span className="text-emerald-700 font-semibold">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;