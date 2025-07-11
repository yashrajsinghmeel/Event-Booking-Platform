import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { razorpay_payment_id, message } = location.state || {};

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(true);
  const [confettiOpacity, setConfettiOpacity] = useState(0);
  const [cardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    // Set initial size
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    // Resize listener
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);

    // Animate confetti entrance
    const confettiTimer = setTimeout(() => setConfettiOpacity(1), 100);
    
    // Animate card entrance
    const cardTimer = setTimeout(() => setCardVisible(true), 300);

    // Start fading out confetti after 8 seconds
    const fadeTimer = setTimeout(() => {
      setConfettiOpacity(0);
      // Stop confetti completely after fade animation
      setTimeout(() => setShowConfetti(false), 2000);
    }, 8000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(confettiTimer);
      clearTimeout(cardTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 px-4 py-8">
      {showConfetti && (
        <div 
          className="fixed inset-0 pointer-events-none transition-opacity duration-2000 ease-out"
          style={{ opacity: confettiOpacity }}
        >
          <Confetti 
            width={windowSize.width} 
            height={windowSize.height} 
            numberOfPieces={8000}
            recycle={false}
            gravity={0.1}
            initialVelocityY={-10}
            colors={['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5']}
          />
        </div>
      )}

      <div 
        className={`bg-white shadow-2xl rounded-3xl p-8 max-w-md w-full text-center border border-green-100 transform transition-all duration-700 ease-out ${
          cardVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
        }`}
      >
        {/* Success Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
          Payment Successful!
        </h1>

        {/* Message */}
        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
          {message || "Your booking has been confirmed successfully."}
        </p>

        {/* Payment ID */}
        {razorpay_payment_id && (
          <div className="bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100">
            <p className="text-gray-600 text-sm mb-2 font-medium">Transaction Reference</p>
            <p className="font-mono text-gray-800 text-sm bg-white px-3 py-2 rounded-lg border">
              {razorpay_payment_id}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 ease-out"
          >
            Go to Dashboard
          </button>
          
          <button
            onClick={() => navigate("/dashboard/tickets")}
            className="w-full px-6 py-3 bg-white border-2 border-green-200 text-green-700 font-semibold rounded-2xl hover:bg-green-50 hover:border-green-300 transition-all duration-200 ease-out"
          >
            View My Bookings
          </button>
        </div>
      </div>

      {/* Floating elements for extra visual appeal */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-green-200 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-6 h-6 bg-emerald-200 rounded-full opacity-40 animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 right-10 w-3 h-3 bg-teal-200 rounded-full opacity-50 animate-pulse delay-500"></div>
    </div>
  );
}

export default PaymentSuccess;