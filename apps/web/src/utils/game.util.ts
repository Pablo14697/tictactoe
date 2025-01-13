import { emptyGame } from '@constants';
import { GameOutcome, type GameResult } from '@customTypes/game.types';

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const getWinningCombination = (
  board: string[],
  winningCombinations: number[][],
): number[] => {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] !== '_' && board[a] === board[b] && board[a] === board[c]) {
      return combination;
    }
  }
  return [];
};

export const checkGameResult = (board: string): GameResult => {
  const boardArr = board.split('');

  const xCounter = boardArr.filter((item) => item === GameOutcome.X).length;
  const oCounter = boardArr.filter((item) => item === GameOutcome.O).length;
  if (oCounter > xCounter) {
    return {
      outcome: GameOutcome.ERROR,
      winningPositions: [],
      errorMessage: 'more O amount than X is not a valid combination',
    };
  }

  const winningCombination = getWinningCombination(
    boardArr,
    winningCombinations,
  );

  if (winningCombination.length) {
    const winner = boardArr[winningCombination[0]];
    return {
      outcome: winner === GameOutcome.X ? GameOutcome.X : GameOutcome.O,
      winningPositions: winningCombination,
      errorMessage: '',
    };
  }

  if (boardArr.every((cell) => cell !== emptyGame)) {
    return {
      outcome: GameOutcome.DRAW,
      winningPositions: [],
      errorMessage: '',
    };
  }

  return {
    outcome: GameOutcome.UNRESOLVED,
    winningPositions: [],
    errorMessage: '',
  };
};
