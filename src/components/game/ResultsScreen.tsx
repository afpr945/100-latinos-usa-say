import React, { useState, useMemo } from 'react';
import { useGame } from '@/context/GameContext';
import presenterImage from '@/assets/presenter.png';
import manImage from '@/assets/man.png';
import womanImage from '@/assets/woman.png';

const ResultsScreen: React.FC = () => {
  const { 
    playerName, 
    character, 
    questions, 
    answers, 
    highScore, 
    resetGame 
  } = useGame();
  
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const characterImage = character === 'chico' ? manImage : womanImage;

  // Calculate score
  const score = useMemo(() => {
    return questions.reduce((acc, q, idx) => {
      return acc + (answers[idx] === q.correctAnswer ? 1 : 0);
    }, 0);
  }, [questions, answers]);

  // Determine result type
  const resultType = useMemo(() => {
    if (score <= 4) return 'low';
    if (score <= 9) return 'medium';
    return 'high';
  }, [score]);

  const resultConfig = {
    low: {
      title: '¡Fuera del promedio!',
      subtitle: 'Pero no te preocupes...',
      message: 'La educación financiera es un viaje. ¡Vuelve a intentarlo!',
      emoji: '😅',
      buttonText: 'Reiniciar Juego',
      prize: null,
      color: 'text-red-400'
    },
    medium: {
      title: '¡En el promedio!',
      subtitle: '¡Buen trabajo!',
      message: 'Tienes conocimientos sólidos. Descarga nuestro Ebook GRATIS para seguir aprendiendo.',
      emoji: '🎉',
      buttonText: 'Descargar Ebook Gratis',
      prize: 'ebook',
      color: 'text-yellow-400'
    },
    high: {
      title: '¡PREMIO MAYOR!',
      subtitle: '¡Increíble! Puntaje Perfecto',
      message: 'Eres un experto en finanzas. Obtén acceso a nuestra "Fórmula de los $100K".',
      emoji: '🏆',
      buttonText: 'Reclamar Premio',
      prize: '100k',
      color: 'text-gold'
    }
  };

  const config = resultConfig[resultType];

  const handleAction = () => {
    if (resultType === 'low') {
      resetGame();
    } else {
      setShowLeadForm(true);
    }
  };

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the lead data to your backend
    console.log('Lead captured:', { name: playerName, email, score, prize: config.prize });
    setSubmitted(true);
    setTimeout(() => {
      resetGame();
    }, 3000);
  };

  return (
    <div className="game-container flex flex-col min-h-screen">
      {/* Sparkle Background */}
      <div className="sparkle-bg" />

      {/* Celebratory overlay for high scores */}
      {resultType === 'high' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-gold/10 via-transparent to-transparent animate-pulse" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen p-6">
        {/* Logo */}
        <div className="text-center pt-2">
          <div className="logo-banner inline-block">
            <span className="text-white">FIRE PASS</span>
            <span className="text-gold text-xs ml-1">™</span>
          </div>
        </div>

        {/* Result Card */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="result-card w-full animate-scale-in">
            {/* Emoji */}
            <div className="text-6xl mb-4 animate-bounce-slow">
              {config.emoji}
            </div>

            {/* Score */}
            <div className="mb-4">
              <div className={`text-5xl font-black ${config.color}`}>
                {score}/10
              </div>
              <div className="text-muted-foreground text-sm mt-1">
                Tu puntaje
              </div>
            </div>

            {/* Title */}
            <h2 className={`text-2xl font-black ${config.color} mb-1`}>
              {config.title}
            </h2>
            <p className="text-white font-semibold mb-2">
              {config.subtitle}
            </p>
            <p className="text-muted-foreground text-sm mb-6">
              {config.message}
            </p>

            {/* High Score */}
            <div className="bg-white/5 rounded-xl p-3 mb-6">
              <div className="text-xs text-muted-foreground">Mejor puntaje</div>
              <div className="text-gold font-bold text-lg">{highScore}/10</div>
            </div>

            {/* Characters */}
            <div className="flex justify-center items-end gap-4 mb-6">
              <img 
                src={presenterImage} 
                alt="Presentador" 
                className="w-20 h-auto drop-shadow-lg"
              />
              <img 
                src={characterImage} 
                alt="Tu personaje" 
                className="w-16 h-auto drop-shadow-lg"
              />
            </div>

            {/* Action Button */}
            <button
              onClick={handleAction}
              className="btn-cta animate-pulse-glow"
            >
              {config.buttonText}
            </button>
          </div>
        </div>
      </div>

      {/* Lead Form Popup */}
      {showLeadForm && (
        <div className="lead-popup">
          <div className="lead-form animate-scale-in">
            {!submitted ? (
              <>
                <button
                  onClick={() => setShowLeadForm(false)}
                  className="absolute top-4 right-4 text-white/60 hover:text-white"
                >
                  ✕
                </button>

                <div className="text-center mb-6">
                  <div className="text-4xl mb-2">
                    {resultType === 'high' ? '🏆' : '📚'}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {resultType === 'high' ? 'Fórmula de los $100K' : 'Ebook Gratis'}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Ingresa tu email para recibir tu premio
                  </p>
                </div>

                <form onSubmit={handleSubmitLead} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      value={playerName}
                      disabled
                      className="form-input opacity-70"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                      className="form-input"
                    />
                  </div>
                  <button type="submit" className="btn-cta">
                    Enviar Premio 🎁
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  ¡Enviado!
                </h3>
                <p className="text-muted-foreground">
                  Revisa tu correo electrónico.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsScreen;
