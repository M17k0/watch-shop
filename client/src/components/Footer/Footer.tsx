import classes from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={classes.footer}>
      <p className={classes.text}>&copy; {year} All rights reserved.</p>
    </footer>
  );
}
