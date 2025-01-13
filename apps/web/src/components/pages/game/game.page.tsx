import { emptyGame, testIdCell, testIdGameStatus } from '@constants';

import { useGameLogic } from '@hooks/useGameLogic';
import { ActionButton } from '@shared/action-button.component';
import { CellButton } from '@shared/cell-button.component';

export const GamePage: React.FC = () => {
  const {
    board,
    isGameFinished,
    result,
    getResultText,
    onPlayerPlay,
    onRestartGame,
  } = useGameLogic();

  return (
    <div className="flex min-h-screen w-screen justify-center">
      <div className="no-scrollbar overflow-y-scroll bg-white">
        <div className="flex flex-col items-center px-[52px]">
          <div className="mt-[40px]" />
          <h1 className="whitespace-nowrap font-bold text-[50px] leading-[60.51px]">
            TIC-TAC-TOE
          </h1>

          <div className="mb-[50px]" />

          <div className="w-board">
            <h3
              className="whitespace-pre-wrap text-center text-[32px] leading-[38.73px]"
              data-testid={testIdGameStatus}
            >
              {getResultText()}
            </h3>
          </div>

          <div className="mb-[40px]" />

          <div className="grid h-board w-board grid-cols-3 grid-rows-3 gap-[10px] rounded-[8px] bg-custom-gray p-[10px]">
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

          <div className="mb-[50px]" />

          <ActionButton
            className={isGameFinished ? 'bg-custom-green' : 'bg-custom-gray'}
            onClick={onRestartGame}
          >
            {isGameFinished ? 'Play Again' : 'Restart'}
          </ActionButton>
          <div className="mb-[50px]" />
        </div>
      </div>
    </div>
  );
};
