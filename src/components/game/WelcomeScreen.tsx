import React from 'react';
import { useGame } from '@/context/GameContext';
import presenterImage from '@/assets/presenter.png';
import manImage from '@/assets/man.png';
import womanImage from '@/assets/woman.png';

const WelcomeScreen: React.FC = () => {
  const { playerName, character, startGame } = useGame();
  
  const characterImage = character === 'chico' ? manImage : womanImage;

  return (
    <div className="game-container flex flex-col min-h-screen">
      {/* Sparkle Background */}
      <div className="sparkle-bg" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-royal-purple/30 via-transparent to-background/80" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen p-6">
        {/* Logo */}
        <div className="text-center pt-2">
          <div className="logo-banner inline-block">
            <span className="text-white">FIRE PASS</span>
            <span className="text-gold text-xs ml-1">™</span>
          </div>
        </div>

        {/* Characters */}
        <div className="flex-1 flex items-center justify-center relative mt-4">
          {/* Presenter */}
          <div className="absolute left-0 bottom-0 w-40 animate-slide-up">
            <img 
              src={presenterImage} 
              alt="Presentador" 
              className="w-full h-auto drop-shadow-2xl"
            />
            {/* Speech Bubble */}
            <div className="speech-bubble absolute -top-16 left-8 right-0 text-sm">
              ¡{playerName}, bienvenido al reto FIRE PASS!
            </div>
          </div>
          
          {/* Player Character */}
          <div className="absolute right-0 bottom-0 w-36 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <img 
              src={characterImage} 
              alt="Tu personaje" 
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Message Box */}
        <div className="mb-8 animate-scale-in" style={{ animationDelay: '0.4s' }}>
          <div className="question-box">
            <h2 className="text-xl font-bold text-white mb-2">
              ¿Estás listo para el desafío?
            </h2>
            <p className="text-white/80 text-sm">
              Responde 10 preguntas sobre finanzas personales.
              <br />
              Tienes <span className="text-gold font-bold">15 segundos</span> por pregunta.
            </p>
          </div>
        </div>

        {/* Start Button */}
        <div className="pb-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={startGame}
            className="btn-cta animate-pulse-glow"
          >
            ¡Iniciemos! 🔥
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
