import { Button } from '@/components/Button/Button';
import classes from './Header.module.css';
import { Logo } from './Logo/Logo';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Logo />
      </div>
      <nav className={classes.nav}>
        <Button
          variant="primary"
          color="primary"
          className={classes.navButton}
          onClick={() => navigate('/watches')}
        >
          Watches
        </Button>
      </nav>
    </header>
  );
}
