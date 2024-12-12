import { Link } from 'react-router-dom';
import baseClasses from '../AuthPages.module.css';
import { RegisterForm } from '@/components/Forms/Auth/Register/RegisterForm';

export function RegisterPage() {
  return (
    <div className={baseClasses.container}>
      <h1>Register</h1>
      <RegisterForm handleRegister={() => {}} loading={false} error={null} />
      <Link to="/login">Already have an account? Login here</Link>
    </div>
  );
}
