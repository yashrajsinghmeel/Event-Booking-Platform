import './CallToAction.css'

function CallToAction() {
  return (
    <section className="relative py-16 md:py-24 px-4 bg-gradient-to-br from-green-800 via-green-700 to-emerald-800 text-white text-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating cultural elements */}
        <div className="absolute top-10 left-10 text-3xl animate-bounce opacity-30">🏛️</div>
        <div className="absolute top-20 right-16 text-4xl animate-pulse opacity-25">🎭</div>
        <div className="absolute bottom-20 left-20 text-3xl animate-bounce opacity-20" style={{ animationDelay: '0.5s' }}>🪔</div>
        <div className="absolute bottom-32 right-10 text-4xl animate-pulse opacity-30" style={{ animationDelay: '1s' }}>🌺</div>
        <div className="absolute top-1/2 left-1/4 text-2xl animate-ping opacity-20">✨</div>
        <div className="absolute top-1/4 right-1/3 text-3xl animate-bounce opacity-25" style={{ animationDelay: '1.5s' }}>🎊</div>
        <div className="absolute top-3/4 left-1/2 text-2xl animate-pulse opacity-20" style={{ animationDelay: '2s' }}>🌟</div>
        
        {/* Family silhouettes */}
        <div className="absolute top-16 left-1/3 text-2xl animate-float opacity-20">👨‍👩‍👧‍👦</div>
        <div className="absolute bottom-24 right-1/4 text-2xl animate-float opacity-25" style={{ animationDelay: '1s' }}>👨‍👩‍👧</div>
        <div className="absolute top-1/3 right-1/5 text-2xl animate-float opacity-20" style={{ animationDelay: '2s' }}>👪</div>
        
        {/* Traditional patterns */}
        <div className="absolute top-12 right-20 w-16 h-16 border-2 border-white/20 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-16 left-16 w-12 h-12 border-2 border-yellow-300/30 rounded-full animate-spin-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-8 h-8 border-2 border-orange-300/25 rounded-full animate-spin-slow" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-1/4 w-6 h-6 bg-yellow-400/30 transform rotate-45 animate-float"></div>
        <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-orange-400/25 transform rotate-45 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 left-1/5 w-4 h-4 bg-red-400/30 transform rotate-45 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main heading with enhanced animation */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 mb-4 animate-title-glow leading-tight">
            🎉 KARAM POOJA 2025 - BANGALORE 🎉
          </h2>
          <div className="w-32 md:w-48 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full animate-shimmer"></div>
        </div>

        {/* Organization info */}
        <div className="mb-8 md:mb-12">
          <div className="inline-block bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-white/30 animate-card-glow">
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-yellow-200 flex items-center justify-center gap-2">
              <span className="text-2xl animate-bounce">🏛️</span>
              <span>Organized by Aadivasi Boys Association</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>🏛️</span>
            </p>
          </div>
        </div>

        {/* Event details */}
        <div className="mb-12 md:mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12">
            <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-500/30 to-green-500/30 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-green-300/50 animate-card-float">
              <span className="text-2xl sm:text-3xl animate-pulse">📅</span>
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-green-100">7th Sept 2025</span>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-blue-300/50 animate-card-float" style={{ animationDelay: '0.5s' }}>
              <span className="text-2xl sm:text-3xl animate-pulse">📍</span>
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-blue-100">Bangalore</span>
            </div>
          </div>
        </div>

        {/* Motivational quotes */}
        <div className="space-y-6 md:space-y-8">
          <div className="relative">
            <div className="absolute -top-2 -left-2 text-4xl md:text-5xl text-yellow-300 opacity-50 animate-bounce">"</div>
            <div className="absolute -bottom-2 -right-2 text-4xl md:text-5xl text-yellow-300 opacity-50 animate-bounce" style={{ animationDelay: '1s' }}>"</div>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-200 italic animate-text-glow px-8">
              Bring your family, pay less!
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute -top-2 -left-2 text-4xl md:text-5xl text-orange-300 opacity-50 animate-bounce" style={{ animationDelay: '0.5s' }}>"</div>
            <div className="absolute -bottom-2 -right-2 text-4xl md:text-5xl text-orange-300 opacity-50 animate-bounce" style={{ animationDelay: '1.5s' }}>"</div>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-orange-200 italic animate-text-glow px-8" style={{ animationDelay: '1s' }}>
              More you bring, more you save!
            </p>
          </div>
        </div>

        {/* Call to action elements */}
        <div className="mt-12 md:mt-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
            <div className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-semibold text-white animate-bounce">
              <span className="text-2xl">👨‍👩‍👧‍👦</span>
              <span>Family Unity</span>
            </div>
            <div className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-semibold text-white animate-bounce" style={{ animationDelay: '0.5s' }}>
              <span className="text-2xl">🎊</span>
              <span>Cultural Celebration</span>
            </div>
            <div className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-semibold text-white animate-bounce" style={{ animationDelay: '1s' }}>
              <span className="text-2xl">💰</span>
              <span>Great Savings</span>
            </div>
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="mt-12 md:mt-16 flex justify-center items-center gap-4 md:gap-6 text-3xl md:text-4xl opacity-70">
          <span className="animate-bounce">🌺</span>
          <span className="animate-pulse">🪔</span>
          <span className="animate-bounce" style={{ animationDelay: '0.5s' }}>🎭</span>
          <span className="animate-pulse" style={{ animationDelay: '1s' }}>🏛️</span>
          <span className="animate-bounce" style={{ animationDelay: '1.5s' }}>🌟</span>
        </div>
      </div>

      {/* Animated waves at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-20 md:h-32"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="animate-wave"
            fill="rgba(255,255,255,0.1)"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="animate-wave"
            fill="rgba(255,255,255,0.1)"
            style={{ animationDelay: '2s' }}
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="animate-wave"
            fill="rgba(255,255,255,0.1)"
            style={{ animationDelay: '4s' }}
          />
        </svg>
      </div>

      
      
    </section>
  );
}

export default CallToAction;