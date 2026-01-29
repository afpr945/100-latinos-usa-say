import React from 'react';
import { useGame } from '@/context/GameContext';
import HomeScreen from './HomeScreen';
import CharacterSelectScreen from './CharacterSelectScreen';
import WelcomeScreen from './WelcomeScreen';
import TriviaScreen from './TriviaScreen';
import ResultsScreen from './ResultsScreen';

const GameApp: React.FC = () => {
  const { screen } = useGame();

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return <HomeScreen />;
      case 'character':
        return <CharacterSelectScreen />;
      case 'welcome':
        return <WelcomeScreen />;
      case 'trivia':
        return <TriviaScreen />;
      case 'results':
        return <ResultsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      {renderScreen()}
    </div>
  );
};

export default GameApp;
