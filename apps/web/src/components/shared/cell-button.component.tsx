interface CellButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const CellButton: React.FC<CellButtonProps> = (props) => {
  const { children, className, disabled, ...buttonProps } = props;

  return (
    <button
      {...buttonProps}
      className={`flex items-center justify-center rounded-[8px] px-[32px] py-[12px] font-bold text-[50px] leading-[38.73px] ${!disabled && 'hover:bg-custom-green-muted'} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
