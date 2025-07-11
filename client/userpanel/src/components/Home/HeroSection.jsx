import { useNavigate } from "react-router-dom";
import './HeroSection.css'

function HeroSection() {
  const navigate = useNavigate();
  const Booktickets = () => {
    setTimeout(() => {
      navigate("/dashboard");
    }, 100);
  };

  return (
    <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 py-16 md:py-24 text-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-emerald-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-green-300 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 bg-emerald-300 rounded-full opacity-20 animate-bounce"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main heading with enhanced typography */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-700 mb-4 leading-tight">
          🌿 PRAKRITI POOJA 2025 🌿
        </h1>

        {/* Subtitle with better spacing */}
        <p className="mt-4 text-lg sm:text-xl md:text-2xl text-green-800 font-medium">
          Reconnect with your roots!
        </p>

        {/* Event details with improved layout */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-base sm:text-lg text-green-700">
          <div className="flex items-center gap-2">
            <span className="text-xl">📅</span>
            <span className="font-medium">7th September 2025</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📍</span>
            <span className="font-medium">Bangalore</span>
          </div>
        </div>

        {/* Enhanced animated button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={Booktickets}
            className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
            style={{
              animation: 'pulse-glow 2s ease-in-out infinite, float 3s ease-in-out infinite'
            }}
          >
            {/* Animated background overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 group-hover:animate-shimmer"></div>
            
            {/* Button content */}
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-xl animate-bounce">🎟</span>
              <span>Book Tickets Now</span>
            </span>
          </button>
        </div>

        {/* Early bird offer with enhanced styling */}
        <div className="mt-8 inline-block px-6 py-3 bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-300 rounded-lg shadow-md">
          <p className="text-sm sm:text-base text-orange-700 font-semibold flex items-center justify-center gap-2">
            <span className="text-lg animate-pulse">🔥</span>
            <span>Early Bird Offer: First 1000 tickets only ₹300</span>
            <span className="text-lg animate-pulse">🔥</span>
          </p>
        </div>
      </div>

      
    </section>
  );
}

export default HeroSection;