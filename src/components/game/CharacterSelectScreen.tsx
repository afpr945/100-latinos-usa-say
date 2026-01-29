import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import introBackground from '@/assets/intro.png';
import manImage from '@/assets/man.png';
import womanImage from '@/assets/woman.png';

const CharacterSelectScreen: React.FC = () => {
  const { character, setCharacter, playerName, setPlayerName, setScreen } = useGame();
  const [localName, setLocalName] = useState(playerName);

  const handleContinue = () => {
    if (character && localName.trim()) {
      setPlayerName(localName.trim());
      setScreen('welcome');
    }
  };

  const handlePlayAsGuest = () => {
    if (character) {
      setPlayerName('Invitado');
      setScreen('welcome');
    }
  };

  return (
    <div className="game-container flex flex-col min-h-screen">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${introBackground})` }}
      />
      
      {/* Sparkle Effect */}
      <div className="sparkle-bg" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen p-6">
        {/* Logo */}
        <div className="text-center pt-2">
          <div className="logo-banner inline-block">
            <span className="text-white">FIRE PASS</span>
            <span className="text-gold text-xs ml-1">™</span>
          </div>
        </div>

        {/* Title Banner */}
        <div className="mt-6 animate-scale-in">
          <div className="title-banner mx-auto max-w-xs">
            <span className="title-gold">100 Latinos</span>
            <span className="text-white text-lg ml-2">En USA Dicen...</span>
          </div>
        </div>

        {/* Subtitle */}
        <div className="text-center mt-6 animate-slide-up">
          <h2 className="text-xl font-bold text-white">¿Quién sabe más de dinero?</h2>
          <p className="text-white/70 text-sm mt-1">Elige tu personaje para comenzar</p>
        </div>

        {/* Character Selection */}
        <div className="flex justify-center items-center gap-6 mt-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {/* Chico */}
          <div className="text-center">
            <button
              onClick={() => setCharacter('chico')}
              className={`character-card ${character === 'chico' ? 'selected' : ''}`}
            >
              <div className="character-card-inner w-32 h-32">
                <img 
                  src={manImage} 
                  alt="Coach FIRE Chico" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </button>
            <div className={`character-label ${character === 'chico' ? 'border-gold' : ''}`}>
              <span className="text-white">Coach FIRE</span>
              <br />
              <span className="text-cyan-400">CHICO</span>
            </div>
          </div>

          {/* OR */}
          <div className="text-gold font-bold text-lg">OR</div>

          {/* Chica */}
          <div className="text-center">
            <button
              onClick={() => setCharacter('chica')}
              className={`character-card ${character === 'chica' ? 'selected' : ''}`}
            >
              <div className="character-card-inner w-32 h-32">
                <img 
                  src={womanImage} 
                  alt="Coach FIRE Chica" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </button>
            <div className={`character-label ${character === 'chica' ? 'border-gold' : ''}`}>
              <span className="text-white">Coach FIRE</span>
              <br />
              <span className="text-pink-400">CHICA</span>
            </div>
          </div>
        </div>

        {/* Name Input */}
        <div className="mt-6 px-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <input
            type="text"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            placeholder="Ingresa tu nombre..."
            className="form-input text-center"
            maxLength={20}
          />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom Actions */}
        <div className="space-y-3 pb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={handlePlayAsGuest}
            disabled={!character}
            className="btn-cta disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Jugar sin registrarme
          </button>
          
          <button
            onClick={handleContinue}
            disabled={!character || !localName.trim()}
            className="btn-facebook disabled:opacity-50 disabled:cursor-not-allowed"
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

export default CharacterSelectScreen;
