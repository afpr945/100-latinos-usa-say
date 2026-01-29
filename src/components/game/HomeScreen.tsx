import React from 'react';
import { useGame } from '@/context/GameContext';
import homeBackground from '@/assets/home.png';

const HomeScreen: React.FC = () => {
  const { setScreen } = useGame();

  return (
    <div className="game-container flex flex-col min-h-screen">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${homeBackground})` }}
      />
      
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen p-6">
        {/* Logo Area - Top */}
        <div className="text-center pt-2">
          <div className="logo-banner inline-block">
            <span className="text-white">FIRE PASS</span>
            <span className="text-gold text-xs ml-1">™</span>
          </div>
        </div>

        {/* Spacer to push button down */}
        <div className="flex-1" />

        {/* Bottom Actions */}
        <div className="space-y-4 pb-8 animate-slide-up">
          <button
            onClick={() => setScreen('character')}
            className="btn-cta animate-pulse-glow"
          >
            Jugar Ahora
          </button>
          
          <button
            onClick={() => setScreen('character')}
            className="btn-facebook"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Iniciar sesión con Facebook
          </button>
          
          <div className="text-center text-xs text-white/60 flex items-center justify-center gap-4">
            <span>🔒 Privacidad</span>
            <span>•</span>
            <span>Términos</span>
            <span>•</span>
            <span>Soporte</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
