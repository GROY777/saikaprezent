import { useState, useEffect } from 'react';

interface GreetingCardProps {
  onReplay: () => void;
}

interface Confetti {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
}

export function GreetingCard({ onReplay }: GreetingCardProps) {
  const [showCard, setShowCard] = useState(false);
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  useEffect(() => {
    // Generate confetti
    const colors = ['#ff6b9d', '#c44dff', '#6b5bff', '#ff4d94', '#ffd700', '#ff69b4'];
    const newConfetti: Confetti[] = [];
    for (let i = 0; i < 40; i++) {
      newConfetti.push({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2,
      });
    }
    setConfetti(newConfetti);

    // Show card after a brief celebration
    setTimeout(() => setShowCard(true), 500);
  }, []);

  return (
    <div className="min-h-screen min-h-[100dvh] flex items-center justify-center p-3 sm:p-4 relative overflow-hidden">
      {/* Confetti */}
      {confetti.map(c => (
        <div
          key={c.id}
          className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-sm animate-confetti"
          style={{
            left: `${c.x}%`,
            top: '-20px',
            backgroundColor: c.color,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
          }}
        />
      ))}

      {/* Celebration emojis - responsive positioning */}
      <div className="fixed top-16 sm:top-20 left-4 sm:left-10 text-3xl sm:text-5xl animate-bounce">🎉</div>
      <div className="fixed top-24 sm:top-32 right-4 sm:right-10 text-3xl sm:text-5xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎊</div>
      <div className="fixed bottom-16 sm:bottom-20 left-6 sm:left-16 text-2xl sm:text-4xl animate-bounce" style={{ animationDelay: '0.4s' }}>🌟</div>
      <div className="fixed bottom-24 sm:bottom-32 right-6 sm:right-16 text-2xl sm:text-4xl animate-bounce" style={{ animationDelay: '0.6s' }}>💫</div>

      {/* Main greeting card */}
      {showCard && (
        <div className="relative max-w-lg w-full animate-bounce-in mx-2">
          {/* Card glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-2xl sm:rounded-3xl blur-xl opacity-50 animate-pulse" />
          
          {/* Card content */}
          <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl border-2 sm:border-4 border-pink-300">
            {/* Top decoration */}
            <div className="absolute -top-4 sm:-top-6 left-1/2 transform -translate-x-1/2 text-4xl sm:text-5xl">
              💝
            </div>

            {/* Corner decorations - hidden on very small screens */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 text-lg sm:text-2xl hidden xs:block">🌸</div>
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 text-lg sm:text-2xl hidden xs:block">🌸</div>
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-lg sm:text-2xl hidden xs:block">✨</div>
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 text-lg sm:text-2xl hidden xs:block">✨</div>

            {/* Main content */}
            <div className="text-center pt-4 sm:pt-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-slide-up">
                Поздравляю тебя! 🎀
              </h1>

              <div className="space-y-3 sm:space-y-4 text-purple-700 animate-slide-up text-sm sm:text-base md:text-lg" style={{ animationDelay: '0.2s' }}>
                <p className="leading-relaxed">
                  Дорогая моя подружка! 💕
                </p>
                
                <p className="leading-relaxed">
                  Ты самая лучшая, самая добрая, самая красивая и самая замечательная! 
                </p>

                <p className="leading-relaxed">
                  Спасибо, что ты есть в моей жизни! 
                  Ты делаешь каждый день ярче и счастливее ✨
                </p>

                <p className="leading-relaxed">
                  Желаю тебе море счастья, океан любви, 
                  вселенную радости и бесконечного везения! 🌈
                </p>

                <div className="pt-3 sm:pt-4 text-xl sm:text-2xl space-x-1 sm:space-x-2">
                  <span className="animate-bounce inline-block" style={{ animationDelay: '0s' }}>💖</span>
                  <span className="animate-bounce inline-block" style={{ animationDelay: '0.1s' }}>💖</span>
                  <span className="animate-bounce inline-block" style={{ animationDelay: '0.2s' }}>💖</span>
                </div>

                <p className="text-lg sm:text-xl font-semibold text-pink-500 pt-1 sm:pt-2">
                  Люблю тебя! 💗
                </p>
              </div>

              {/* Signature area */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-pink-200">
                <p className="text-purple-500 italic text-sm sm:text-base">
                  Твоя подруга 🌷
                </p>
              </div>

              {/* Replay button */}
              <button
                onClick={onReplay}
                className="mt-4 sm:mt-6 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 text-sm sm:text-base"
              >
                Сыграть ещё раз 🎮
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
