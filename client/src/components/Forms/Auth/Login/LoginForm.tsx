import { Button } from '../../../Button/Button';
import { ErrorContainer } from '../../../ErrorContainer/ErrorContainer';
import { TextInput } from '../../../TextInput/TextInput';
import baseClasses from '../AuthForms.module.css';

interface LoginFormProps {
  loading: boolean;
  handleLogin: () => void;
  error: unknown;
}

export function LoginForm({ loading, error, handleLogin }: LoginFormProps) {
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
      </form>
      <Button
        variant="secondary"
        className={baseClasses.button}
        onClick={handleLogin}
        disabled={loading}
      >
        LOG IN
      </Button>

      <ErrorContainer errorMessage={errorMsg} />
    </div>
  );
}
