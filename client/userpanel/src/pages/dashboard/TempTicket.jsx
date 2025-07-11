import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../../services/api";
import { toast } from "react-toastify";

function TempTicket() {
  const navigate = useNavigate();
  const location = useLocation();
  const [ticket, setTicket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  const { bookingId } = location.state || {};

  useEffect(() => {
    if (!bookingId) {
      toast.error("No booking data found. Please book again.");
      navigate("/dashboard/book");
      return;
    }

    const fetchTempTicket = async () => {
      try {
        const res = await API.get(`/bookings/getTicket/${bookingId}`);
        setTicket(res.data.ticket || []);
        console.log(res.data);
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchTempTicket();
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft <= 0){ 
      toast.info('⏰ Time expired! Your booking has been cancelled. Redirecting to dashboard...')
       setTimeout(() => {
        handleBack(); // This would be navigate("/dashboard/book") in actual implementation
      }, 2000);
      return;}

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        
        // Show warning when 1 minute left
        if (newTime === 60) {
          toast.warning('⚠️ Only 1 minute left! Please complete your payment soon.');
        }
        
        // Show final warning when 30 seconds left
        if (newTime === 30) {
          toast.warning('🚨 Only 30 seconds left! Your booking will expire soon.');
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleProceed = async () => {
    toast.info(`Proceeding to payment`);
    navigate("/dashboard/make-payment",{
      state:{
        bookingId:bookingId,
      }
    })
  };
  
  const handleBack = async() => {
    navigate("/dashboard/book");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-32 right-16 w-16 h-16 bg-emerald-200 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 bg-green-300 rounded-full opacity-25 animate-pulse"></div>
          <div className="absolute bottom-32 right-10 w-24 h-24 bg-emerald-300 rounded-full opacity-20 animate-bounce"></div>
        </div>
        
        <div className="relative z-10 text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl max-w-md w-full border border-green-200">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full mb-6 flex items-center justify-center">
              <span className="text-2xl animate-bounce">🌿</span>
            </div>
            <div className="h-6 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full w-3/4 mb-4"></div>
            <div className="h-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full w-1/2"></div>
          </div>
          <p className="mt-8 text-green-700 font-semibold text-lg">🎫 Loading your ticket...</p>
          <div className="mt-4 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 p-4 relative overflow-hidden">
      {/* Animated nature background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-emerald-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-green-300 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 bg-emerald-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-green-400 rounded-full opacity-15 animate-ping"></div>
        <div className="absolute top-1/4 right-1/3 w-14 h-14 bg-emerald-400 rounded-full opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 mb-2 drop-shadow-lg animate-pulse">
            🌿 Your Event Pass 🌿
          </h1>
          <p className="text-green-700 text-lg sm:text-xl font-semibold">Temporary Reservation</p>
        </div>

        {/* Ticket Container - Responsive Design */}
        <div className="mb-8">
          {/* Mobile Layout - Vertical */}
          <div className="block lg:hidden">
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-500 border-4 border-green-200">
              {/* Ticket Header */}
              <div className="relative bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 p-6 text-white">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-emerald-300/20 to-green-600/20"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
                
                <div className="relative z-10 text-center">
                  <h2 className="text-2xl font-bold mb-2 animate-pulse">🌿 PRAKRITI POOJA 🌿</h2>
                  <p className="text-white/90 text-lg font-medium">2025</p>
                  <div className="mt-4 flex justify-center">
                    <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                      ticket.paymentStatus === 'pending' 
                        ? 'bg-yellow-400 text-yellow-900' 
                        : 'bg-green-400 text-green-900'
                    } animate-bounce`}>
                      {ticket.paymentStatus?.toUpperCase() || 'PENDING'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Ticket Body */}
              <div className="p-6 space-y-6">
                {/* Event Details */}
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2 text-green-700">
                    <span className="text-xl">📅</span>
                    <span className="font-semibold">7th September 2025</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-green-700">
                    <span className="text-xl">📍</span>
                    <span className="font-semibold">Bangalore</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-dashed border-green-300"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-green-600 text-sm font-bold">🎫 TICKET DETAILS</span>
                  </div>
                </div>

                {/* Ticket Info Grid */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-green-50 rounded-2xl p-4 text-center border border-green-200">
                    <p className="text-xs font-bold text-green-600 uppercase mb-1">🙋‍♂️ Name</p>
                    <p className="text-lg font-bold text-green-800">{ticket.name}</p>
                  </div>
                  <div className="bg-green-50 rounded-2xl p-4 text-center border border-green-200">
                    <p className="text-xs font-bold text-green-600 uppercase mb-1">📱 Phone</p>
                    <p className="text-lg font-bold text-green-800">{ticket.phone}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-emerald-50 rounded-2xl p-4 text-center border border-emerald-200">
                      <p className="text-xs font-bold text-emerald-600 uppercase mb-1">👥 Persons</p>
                      <p className="text-lg font-bold text-emerald-800">{ticket.ticketCount}</p>
                    </div>
                    <div className="bg-emerald-50 rounded-2xl p-4 text-center border border-emerald-200">
                      <p className="text-xs font-bold text-emerald-600 uppercase mb-1">💰 Amount</p>
                      <p className="text-lg font-bold text-emerald-800">₹{ticket.amount}</p>
                    </div>
                  </div>
                </div>

                {/* Booking ID */}
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-4 text-center border-2 border-green-300">
                  <p className="text-xs font-bold text-green-600 uppercase mb-2">🎟️ Booking Code</p>
                  <p className="text-xl font-bold text-green-800 tracking-wider">{bookingId?.slice(-8).toUpperCase()}</p>
                </div>

                {/* QR Code */}
                <div className="flex justify-center">
                  <div className="bg-green-100 rounded-2xl p-6 border-2 border-green-300">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center animate-pulse">
                      <span className="text-3xl">🌿</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ticket Perforations */}
              <div className="absolute left-0 top-1/2 w-6 h-6 bg-green-50 rounded-full -translate-x-3 -translate-y-1/2 border-2 border-green-200"></div>
              <div className="absolute right-0 top-1/2 w-6 h-6 bg-green-50 rounded-full translate-x-3 -translate-y-1/2 border-2 border-green-200"></div>
            </div>
          </div>

          {/* Desktop Layout - Horizontal */}
          <div className="hidden lg:block">
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-500 border-4 border-green-200">
              <div className="flex">
                {/* Left Side - Event Info */}
                <div className="flex-1 relative bg-gradient-to-br from-green-600 via-emerald-500 to-green-700 p-8 text-white">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-emerald-300/20 to-green-600/20"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-center">
                    <h2 className="text-4xl font-bold mb-4 animate-pulse">🌿 PRAKRITI POOJA 🌿</h2>
                    <p className="text-white/90 text-2xl font-medium mb-6">2025</p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-lg">
                        <span className="text-2xl">📅</span>
                        <span className="font-semibold">7th September 2025</span>
                      </div>
                      <div className="flex items-center gap-3 text-lg">
                        <span className="text-2xl">📍</span>
                        <span className="font-semibold">Bangalore</span>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <div className={`inline-block px-6 py-3 rounded-full text-sm font-bold ${
                        ticket.paymentStatus === 'pending' 
                          ? 'bg-yellow-400 text-yellow-900' 
                          : 'bg-green-400 text-green-900'
                      } animate-bounce`}>
                        {ticket.paymentStatus?.toUpperCase() || 'PENDING'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Ticket Details */}
                <div className="flex-1 p-8">
                  <div className="h-full flex flex-col justify-center space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-green-700 mb-2">🎫 TICKET DETAILS</h3>
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-green-300 to-transparent"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 rounded-2xl p-4 text-center border border-green-200">
                        <p className="text-xs font-bold text-green-600 uppercase mb-1">🙋‍♂️ Name</p>
                        <p className="text-lg font-bold text-green-800">{ticket.name}</p>
                      </div>
                      <div className="bg-green-50 rounded-2xl p-4 text-center border border-green-200">
                        <p className="text-xs font-bold text-green-600 uppercase mb-1">📱 Phone</p>
                        <p className="text-lg font-bold text-green-800">{ticket.phone}</p>
                      </div>
                      <div className="bg-emerald-50 rounded-2xl p-4 text-center border border-emerald-200">
                        <p className="text-xs font-bold text-emerald-600 uppercase mb-1">👥 Persons</p>
                        <p className="text-lg font-bold text-emerald-800">{ticket.ticketCount}</p>
                      </div>
                      <div className="bg-emerald-50 rounded-2xl p-4 text-center border border-emerald-200">
                        <p className="text-xs font-bold text-emerald-600 uppercase mb-1">💰 Amount</p>
                        <p className="text-lg font-bold text-emerald-800">₹{ticket.amount}</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-4 text-center border-2 border-green-300">
                      <p className="text-xs font-bold text-green-600 uppercase mb-2">🎟️ Booking Code</p>
                      <p className="text-2xl font-bold text-green-800 tracking-wider">{bookingId?.slice(-8).toUpperCase()}</p>
                    </div>

                    <div className="flex justify-center">
                      <div className="bg-green-100 rounded-2xl p-6 border-2 border-green-300">
                        <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center animate-pulse">
                          <span className="text-4xl">🌿</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Horizontal Perforations */}
              <div className="absolute top-0 left-1/2 w-6 h-6 bg-green-50 rounded-full -translate-x-3 -translate-y-3 border-2 border-green-200"></div>
              <div className="absolute bottom-0 left-1/2 w-6 h-6 bg-green-50 rounded-full -translate-x-3 translate-y-3 border-2 border-green-200"></div>
            </div>
          </div>
        </div>

        {/* Timer Alert */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 mb-8 border-2 border-orange-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-2xl">⏰</span>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-bold text-orange-700">⚡ Complete Payment</h3>
                <p className="text-sm text-orange-600">Booking expires in</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-6 py-3 rounded-full animate-pulse">
                <p className="text-2xl font-bold">{formatTime(timeLeft)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 max-w-md mx-auto">
          <button
            onClick={handleProceed}
            className="w-full bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 cursor-pointer animate-pulse"
            style={{
              boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)'
            }}
          >
            <span className="text-2xl">💳</span>
            <span>Proceed to Payment</span>
          </button>

          <button
            onClick={handleBack}
            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 px-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer border-2 border-green-300"
          >
            <span className="flex items-center justify-center gap-2">
              <span>🏠</span>
              <span>Back to Dashboard</span>
            </span>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-green-700 hover:text-green-600 text-sm transition-colors duration-200">
            🌿 Need help? Contact support at support@prakritipuja.com
          </p>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.5), 0 0 40px rgba(34, 197, 94, 0.2);
          }
          50% {
            box-shadow: 0 0 30px rgba(34, 197, 94, 0.8), 0 0 60px rgba(34, 197, 94, 0.4);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        button:hover {
          animation: pulse-glow 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default TempTicket;