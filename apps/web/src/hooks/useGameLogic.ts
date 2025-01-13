import { emptyGame } from '@constants';
import {
  GameMode,
  GameOutcome,
  GamePlayer,
  type GameResult,
} from '@customTypes/game.types';
import { checkGameResult } from '@utils/game.util';
import { useState } from 'react';

const initialBoard = '_'.repeat(9);

const replaceAt = (str: string, index: number, replacement: string) => {
  return str.substring(0, index) + replacement + str.substring(index + 1);
};

export const useGameLogic = () => {
  const [mode] = useState<GameMode>(GameMode.MULTI);
  const [currentPlayer, setCurrentPlayer] = useState<GamePlayer>(GamePlayer.X);
  const [result, setResult] = useState<GameResult>({
    outcome: GameOutcome.UNRESOLVED,
    winningPositions: [],
    errorMessage: '',
  });
  const [board, setBoard] = useState(initialBoard);

  const isGameFinished =
    result.outcome !== GameOutcome.UNRESOLVED &&
    result.outcome !== GameOutcome.ERROR;

  const getResultText = () => {
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

  const handleMulti = (index: number) => {
    if (board.charAt(index) !== emptyGame) {
      return;
    }

    const updatedBoard = replaceAt(board, index, currentPlayer);

    const result = checkGameResult(updatedBoard);
    setBoard(updatedBoard);

    setCurrentPlayer(
      currentPlayer === GamePlayer.X ? GamePlayer.O : GamePlayer.X,
    );
    setResult({
      outcome: result.outcome,
      winningPositions: result.winningPositions,
      errorMessage: result.errorMessage,
    });
  };

  const modeHandlers = {
    [GameMode.MULTI]: handleMulti,
  };

  const onPlayerPlay = (index: number) => {
    if (isGameFinished) return;
    const modeHandler = modeHandlers[mode];
    if (modeHandler) {
      modeHandler(index);
    }
  };

  const onRestartGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer(GamePlayer.X);
    setResult({
      outcome: GameOutcome.UNRESOLVED,
      winningPositions: [],
      errorMessage: '',
    });
  };

  return {
    result,
    board,
    isGameFinished,
    getResultText,
    onPlayerPlay,
    onRestartGame,
  };
};
