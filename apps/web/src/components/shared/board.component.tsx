import { emptyGame, testIdCell } from '@constants';
import type { GameResult } from '@customTypes/game.types';
import { CellButton } from './cell-button.component';

interface BoardProps {
  board: string;
  isGameFinished: boolean;
  result: GameResult;
  onClickCell: (index: number) => void;
  size: number;
}

export const Board = ({
  board,
  isGameFinished,
  result,
  onClickCell,
  size,
}: BoardProps) => (
  <div
    className={'h-fit w-fit gap-2.5 rounded-2 bg-custom-gray p-2.5'}
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${size}, minmax(60px, 90px))`,
      gridTemplateRows: `repeat(${size}, minmax(60px, 90px))`,
    }}
  >
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
