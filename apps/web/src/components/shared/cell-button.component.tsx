interface CellButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const CellButton: React.FC<CellButtonProps> = (props) => {
  const { children, className, disabled, ...buttonProps } = props;

  return (
    <button
      {...buttonProps}
      className={`flex items-center justify-center rounded-2 px-8 py-3 font-bold text-2xl leading-[38.73px] ${!disabled && 'hover:bg-custom-green-muted'} ${className}`}
      disabled={disabled}
      aria-label="tic tac toe cell"
    >
      {children}
    </button>
  );
};
