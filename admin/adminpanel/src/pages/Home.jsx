import { useNavigate } from "react-router-dom";
import './Home.css'
function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex flex-col justify-center items-center p-4 sm:p-6 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-emerald-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-green-300 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 bg-emerald-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-green-400 rounded-full opacity-15 animate-ping"></div>
        <div className="absolute top-1/4 right-1/3 w-14 h-14 bg-emerald-400 rounded-full opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Enhanced Welcome Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 mb-4 leading-tight animate-pulse">
            👑 Welcome Admin! 👑
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-green-800 font-semibold tracking-wide">
            Your event management dashboard
          </p>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 w-full">
          {/* Revenue Card */}
          <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-4 sm:p-6 text-center transform hover:scale-105 transition-all duration-300 border border-green-200">
            {/* Shimmer effect */}
            <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 animate-shimmer"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-2xl sm:text-3xl animate-bounce">💰</span>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-700">Revenue</h2>
              </div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 animate-pulse">
                ₹1,25,000
              </p>
            </div>
          </div>

          {/* Tickets Sold Card */}
          <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-4 sm:p-6 text-center transform hover:scale-105 transition-all duration-300 border border-green-200">
            {/* Shimmer effect */}
            <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 animate-shimmer"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-2xl sm:text-3xl animate-bounce">🎟</span>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-700">Tickets Sold</h2>
              </div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 animate-pulse">
                530
              </p>
            </div>
          </div>

          {/* Pending Validations Card */}
          <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-4 sm:p-6 text-center transform hover:scale-105 transition-all duration-300 border border-green-200">
            {/* Shimmer effect */}
            <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 animate-shimmer"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-2xl sm:text-3xl animate-bounce">🧾</span>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-700">Pending Validations</h2>
              </div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 animate-pulse">
                27
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Dashboard Button */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="group relative overflow-hidden px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg sm:text-xl rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 cursor-pointer animate-float"
            style={{
              boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)',
              animation: 'pulse-glow 2s ease-in-out infinite, float 3s ease-in-out infinite'
            }}
          >
            {/* Animated background overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 animate-shimmer"></div>
            
            {/* Button content */}
            <span className="relative z-10 flex items-center gap-3">
              <span className="text-lg sm:text-xl md:text-2xl animate-bounce">📊</span>
              <span className="tracking-wide">Go to Dashboard</span>
            </span>
          </button>
        </div>

        {/* Additional floating elements for visual enhancement */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 hidden md:block">
          <div className="w-6 h-6 bg-green-300 rounded-full opacity-30 animate-ping"></div>
        </div>
        <div className="absolute bottom-40 right-1/4 hidden lg:block">
          <div className="w-10 h-10 bg-emerald-300 rounded-full opacity-25 animate-pulse"></div>
        </div>
      </div>

     
    </div>
  );
}

export default Home;