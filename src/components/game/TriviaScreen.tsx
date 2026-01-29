import React, { useState, useEffect, useCallback } from 'react';
import { useGame } from '@/context/GameContext';
import presenterImage from '@/assets/presenter.png';
import manImage from '@/assets/man.png';
import womanImage from '@/assets/woman.png';

const TIMER_DURATION = 15; // 15 seconds per question

const TriviaScreen: React.FC = () => {
  const { 
    questions, 
    currentQuestionIndex, 
    character,
    answers,
    answerQuestion, 
    nextQuestion 
  } = useGame();
  
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [selectedAnswer, setSelectedAnswer] = useState<'a' | 'b' | 'c' | 'd' | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const characterImage = character === 'chico' ? manImage : womanImage;
  
  // Timer color based on time left
  const getTimerColor = () => {
    if (timeLeft > 10) return 'green';
    if (timeLeft > 5) return 'yellow';
    return 'red';
  };

  // Calculate progress ring offset
  const circumference = 2 * Math.PI * 24;
  const progressOffset = ((TIMER_DURATION - timeLeft) / TIMER_DURATION) * circumference;

  const handleAnswer = useCallback((answer: 'a' | 'b' | 'c' | 'd') => {
    if (isTransitioning || selectedAnswer) return;
    
    setSelectedAnswer(answer);
    answerQuestion(answer);
    
    // Transition to next question
    setIsTransitioning(true);
    setTimeout(() => {
      nextQuestion();
      setSelectedAnswer(null);
      setTimeLeft(TIMER_DURATION);
      setIsTransitioning(false);
    }, 500);
  }, [isTransitioning, selectedAnswer, answerQuestion, nextQuestion]);

  // Timer effect
  useEffect(() => {
    if (isTransitioning) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time's up - auto-advance with no answer
          handleAnswer('a'); // Default to 'a' if time runs out
          return TIMER_DURATION;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTransitioning, handleAnswer]);

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(TIMER_DURATION);
    setSelectedAnswer(null);
  }, [currentQuestionIndex]);

  if (!currentQuestion) return null;

  const presenterPhrases = [
    "¡Vamos allá!",
    "¡Buena suerte!",
    "¡Tú puedes!",
    "¡Piensa bien!",
    "¡A ganar!",
    "¡Éxito!",
    "¡Dale!",
    "¡Vamos!",
    "¡Confía!",
    "¡Último empujón!"
  ];

  return (
    <div className="game-container flex flex-col min-h-screen">
      {/* Sparkle Background */}
      <div className="sparkle-bg" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-white font-bold">
            <span className="text-muted-foreground">Pregunta</span>{' '}
            <span className="text-gold text-xl">{currentQuestionIndex + 1}</span>
            <span className="text-muted-foreground"> de 10</span>
          </div>
          
          {/* Timer */}
          <div className="timer-ring">
            <svg width="64" height="64" viewBox="0 0 64 64">
              <circle
                className="timer-ring-bg"
                cx="32"
                cy="32"
                r="24"
                fill="none"
                strokeWidth="6"
              />
              <circle
                className={`timer-ring-progress ${getTimerColor()}`}
                cx="32"
                cy="32"
                r="24"
                fill="none"
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={progressOffset}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`font-bold text-lg ${
                timeLeft <= 5 ? 'text-red-500' : timeLeft <= 10 ? 'text-yellow-500' : 'text-green-500'
              }`}>
                {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Presenter with Speech Bubble */}
        <div className="relative flex items-start gap-2 mb-4">
          <div className="w-24 shrink-0">
            <img 
              src={presenterImage} 
              alt="Presentador" 
              className="w-full h-auto drop-shadow-lg animate-float"
            />
          </div>
          <div className="speech-bubble text-sm flex-1 mt-4">
            {presenterPhrases[currentQuestionIndex]}
          </div>
        </div>

        {/* Question */}
        <div className="question-box mb-6 animate-scale-in">
          <p className="text-white text-lg font-semibold leading-relaxed">
            {currentQuestion.question}
          </p>
        </div>

        {/* Answer Options */}
        <div className="space-y-3 mb-6">
          {(['a', 'b', 'c', 'd'] as const).map((option, index) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={isTransitioning}
              className={`answer-option option-${option} animate-slide-up ${
                selectedAnswer === option ? 'selected' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                {option.toUpperCase()}
              </span>
              <span className="flex-1">{currentQuestion.options[option]}</span>
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-auto mb-4">
          <div className="progress-bar">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div
                key={idx}
                className={`progress-segment ${
                  idx < currentQuestionIndex 
                    ? answers[idx] === questions[idx]?.correctAnswer 
                      ? 'correct' 
                      : 'wrong'
                    : 'pending'
                }`}
              />
            ))}
          </div>
          <div className="text-center mt-2 text-muted-foreground text-sm">
            {currentQuestionIndex + 1} / 10
          </div>
        </div>

        {/* Player Avatar */}
        <div className="absolute bottom-4 right-4 w-16">
          <img 
            src={characterImage} 
            alt="Tu personaje" 
            className="w-full h-auto rounded-full border-2 border-gold drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default TriviaScreen;
