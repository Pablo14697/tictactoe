import { testIdCell, testIdGameStatus } from '@constants';
import {
  GameOutcome,
  GamePlayer,
  type GameResult,
} from '@customTypes/game.types';
import { ActionButton } from '@shared/action-button.component';
import { SquareButton } from '@shared/square-button.component';
import { checkGameResult } from '@utils/game.util';
import { useState } from 'react';

const INITIAL_TABLE = [null, null, null, null, null, null, null, null, null];

const updateArrayAt = (i, value, arr) => {
  const newArray = [...arr];

  newArray[i] = value;

  return newArray;
};

export const GamePage: React.FC = () => {
  const [currentPlayer, setCurrentPlayer] = useState<GamePlayer>(GamePlayer.X);
  const [result, setResult] = useState<GameResult>({
    outcome: GameOutcome.UNRESOLVED,
  });
  const [game, setGame] = useState(INITIAL_TABLE);

  const isGameFinished = result.outcome !== GameOutcome.UNRESOLVED;

  return (
    <div className="flex min-h-screen w-screen justify-center">
      <div className="bg-white overflow-y-scroll no-scrollbar">
        <div className="flex flex-col items-center px-[52px] bg-white">
          <div className="mt-[40px]" />
          <h1 className="font-bold text-[50px] leading-[60.51px] whitespace-nowrap">
            TIC-TAC-TOE
          </h1>
          <div className="mb-[50px]" />
          {(result.outcome === GameOutcome.X ||
            result.outcome === GameOutcome.O) && (
            <h3
              className="text-[32px] leading-[38.73px] whitespace-nowrap"
              data-testid={testIdGameStatus}
            >
              Winner: {result.outcome}
            </h3>
          )}

          {result.outcome === GameOutcome.DRAW && (
            <h3
              className="text-[32px] leading-[38.73px] whitespace-nowrap"
              data-testid={testIdGameStatus}
            >
              It's a Draw
            </h3>
          )}

          {result.outcome === GameOutcome.UNRESOLVED && (
            <h3
              className="text-[32px] leading-[38.73px] whitespace-nowrap"
              data-testid={testIdGameStatus}
            >
              Next Turn: {currentPlayer}
            </h3>
          )}
          <div className="mb-[40px]" />

          <div className="grid min-h-[310px] w-[310px] grid-cols-3 grid-rows-3 gap-[10px] rounded-[8px] bg-custom-gray p-[10px]">
            {game.map((row, i) => (
              <SquareButton
                key={String(i) + Date.now()}
                data-testid={testIdCell(i)}
                disabled={isGameFinished}
                className={
                  result.winningPositions?.includes(i)
                    ? 'text-custom-green'
                    : 'text-black'
                }
                onClick={() => {
                  const updatedGame = updateArrayAt(i, currentPlayer, game);
                  const result = checkGameResult(updatedGame);
                  setGame(updatedGame);

                  setCurrentPlayer(
                    currentPlayer === GamePlayer.X
                      ? GamePlayer.O
                      : GamePlayer.X,
                  );
                  setResult({
                    outcome: result.outcome,
                    winningPositions: result.winningPositions,
                  });
                }}
              >
                {row}
              </SquareButton>
            ))}
          </div>
          <div className="mb-[50px]" />

          <ActionButton
            className={isGameFinished ? 'bg-custom-green' : 'bg-custom-gray'}
            onClick={() => {
              setGame(INITIAL_TABLE);
              setCurrentPlayer(GamePlayer.X);
              setResult({ outcome: GameOutcome.UNRESOLVED });
            }}
          >
            {isGameFinished ? 'Play Again' : 'Restart'}
          </ActionButton>
          <div className="mb-[50px]" />
        </div>
      </div>
    </div>
  );
};
