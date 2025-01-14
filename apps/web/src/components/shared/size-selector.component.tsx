import { testIdSizeStatus } from '@constants';
import { useGameContext } from '@context/game.context';
import { ActionButton } from './action-button.component';

export const SizeSelector = () => {
  const { onRestartGame, size, setSize } = useGameContext();

  return (
    <div className="flex flex-col items-center">
      <span
        className="whitespace-pre-wrap text-center text-base leading-[38.73px]"
        data-testid={testIdSizeStatus}
      >
        Matrix size: {size}
      </span>
      <div className="flex gap-2">
        <ActionButton
          className={'h-10 w-12 bg-custom-gray font-normal text-base'}
          onClick={() => {
            const sizeDecreased = size === 2 ? size : size - 1;

            setSize(sizeDecreased);
            onRestartGame(sizeDecreased);
          }}
          name={'size-decreaser'}
        >
          -
        </ActionButton>
        <ActionButton
          className={'h-10 w-12 bg-custom-gray font-normal text-base'}
          onClick={() => {
            setSize(size + 1);
            onRestartGame(size + 1);
          }}
          name={'size-increaser'}
        >
          +
        </ActionButton>
      </div>
    </div>
  );
};
