import React, { createContext, useContext, useState, useCallback } from 'react';
import { Question, getRandomQuestions } from '@/data/questions';

export type GameScreen = 'home' | 'character' | 'welcome' | 'trivia' | 'results';
export type Character = 'chico' | 'chica' | null;

interface GameState {
  screen: GameScreen;
  character: Character;
  playerName: string;
  currentQuestionIndex: number;
  questions: Question[];
  answers: ('a' | 'b' | 'c' | 'd' | null)[];
  score: number;
  highScore: number;
}

interface GameContextType extends GameState {
  setScreen: (screen: GameScreen) => void;
  setCharacter: (character: Character) => void;
  setPlayerName: (name: string) => void;
  startGame: () => void;
  answerQuestion: (answer: 'a' | 'b' | 'c' | 'd') => void;
  nextQuestion: () => void;
  calculateScore: () => number;
  resetGame: () => void;
  getResultType: () => 'low' | 'medium' | 'high';
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const HIGH_SCORE_KEY = 'firepass_highscore';

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screen, setScreen] = useState<GameScreen>('home');
  const [character, setCharacter] = useState<Character>(null);
  const [playerName, setPlayerName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<('a' | 'b' | 'c' | 'd' | null)[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem(HIGH_SCORE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });

  const startGame = useCallback(() => {
    const gameQuestions = getRandomQuestions(10);
    setQuestions(gameQuestions);
    setAnswers(new Array(10).fill(null));
    setCurrentQuestionIndex(0);
    setScore(0);
    setScreen('trivia');
  }, []);

  const answerQuestion = useCallback((answer: 'a' | 'b' | 'c' | 'd') => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = answer;
      return newAnswers;
    });
  }, [currentQuestionIndex]);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate final score
      const finalScore = questions.reduce((acc, q, idx) => {
        return acc + (answers[idx] === q.correctAnswer ? 1 : 0);
      }, 0);
      
      // Add the last answer if it hasn't been counted yet
      const lastAnswer = answers[currentQuestionIndex];
      const lastQuestion = questions[currentQuestionIndex];
      const adjustedScore = lastAnswer === lastQuestion?.correctAnswer ? finalScore : finalScore;
      
      setScore(adjustedScore);
      
      // Update high score
      if (adjustedScore > highScore) {
        setHighScore(adjustedScore);
        localStorage.setItem(HIGH_SCORE_KEY, adjustedScore.toString());
      }
      
      setScreen('results');
    }
  }, [currentQuestionIndex, questions, answers, highScore]);

  const calculateScore = useCallback(() => {
    return questions.reduce((acc, q, idx) => {
      return acc + (answers[idx] === q.correctAnswer ? 1 : 0);
    }, 0);
  }, [questions, answers]);

  const getResultType = useCallback((): 'low' | 'medium' | 'high' => {
    const finalScore = calculateScore();
    if (finalScore <= 4) return 'low';
    if (finalScore <= 9) return 'medium';
    return 'high';
  }, [calculateScore]);

  const resetGame = useCallback(() => {
    setScreen('home');
    setCharacter(null);
    setPlayerName('');
    setCurrentQuestionIndex(0);
    setQuestions([]);
    setAnswers([]);
    setScore(0);
  }, []);

  return (
    <GameContext.Provider
      value={{
        screen,
        character,
        playerName,
        currentQuestionIndex,
        questions,
        answers,
        score,
        highScore,
        setScreen,
        setCharacter,
        setPlayerName,
        startGame,
        answerQuestion,
        nextQuestion,
        calculateScore,
        resetGame,
        getResultType,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
