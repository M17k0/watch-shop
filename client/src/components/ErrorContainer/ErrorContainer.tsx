import classes from './ErrorContainer.module.css';
import cln from 'classnames';

interface ErrorContainerProps {
  errorMessage: string | null;
  className?: string;
}

export function ErrorContainer({
  errorMessage,
  className,
}: ErrorContainerProps) {
  return (
    errorMessage && (
      <p className={cln(classes.error, className)}>{errorMessage}</p>
    )
  );
}
