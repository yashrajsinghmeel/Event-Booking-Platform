import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import API from "../../services/api";
import { validatePhone } from "../../utils/validatePhone";
import { validateEmail } from "../../utils/validateEmail";

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
      <div className="flex items-center justify-center min-h-screen bg-[linear-gradient(to_right,rgba(67,139,71,0.5),rgba(244,196,48,0.5),rgba(47,102,50,0.5))] p-4">
        <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/20 text-center">
          <div className="w-20 h-20 bg-[linear-gradient(to_right,rgba(67,139,71,1),rgba(244,196,48,1))] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold bg-[linear-gradient(to_right,rgba(67,139,71,1),rgba(244,196,48,1))] bg-clip-text text-transparent mb-4">
            No Booking Data Found
          </h2>
          <p className="text-gray-600 mb-6">
            Please select a ticket first to proceed with booking.
          </p>
          <button
            onClick={() => navigate("/dashboard/book")}
            className="w-full py-3 px-4 bg-[linear-gradient(to_right,rgba(67,139,71,1),rgba(244,196,48,1))] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2F6132] focus:ring-offset-2"
          >
            Go to Booking Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[linear-gradient(to_right,rgba(67,139,71,0.5),rgba(244,196,48,0.5),rgba(47,102,50,0.5))] p-4">
      <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/20">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[linear-gradient(to_right,rgba(67,139,71,1),rgba(244,196,48,1))] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-[linear-gradient(to_right,rgba(67,139,71,1),rgba(244,196,48,1))] bg-clip-text text-transparent mb-2">
            Book {ticketType} 🎫
          </h2>
          <p className="text-gray-600">Complete your booking details</p>
        </div>

        {/* Name Input with Icon */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
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
              placeholder="Enter your name"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F6132] focus:border-[#2F6132] outline-none transition-all duration-200"
            />
          </div>
        </div>

        {/* Phone Input with Icon */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
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
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F6132] focus:border-[#2F6132] outline-none transition-all duration-200"
            />
          </div>
        </div>

        {/* Email Input with Icon */}
        <div className="space-y-2 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12H8m8-4H8m8 8H8m13-9.35a2 2 0 00-1.2-.65L5 4a2 2 0 00-2 2v12c0 .55.22 1.05.59 1.41.38.37.88.59 1.41.59h14c.55 0 1.05-.22 1.41-.59.38-.37.59-.87.59-1.41V7a2 2 0 00-.59-1.35z"
                  />
                </svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F6132] focus:border-[#2F6132] outline-none transition-all duration-200"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 px-1">
            📧 Please provide a valid email — your e-tickets will be delivered
            there.
          </p>
        </div>

        {/* Number of Persons Input with Icon */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Number of Persons
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
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
              className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F6132] focus:border-[#2F6132] outline-none transition-all duration-200 cursor-not-allowed ${
                ticketType === "Single Person"
                  ? "bg-gray-100 cursor-not-allowed text-gray-500"
                  : "bg-white"
              }`}
            />
          </div>
        </div>

        {/* Amount Input with Icon */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Amount Payable
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
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
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-500 font-semibold"
            />
          </div>
        </div>

        {/* Proceed Button */}
        <Button text="Book Ticket" onClick={handleProceed} />

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By proceeding, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
