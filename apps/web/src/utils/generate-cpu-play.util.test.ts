import { emptyGame } from '@constants';
import { generateCpuPlay } from '@utils/generate-cpu-play.util';
import { describe, expect, it } from 'vitest';

describe('generateCpuPlay', () => {
  it('should return a valid index when the board has empty cells', () => {
    const board = 'X_O____O_'; // Generic valid board
    const result = generateCpuPlay(board);

    const emptyCells = board
      .split('')
      .map((cell, index) => (cell === emptyGame ? index : null))
      .filter((index) => index !== null);

    expect(emptyCells).toContain(result);
  });

  it('should return -1 when there are no empty cells', () => {
    const board = 'XOXOXOXOX'; // No empty cells
    const result = generateCpuPlay(board);

    expect(result).toBe(-1);
  });

  it('should handle an empty board correctly', () => {
    const board = '_________'; // All cells are empty
    const result = generateCpuPlay(board);

    const validIndices = Array.from({ length: 9 }, (_, i) => i);
    expect(validIndices).toContain(result);
  });

  it('should handle a nearly full board correctly', () => {
    const board = 'XOXOXOXO_'; // Only one empty cell
    const result = generateCpuPlay(board);

    expect(result).toBe(
      board.split('').findIndex((item) => item === emptyGame),
    );
  });
});
