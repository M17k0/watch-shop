import { ErrorContainer } from '../ErrorContainer/ErrorContainer';
import classes from './TextInput.module.css';

export type BaseInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface TextInputProps extends Omit<BaseInputProps, 'onChange'> {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  errors?: string[];
}

export function TextInput({
  value,
  onChange,
  errors,
  placeholder,
  ...rest
}: TextInputProps) {
  return (
    <div className={classes.container}>
      <label className={classes.label}>{placeholder}</label>
      <input
        className={classes.input}
        value={value}
        onChange={e => onChange(e.target.value)}
        {...rest}
      />
      <ErrorContainer errorMessage={errors?.join(', ') ?? null} />
    </div>
  );
}
