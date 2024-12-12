import classes from './Header.module.css'
import { Logo } from './Logo/Logo';

export function Header() {
  return (
    <header className={classes.header}>
      <div>
        <Logo />
      </div>
    </header>
  );
}
