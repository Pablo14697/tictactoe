import { testIdActionButton } from '@constants';

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ActionButton: React.FC<ActionButtonProps> = (props) => {
  const { children, disabled, ...buttonProps } = props;

  return (
    <button
      {...buttonProps}
      className={`rounded-[8px] bg-custom-gray px-[32px] py-[12px] font-bold text-[32px] text-white leading-[38.73px] ${
        disabled ? 'opacity-50' : 'hover:opacity-80'
      }`}
      data-testid={testIdActionButton}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
