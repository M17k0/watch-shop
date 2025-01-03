import { Button } from '@/components/Button/Button';
import classes from './Header.module.css';
import { Logo } from './Logo/Logo';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '@/contexts/CartContext'; // Import the useCart hook
import { useCurrentUser } from '@/contexts/CurrentUserContext';
import { authService } from '@/services/authService';

export function Header() {
  const user = useCurrentUser();
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

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
        <Button
          variant="primary"
          color="primary"
          className={classes.navButton}
          onClick={() => navigate('/cart')}
        >
          <FaShoppingCart />
          {totalItemsInCart > 0 && (
            <div className={classes.cartBadge}>{totalItemsInCart}</div>
          )}
        </Button>
        { user &&
          (
          <><Button
            variant="primary"
            color="primary"
            className={classes.navButton}
            onClick={() => navigate('/orders')}
          >
            My orders
          </Button>
          <Button
            variant="primary"
            color="primary"
            className={classes.navButton}
            onClick={() => authService.logout()}
            >
              Log out
            </Button></>)
        }
        { !user && (
          <Button
            variant="primary"
            color="primary"
            className={classes.navButton}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        )}
      </nav>
    </header>
  );
}
