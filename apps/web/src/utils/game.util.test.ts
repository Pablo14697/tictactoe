import { GameOutcome, type GameResult } from '@customTypes/game.types';
import { describe, expect, it } from 'vitest';
import { checkGameResult } from './game.util';

/*

We've chosen to represent the game board as a string of tiles, left-to-right, top-to-bottom....

So this board:

X O X
O   X
X O X

Would be represented as: "XOXO_XXOX"

*/

// TODO - Add more tests/combinations if you like
//

interface TestCase extends GameResult {
  state: string;
}

const testCases: TestCase[] = [
  // Unresolved
  {
    outcome: GameOutcome.UNRESOLVED,
    state: '_________',
    winningPositions: [],
    errorMessage: '',
  },
  {
    outcome: GameOutcome.UNRESOLVED,
    state: 'X__O__X__',
    winningPositions: [],
    errorMessage: '',
  },

  // X wins
  {
    outcome: GameOutcome.X,
    state: 'XXXOO____',
    winningPositions: [0, 1, 2],
    errorMessage: '',
  },
  {
    outcome: GameOutcome.X,
    state: 'XO__XO__X',
    winningPositions: [0, 4, 8],
    errorMessage: '',
  },

  // O wins
  {
    outcome: GameOutcome.O,
    state: 'OOOXX___X',
    winningPositions: [0, 1, 2],
    errorMessage: '',
  },
  {
    outcome: GameOutcome.O,
    state: 'OX__OX_XO',
    winningPositions: [0, 4, 8],
    errorMessage: '',
  },

  // Draws
  {
    outcome: GameOutcome.DRAW,
    state: 'XXOOXXXOO',
    winningPositions: [],
    errorMessage: '',
  },

  // Invalid combination
  // As X player starts, more O amount than X is not a valid
  // combination
  {
    outcome: GameOutcome.ERROR,
    state: 'XOXOXOOXO',
    winningPositions: [],
    errorMessage: 'more O amount than X is not a valid combination',
  },
];

describe('checkGameResult', () => {
  it.each(testCases)(
    'Outcome should be $outcome for state $state',
    ({ outcome, state, winningPositions, errorMessage }) => {
      const result = checkGameResult(state);

      expect(result.outcome).toBe(outcome);
      expect(result.winningPositions).toStrictEqual(winningPositions);
      expect(result.errorMessage).toBe(errorMessage);
    },
  );
});
