import { useState, useEffect, useCallback, useRef } from 'react';

interface HeartGameProps {
  onComplete: () => void;
}

interface Heart {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
  collected: boolean;
}

const HEARTS_TO_WIN = 10;
const HEART_EMOJIS = ['💗', '💖', '💕', '💝', '❤️', '💓', '💘', '🩷'];

export function HeartGame({ onComplete }: HeartGameProps) {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [score, setScore] = useState(0);
  const [nextId, setNextId] = useState(0);
  const gameRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(0);
  const completed = useRef<boolean>(false);

  // Game loop
  useEffect(() => {
    const SPAWN_INTERVAL = 1200; // ms between spawns (slower)
    const FALL_SPEED = 0.3; // pixels per frame (much slower!)
    let localNextId = nextId;

    const gameLoop = (timestamp: number) => {
      // Spawn new hearts
      if (timestamp - lastSpawnRef.current > SPAWN_INTERVAL) {
        const newHeart: Heart = {
          id: localNextId,
          x: Math.random() * 80 + 10, // 10-90%
          y: -10,
          emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
          size: 56 + Math.random() * 28, // 56-84px - even bigger for mobile
          collected: false,
        };
        setHearts(prev => [...prev, newHeart]);
        localNextId += 1;
        setNextId(localNextId);
        lastSpawnRef.current = timestamp;
      }

      // Move hearts down
      setHearts(prev => 
        prev
          .map(heart => ({
            ...heart,
            y: heart.y + FALL_SPEED,
          }))
          .filter(heart => heart.y < 110 && !heart.collected) // Remove off-screen or collected
      );

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame((ts) => gameLoop(ts));
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle heart click/tap
  const catchHeart = useCallback((heartId: number, e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (completed.current) return;

    setHearts(prev => prev.map(h => 
      h.id === heartId ? { ...h, collected: true } : h
    ));
    
    setScore(prev => {
      const newScore = prev + 1;
      if (newScore >= HEARTS_TO_WIN && !completed.current) {
        completed.current = true;
        setTimeout(() => onComplete(), 600);
      }
      return newScore;
    });
  }, [onComplete]);

  const progress = (score / HEARTS_TO_WIN) * 100;

  return (
    <div 
      ref={gameRef}
      className="min-h-screen min-h-[100dvh] relative overflow-hidden touch-none select-none"
    >
      {/* Header with score */}
      <div className="fixed top-0 left-0 right-0 z-50 p-3 sm:p-4 bg-white/90 backdrop-blur-md border-b border-pink-200 safe-top">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-base sm:text-lg font-bold text-purple-700">
              💖 {score}/{HEARTS_TO_WIN}
            </span>
            <span className="text-xl sm:text-2xl animate-heart-beat">
              {score >= HEARTS_TO_WIN ? '🎉' : '🎯'}
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="h-3 sm:h-4 bg-pink-100 rounded-full overflow-hidden border-2 border-pink-300">
            <div 
              className="h-full bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Game area */}
      <div className="pt-20 sm:pt-24 min-h-screen min-h-[100dvh] relative">
        {/* Instructions */}
        <div className="text-center py-2 sm:py-4">
          <p className="text-purple-600 font-medium text-sm sm:text-base px-4">
            👆 Тапай на сердечки чтобы собрать их!
          </p>
        </div>

        {/* Falling hearts */}
        {hearts.map(heart => (
          <button
            key={heart.id}
            onMouseDown={(e) => catchHeart(heart.id, e)}
            onTouchStart={(e) => catchHeart(heart.id, e)}
            className={`absolute transform transition-transform duration-75 select-none z-10 p-2 
              ${heart.collected ? 'scale-150 opacity-0' : 'active:scale-125'}`}
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              fontSize: `${heart.size}px`,
              transform: `translateX(-50%)`,
              touchAction: 'none',
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
            }}
            aria-label="Поймать сердечко"
          >
            {heart.emoji}
          </button>
        ))}

        {/* Celebration effect when close to winning */}
        {score >= 8 && score < HEARTS_TO_WIN && (
          <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
            <div className="text-4xl sm:text-6xl animate-pulse">
              ✨ Почти! ✨
            </div>
          </div>
        )}
        
        {/* Win animation */}
        {score >= HEARTS_TO_WIN && (
          <div className="fixed inset-0 pointer-events-none flex items-center justify-center bg-pink-200/50">
            <div className="text-5xl sm:text-7xl animate-bounce">
              🎉💖🎉
            </div>
          </div>
        )}
      </div>

      {/* Bottom safe area */}
      <div className="fixed bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-pink-200/50 to-transparent pointer-events-none" />
    </div>
  );
}
