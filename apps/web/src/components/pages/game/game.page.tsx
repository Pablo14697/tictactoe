import { testIdGameStatus } from '@constants';

import { GameContext } from '@context/game.context';
import { useGameLogic } from '@hooks/use-game-logic';
import { ActionButton } from '@shared/action-button.component';
import { Board } from '@shared/board.component';
import { GameModeSelector } from '@shared/game-mode-selector.component';
import { Link } from '@shared/link.component';
import { SizeSelector } from '@shared/size-selector.component';
import { getResultText } from '@utils/get-game-result.util';

export const GamePage: React.FC = () => {
  const {
    board,
    size,
    setSize,
    mode,
    setMode,
    currentPlayer,
    isGameFinished,
    result,
    onPlayerPlay,
    onRestartGame,
  } = useGameLogic();

  return (
    <GameContext.Provider
      value={{
        mode,
        board,
        isGameFinished,
        result,
        size,
        setSize,
        setMode,
        onRestartGame,
      }}
    >
      <div className="flex min-h-screen w-screen justify-center">
        <div className="no-scrollbar overflow-y-scroll bg-white">
          <div className="flex flex-col items-center px-13">
            <div className="mt-10" />
            <h1 className="whitespace-nowrap font-bold text-2xl leading-[60.51px]">
              TIC-TAC-TOE
            </h1>

            <div className="mb-5" />
            <GameModeSelector />
            <div className="mb-5" />
            <div className="flex w-board justify-center">
              <span
                className="whitespace-pre-wrap text-center text-xl leading-[38.73px]"
                data-testid={testIdGameStatus}
              >
                {getResultText(result) || `Next Turn: ${currentPlayer}`}
              </span>
            </div>

            <div className="mb-10" />

            <Board onClickCell={onPlayerPlay} />

            <SizeSelector />

            <div className="mb-4" />

            <ActionButton
              className={`px-8 py-3 text-xl ${isGameFinished ? 'bg-custom-green' : 'bg-custom-gray'}`}
              onClick={() => onRestartGame(size)}
              name="reset"
            >
              {isGameFinished ? 'Play Again' : 'Restart'}
            </ActionButton>
            <div className="mb-2" />

            <Link variant="md" to="/history">
              History
            </Link>

            <div className="mb-12.5" />
          </div>
        </div>
      </div>
    </GameContext.Provider>
  );
};
