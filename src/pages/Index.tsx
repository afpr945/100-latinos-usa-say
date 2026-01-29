import { GameProvider } from '@/context/GameContext';
import GameApp from '@/components/game/GameApp';

const Index = () => {
  return (
    <GameProvider>
      <GameApp />
    </GameProvider>
  );
};

export default Index;
