function TicketPricing() {
  const plans = [
    {
      label: "Single",
      price: "₹350",
      icon: "🎫",
      originalPrice: "₹500",
      bgColor: "from-blue-100 to-cyan-100",
      borderColor: "border-blue-300",
      textColor: "text-blue-700",
      priceColor: "text-blue-600",
      badge: "Popular",
      badgeColor: "bg-blue-500",
    },
    {
      label: "Group of 10",
      price: "₹320 each",
      icon: "🎟️",
      originalPrice: "₹400",
      bgColor: "from-green-100 to-emerald-100",
      borderColor: "border-green-300",
      textColor: "text-green-700",
      priceColor: "text-green-600",
      badge: "Best Value",
      badgeColor: "bg-green-500",
    },
    {
      label: "Bulk (50+)",
      price: "₹15,000",
      icon: "🎪",
      originalPrice: "₹20,000",
      bgColor: "from-purple-100 to-pink-100",
      borderColor: "border-purple-300",
      textColor: "text-purple-700",
      priceColor: "text-purple-600",
      badge: "Enterprise",
      badgeColor: "bg-purple-500",
    },
  ];

  return (
    <section className="relative py-16 md:py-24 px-4 bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating tickets */}
        <div className="absolute top-20 left-10 text-4xl animate-spin-slow opacity-15">
          🎫
        </div>
        <div className="absolute top-32 right-16 text-3xl animate-bounce opacity-20">
          🎟️
        </div>
        <div className="absolute bottom-20 left-20 text-5xl animate-pulse opacity-10">
          🎪
        </div>
        <div
          className="absolute bottom-32 right-10 text-3xl animate-bounce opacity-15"
          style={{ animationDelay: "1s" }}
        >
          💰
        </div>
        <div className="absolute top-1/2 left-1/4 text-2xl animate-ping opacity-20">
          💎
        </div>
        <div
          className="absolute top-1/4 right-1/3 text-4xl animate-pulse opacity-15"
          style={{ animationDelay: "2s" }}
        >
          🎊
        </div>
        <div
          className="absolute top-3/4 left-1/2 text-3xl animate-bounce opacity-20"
          style={{ animationDelay: "1.5s" }}
        >
          🌟
        </div>

        {/* Floating coins */}
        <div className="absolute top-16 right-24 w-8 h-8 bg-yellow-400 rounded-full opacity-30 animate-coin-flip"></div>
        <div
          className="absolute bottom-24 left-16 w-6 h-6 bg-yellow-500 rounded-full opacity-25 animate-coin-flip"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-10 h-10 bg-yellow-300 rounded-full opacity-20 animate-coin-flip"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Money bills floating */}
        <div className="absolute top-40 left-1/3 text-2xl animate-float opacity-20">
          💵
        </div>
        <div
          className="absolute bottom-40 right-1/3 text-2xl animate-float opacity-15"
          style={{ animationDelay: "1s" }}
        >
          💴
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Enhanced heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-6 animate-pulse">
            🎟️ Ticket Pricing 🎟️
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-4 animate-fade-in">
            Choose the perfect plan for your group
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-emerald-400 mx-auto rounded-full animate-shimmer"></div>
        </div>

        {/* Enhanced pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden bg-gradient-to-br ${plan.bgColor} p-8 md:p-10 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer animate-card-float border-2 ${plan.borderColor}`}
              style={{
                animationDelay: `${index * 0.2}s`,
                animation: `card-float 3s ease-in-out infinite ${
                  index * 0.2
                }s, card-glow 2s ease-in-out infinite ${index * 0.3}s`,
              }}
            >
              {/* Popular badge */}
              <div
                className={`absolute top-4 right-4 ${plan.badgeColor} text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse`}
              >
                {plan.badge}
              </div>

              {/* Sparkle effect */}
              <div className="absolute top-6 left-6 w-4 h-4 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-60 animate-ping"></div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Icon */}
                <div
                  className={`text-6xl md:text-7xl lg:text-8xl mb-6 ${plan.textColor} animate-icon-bounce`}
                >
                  {plan.icon}
                </div>

                {/* Plan label */}
                <h3
                  className={`text-xl md:text-2xl lg:text-3xl font-bold ${plan.textColor} mb-4`}
                >
                  {plan.label}
                </h3>

                {/* Original price (crossed out) */}
                <div className="mb-2">
                  <span className="text-gray-500 line-through text-lg md:text-xl">
                    {plan.originalPrice}
                  </span>
                </div>

                {/* Current price */}
                <div
                  className={`text-3xl md:text-4xl lg:text-5xl font-bold ${plan.priceColor} mb-6 animate-price-pulse`}
                >
                  {plan.price}
                </div>

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
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 md:py-4 px-6 bg-gradient-to-r ${plan.badgeColor.replace(
                    "bg-",
                    "from-"
                  )}-500 to-${plan.badgeColor.replace(
                    "bg-",
                    ""
                  )}-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-button-pulse`}
                >
                  Select Plan
                </button>
              </div>

              {/* Animated border */}
              <div
                className={`absolute inset-0 border-2 border-transparent bg-gradient-to-r ${plan.borderColor.replace(
                  "border-",
                  "from-"
                )}-300 via-${plan.borderColor.replace(
                  "border-",
                  ""
                )}-400 to-${plan.borderColor.replace(
                  "border-",
                  ""
                )}-300 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl animate-border-glow`}
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="text-center mt-12 md:mt-16">
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 rounded-2xl p-6 md:p-8 shadow-lg animate-pulse max-w-2xl mx-auto">
            <p className="text-lg md:text-xl font-semibold text-orange-700 mb-2">
              🔥 Limited Time Offer! 🔥
            </p>
            <p className="text-sm md:text-base text-orange-600">
              Book before September 1st and save up to 30% on all tickets!
            </p>
          </div>

          {/* Decorative elements */}
          <div className="flex justify-center items-center gap-4 mt-8 text-2xl md:text-3xl opacity-60">
            <span className="animate-bounce">💰</span>
            <span className="animate-pulse">💎</span>
            <span className="animate-bounce" style={{ animationDelay: "0.5s" }}>
              🎁
            </span>
            <span className="animate-pulse" style={{ animationDelay: "1s" }}>
              ⭐
            </span>
            <span className="animate-bounce" style={{ animationDelay: "1.5s" }}>
              💫
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TicketPricing;
