import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Watch Shop</h1>
      <Button variant="primary" onClick={() => navigate('/login')}>
        Login
      </Button>
      <Button variant="secondary" onClick={() => navigate('/register')}>
        Register
      </Button>
    </div>
  );
}
