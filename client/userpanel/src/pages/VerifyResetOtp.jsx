// src/pages/VerifyResetOtp.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import API from "../services/api";
import { toast } from "react-toastify";

function VerifyResetOtp() {
  const [otp, setOtp] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const navigate = useNavigate();

  const phone = localStorage.getItem("temp_phone");

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleVerify = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter the 6-digit OTP");
      return;
    }
    try {
      const res = await API.post("/users/forgot-password/verify-otp", { phone, otp });
      toast.success("OTP verified! Redirecting...");
      setTimeout(() => navigate("/reset-password"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  const handleResend = async () => {
    try {
      await API.post("/users/forgot-password/send-otp", { phone });
      toast.success("OTP resent successfully");
      setResendCooldown(30);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-green-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-emerald-300 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-green-300 rounded-full opacity-15 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-emerald-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-green-400 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute top-1/2 left-5 w-8 h-8 bg-emerald-500 rounded-full opacity-15 animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-14 h-14 bg-green-500 rounded-full opacity-12 animate-bounce"></div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-20 text-2xl opacity-20 animate-pulse">🔄</div>
        <div className="absolute top-40 right-32 text-3xl opacity-15 animate-bounce">🔒</div>
        <div className="absolute bottom-40 left-16 text-2xl opacity-25 animate-pulse">🛡️</div>
        <div className="absolute bottom-20 right-20 text-3xl opacity-20 animate-bounce">🔓</div>
        <div className="absolute top-1/2 right-8 text-2xl opacity-15 animate-pulse">🔑</div>
      </div>

      {/* Main Card with Glass Effect */}
      <div className="relative w-full max-w-md">
        {/* Glass Effect Card */}
        <div className="bg-gradient-to-br from-white/90 via-emerald-50/90 to-green-50/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8 relative overflow-hidden">
          {/* Decorative elements inside card */}
          <div className="absolute top-4 right-4 w-3 h-3 bg-emerald-400 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-2 h-2 bg-green-400 rounded-full opacity-40 animate-bounce"></div>
          <div className="absolute top-1/2 left-2 w-1 h-1 bg-emerald-500 rounded-full opacity-50 animate-pulse"></div>

          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full mb-6 shadow-lg group">
              <span className="text-3xl relative z-10">🔐</span>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
            </div>
            
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700 mb-3">
              Reset Password
            </h2>
            <p className="text-gray-700 font-medium text-lg mb-2">
              Enter the verification code sent to your phone
            </p>
            {phone && (
              <div className="inline-flex items-center px-4 py-2 bg-white/50 backdrop-blur-sm rounded-xl border border-white/30 shadow-sm">
                <span className="text-emerald-600 mr-2">📱</span>
                <span className="text-emerald-700 font-semibold">
                  {phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}
                </span>
              </div>
            )}
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Input
                label="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit code"
              />
              <p className="text-xs text-gray-600 px-1 flex items-center">
                <span className="mr-1">🔢</span>
                Please enter the 6-digit verification code
              </p>
            </div>

            <div className="pt-2">
              <Button 
                text="Verify OTP" 
                onClick={handleVerify}
              />
            </div>
          </div>

          {/* Divider with Glass Effect */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent"></div>
            <span className="px-4 text-sm text-gray-600 font-medium bg-white/50 backdrop-blur-sm rounded-full border border-white/30">
              or
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent"></div>
          </div>

          {/* Resend Section */}
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-700 font-medium">
              Didn't receive the code?
            </p>
            <div className="group">
              <button
                onClick={handleResend}
                disabled={resendCooldown > 0}
                className={`relative overflow-hidden px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                  resendCooldown > 0
                    ? "bg-white/50 text-gray-500 cursor-not-allowed backdrop-blur-sm border border-white/30"
                    : "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-xl shadow-lg border border-white/20"
                }`}
              >
                {/* Shimmer effect for active button */}
                {resendCooldown === 0 && (
                  <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                )}

                <span className="relative z-10 flex items-center justify-center">
                  {resendCooldown > 0 ? (
                    <>
                      <span className="mr-2">⏱️</span>
                      Resend in {resendCooldown}s
                    </>
                  ) : (
                    <>
                      <span className="mr-2">📤</span>
                      Resend OTP
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Footer with Glass Effect */}
          <div className="mt-8 pt-6 border-t border-gradient-to-r from-transparent via-emerald-300/30 to-transparent">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center px-3 py-1 bg-white/40 backdrop-blur-sm rounded-full border border-white/30">
                <span className="text-xs text-gray-600 flex items-center">
                  <span className="mr-1">🛡️</span>
                  Your verification code expires in 10 minutes
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Keep this code secure and don't share it with anyone
              </p>
            </div>
          </div>
        </div>

        {/* Subtle outer glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/20 to-green-300/20 rounded-3xl blur-xl opacity-50 -z-10"></div>
      </div>
    </div>
  );
}

export default VerifyResetOtp;