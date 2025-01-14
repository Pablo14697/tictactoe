import { emptyGame, testIdCell } from '@constants';
import { useGameContext } from '@context/game.context';
import { CellButton } from './cell-button.component';

interface BoardProps {
  onClickCell: (index: number) => void;
}

export const Board = ({ onClickCell }: BoardProps) => {
  const { board, isGameFinished, result, size } = useGameContext();

  return (
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
};
