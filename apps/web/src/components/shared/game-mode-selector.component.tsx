import { useGameContext } from '@context/game.context';
import { GameMode } from '@customTypes/game.types';
import { ActionButton } from '@shared/action-button.component';

export const GameModeSelector = () => {
  const { mode, setMode, onRestartGame, size } = useGameContext();

  return (
    <div className="flex w-board justify-center gap-1">
      <ActionButton
        className={`px-3 py-0 font-normal text-base ${mode === GameMode.MULTI ? 'bg-custom-green' : 'bg-custom-gray'}`}
        onClick={() => {
          setMode(GameMode.MULTI);
          onRestartGame(size);
        }}
        name={GameMode.MULTI}
      >
        Multiplayer
      </ActionButton>
      <ActionButton
        className={`px-3 py-0 font-normal text-base ${mode === GameMode.CPU ? 'bg-custom-green' : 'bg-custom-gray'}`}
        onClick={() => {
          setMode(GameMode.CPU);
          onRestartGame(size);
        }}
        name={GameMode.CPU}
      >
        CPU
      </ActionButton>
    </div>
  );
};
