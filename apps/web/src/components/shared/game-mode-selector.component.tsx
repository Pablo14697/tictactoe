import { GameMode } from '@customTypes/game.types';
import type { GameLogic } from '@hooks/use-game-logic';
import { ActionButton } from './action-button.component';

type GameModeSelectorProps = Pick<
  GameLogic,
  'mode' | 'setMode' | 'onRestartGame'
>;

export const GameModeSelector = ({
  mode,
  setMode,
  onRestartGame,
}: GameModeSelectorProps) => (
  <div className="flex w-board justify-center gap-1">
    <ActionButton
      className={`px-3 py-0 font-normal text-base ${mode === GameMode.MULTI ? 'bg-custom-green' : 'bg-custom-gray'}`}
      onClick={() => {
        setMode(GameMode.MULTI);
        onRestartGame();
      }}
      name={GameMode.MULTI}
    >
      Multiplayer
    </ActionButton>
    <ActionButton
      className={`px-3 py-0 font-normal text-base ${mode === GameMode.CPU ? 'bg-custom-green' : 'bg-custom-gray'}`}
      onClick={() => {
        setMode(GameMode.CPU);
        onRestartGame();
      }}
      name={GameMode.CPU}
    >
      CPU
    </ActionButton>
  </div>
);
