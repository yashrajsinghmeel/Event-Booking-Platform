import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

function BookTickets() {
  const [ticketOptions, setTicketOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await API.get("/events/getEvents");
        setTicketOptions(res.data || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load tickets");
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const handleBook = (title, price, eventId) => {
    toast.info(`🚀 Booking process started for: ${title}`);
    navigate(`/dashboard/book-now/${title}`, {
      state: {
        ticketType: title,
        pricePer: price,
        eventId: eventId,
      },
    });
  };

  // Enhanced styling data for cards
  const cardStyles = [
    {
      bgColor: "from-blue-100 to-cyan-100",
      borderColor: "border-blue-300",
      textColor: "text-blue-700",
      priceColor: "text-blue-600",
      badge: "Popular",
      badgeColor: "bg-blue-500",
      icon: "🎫"
    },
    {
      bgColor: "from-green-100 to-emerald-100",
      borderColor: "border-green-300",
      textColor: "text-green-700",
      priceColor: "text-green-600",
      badge: "Best Value",
      badgeColor: "bg-green-500",
      icon: "🎟️"
    },
    {
      bgColor: "from-purple-100 to-pink-100",
      borderColor: "border-purple-300",
      textColor: "text-purple-700",
      priceColor: "text-purple-600",
      badge: "Premium",
      badgeColor: "bg-purple-500",
      icon: "🎪"
    },
    {
      bgColor: "from-orange-100 to-red-100",
      borderColor: "border-orange-300",
      textColor: "text-orange-700",
      priceColor: "text-orange-600",
      badge: "Limited",
      badgeColor: "bg-orange-500",
      icon: "🎊"
    },
    {
      bgColor: "from-indigo-100 to-blue-100",
      borderColor: "border-indigo-300",
      textColor: "text-indigo-700",
      priceColor: "text-indigo-600",
      badge: "Special",
      badgeColor: "bg-indigo-500",
      icon: "🎭"
    },
    {
      bgColor: "from-pink-100 to-rose-100",
      borderColor: "border-pink-300",
      textColor: "text-pink-700",
      priceColor: "text-pink-600",
      badge: "Exclusive",
      badgeColor: "bg-pink-500",
      icon: "🎨"
    }
  ];

  if (loading) {
    return (
      <section className="relative py-16 md:py-24 px-4 bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50">
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-32 w-32 border-b-2 border-green-700"></div>
          <p className="mt-4 text-2xl text-green-700 font-semibold animate-pulse">
            Loading amazing ticket options...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 md:py-24 px-4 bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating tickets */}
        <div className="absolute top-20 left-10 text-4xl animate-spin-slow opacity-15">🎫</div>
        <div className="absolute top-32 right-16 text-3xl animate-bounce opacity-20">🎟️</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-pulse opacity-10">🎪</div>
        <div className="absolute bottom-32 right-10 text-3xl animate-bounce opacity-15" style={{ animationDelay: '1s' }}>💰</div>
        <div className="absolute top-1/2 left-1/4 text-2xl animate-ping opacity-20">💎</div>
        <div className="absolute top-1/4 right-1/3 text-4xl animate-pulse opacity-15" style={{ animationDelay: '2s' }}>🎊</div>
        <div className="absolute top-3/4 left-1/2 text-3xl animate-bounce opacity-20" style={{ animationDelay: '1.5s' }}>🌟</div>
        
        {/* Floating coins */}
        <div className="absolute top-16 right-24 w-8 h-8 bg-yellow-400 rounded-full opacity-30 animate-coin-flip"></div>
        <div className="absolute bottom-24 left-16 w-6 h-6 bg-yellow-500 rounded-full opacity-25 animate-coin-flip" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-10 h-10 bg-yellow-300 rounded-full opacity-20 animate-coin-flip" style={{ animationDelay: '2s' }}></div>
        
        {/* Money bills floating */}
        <div className="absolute top-40 left-1/3 text-2xl animate-float opacity-20">💵</div>
        <div className="absolute bottom-40 right-1/3 text-2xl animate-float opacity-15" style={{ animationDelay: '1s' }}>💴</div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Enhanced heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-6 animate-pulse">
            🎟️ Book Your Tickets 🎟️
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-4 animate-fade-in">
            Choose from our exciting events and experiences
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-emerald-400 mx-auto rounded-full animate-shimmer"></div>
        </div>

        {/* Enhanced ticket cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {ticketOptions.map((ticket, index) => {
            const style = cardStyles[index % cardStyles.length];
            return (
              <div
                key={index}
                className={`group relative overflow-hidden bg-gradient-to-br ${style.bgColor} p-8 md:p-10 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer animate-card-float border-2 ${style.borderColor}`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animation: `card-float 3s ease-in-out infinite ${index * 0.2}s, card-glow 2s ease-in-out infinite ${index * 0.3}s`
                }}
              >
                {/* Badge */}
                <div className={`absolute top-4 right-4 ${style.badgeColor} text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse`}>
                  {style.badge}
                </div>
                
                {/* Sparkle effect */}
                <div className="absolute top-6 left-6 w-4 h-4 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-60 animate-ping"></div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <div className={`text-6xl md:text-7xl lg:text-8xl mb-6 ${style.textColor} animate-icon-bounce`}>
                    {style.icon}
                  </div>
                  
                  {/* Event title */}
                  <h3 className={`text-xl md:text-2xl lg:text-3xl font-bold ${style.textColor} mb-4`}>
                    {ticket.title}
                  </h3>
                  
                  {/* Original price (with discount effect) */}
                  <div className="mb-2">
                    <span className="text-gray-500 line-through text-lg md:text-xl">
                      ₹{Math.floor(ticket.price * 1.3)}
                    </span>
                    <span className="ml-2 text-red-500 font-semibold text-sm bg-red-100 px-2 py-1 rounded-full">
                      Save ₹{Math.floor(ticket.price * 0.3)}
                    </span>
                  </div>
                  
                  {/* Current price */}
                  <div className={`text-3xl md:text-4xl lg:text-5xl font-bold ${style.priceColor} mb-6 animate-price-pulse`}>
                    ₹{ticket.price}
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 mb-6 text-sm md:text-base line-clamp-3">
                    {ticket.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center justify-center gap-2 text-sm md:text-base text-gray-700">
                      <span className="text-green-500">✓</span>
                      <span>All Event Access</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm md:text-base text-gray-700">
                      <span className="text-green-500">✓</span>
                      <span>Digital Certificate</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm md:text-base text-gray-700">
                      <span className="text-green-500">✓</span>
                      <span>Free Refreshments</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm md:text-base text-gray-700">
                      <span className="text-green-500">✓</span>
                      <span>24/7 Support</span>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <button
                    onClick={() => handleBook(ticket.title, ticket.price, ticket._id)}
                    className={`w-full py-3 md:py-4 px-6 bg-gradient-to-r ${style.badgeColor.replace('bg-', 'from-')}-500 to-${style.badgeColor.replace('bg-', '')}-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-button-pulse`}
                  >
                    Book Now
                  </button>
                </div>
                
                {/* Animated border */}
                <div className={`absolute inset-0 border-2 border-transparent bg-gradient-to-r ${style.borderColor.replace('border-', 'from-')}-300 via-${style.borderColor.replace('border-', '')}-400 to-${style.borderColor.replace('border-', '')}-300 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl animate-border-glow`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom section */}
        <div className="text-center mt-12 md:mt-16">
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 rounded-2xl p-6 md:p-8 shadow-lg animate-pulse max-w-2xl mx-auto">
            <p className="text-lg md:text-xl font-semibold text-orange-700 mb-2">
              🔥 Limited Time Offer! 🔥
            </p>
            <p className="text-sm md:text-base text-orange-600">
              Book before month end and save up to 30% on all tickets!
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="flex justify-center items-center gap-4 mt-8 text-2xl md:text-3xl opacity-60">
            <span className="animate-bounce">💰</span>
            <span className="animate-pulse">💎</span>
            <span className="animate-bounce" style={{ animationDelay: '0.5s' }}>🎁</span>
            <span className="animate-pulse" style={{ animationDelay: '1s' }}>⭐</span>
            <span className="animate-bounce" style={{ animationDelay: '1.5s' }}>💫</span>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes card-float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes card-glow {
          0%, 100% {
            box-shadow: 0 10px 30px rgba(34, 197, 94, 0.1);
          }
          50% {
            box-shadow: 0 20px 40px rgba(34, 197, 94, 0.2);
          }
        }

        @keyframes icon-bounce {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.1);
          }
        }

        @keyframes price-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes button-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        @keyframes border-glow {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes coin-flip {
          0%, 100% {
            transform: rotateY(0deg) translateY(0px);
          }
          50% {
            transform: rotateY(180deg) translateY(-10px);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(10deg);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-card-float {
          animation: card-float 3s ease-in-out infinite;
        }

        .animate-icon-bounce {
          animation: icon-bounce 2s ease-in-out infinite;
        }

        .animate-price-pulse {
          animation: price-pulse 2s ease-in-out infinite;
        }

        .animate-button-pulse {
          animation: button-pulse 2s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }

        .animate-border-glow {
          animation: border-glow 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }

        .animate-coin-flip {
          animation: coin-flip 3s ease-in-out infinite;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .animate-card-float {
            animation: card-float 4s ease-in-out infinite;
          }
        }

        /* Hover effects */
        .group:hover .animate-icon-bounce {
          animation: icon-bounce 1s ease-in-out infinite;
        }

        .group:hover .animate-price-pulse {
          animation: price-pulse 1s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

export default BookTickets;