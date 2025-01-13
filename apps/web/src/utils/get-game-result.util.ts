import {
  GameOutcome,
  type GamePlayer,
  type GameResult,
} from '@customTypes/game.types';

export const getResultText = (
  result: GameResult,
  currentPlayer: GamePlayer,
) => {
  if (result.outcome === GameOutcome.ERROR) {
    return `Error: ${result.errorMessage}`;
  }

  if (result.outcome === GameOutcome.X || result.outcome === GameOutcome.O) {
    return `Winner: ${result.outcome}`;
  }

  if (result.outcome === GameOutcome.DRAW) {
    return "It's a Draw";
  }

  return `Next Turn: ${currentPlayer}`;
};
