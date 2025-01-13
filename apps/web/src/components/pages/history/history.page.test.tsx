import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { HistoryPage } from './history.page';

vi.mock('react-router-dom');

const getHistoryMock = vi.hoisted(() => vi.fn());

vi.mock('@store/history.store', () => ({
  getHistory: getHistoryMock,
}));

describe('HistoryPage', () => {
  it('should empty message be visible when there are no played games', () => {
    getHistoryMock.mockReturnValueOnce([]);
    render(<HistoryPage />);

    expect(screen.getByText(/No games were played/i)).toBeVisible();
  });

  it('should table be visible when there are played games', () => {
    getHistoryMock.mockReturnValueOnce([
      { outcome: 'X', id: 1736803347704, gameMode: 'multiplayer' },
      { outcome: 'X', id: 1736803354853, gameMode: 'cpu' },
    ]);
    render(<HistoryPage />);

    expect(screen.queryByText(/No games were played/i)).toBeNull();
  });
});
