import {ButtonHTMLAttributes} from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  className = '',
  children,
  type = 'button',
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`h-16 w-[330px] rounded-2xl border border-button-border bg-button-regular px-4 py-3 text-sm  shadow-button ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
