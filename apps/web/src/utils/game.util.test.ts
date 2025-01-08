import { describe, expect, it } from 'vitest';
import type { GameOutcome } from 'types/game.types';
import { checkOutcome } from './game.util';

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
  { outcome: 'unresolved', state: '_________' },
  { outcome: 'unresolved', state: 'X__O__X__' },

  // X wins
  { outcome: 'X', state: 'XXXOO____' },
  { outcome: 'X', state: 'XO__XO__X' },

  // O wins
  { outcome: 'O', state: 'OOOXX___X' },
  { outcome: 'O', state: 'OX__OX_XO' },

  // Draws
  { outcome: 'draw', state: 'XOXOXOOXO' },
];

describe('checkWinner', () => {
  for (const { outcome, state } of testCases) {
    const name = `Outcome should be ${outcome}`;
    it(name, async () => {
      console.log(state);

      const calculatedOutcome = checkOutcome();
      expect(calculatedOutcome).toBe(outcome);
    });
  }
});
