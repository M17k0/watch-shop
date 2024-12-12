import cln from 'classnames';
import classes from './Button.module.css';

type BaseButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'clear';

interface ButtonProps extends BaseButtonProps {
  variant: ButtonVariant;
}

export function Button({
  className,
  children,
  variant,
  ...baseButtonProps
}: ButtonProps) {
  return (
    <button
      className={cln(
        classes.button,
        classes[variant],
        className,
        baseButtonProps.disabled && classes.disabled,
      )}
      {...baseButtonProps}
    >
      {children}
    </button>
  );
}
