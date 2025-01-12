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
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return combination;
    }
  }
  return [];
};

export const checkGameResult = (board): GameResult => {
  const winningCombination = getWinningCombination(board, winningCombinations);

  if (winningCombination.length) {
    const winner = board[winningCombination[0]];
    return {
      outcome: winner === GameOutcome.X ? GameOutcome.X : GameOutcome.O,
      winningPositions: winningCombination,
    };
  }

  if (board.every((cell) => !!cell)) {
    return {
      outcome: GameOutcome.DRAW,
    };
  }

  return {
    outcome: GameOutcome.UNRESOLVED,
  };
};
