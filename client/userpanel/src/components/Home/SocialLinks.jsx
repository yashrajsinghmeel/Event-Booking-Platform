import React from "react";
import {
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  Heart,
  Star,
  Sparkles,
  Camera,
  Users,
  Play,
} from "lucide-react";

function SocialLinks() {
  const socials = [
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: Instagram,
      bgColor: "from-pink-100 to-purple-100",
      iconColor: "text-pink-600",
      gradientColor: "from-pink-500 to-purple-600",
    },
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: Facebook,
      bgColor: "from-blue-100 to-indigo-100",
      iconColor: "text-blue-600",
      gradientColor: "from-blue-500 to-blue-600",
    },
    {
      name: "YouTube",
      href: "https://youtube.com",
      icon: Youtube,
      bgColor: "from-red-100 to-orange-100",
      iconColor: "text-red-600",
      gradientColor: "from-red-500 to-red-600",
    },
    {
      name: "WhatsApp",
      href: "https://wa.me",
      icon: MessageCircle,
      bgColor: "from-green-100 to-emerald-100",
      iconColor: "text-green-600",
      gradientColor: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <section className="relative py-16 md:py-24 px-4 bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating social icons */}
        <div className="absolute top-20 left-10 text-3xl animate-bounce opacity-20">
          📱
        </div>
        <div className="absolute top-32 right-16 text-2xl animate-pulse opacity-25">
          💬
        </div>
        <div
          className="absolute bottom-20 left-20 text-4xl animate-bounce opacity-15"
          style={{ animationDelay: "0.5s" }}
        >
          ❤️
        </div>
        <div
          className="absolute bottom-32 right-10 text-3xl animate-pulse opacity-20"
          style={{ animationDelay: "1s" }}
        >
          📸
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
          👍
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute top-16 right-24 w-12 h-12 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-20 animate-float"></div>
        <div
          className="absolute bottom-24 left-16 w-8 h-8 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full opacity-25 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-10 h-10 bg-gradient-to-r from-green-300 to-emerald-300 rounded-full opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Enhanced heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-4 animate-pulse">
            🌐 Connect With Us 🌐
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-400 mx-auto rounded-full animate-shimmer"></div>
          <p className="text-lg md:text-xl text-gray-600 mt-4 animate-fade-in-delay">
            Follow us across all platforms
          </p>
        </div>

        {/* Enhanced social links grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {socials.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className={`group relative overflow-hidden bg-gradient-to-br ${social.bgColor} p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer animate-card-float`}
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
                    className={`flex justify-center mb-4 p-4 rounded-full bg-gradient-to-br ${social.gradientColor} transition-all duration-300 transform group-hover:rotate-12 group-hover:scale-110 animate-icon-bounce`}
                  >
                    <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 leading-tight">
                    {social.name}
                  </h3>
                </div>

                {/* Animated border */}
                <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-green-300 via-emerald-300 to-green-300 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl animate-border-spin"></div>
              </a>
            );
          })}
        </div>

        {/* Bottom decorative elements */}
        <div className="text-center mt-12 md:mt-16">
          <div className="flex justify-center items-center gap-4 text-2xl md:text-3xl opacity-60">
            <span className="animate-bounce">🔗</span>
            <span className="animate-pulse">💫</span>
            <span className="animate-bounce" style={{ animationDelay: "0.5s" }}>
              🚀
            </span>
            <span className="animate-pulse" style={{ animationDelay: "1s" }}>
              ⭐
            </span>
            <span className="animate-bounce" style={{ animationDelay: "1.5s" }}>
              💎
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SocialLinks;
