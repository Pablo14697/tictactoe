import { GameOutcome } from '@customTypes/game.types';
import { getResultText } from '@utils/get-game-result.util';
import { describe, expect, it } from 'vitest';

describe('getResultText', () => {
  it('should return an error message when the outcome is ERROR', () => {
    const result = {
      outcome: GameOutcome.ERROR,
      errorMessage: 'error message',
      winningPositions: [],
    };

    const output = getResultText(result);

    expect(output).toBe(`Error: ${result.errorMessage}`);
  });

  it('should return the winner when the outcome is X', () => {
    const result = {
      outcome: GameOutcome.X,
      errorMessage: '',
      winningPositions: [],
    };

    const output = getResultText(result);

    expect(output).toBe('Winner: X');
  });

  it('should return the winner when the outcome is O', () => {
    const result = {
      outcome: GameOutcome.O,
      errorMessage: '',
      winningPositions: [],
    };

    const output = getResultText(result);

    expect(output).toBe('Winner: O');
  });

  it("should return 'It's a Draw' when the outcome is DRAW", () => {
    const result = {
      outcome: GameOutcome.DRAW,
      errorMessage: '',
      winningPositions: [],
    };

    const output = getResultText(result);

    expect(output).toBe("It's a Draw");
  });

  it('should return the empty string when the outcome is not ERROR, X, O, or DRAW', () => {
    const result = {
      outcome: GameOutcome.UNRESOLVED,
      errorMessage: '',
      winningPositions: [],
    };

    const output = getResultText(result);

    expect(output).toBe('');
  });
});
