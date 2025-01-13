import { emptyGame } from '@constants';

export const generateCpuPlay = (board: string) => {
  const boardArr = board.split('');

  const emptyCells = boardArr
    .map((cell, index) => (cell === emptyGame ? index : null))
    .filter((index) => index !== null) as number[];

  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
  }

  return -1;
};
