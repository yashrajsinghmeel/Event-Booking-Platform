import React, { useState, useEffect } from "react";
import './AboutUs.css'

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState({
    title: false,
    card1: false,
    card2: false,
    card3: false,
    footer: false,
  });

  useEffect(() => {
    // Animate elements with staggered timing
    const timeouts = [
      setTimeout(() => setIsVisible((prev) => ({ ...prev, title: true })), 200),
      setTimeout(() => setIsVisible((prev) => ({ ...prev, card1: true })), 600),
      setTimeout(
        () => setIsVisible((prev) => ({ ...prev, card2: true })),
        1000
      ),
      setTimeout(
        () => setIsVisible((prev) => ({ ...prev, card3: true })),
        1400
      ),
      setTimeout(
        () => setIsVisible((prev) => ({ ...prev, footer: true })),
        1800
      ),
    ];

    return () => timeouts.forEach((timeout) => clearTimeout(timeout));
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex flex-col items-center py-16 px-4 md:px-12 overflow-hidden">
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
        <div className="absolute top-1/3 left-1/6 w-14 h-14 bg-green-200 rounded-full opacity-20 animate-bounce delay-300"></div>
        <div className="absolute bottom-1/3 right-1/6 w-18 h-18 bg-emerald-300 rounded-full opacity-25 animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl">
        {/* Title Section */}
        <div
          className={`max-w-4xl mx-auto text-center mb-12 transform transition-all duration-700 ease-out ${
            isVisible.title
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 mb-4 animate-pulse">
            About Us
          </h1>
          <p className="text-lg sm:text-xl text-green-900 font-semibold">
            Celebrating nature, culture, and togetherness with heart.
          </p>
        </div>

        <div className="space-y-16">
          {/* Who we are */}
          <div
            className={`bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-8 md:p-12 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 transform ${
              isVisible.card1
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{
              boxShadow:
                "0 25px 50px -12px rgba(34, 197, 94, 0.25), 0 0 0 1px rgba(34, 197, 94, 0.05)",
              transitionDelay: "0.1s",
            }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4 animate-pulse">
              Who We Are
            </h2>
            <p className="text-green-900 leading-relaxed text-base sm:text-lg">
              We are the{" "}
              <span className="font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-lg">
                Aadivasi Boys Association
              </span>
              , a vibrant community of culture enthusiasts dedicated to
              preserving and promoting the rich traditions of our ancestors.
              With roots deep in heritage and hearts full of passion, we
              organize PRAKRITI POOJA — a festival where families, friends, and
              art lovers gather to celebrate life, music, and the timeless bond
              with nature.
            </p>
          </div>

          {/* What we believe */}
          <div
            className={`bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-8 md:p-12 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 transform ${
              isVisible.card2
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{
              boxShadow:
                "0 25px 50px -12px rgba(34, 197, 94, 0.25), 0 0 0 1px rgba(34, 197, 94, 0.05)",
              transitionDelay: "0.2s",
            }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4 animate-pulse">
              Our Vision
            </h2>
            <p className="text-green-900 leading-relaxed text-base sm:text-lg">
              We believe in living harmoniously with the earth, cherishing our
              traditions, and creating joyful spaces where everyone feels at
              home. Through PRAKRITI POOJA, we aim to reconnect urban hearts
              with rural roots — blending soulful bhajans, cultural dances,
              traditional foods, and eco-friendly practices into an
              unforgettable experience.
            </p>
          </div>

          {/* Why join us */}
          <div
            className={`bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-8 md:p-12 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 transform ${
              isVisible.card3
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{
              boxShadow:
                "0 25px 50px -12px rgba(34, 197, 94, 0.25), 0 0 0 1px rgba(34, 197, 94, 0.05)",
              transitionDelay: "0.3s",
            }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4 animate-pulse">
              Why Join Us?
            </h2>
            <ul className="text-green-900 space-y-3 text-base sm:text-lg">
              <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-green-50 transition-colors duration-200">
                <span className="text-xl animate-bounce">✨</span>
                <span>
                  Experience mesmerizing live performances and folk arts.
                </span>
              </li>
              <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-green-50 transition-colors duration-200">
                <span className="text-xl animate-bounce delay-100">🍃</span>
                <span>
                  Savor authentic, traditional cuisines under starlit skies.
                </span>
              </li>
              <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-green-50 transition-colors duration-200">
                <span className="text-xl animate-bounce delay-200">💚</span>
                <span>Engage with nature through eco workshops & rituals.</span>
              </li>
              <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-green-50 transition-colors duration-200">
                <span className="text-xl animate-bounce delay-300">🤝</span>
                <span>Meet warm-hearted people & make memories for life.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Section */}
        <div
          className={`mt-16 text-center transform transition-all duration-700 ease-out ${
            isVisible.footer
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div
            className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl p-6 sm:p-8 inline-block"
            style={{
              boxShadow:
                "0 25px 50px -12px rgba(34, 197, 94, 0.25), 0 0 0 1px rgba(34, 197, 94, 0.05)",
            }}
          >
            <p className="text-xl sm:text-2xl text-green-800 font-semibold mb-2 animate-pulse">
              Join us this September in Bangalore for PRAKRITI POOJA 2025 🌿
            </p>
            <p className="text-green-700 text-lg">
              Let's celebrate our roots, together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
