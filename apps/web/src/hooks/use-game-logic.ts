import { emptyGame } from '@constants';
import {
  GameMode,
  GameOutcome,
  GamePlayer,
  type GameResult,
} from '@customTypes/game.types';
import { checkGameResult } from '@utils/check-game-result.util';
import { generateCpuPlay } from '@utils/generate-cpu-play.util';
import { useState } from 'react';

const initialBoard = '_'.repeat(9);
const initialPlayer = GamePlayer.X;
const initialResult = {
  outcome: GameOutcome.UNRESOLVED,
  winningPositions: [],
  errorMessage: '',
};

export interface GameLogic {
  mode: GameMode;
  setMode: React.Dispatch<React.SetStateAction<GameMode>>;
  currentPlayer: GamePlayer;
  result: GameResult;
  board: string;
  isGameFinished: boolean;
  onPlayerPlay: (index: number) => void;
  onRestartGame: () => void;
}

const replaceAt = (str: string, index: number, replacement: string) => {
  return str.substring(0, index) + replacement + str.substring(index + 1);
};

export const useGameLogic = (): GameLogic => {
  const [mode, setMode] = useState<GameMode>(GameMode.MULTI);

  const [currentPlayer, setCurrentPlayer] = useState<GamePlayer>(initialPlayer);
  const [result, setResult] = useState<GameResult>(initialResult);
  const [board, setBoard] = useState(initialBoard);

  const isGameFinished =
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
    const result = checkGameResult(board);

    setBoard(board);
    setResult(result);

    return result;
  };

  const handleCpuMode = async (index: number) => {
    const boardUpdatedByHuman = playHuman(index, GamePlayer.X);

    const parcialResult = checkResult(boardUpdatedByHuman);

    if (
      parcialResult.outcome !== GameOutcome.UNRESOLVED &&
      parcialResult.outcome !== GameOutcome.ERROR
    ) {
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
    mode,
    setMode,
    currentPlayer,
    result,
    board,
    isGameFinished,
    onPlayerPlay,
    onRestartGame,
  };
};
