import { GameOutcome } from '@customTypes/game.types';
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

const testCases: { outcome: GameOutcome; state: string }[] = [
  // Unresolved
  { outcome: GameOutcome.UNRESOLVED, state: '_________' },
  { outcome: GameOutcome.UNRESOLVED, state: 'X__O__X__' },

  // X wins
  { outcome: GameOutcome.X, state: 'XXXOO____' },
  { outcome: GameOutcome.X, state: 'XO__XO__X' },

  // O wins
  { outcome: GameOutcome.O, state: 'OOOXX___X' },
  { outcome: GameOutcome.O, state: 'OX__OX_XO' },

  // Draws
  { outcome: GameOutcome.DRAW, state: 'XXOOXXXOO' },
];

describe('checkWinner', () => {
  for (const { outcome, state } of testCases) {
    const name = `Outcome should be ${outcome}`;
    it(name, async () => {
      const calculatedOutcome = checkGameResult(state).outcome;

      expect(calculatedOutcome).toBe(outcome);
    });
  }
});
