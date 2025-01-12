export enum GamePlayer {
  X = 'X',
  O = 'O',
}

export enum GameOutcome {
  X = 'X',
  O = 'O',
  DRAW = 'draw',
  UNRESOLVED = 'unresolved',
}

export interface GameResult {
  outcome: GameOutcome;
  winningPositions?: number[];
}
