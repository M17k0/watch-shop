import { LoginForm } from '@/components/Forms/Auth/Login/LoginForm';
import baseClasses from '../AuthPages.module.css';
import { Link } from 'react-router-dom';

export function LoginPage() {
  return (
    <div className={baseClasses.container}>
      <h1>Login</h1>
      <LoginForm handleLogin={() => {}} loading={false} error={null} />
      <Link to="/register">Don't have an account? Register here</Link>
    </div>
  );
}
