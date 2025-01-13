import { testIdActionButton } from '@constants';

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ActionButton: React.FC<ActionButtonProps> = (props) => {
  const { children, className, disabled, ...buttonProps } = props;

  return (
    <button
      {...buttonProps}
      className={`whitespace-nowrap rounded-2 font-bold text-white leading-[38.73px] hover:opacity-80 ${className}`}
      data-testid={testIdActionButton}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
