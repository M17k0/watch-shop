import { LoginPage } from '@/pages/Auth/LoginPage/LoginPage';
import { RegisterPage } from '@/pages/Auth/RegisterPage/RegisterPage';
import { LandingPage } from '@/pages/LandingPage/LandingPage';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { MainLayout } from './MainLayout';
import { CatalogPage } from '@/pages/CatalogPage/CatalogPage';
import { WatchPage } from '@/pages/WatchPage/WatchPage';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';
import { CartProvider } from '@/contexts/CartContext';
import { CartPage } from '@/pages/CartPage/CartPage';
import { CheckoutPage } from '@/pages/CheckoutPage/CheckoutPage';
import { CurrentUserProvider } from '@/contexts/CurrentUserContext';
import { OrdersPage } from '@/pages/OrdersPage/OrdersPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/watches" element={<CatalogPage />} />
        <Route path="/watches/:id" element={<WatchPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </>,
  ),
);

export function App() {
  return (
    <CurrentUserProvider>
      <CartProvider>
        <RouterProvider router={router} />;
      </CartProvider>
    </CurrentUserProvider>
  );
}
