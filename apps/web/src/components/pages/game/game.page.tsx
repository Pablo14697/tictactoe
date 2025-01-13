import { emptyGame, testIdCell, testIdGameStatus } from '@constants';
import {
  GameOutcome,
  GamePlayer,
  type GameResult,
} from '@customTypes/game.types';
import { ActionButton } from '@shared/action-button.component';
import { SquareButton } from '@shared/square-button.component';
import { checkGameResult } from '@utils/game.util';
import { useState } from 'react';

const INITIAL_BOARD = '_________';

const replaceAt = (str: string, index: number, replacement: string) => {
  return str.substring(0, index) + replacement + str.substring(index + 1);
};

export const GamePage: React.FC = () => {
  const [currentPlayer, setCurrentPlayer] = useState<GamePlayer>(GamePlayer.X);
  const [result, setResult] = useState<GameResult>({
    outcome: GameOutcome.UNRESOLVED,
  });
  const [board, setBoard] = useState(INITIAL_BOARD);

  const isGameFinished = result.outcome !== GameOutcome.UNRESOLVED;

  const getResultText = () => {
    if (result.outcome === GameOutcome.X || result.outcome === GameOutcome.O) {
      return `Winner: ${result.outcome}`;
    }

    if (result.outcome === GameOutcome.DRAW) {
      return "It's a Draw";
    }

    return `Next Turn: ${currentPlayer}`;
  };

  const onPlayerPlayed = (index: number) => {
    const updatedBoard = replaceAt(board, index, currentPlayer);

    const result = checkGameResult(updatedBoard);
    setBoard(updatedBoard);

    setCurrentPlayer(
      currentPlayer === GamePlayer.X ? GamePlayer.O : GamePlayer.X,
    );
    setResult({
      outcome: result.outcome,
      winningPositions: result.winningPositions,
    });
  };

  const onRestartGame = () => {
    setBoard(INITIAL_BOARD);
    setCurrentPlayer(GamePlayer.X);
    setResult({ outcome: GameOutcome.UNRESOLVED });
  };

  return (
    <div className="flex min-h-screen w-screen justify-center">
      <div className="no-scrollbar·overflow-y-scroll·bg-white">
        <div className="flex·flex-col·items-center·bg-white·px-[52px]">
          <div className="mt-[40px]" />
          <h1 className="whitespace-nowrap·font-bold·text-[50px]·leading-[60.51px]">
            TIC-TAC-TOE
          </h1>
          <div className="mb-[50px]" />

          <h3
            className="whitespace-nowrap·text-[32px]·leading-[38.73px]"
            data-testid={testIdGameStatus}
          >
            {getResultText()}
          </h3>

          <div className="mb-[40px]" />

          <div className="grid min-h-[310px] w-[310px] grid-cols-3 grid-rows-3 gap-[10px] rounded-[8px] bg-custom-gray p-[10px]">
            {board.split('').map((row, index) => (
              <SquareButton
                key={String(index) + Date.now()}
                data-testid={testIdCell(index)}
                disabled={isGameFinished}
                className={
                  result.winningPositions?.includes(index)
                    ? 'text-custom-green'
                    : 'text-black'
                }
                onClick={() => onPlayerPlayed(index)}
              >
                {row !== emptyGame ? row : ''}
              </SquareButton>
            ))}
          </div>
          <div className="mb-[50px]" />

          <ActionButton
            className={isGameFinished ? 'bg-custom-green' : 'bg-custom-gray'}
            onClick={onRestartGame}
          >
            {isGameFinished ? 'Play Again' : 'Restart'}
          </ActionButton>
          <div className="mb-[50px]" />
        </div>
      </div>
    </div>
  );
};
