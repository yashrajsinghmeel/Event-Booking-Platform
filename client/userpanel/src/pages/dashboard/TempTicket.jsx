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
      <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(to_right,rgba(67,139,71,0.5),rgba(244,196,48,0.5),rgba(47,102,50,0.5))] p-4">
        <div className="text-center p-8 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl max-w-md w-full">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-200 to-yellow-200 rounded-full mb-6"></div>
            <div className="h-6 bg-gradient-to-r from-green-200 to-yellow-200 rounded-full w-3/4 mb-4"></div>
            <div className="h-4 bg-gradient-to-r from-green-100 to-yellow-100 rounded-full w-1/2"></div>
          </div>
          <p className="mt-8 text-green-700 font-semibold text-lg">Loading your ticket...</p>
          <div className="mt-4 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(to_right,rgba(67,139,71,0.5),rgba(244,196,48,0.5),rgba(47,102,50,0.5))] p-4 sm:p-6 lg:p-8">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold  text-[#2F6132] mb-2 drop-shadow-lg">
            Your Event Pass
          </h1>
          <p className="text-[#438B47]  text-lg font-medium">Temporary Reservation</p>
        </div>

        {/* Modern Ticket Design */}
        <div className="relative mb-8">
          {/* Main Ticket Container */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
            
            {/* Ticket Header with Gradient */}
            <div className="relative bg-gradient-to-r from-green-600 via-yellow-400 to-green-700 p-6 text-white">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-yellow-300/20 to-green-600/20"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-1">PRAKRITI POOJA</h2>
                    <p className="text-white/90 text-lg font-medium">2025</p>
                  </div>
                  <div className="text-right">
                    <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                      ticket.paymentStatus === 'pending' 
                        ? 'bg-yellow-500 text-yellow-900' 
                        : 'bg-green-500 text-green-900'
                    }`}>
                      {ticket.paymentStatus?.toUpperCase()}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-white/90">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">7th September 2025</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Bangalore</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Ticket Details Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</p>
                  <p className="text-lg font-bold text-gray-800">{ticket.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone</p>
                  <p className="text-lg font-bold text-gray-800">{ticket.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Persons</p>
                  <p className="text-lg font-bold text-gray-800">{ticket.ticketCount}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Amount</p>
                  <p className="text-lg font-bold text-green-600">₹{ticket.amount}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-dashed border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-gray-500 text-sm font-medium">TICKET DETAILS</span>
                </div>
              </div>

              {/* Booking Code */}
              <div className="bg-gray-50 rounded-2xl p-4 text-center">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Booking Code</p>
                <p className="text-2xl font-bold text-gray-800 tracking-wider">{bookingId?.slice(-8).toUpperCase()}</p>
              </div>

              {/* QR Code Placeholder */}
              <div className="flex justify-center">
                <div className="bg-gray-100 rounded-2xl p-4 flex items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zM3 15h6v6H3v-6zm2 2v2h2v-2H5zM15 3h6v6h-6V3zm2 2v2h2V5h-2zM15 15h2v2h-2v-2zM17 17h2v2h-2v-2zM19 15h2v2h-2v-2zM15 19h2v2h-2v-2zM17 21h2v2h-2v-2zM19 19h2v2h-2v-2z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Perforations */}
            <div className="absolute left-0 top-1/2 w-6 h-6 bg-gray-100 rounded-full -translate-x-3 -translate-y-1/2"></div>
            <div className="absolute right-0 top-1/2 w-6 h-6 bg-gray-100 rounded-full translate-x-3 -translate-y-1/2"></div>
          </div>
        </div>

        {/* Timer Alert */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border-l-4 border-yellow-400">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Complete Payment</h3>
                <p className="text-sm text-gray-600">Booking expires in</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full">
                <p className="text-2xl font-bold">{formatTime(timeLeft)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleProceed}
            className="w-full bg-gradient-to-r from-green-600 via-yellow-400 to-green-700 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
            <span>Proceed to Payment</span>
          </button>

          <button
            onClick={() => navigate("/dashboard/book")}
            className="w-full bg-[linear-gradient(to_right,rgba(67,139,71,1),rgba(244,196,48,1))] text-white py-3 px-4 rounded-2xl font-semibold group-hover:bg-[linear-gradient(to right, rgba(47,97,50,1), rgba(171,137,33,1))] focus:ring-4 focus:ring-[#60c9655e] transition-all duration-200 transform hover:scale-105 hover:cursor-pointer hover:shadow-xl"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-[#438B47] hover:text-[#2F6132] text-sm">
            Need help? Contact support at support@prakritipuja.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default TempTicket;