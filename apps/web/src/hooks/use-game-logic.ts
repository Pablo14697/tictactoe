import { emptyGame } from '@constants';
import {
  GameMode,
  GameOutcome,
  GamePlayer,
  type GameResult,
} from '@customTypes/game.types';
import { checkGameResult } from '@utils/check-game-result.util';
import { useState } from 'react';

const initialBoard = '_'.repeat(9);
const initialPlayer = GamePlayer.X;
const initialResult = {
  outcome: GameOutcome.UNRESOLVED,
  winningPositions: [],
  errorMessage: '',
};

const replaceAt = (str: string, index: number, replacement: string) => {
  return str.substring(0, index) + replacement + str.substring(index + 1);
};

export const useGameLogic = () => {
  const [mode] = useState<GameMode>(GameMode.MULTI);
  const [currentPlayer, setCurrentPlayer] = useState<GamePlayer>(initialPlayer);
  const [result, setResult] = useState<GameResult>(initialResult);
  const [board, setBoard] = useState(initialBoard);

  const isGameFinished =
    result.outcome !== GameOutcome.UNRESOLVED &&
    result.outcome !== GameOutcome.ERROR;

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
    setCurrentPlayer(initialPlayer);
    setResult(initialResult);
  };

  return {
    currentPlayer,
    result,
    board,
    isGameFinished,
    onPlayerPlay,
    onRestartGame,
  };
};
