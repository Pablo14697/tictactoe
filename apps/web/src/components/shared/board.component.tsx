import { emptyGame, testIdCell } from '@constants';
import type { GameResult } from '@customTypes/game.types';
import { CellButton } from './cell-button.component';

interface BoardProps {
  board: string;
  isGameFinished: boolean;
  result: GameResult;
  onClickCell: (index: number) => void;
}

export const Board = ({
  board,
  isGameFinished,
  result,
  onClickCell,
}: BoardProps) => (
  <div className="grid h-board w-board grid-cols-3 grid-rows-3 gap-2.5 rounded-2 bg-custom-gray p-2.5">
    {board.split('').map((row, index) => (
      <CellButton
        key={String(index) + Date.now()}
        data-testid={testIdCell(index)}
        disabled={isGameFinished}
        className={`${row === emptyGame || isGameFinished ? ' bg-white' : 'bg-custom-green-muted'} ${
          result.winningPositions?.includes(index)
            ? 'text-custom-green'
            : 'text-black'
        }`}
        onClick={() => onClickCell(index)}
      >
        {row === emptyGame ? '' : row}
      </CellButton>
    ))}
  </div>
);
