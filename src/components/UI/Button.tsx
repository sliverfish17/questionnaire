import {ButtonHTMLAttributes} from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive?: boolean;
};

const baseStyles =
  'h-16 w-[330px] rounded-2xl border border-button-border px-4 py-3 text-sm shadow-button';

const activeStyles = (active: boolean) =>
  active
    ? 'bg-active-gradient text-white'
    : 'bg-button-regular text-button-text';

export const Button = ({
  className = '',
  children,
  type = 'button',
  isActive = false,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${baseStyles} ${activeStyles(isActive)} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
