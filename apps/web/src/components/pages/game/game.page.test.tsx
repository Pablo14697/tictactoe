import {
  testIdActionButton,
  testIdCell,
  testIdGameStatus,
  testIdSizeStatus,
} from '@constants';
import { GamePage } from '@pages/game/game.page';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const generateCpuPlayMock = vi.hoisted(() => vi.fn());

vi.mock('@utils/generate-cpu-play.util', () => {
  return {
    generateCpuPlay: generateCpuPlayMock,
  };
});

vi.mock('react-router-dom');

type CellIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type ResetButton = 'reset';
type Clickable = CellIndex | ResetButton;

const playGame = (clicks: Clickable[]): string | undefined => {
  render(<GamePage />);

  for (const click of clicks) {
    const testId =
      click === 'reset' ? testIdActionButton('reset') : testIdCell(click);
    fireEvent.click(screen.getByTestId(testId));
  }

  return screen.getByTestId(testIdGameStatus)?.textContent ?? undefined;
};

const multiplayerGamesMock: { clicks: Clickable[]; expected: string }[] = [
  { clicks: [0, 3, 1, 4, 2], expected: 'Winner: X' }, // top row
  { clicks: [2, 4, 5, 3, 8], expected: 'Winner: X' }, // middle column
  { clicks: [0, 2, 1, 4, 3, 6], expected: 'Winner: O' }, // diagonal
  { clicks: [0, 1, 3, 4, 7, 6, 2, 5, 8], expected: "It's a Draw" },
  { clicks: [0], expected: 'Next Turn: O' },
  { clicks: [0, 1], expected: 'Next Turn: X' },
  { clicks: [0, 1, 1], expected: 'Next Turn: X' },
  { clicks: [0, 1, 'reset', 0], expected: 'Next Turn: O' },
];

const cpuGamesMock: { clicks: number[]; expected: string }[] = [
  { clicks: [0, 3, 1, 4, 2], expected: 'Winner: X' }, // top row
  { clicks: [2, 4, 5, 3, 8], expected: 'Winner: X' }, // middle column
  { clicks: [0, 2, 1, 4, 3, 6], expected: 'Winner: O' }, // diagonal
  { clicks: [0, 1, 3, 4, 7, 6, 2, 5, 8], expected: "It's a Draw" },
  { clicks: [0], expected: 'Next Turn: X' },
];

describe('Tic-Tac-Toe Game', () => {
  it.each(multiplayerGamesMock)(
    'should display $expected after clicks: $clicks for Multiplayer mode',
    async ({ clicks, expected }) => {
      expect(playGame(clicks)).toBe(expected);
    },
  );

  it.each(cpuGamesMock)(
    'should display $expected after clicks: $clicks for CPU mode',
    async ({ clicks, expected }) => {
      const oddClicks = clicks.filter((_, index) => index % 2 !== 0);
      const evenClicks = clicks.filter((_, index) => index % 2 === 0);

      for (const click of oddClicks) {
        vi.mocked(generateCpuPlayMock).mockReturnValueOnce(click);
      }

      render(<GamePage />);

      fireEvent.click(screen.getByTestId('cpu-action-button'));

      for (const click of evenClicks) {
        fireEvent.click(screen.getByTestId(testIdCell(click)));
      }

      expect(screen.getByTestId(testIdGameStatus)?.textContent).toBe(expected);
    },
  );

  it('should display matrix size of 3 initially', async () => {
    render(<GamePage />);

    expect(screen.getByTestId(testIdSizeStatus)?.textContent).toBe(
      'Matrix size: 3',
    );
  });

  it('should size handler work properly', async () => {
    render(<GamePage />);

    fireEvent.click(screen.getByTestId('size-decreaser-action-button'));

    expect(screen.getByTestId(testIdSizeStatus)?.textContent).toBe(
      'Matrix size: 2',
    );

    fireEvent.click(screen.getByTestId('size-increaser-action-button'));
    fireEvent.click(screen.getByTestId('size-increaser-action-button'));

    expect(screen.getByTestId(testIdSizeStatus)?.textContent).toBe(
      'Matrix size: 4',
    );
  });
});
