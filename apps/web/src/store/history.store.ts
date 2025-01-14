import type {
  GameHistory,
  GameHistoryPaginated,
  GameMode,
  GameResult,
} from '@customTypes/game.types';
import { getResultText } from '@utils/get-game-result.util';

const HISTORY_KEY = 'HISTORY';

export const getHistory = (): GameHistory[] => {
  const history: GameHistory[] = JSON.parse(
    localStorage.getItem(HISTORY_KEY) || '[]',
  );

  return history;
};

const sizePage = 10;

export const getPaginatedHistory = (page: number): GameHistoryPaginated => {
  const history: GameHistory[] = getHistory();

  return {
    history: history.slice((page - 1) * sizePage, page * sizePage),
    totalPages: Math.ceil(history.length / sizePage),
  };
};

export const storeHistory = ({
  result,
  mode,
  size,
}: { result: GameResult; mode: GameMode; size: number }) => {
  const history = getHistory();

  localStorage.setItem(
    HISTORY_KEY,
    JSON.stringify([
      { outcome: getResultText(result), id: Date.now(), gameMode: mode, size },
      ...history,
    ] as GameHistory[]),
  );
};
