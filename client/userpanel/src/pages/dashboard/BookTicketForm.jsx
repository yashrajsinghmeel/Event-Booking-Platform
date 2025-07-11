import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import API from "../../services/api";
import { validatePhone } from "../../utils/validatePhone";
import { validateEmail } from "../../utils/validateEmail";
import './BookTicketForm.css'

function BookingForm() {
  const { user } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  // Get from location.state or localStorage fallback
  const bookingData = location.state;
  const { ticketType, pricePer, eventId } = bookingData;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [numPersons, setNumPersons] = useState(1);
  const [amount, setAmount] = useState(pricePer);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (ticketType === "Single Person") {
      setNumPersons(1);
    } else if (ticketType === "Group of 10") {
      setNumPersons(10);
    } else if (ticketType === "Bulk (50+)") {
      setNumPersons(50);
    }
  }, [ticketType]);

  useEffect(() => {
    setAmount(pricePer * numPersons);
  }, [numPersons, pricePer]);

  const handleProceed = async () => {
    if (!validatePhone(phone)) {
      toast.error("Please enter a valid 10-digit Indian phone number.");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email Id.");
      return;
    }
    // toast.info(`Proceeding to payment for ${amount}`);

    try {
      const res = await API.post("/bookings/tempbooking", {
        phone,
        name,
        userId: user._id,
        eventId,
        ticketCount: numPersons,
        email,
      });
      // toast.success(res.data.message);
      navigate(`/dashboard/temp-ticket`, {
        state: {
          bookingId: res.data.bookingId,
        },
      });
    } catch (error) {
      toast.error(error.response?.data.message || "Failed to book ticket");
    }
  };

  if (!ticketType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-16 h-16 bg-green-200 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-24 w-12 h-12 bg-emerald-200 rounded-full opacity-40 animate-bounce"></div>
          <div className="absolute bottom-32 left-16 w-20 h-20 bg-green-300 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-14 h-14 bg-emerald-300 rounded-full opacity-25 animate-bounce"></div>
        </div>

        <div className="relative z-10 bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-md border border-white/30 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
            <span className="text-3xl animate-bounce">⚠️</span>
          </div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 mb-4">
            🌿 No Booking Data Found 🌿
          </h2>
          <p className="text-green-700 mb-6 text-lg">
            Please select a ticket first to proceed with booking.
          </p>
          <button
            onClick={() => navigate("/dashboard/book")}
            className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 animate-pulse"
          >
            🎫 Go to Booking Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-emerald-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-green-300 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 bg-emerald-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-green-400 rounded-full opacity-15 animate-ping"></div>
        <div className="absolute top-1/4 right-1/3 w-14 h-14 bg-emerald-400 rounded-full opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-lg border border-white/30">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
            <span className="text-4xl animate-bounce">🎫</span>
          </div>
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 mb-3 animate-pulse">
            🌿 Book {ticketType} 🌿
          </h2>
          <p className="text-green-700 font-semibold text-lg">
            Complete your booking details
          </p>
        </div>

        {/* Name Input with Enhanced Styling */}
        <div className="mb-6">
          <label className="block text-green-800 text-sm font-bold mb-3 flex items-center gap-2">
            <span className="text-lg">👤</span>
            Full Name
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-green-500 group-focus-within:text-green-600 transition-colors duration-200"
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full pl-12 pr-4 py-4 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90 text-green-800 font-medium"
            />
          </div>
        </div>

        {/* Phone Input with Enhanced Styling */}
        <div className="mb-6">
          <label className="block text-green-800 text-sm font-bold mb-3 flex items-center gap-2">
            <span className="text-lg">📱</span>
            Phone Number
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-green-500 group-focus-within:text-green-600 transition-colors duration-200"
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
              placeholder="Enter your 10-digit phone number"
              className="w-full pl-12 pr-4 py-4 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90 text-green-800 font-medium"
            />
          </div>
        </div>

        {/* Email Input with Enhanced Styling */}
        <div className="mb-6">
          <label className="block text-green-800 text-sm font-bold mb-3 flex items-center gap-2">
            <span className="text-lg">📧</span>
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-green-500 group-focus-within:text-green-600 transition-colors duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full pl-12 pr-4 py-4 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90 text-green-800 font-medium"
            />
          </div>
          <p className="text-xs text-green-600 mt-2 px-2 flex items-center gap-1">
            <span className="animate-pulse">💌</span>
            Your e-tickets will be delivered to this email address
          </p>
        </div>

        {/* Number of Persons Input with Enhanced Styling */}
        <div className="mb-6">
          <label className="block text-green-800 text-sm font-bold mb-3 flex items-center gap-2">
            <span className="text-lg">👥</span>
            Number of Persons
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-green-500 group-focus-within:text-green-600 transition-colors duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <input
              type="number"
              value={numPersons}
              onChange={(e) => setNumPersons(Number(e.target.value))}
              min={
                ticketType === "Group of 10"
                  ? 10
                  : ticketType === "Bulk (50+)"
                  ? 50
                  : 1
              }
              max={ticketType === "Group of 10" ? 49 : undefined}
              disabled={ticketType === "Single Person"}
              className={`w-full pl-12 pr-4 py-4 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition-all duration-300 font-medium ${
                ticketType === "Single Person"
                  ? "bg-green-50 cursor-not-allowed text-green-600"
                  : "bg-white/70 backdrop-blur-sm hover:bg-white/90 text-green-800"
              }`}
            />
          </div>
        </div>

        {/* Amount Input with Enhanced Styling */}
        <div className="mb-8">
          <label className="block text-green-800 text-sm font-bold mb-3 flex items-center gap-2">
            <span className="text-lg">💰</span>
            Amount Payable
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={`₹${amount}`}
              disabled
              className="w-full pl-12 pr-4 py-4 border-2 border-green-200 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 cursor-not-allowed text-green-700 font-bold text-lg"
            />
          </div>
        </div>

        {/* Enhanced Proceed Button */}
        <div className="mb-6">
          <button
            onClick={handleProceed}
            className="group relative overflow-hidden w-full py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
            style={{
              boxShadow: "0 0 30px rgba(34, 197, 94, 0.4)",
              animation: "pulse-glow 2s ease-in-out infinite",
            }}
          >
            {/* Animated background overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 animate-shimmer"></div>

            {/* Button content */}
            <span className="relative z-10 flex items-center justify-center gap-3">
              <span className="text-2xl animate-bounce">🎟️</span>
              <span className="tracking-wide">Book My Tickets Now!</span>
              <span className="text-2xl animate-bounce">🌿</span>
            </span>
          </button>
        </div>

        {/* Enhanced Footer */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 border border-green-200">
            <p className="text-xs text-green-700 font-medium flex items-center justify-center gap-1">
              <span className="animate-pulse">🔒</span>
              By proceeding, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
