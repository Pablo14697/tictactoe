import { testIdGameStatus } from '@constants';
import { GameMode } from '@customTypes/game.types';

import { useGameLogic } from '@hooks/use-game-logic';
import { ActionButton } from '@shared/action-button.component';
import { Board } from '@shared/board.component';
import { Link } from '@shared/link.component';
import { getResultText } from '@utils/get-game-result.util';

export const GamePage: React.FC = () => {
  const {
    board,
    mode,
    setMode,
    currentPlayer,
    isGameFinished,
    result,
    onPlayerPlay,
    onRestartGame,
  } = useGameLogic();

  return (
    <div className="flex min-h-screen w-screen justify-center">
      <div className="no-scrollbar overflow-y-scroll bg-white">
        <div className="flex flex-col items-center px-13">
          <div className="mt-10" />
          <h1 className="whitespace-nowrap font-bold text-2xl leading-[60.51px]">
            TIC-TAC-TOE
          </h1>
          <div className="mb-5" />
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
          <div className="mb-5" />
          <div className="w-board">
            <h3
              className="whitespace-pre-wrap text-center text-xl leading-[38.73px]"
              data-testid={testIdGameStatus}
            >
              {getResultText(result, currentPlayer)}
            </h3>
          </div>

          <div className="mb-10" />

          <Board
            board={board}
            isGameFinished={isGameFinished}
            result={result}
            onClickCell={onPlayerPlay}
          />

          <div className="mb-12.5" />

          <ActionButton
            className={`px-8 py-3 text-xl ${isGameFinished ? 'bg-custom-green' : 'bg-custom-gray'}`}
            onClick={onRestartGame}
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
  );
};
