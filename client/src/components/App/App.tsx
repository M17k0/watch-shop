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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/watches" element={<CatalogPage />} />
        <Route path="/watches/:id" element={<WatchPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </>,
  ),
);

export function App() {
  return <RouterProvider router={router} />;
}
