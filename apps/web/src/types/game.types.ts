export enum GameMode {
  MULTI = 'multiplayer',
  CPU = 'cpu',
}

export enum GamePlayer {
  X = 'X',
  O = 'O',
}

export enum GameOutcome {
  X = 'X',
  O = 'O',
  DRAW = 'draw',
  UNRESOLVED = 'unresolved',
  ERROR = 'error',
}

export type WinningCombination = number[];

export interface GameResult {
  outcome: GameOutcome;
  winningPositions: WinningCombination;
  errorMessage: string;
}

export interface GameHistory {
  outcome: GameOutcome;
  id: string;
  gameMode: GameMode;
  size: number;
}

export interface GameHistoryPaginated {
  history: GameHistory[];
  totalPages: number;
}
