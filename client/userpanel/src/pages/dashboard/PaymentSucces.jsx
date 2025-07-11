import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Copy, Check } from "lucide-react";
import './PaymentSuccess.css'

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { razorpay_payment_id, message } = location.state || {};

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(true);
  const [confettiOpacity, setConfettiOpacity] = useState(0);
  const [cardVisible, setCardVisible] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const copyToClipboard = async () => {
    if (!razorpay_payment_id) return;

    try {
      await navigator.clipboard.writeText(razorpay_payment_id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 px-4 py-8 overflow-hidden">
      {/* Animated background elements - matching HeroSection */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-16 h-16 sm:w-20 sm:h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-16 w-12 h-12 sm:w-16 sm:h-16 bg-emerald-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-10 h-10 sm:w-12 sm:h-12 bg-green-300 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute bottom-32 right-10 w-20 h-20 sm:w-24 sm:h-24 bg-emerald-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-6 h-6 sm:w-8 sm:h-8 bg-green-400 rounded-full opacity-15 animate-ping"></div>
        <div className="absolute top-1/4 right-1/3 w-12 h-12 sm:w-14 sm:h-14 bg-emerald-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 left-1/3 w-8 h-8 bg-green-300 rounded-full opacity-25 animate-bounce delay-700"></div>
        <div className="absolute bottom-1/4 right-1/4 w-10 h-10 bg-emerald-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
      </div>

      {/* Confetti Layer */}
      {showConfetti && (
        <div
          className="fixed inset-0 pointer-events-none transition-opacity duration-5000 ease-out z-20"
          style={{ opacity: confettiOpacity }}
        >
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={2000}
            recycle={false}
            gravity={0.1}
            initialVelocityY={-10}
            colors={["#10b981", "#34d399", "#6ee7b7", "#a7f3d0", "#d1fae5"]}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div
          className={`bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full text-center border border-green-100 transform transition-all duration-700 ease-out ${
            cardVisible
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-8 opacity-0 scale-95"
          }`}
          style={{
            boxShadow:
              "0 25px 50px -12px rgba(34, 197, 94, 0.25), 0 0 0 1px rgba(34, 197, 94, 0.05)",
          }}
        >
          {/* Success Icon with enhanced animation */}
          <div className="mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg animate-pulse">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Title with gradient text */}
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4 animate-pulse">
            Payment Successful!
          </h1>

          {/* Message */}
          <p className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed px-2">
            {message || "Your booking has been confirmed successfully."}
          </p>

          {/* Payment ID with copy functionality */}
          {razorpay_payment_id && (
            <div className="bg-gradient-to-r from-gray-50 to-green-50 rounded-2xl p-4 mb-6 border border-green-100 shadow-inner">
              <p className="text-gray-600 text-sm mb-2 font-medium">
                Transaction Reference
              </p>
              <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
                <p className="font-mono text-gray-800 text-xs sm:text-sm truncate flex-1 mr-2">
                  {razorpay_payment_id}
                </p>
                <button
                  onClick={copyToClipboard}
                  className="flex-shrink-0 p-1.5 hover:bg-gray-100 rounded-md transition-all duration-200 group"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-600 animate-pulse" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
                  )}
                </button>
              </div>
              {copied && (
                <p className="text-green-600 text-xs mt-2 animate-pulse">
                  Copied to clipboard!
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 ease-out animate-pulse hover:animate-none"
            >
              Go to Dashboard
            </button>

            <button
              onClick={() => navigate("/dashboard/tickets")}
              className="w-full px-6 py-3 bg-white/80 backdrop-blur-sm border-2 border-green-200 text-green-700 font-semibold rounded-2xl hover:bg-green-50 hover:border-green-300 transition-all duration-200 ease-out transform hover:-translate-y-0.5"
            >
              View My Bookings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
