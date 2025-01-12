interface SquareButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const SquareButton: React.FC<SquareButtonProps> = (props) => {
  const { children, className, disabled, ...buttonProps } = props;
  const isSquareSet = children === 'X' || children === 'O';

  return (
    <button
      {...buttonProps}
      className={`flex items-center justify-center rounded-[8px] px-[32px] py-[12px] font-bold text-[50px] leading-[38.73px] ${
        isSquareSet && !disabled ? 'bg-custom-green-muted' : ' bg-white'
      } ${className}`}
      disabled={disabled || isSquareSet}
    >
      {children}
    </button>
  );
};
