// src/pages/ForgotPassword.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import API from "../services/api";
import { validatePhone } from "../utils/validatePhone";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!validatePhone(phone)) {
      toast.error("Enter a valid 10-digit phone number");
      return;
    }
    try {
      const res = await API.post("/users/forgot-password/send-otp", { phone });
      localStorage.setItem("temp_phone", phone);
      toast.success("OTP sent successfully");
      setTimeout(() => navigate("/verify-reset-otp"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-100/80 via-emerald-100/80 to-green-100/80 p-4 relative overflow-hidden">
      {/* Animated background elements matching navbar style */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-6 h-6 bg-emerald-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-4 h-4 bg-green-300 rounded-full opacity-25 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/3 w-3 h-3 bg-emerald-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-5 h-5 bg-green-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/2 left-20 w-2 h-2 bg-emerald-500 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-4 h-4 bg-green-500 rounded-full opacity-15 animate-bounce"></div>
      </div>

      <div className="bg-gradient-to-br from-white/90 via-emerald-50/90 to-green-50/90 backdrop-blur-lg shadow-2xl rounded-2xl p-10 w-full max-w-md border border-white/30 relative">
        {/* Decorative elements inside the card */}
        <div className="absolute top-3 right-3 w-3 h-3 bg-emerald-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-3 left-3 w-2 h-2 bg-green-400 rounded-full opacity-40 animate-bounce"></div>

        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full mb-4 shadow-lg">
            <span className="text-3xl">🔐</span>
          </div>
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700 mb-2">
            Forgot Password
          </h2>
          <p className="text-emerald-700 font-medium">
            Don't worry, we'll help you reset it
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-r from-emerald-100/60 to-green-100/60 border border-emerald-200/50 rounded-xl p-4 mb-6 backdrop-blur-sm">
          <div className="flex items-start space-x-3">
            <span className="text-emerald-600 text-lg mt-0.5">💡</span>
            <div>
              <p className="text-sm text-emerald-700 font-medium">
                Password Recovery
              </p>
              <p className="text-xs text-emerald-600 mt-1">
                We'll send a verification code to your registered phone number to help you reset your password securely.
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Input
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your registered phone number"
            />
            <p className="text-xs text-emerald-600 px-1">
              📱 Enter the phone number associated with your account
            </p>
          </div>

          <div className="pt-2">
            <Button 
              text="Send OTP" 
              onClick={handleSendOtp}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 border-t border-emerald-200"></div>
          <span className="px-4 text-sm text-emerald-600 font-medium">or</span>
          <div className="flex-1 border-t border-emerald-200"></div>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-emerald-700 mb-3">
            Remembered your password?
          </p>
          <Link 
            to="/login" 
            className="inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-600 font-semibold text-white text-sm rounded-lg transition-all duration-200 hover:shadow-md transform hover:scale-[1.02] border border-emerald-400 hover:from-emerald-600 hover:to-green-700"
          >
            <span className="mr-2">🔑</span>
            Back to Login
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-emerald-100">
          <div className="text-center space-y-1">
            <p className="text-xs text-emerald-600">
              🛡️ Your account security is our priority
            </p>
            <p className="text-xs text-emerald-500">
              The verification code will expire in 10 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;