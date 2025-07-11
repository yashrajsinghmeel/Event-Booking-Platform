import "./EventHighlights.css";
function EventHighlights() {
  const points = [
    {
      icon: "🎤",
      text: "Cultural Performances",
      bgColor: "from-purple-100 to-pink-100",
      iconColor: "text-purple-600",
    },
    {
      icon: "🎶",
      text: "Live Bhajans & Folk Artists",
      bgColor: "from-blue-100 to-indigo-100",
      iconColor: "text-blue-600",
    },
    {
      icon: "🍽",
      text: "Authentic AADIVASI Food",
      bgColor: "from-orange-100 to-red-100",
      iconColor: "text-orange-600",
    },
    {
      icon: "📸",
      text: "Free Traditional Photo Booth",
      bgColor: "from-green-100 to-teal-100",
      iconColor: "text-green-600",
    },
    {
      icon: "👨‍👩‍👧‍👦",
      text: "Family Friendly Activities",
      bgColor: "from-yellow-100 to-orange-100",
      iconColor: "text-yellow-600",
    },
    {
      icon: "🎨",
      text: "Traditional Arts & Crafts",
      bgColor: "from-rose-100 to-pink-100",
      iconColor: "text-rose-600",
    },
  ];

  return (
    <section className="relative py-16 md:py-24 px-4 bg-gradient-to-b from-green-50 to-emerald-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating musical notes */}
        <div className="absolute top-20 left-10 text-3xl animate-bounce opacity-20">
          🎵
        </div>
        <div className="absolute top-32 right-16 text-2xl animate-pulse opacity-25">
          🎭
        </div>
        <div
          className="absolute bottom-20 left-20 text-4xl animate-bounce opacity-15"
          style={{ animationDelay: "0.5s" }}
        >
          🎪
        </div>
        <div
          className="absolute bottom-32 right-10 text-3xl animate-pulse opacity-20"
          style={{ animationDelay: "1s" }}
        >
          🎨
        </div>
        <div className="absolute top-1/2 left-1/4 text-2xl animate-ping opacity-10">
          ✨
        </div>
        <div
          className="absolute top-1/4 right-1/3 text-3xl animate-bounce opacity-15"
          style={{ animationDelay: "1.5s" }}
        >
          🌟
        </div>
        <div
          className="absolute top-3/4 left-1/2 text-2xl animate-pulse opacity-20"
          style={{ animationDelay: "2s" }}
        >
          🎊
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute top-16 right-24 w-12 h-12 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-20 animate-float"></div>
        <div
          className="absolute bottom-24 left-16 w-8 h-8 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full opacity-25 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-10 h-10 bg-gradient-to-r from-orange-300 to-red-300 rounded-full opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Enhanced heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-4 animate-pulse">
            ✨ Event Attractions ✨
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-400 mx-auto rounded-full animate-shimmer"></div>
        </div>

        {/* Enhanced attractions grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
          {points.map((point, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden bg-gradient-to-br ${point.bgColor} p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer animate-card-float`}
              style={{
                animationDelay: `${index * 0.2}s`,
                animation: `card-float 3s ease-in-out infinite ${
                  index * 0.2
                }s, card-glow 2s ease-in-out infinite ${index * 0.3}s`,
              }}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Sparkle effect */}
              <div className="absolute top-2 right-2 w-4 h-4 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-60 animate-ping"></div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <div
                  className={`text-4xl md:text-5xl lg:text-6xl mb-4 ${point.iconColor} animate-icon-bounce`}
                >
                  {point.icon}
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 leading-tight">
                  {point.text}
                </h3>
              </div>

              {/* Animated border */}
              <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-green-300 via-emerald-300 to-green-300 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl animate-border-spin"></div>
            </div>
          ))}
        </div>

        {/* Bottom decorative elements */}
        <div className="text-center mt-12 md:mt-16">
          <div className="flex justify-center items-center gap-4 text-2xl md:text-3xl opacity-60">
            <span className="animate-bounce">🎉</span>
            <span className="animate-pulse">🎈</span>
            <span className="animate-bounce" style={{ animationDelay: "0.5s" }}>
              🎊
            </span>
            <span className="animate-pulse" style={{ animationDelay: "1s" }}>
              🎁
            </span>
            <span className="animate-bounce" style={{ animationDelay: "1.5s" }}>
              🎀
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventHighlights;
