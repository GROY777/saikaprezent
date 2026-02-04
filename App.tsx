import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { HeartGame } from './components/HeartGame';
import { GreetingCard } from './components/GreetingCard';

type GameState = 'welcome' | 'playing' | 'completed';

export function App() {
  const [gameState, setGameState] = useState<GameState>('welcome');

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 overflow-hidden">
      {/* Floating background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          >
            <span className="text-xl sm:text-2xl opacity-20">
              {['✨', '💕', '🌸', '⭐', '💫'][Math.floor(Math.random() * 5)]}
            </span>
          </div>
        ))}
      </div>

      {gameState === 'welcome' && (
        <WelcomeScreen onStart={() => setGameState('playing')} />
      )}
      
      {gameState === 'playing' && (
        <HeartGame onComplete={() => setGameState('completed')} />
      )}
      
      {gameState === 'completed' && (
        <GreetingCard onReplay={() => setGameState('welcome')} />
      )}
    </div>
  );
}
