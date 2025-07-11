import React from 'react';
import { Heart, Star, Sparkles } from 'lucide-react';
import './Footer.css'

function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute top-4 left-10 text-green-300 opacity-20 animate-float">
          <Heart size={16} />
        </div>
        <div className="absolute top-6 right-16 text-emerald-300 opacity-25 animate-float" style={{ animationDelay: '1s' }}>
          <Star size={18} />
        </div>
        <div className="absolute bottom-4 left-1/4 text-green-200 opacity-20 animate-float" style={{ animationDelay: '2s' }}>
          <Sparkles size={14} />
        </div>
        <div className="absolute bottom-6 right-1/3 text-emerald-200 opacity-25 animate-float" style={{ animationDelay: '0.5s' }}>
          <Heart size={12} />
        </div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-2 right-24 w-6 h-6 bg-gradient-to-r from-green-300 to-emerald-300 rounded-full opacity-15 animate-float"></div>
        <div className="absolute bottom-2 left-16 w-4 h-4 bg-gradient-to-r from-emerald-300 to-green-300 rounded-full opacity-20 animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Organization Name */}
          <div className="text-center mb-4">
            <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 animate-pulse">
              Aadivasi Boys Association
            </h3>
            <div className="w-16 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 mx-auto mt-2 rounded-full animate-shimmer"></div>
          </div>

          {/* Decorative Elements */}
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-green-400 animate-expand"></div>
            <div className="flex items-center gap-2 text-green-600">
              <span className="animate-bounce text-lg">✨</span>
              <span className="text-sm font-medium">Preserving Culture, Building Community</span>
              <span className="animate-bounce text-lg" style={{ animationDelay: '0.5s' }}>✨</span>
            </div>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-emerald-400 animate-expand"></div>
          </div>

          {/* Copyright with enhanced styling */}
          <div className="text-center">
            <p className="text-sm md:text-base text-gray-600 animate-fade-in">
              © 2025 All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1 animate-fade-in-delay">
              Made with <Heart className="inline w-3 h-3 text-red-500 animate-pulse" /> for our community
            </p>
          </div>

          {/* Bottom decorative elements */}
          <div className="flex justify-center items-center gap-4 mt-4 text-lg opacity-60">
            <span className="animate-bounce">🌿</span>
            <span className="animate-pulse">🤝</span>
            <span className="animate-bounce" style={{ animationDelay: '0.5s' }}>🌍</span>
            <span className="animate-pulse" style={{ animationDelay: '1s' }}>💚</span>
          </div>
        </div>
      </div>

     
    </footer>
  );
}

export default Footer;