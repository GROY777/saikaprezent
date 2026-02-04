interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen min-h-[100dvh] flex items-center justify-center p-4 sm:p-6">
      <div className="text-center animate-bounce-in w-full max-w-md">
        {/* Decorative gift box */}
        <div className="relative inline-block mb-6 sm:mb-8">
          <div className="text-6xl sm:text-8xl animate-heart-beat">🎁</div>
          <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 text-2xl sm:text-3xl animate-sparkle">✨</div>
          <div className="absolute -bottom-1 -left-1 sm:-left-2 text-xl sm:text-2xl animate-sparkle" style={{ animationDelay: '0.5s' }}>💖</div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent px-2">
          Привет, подружка! 💕
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-purple-600 mb-2 px-4">
          У меня для тебя есть кое-что особенное...
        </p>
        
        <p className="text-sm sm:text-md text-pink-500 mb-6 sm:mb-8">
          Но сначала небольшое испытание! 🎮
        </p>

        {/* Game instructions */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 mx-2 shadow-xl border border-pink-200">
          <h2 className="text-lg sm:text-xl font-semibold text-purple-700 mb-2 sm:mb-3">
            🎯 Твоя миссия:
          </h2>
          <p className="text-purple-600 mb-3 sm:mb-4 text-sm sm:text-base">
            Собери <span className="font-bold text-pink-500">10 сердечек</span>, тапая на них!
          </p>
          <div className="flex justify-center gap-1 sm:gap-2 text-2xl sm:text-3xl">
            <span className="animate-bounce" style={{ animationDelay: '0s' }}>💗</span>
            <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>💖</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>💕</span>
            <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>💝</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>❤️</span>
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={onStart}
          className="group relative px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-lg sm:text-xl font-bold rounded-full shadow-2xl hover:shadow-pink-300/50 transform hover:scale-105 active:scale-95 transition-all duration-300 animate-pulse-glow"
        >
          <span className="relative z-10">Начать игру! 🚀</span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>
    </div>
  );
}
