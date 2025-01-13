import { emptyGame } from '@constants';
import {
  GameMode,
  GameOutcome,
  GamePlayer,
  type GameResult,
} from '@customTypes/game.types';
import { storeHistory } from '@store/history.store';
import { checkGameResult } from '@utils/check-game-result.util';
import { generateCpuPlay } from '@utils/generate-cpu-play.util';
import { useState } from 'react';

const initialPlayer = GamePlayer.X;
const initialResult = {
  outcome: GameOutcome.UNRESOLVED,
  winningPositions: [],
  errorMessage: '',
};

export interface GameLogic {
  mode: GameMode;
  size: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  setMode: React.Dispatch<React.SetStateAction<GameMode>>;
  currentPlayer: GamePlayer;
  result: GameResult;
  board: string;
  isGameFinished: boolean;
  onPlayerPlay: (index: number) => void;
  onRestartGame: (size: number) => void;
}

const replaceAt = (str: string, index: number, replacement: string) => {
  return str.substring(0, index) + replacement + str.substring(index + 1);
};

export const useGameLogic = (): GameLogic => {
  const [mode, setMode] = useState<GameMode>(GameMode.MULTI);
  const [currentPlayer, setCurrentPlayer] = useState<GamePlayer>(initialPlayer);
  const [result, setResult] = useState<GameResult>(initialResult);
  const [size, setSize] = useState(3);
  const [board, setBoard] = useState('_'.repeat(size ** 2));

  const isGameFinished = (result: GameResult) =>
    result.outcome !== GameOutcome.UNRESOLVED &&
    result.outcome !== GameOutcome.ERROR;

  const playHuman = (index: number, player: GamePlayer) => {
    return replaceAt(board, index, player);
  };

  const playCpu = (board: string) => {
    const genericIndex = generateCpuPlay(board);

    if (genericIndex !== -1) {
      return replaceAt(board, genericIndex, GamePlayer.O);
    }

    return board;
  };

  const checkResult = (board: string): GameResult => {
    const result = checkGameResult(board, size);

    setBoard(board);
    setResult(result);

    if (isGameFinished(result)) {
      storeHistory(result, mode);
    }

    return result;
  };

  const handleCpuMode = async (index: number) => {
    const boardUpdatedByHuman = playHuman(index, GamePlayer.X);

    const partialResult = checkResult(boardUpdatedByHuman);

    if (isGameFinished(partialResult)) {
      return;
    }

    const boardUpdatedByCpu = playCpu(boardUpdatedByHuman);

    checkResult(boardUpdatedByCpu);
  };

  const handleMultiMode = (index: number) => {
    const boardUpdatedByHuman = playHuman(index, currentPlayer);

    setCurrentPlayer(
      currentPlayer === GamePlayer.X ? GamePlayer.O : GamePlayer.X,
    );
    checkResult(boardUpdatedByHuman);
  };

  const modeHandlers = {
    [GameMode.MULTI]: handleMultiMode,
    [GameMode.CPU]: handleCpuMode,
  };

  const onPlayerPlay = (index: number) => {
    const isAFilledCell = board.charAt(index) !== emptyGame;
    if (isAFilledCell) {
      return;
    }

    if (isGameFinished(result)) {
      return;
    }

    const modeHandler = modeHandlers[mode];
    if (modeHandler) {
      modeHandler(index);
    }
  };

  const onRestartGame = (size: number) => {
    setBoard('_'.repeat(size ** 2));
    setCurrentPlayer(initialPlayer);
    setResult(initialResult);
  };

  return {
    mode,
    size,
    setSize,
    setMode,
    currentPlayer,
    result,
    board,
    isGameFinished: isGameFinished(result),
    onPlayerPlay,
    onRestartGame,
  };
};
