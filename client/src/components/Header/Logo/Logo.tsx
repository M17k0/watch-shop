import { FiWatch } from "react-icons/fi";
import { Link } from 'react-router-dom';
import classes from './Logo.module.css';

export function Logo() {
  return (
    <Link to={'/'} className={classes.logo}>
      <div>The</div>
      <FiWatch />
      <div>Shop</div>
    </Link>
  );
}
