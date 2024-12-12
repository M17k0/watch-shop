import { Button } from '../../../Button/Button';
import { ErrorContainer } from '../../../ErrorContainer/ErrorContainer';
import { TextInput } from '../../../TextInput/TextInput';
import baseClasses from '../AuthForms.module.css';

interface RegisterFormProps {
  loading: boolean;
  handleRegister: () => void;
  error: unknown;
}

export function RegisterForm({
  loading,
  error,
  handleRegister,
}: RegisterFormProps) {
  let errorMsg: string | null = null;
  if (error instanceof Error) {
    errorMsg = error.message;
  } else if (error) {
    errorMsg = String(error);
  }

  return (
    <div className={baseClasses.container}>
      <form className={baseClasses.form}>
        <TextInput value="..." onChange={() => {}} placeholder="Email" />
        <TextInput value="..." onChange={() => {}} placeholder="Password" />
        <TextInput
          value="..."
          onChange={() => {}}
          placeholder="Confirm Password"
        />
      </form>
      <Button
        variant="secondary"
        className={baseClasses.button}
        onClick={handleRegister}
        disabled={loading}
      >
        REGISTER
      </Button>

      <ErrorContainer errorMessage={errorMsg} />
    </div>
  );
}
