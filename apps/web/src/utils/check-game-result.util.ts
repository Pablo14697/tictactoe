import { emptyGame } from '@constants';
import {
  GameOutcome,
  type GameResult,
  type WinningCombination,
} from '@customTypes/game.types';
import { createWinningCombinationMatrix } from './matrix.util';

type WinningCombinations = WinningCombination[];

const getWinningCombination = (
  board: string[],
  winningCombinations: WinningCombinations,
): number[] => {
  return (
    winningCombinations.find((combination) => {
      const firstValue = combination[0];

      return combination.every(
        (cur) =>
          board[firstValue] !== emptyGame && board[firstValue] === board[cur],
      );
    }) || []
  );
};

export const checkGameResult = (board: string, size: number): GameResult => {
  const winningCombinations: WinningCombinations =
    createWinningCombinationMatrix(size);

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

  const winningCombination: WinningCombination = getWinningCombination(
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
