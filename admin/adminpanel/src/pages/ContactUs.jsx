import React from "react";
import "./ContactUs.css";

export default function ContactUs() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background elements - matching HeroSection */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-emerald-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-green-300 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 bg-emerald-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-green-400 rounded-full opacity-15 animate-ping"></div>
        <div className="absolute top-1/4 right-1/3 w-14 h-14 bg-emerald-400 rounded-full opacity-20 animate-pulse"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
        {/* Header section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 mb-4 leading-tight animate-pulse">
            🌿 Contact Us 🌿
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-green-800 font-semibold tracking-wide">
            Reach out to our team — we'd love to hear from you!
          </p>
        </div>

        {/* Contact cards grid */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {/* Main Organizer Card */}
          <div className="md:col-span-2 lg:col-span-3 bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-6 sm:p-8 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 animate-float border border-green-200/50">
            <div className="text-center mb-6">
              <div className="inline-block p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full mb-4 shadow-lg">
                <span className="text-4xl sm:text-5xl">🌱</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-2">
                Aadivasi Boys Association
              </h2>
              <p className="text-green-700 font-semibold text-lg mb-4">
                Organizers of PRAKRITI POOJA 2025
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3 bg-green-50/50 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-md">
                <span className="text-xl sm:text-2xl">📞</span>
                <div>
                  <p className="font-semibold text-green-800">Phone</p>
                  <p className="text-green-700">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3 bg-green-50/50 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-md">
                <span className="text-xl sm:text-2xl">📧</span>
                <div>
                  <p className="font-semibold text-green-800">Email</p>
                  <p className="text-green-700 text-sm">prakritipooja2025@culturefest.com</p>
                </div>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3 bg-green-50/50 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-md">
                <span className="text-xl sm:text-2xl">📷</span>
                <div>
                  <p className="font-semibold text-green-800">Instagram</p>
                  <p className="text-green-700">@prakriti_pooja</p>
                </div>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3 bg-green-50/50 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-md">
                <span className="text-xl sm:text-2xl">📍</span>
                <div>
                  <p className="font-semibold text-green-800">Location</p>
                  <p className="text-green-700">Bangalore, Karnataka</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cultural Committee Head Card */}
          <div className="md:col-span-2 lg:col-span-3 bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-6 sm:p-8 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 animate-float border border-green-200/50" style={{animationDelay: '0.2s'}}>
            <div className="text-center mb-6">
              <div className="inline-block p-3 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full mb-4 shadow-lg">
                <span className="text-3xl sm:text-4xl">🎭</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">
                Cultural Committee Head
              </h3>
              <p className="text-green-700 font-semibold text-lg mb-4">
                Mr. Sahil Rathi
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-green-50/50 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-md">
                <span className="text-lg sm:text-xl">📞</span>
                <div>
                  <p className="font-semibold text-green-800 text-sm">Phone</p>
                  <p className="text-green-700">+91 93412 34567</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-green-50/50 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-md">
                <span className="text-lg sm:text-xl">📧</span>
                <div>
                  <p className="font-semibold text-green-800 text-sm">Email</p>
                  <p className="text-green-700 text-sm">sahil.rathi@prakritipooja.in</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hospitality Manager Card */}
          <div className="md:col-span-2 lg:col-span-3 bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-6 sm:p-8 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 animate-float border border-green-200/50" style={{animationDelay: '0.4s'}}>
            <div className="text-center mb-6">
              <div className="inline-block p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full mb-4 shadow-lg">
                <span className="text-3xl sm:text-4xl">🤝</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">
                Hospitality & Stalls Manager
              </h3>
              <p className="text-green-700 font-semibold text-lg mb-4">
                Ms. Priya Sen
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-green-50/50 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-md">
                <span className="text-lg sm:text-xl">📞</span>
                <div>
                  <p className="font-semibold text-green-800 text-sm">Phone</p>
                  <p className="text-green-700">+91 99887 65432</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-green-50/50 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-md">
                <span className="text-lg sm:text-xl">📧</span>
                <div>
                  <p className="font-semibold text-green-800 text-sm">Email</p>
                  <p className="text-green-700 text-sm">priya.sen@prakritipooja.in</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Developer footer */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-6 sm:p-8 max-w-3xl w-full text-center hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 animate-float border border-green-200/50" style={{animationDelay: '0.6s'}}>
          <div className="inline-block p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4 shadow-lg">
            <span className="text-3xl sm:text-4xl">💻</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">
            Designed & Developed with ❤️ by
          </h2>
          <p className="text-green-900 font-bold text-lg sm:text-xl mb-2">
            Yashraj Singh Meel
          </p>
          <p className="text-green-700 mb-4 text-sm sm:text-base">
            BTech CSE | Web Developer | Tech & Culture Enthusiast
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-green-800">
            <a 
              href="tel:+919876543210" 
              className="flex items-center gap-2 bg-green-50/50 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-green-100/50 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              <span className="text-lg">📞</span>
              <span className="font-semibold">+91 98765 43210</span>
            </a>
            <a 
              href="mailto:yashraj@example.com" 
              className="flex items-center gap-2 bg-green-50/50 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-green-100/50 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              <span className="text-lg">📧</span>
              <span className="font-semibold">Email</span>
            </a>
            <a 
              href="https://github.com/yashraj" 
              className="flex items-center gap-2 bg-green-50/50 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-green-100/50 transition-colors duration-300 shadow-md hover:shadow-lg"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <span className="text-lg">🐙</span>
              <span className="font-semibold">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}