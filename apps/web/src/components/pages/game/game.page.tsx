import { emptyGame, testIdCell, testIdGameStatus } from '@constants';
import { GameMode } from '@customTypes/game.types';

import { useGameLogic } from '@hooks/use-game-logic';
import { ActionButton } from '@shared/action-button.component';
import { CellButton } from '@shared/cell-button.component';
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
            >
              Multijugador
            </ActionButton>
            <ActionButton
              className={`px-3 py-0 font-normal text-base ${mode === GameMode.CPU ? 'bg-custom-green' : 'bg-custom-gray'}`}
              onClick={() => {
                setMode(GameMode.CPU);
                onRestartGame();
              }}
            >
              Contra la CPU
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

          <div className="grid h-board w-board grid-cols-3 grid-rows-3 gap-2.5 rounded-2 bg-custom-gray p-2.5">
            {board.split('').map((row, index) => (
              <CellButton
                key={String(index) + Date.now()}
                data-testid={testIdCell(index)}
                disabled={isGameFinished}
                className={`
                  ${row === emptyGame || isGameFinished ? ' bg-white' : 'bg-custom-green-muted'}
                  ${
                    result.winningPositions?.includes(index)
                      ? 'text-custom-green'
                      : 'text-black'
                  }`}
                onClick={() => onPlayerPlay(index)}
              >
                {row === emptyGame ? '' : row}
              </CellButton>
            ))}
          </div>

          <div className="mb-12.5" />

          <ActionButton
            className={`px-8 py-3 text-xl ${isGameFinished ? 'bg-custom-green' : 'bg-custom-gray'}`}
            onClick={onRestartGame}
          >
            {isGameFinished ? 'Play Again' : 'Restart'}
          </ActionButton>
          <div className="mb-12.5" />
        </div>
      </div>
    </div>
  );
};
