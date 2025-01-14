import { GameMode, GameOutcome } from '@customTypes/game.types';
import type { GameLogic } from '@hooks/use-game-logic';
import { createContext, useContext } from 'react';

type GameContextValues = Omit<GameLogic, 'currentPlayer' | 'onPlayerPlay'>;

export const GameContext = createContext<GameContextValues>({
  mode: GameMode.MULTI,
  board: '',
  isGameFinished: false,
  result: {
    outcome: GameOutcome.UNRESOLVED,
    winningPositions: [],
    errorMessage: '',
  },
  size: 3,
  setSize: () => null,
  setMode: () => null,
  onRestartGame: () => null,
});

export const useGameContext = () => useContext(GameContext);
