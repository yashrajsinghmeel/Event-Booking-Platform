import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import API from "../services/api";
import { toast } from "react-toastify";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;
    if (score <= 2) return "Weak";
    if (score === 3 || score === 4) return "Moderate";
    return "Strong";
  };

  const passwordStrength = getPasswordStrength(password);

  const isPasswordValid = () => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[@$!%*?&]/.test(password)
    );
  };

  const handleSetPassword = async () => {
    const phone = localStorage.getItem("temp_phone");

    if (!password || !confirmPassword) {
      toast.error("Both fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!isPasswordValid()) {
      toast.error(
        "Password must include uppercase, lowercase, number, special character and be 8+ characters"
      );
      return;
    }

    try {
      const res = await API.post("/users/forgot-password/reset", {
        phone,
        password,
      });

      toast.success(res.data.message || "Password set successfully");
      localStorage.removeItem("temp_phone");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to set password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-100/80 via-emerald-100/80 to-green-100/80 px-4 py-8 relative overflow-hidden">
      {/* Animated background elements matching navbar style */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-6 h-6 bg-emerald-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-4 h-4 bg-green-300 rounded-full opacity-25 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/3 w-3 h-3 bg-emerald-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-5 h-5 bg-green-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/2 left-20 w-2 h-2 bg-emerald-500 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-4 h-4 bg-green-500 rounded-full opacity-15 animate-bounce"></div>
      </div>

      <div className="bg-gradient-to-br from-white/90 via-emerald-50/90 to-green-50/90 backdrop-blur-lg shadow-2xl p-8 rounded-2xl w-full max-w-md border border-white/30 relative">
        {/* Decorative elements inside the card */}
        <div className="absolute top-3 right-3 w-3 h-3 bg-emerald-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-3 left-3 w-2 h-2 bg-green-400 rounded-full opacity-40 animate-bounce"></div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-700">Reset Your Password</h2>
          <p className="text-emerald-700 mt-2 font-medium">Create a secure password for your account</p>
        </div>

        {/* Password Field */}
        <div className="relative mb-4">
          <div className="relative">
            <Input
              label="New Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Eg: Rgipt@2025"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-emerald-500 hover:text-emerald-600 transition-colors duration-200"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Password Requirements */}
        <div className="bg-gradient-to-r from-emerald-50/80 to-green-50/80 backdrop-blur-sm rounded-lg p-4 mb-4 border border-emerald-200/30">
          <p className="text-sm font-medium text-emerald-700 mb-2">Password Requirements:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className={`flex items-center ${password.length >= 8 ? 'text-emerald-600' : 'text-emerald-400'}`}>
              <span className="mr-1">{password.length >= 8 ? '✓' : '○'}</span>
              8+ characters
            </div>
            <div className={`flex items-center ${/[A-Z]/.test(password) ? 'text-emerald-600' : 'text-emerald-400'}`}>
              <span className="mr-1">{/[A-Z]/.test(password) ? '✓' : '○'}</span>
              Uppercase
            </div>
            <div className={`flex items-center ${/[a-z]/.test(password) ? 'text-emerald-600' : 'text-emerald-400'}`}>
              <span className="mr-1">{/[a-z]/.test(password) ? '✓' : '○'}</span>
              Lowercase
            </div>
            <div className={`flex items-center ${/\d/.test(password) ? 'text-emerald-600' : 'text-emerald-400'}`}>
              <span className="mr-1">{/\d/.test(password) ? '✓' : '○'}</span>
              Number
            </div>
            <div className={`flex items-center ${/[@$!%*?&]/.test(password) ? 'text-emerald-600' : 'text-emerald-400'}`}>
              <span className="mr-1">{/[@$!%*?&]/.test(password) ? '✓' : '○'}</span>
              Special char
            </div>
          </div>
        </div>

        {/* Strength Bar */}
        {password && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-emerald-700">Password Strength</span>
              <span
                className={`font-semibold px-2 py-1 rounded-full text-xs ${
                  passwordStrength === "Weak"
                    ? "text-red-600 bg-red-100"
                    : passwordStrength === "Moderate"
                    ? "text-yellow-600 bg-yellow-100"
                    : "text-emerald-600 bg-emerald-100"
                }`}
              >
                {passwordStrength}
              </span>
            </div>
            <div className="w-full h-3 bg-emerald-100 rounded-full overflow-hidden border border-emerald-200/30">
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${
                  passwordStrength === "Weak"
                    ? "bg-gradient-to-r from-red-400 to-red-500 w-1/3"
                    : passwordStrength === "Moderate"
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500 w-2/3"
                    : "bg-gradient-to-r from-emerald-400 to-green-500 w-full"
                }`}
              />
            </div>
          </div>
        )}

        {/* Confirm Password */}
        <div className="relative mb-6">
          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-emerald-500 hover:text-emerald-600 transition-colors duration-200"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {confirmPassword && password !== confirmPassword && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Passwords do not match
            </p>
          )}
          {confirmPassword && password === confirmPassword && (
            <p className="text-emerald-500 text-sm mt-1 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Passwords match
            </p>
          )}
        </div>

        <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" text="Reset Password" onClick={handleSetPassword} />
        
        {/* Footer */}
        <p className="text-center text-sm text-emerald-600 mt-6 font-medium">
          Make sure to remember your password or store it securely
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;