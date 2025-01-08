import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { testIdActionButton, testIdCell, testIdGameStatus } from '@constants';
import { GamePage } from './game.page';

type CellIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type ResetButton = 'reset';
type Clickable = CellIndex | ResetButton;

const playGame = (clicks: Clickable[]): string | undefined => {
  render(<GamePage />);

  for (const click of clicks) {
    const testId = click === 'reset' ? testIdActionButton : testIdCell(click);
    fireEvent.click(screen.getByTestId(testId));
  }

  return screen.getByTestId(testIdGameStatus)?.textContent ?? undefined;
};

describe('Tic-Tac-Toe Game', () => {
  const games: { clicks: Clickable[]; expected: string }[] = [
    { clicks: [0, 3, 1, 4, 2], expected: 'Winner: X' }, // top row
    { clicks: [2, 4, 5, 3, 8], expected: 'Winner: X' }, // middle column
    { clicks: [0, 2, 1, 4, 3, 6], expected: 'Winner: O' }, // diagonal
    { clicks: [0, 1, 3, 4, 7, 6, 2, 5, 8], expected: "It's a Draw" },
    { clicks: [0], expected: 'Next Turn: O' },
    { clicks: [0, 1], expected: 'Next Turn: X' },
    { clicks: [0, 1, 1], expected: 'Next Turn: X' },
    { clicks: [0, 1, 'reset', 0], expected: 'Next Turn: O' },
  ];

  for (const { clicks, expected } of games) {
    it(`should display "${expected}" after clicks: ${JSON.stringify(
      clicks,
    )}`, async () => expect(playGame(clicks)).toBe(expected));
  }
});
