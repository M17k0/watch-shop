import { LoginPage } from '@/pages/Auth/LoginPage/LoginPage';
import { RegisterPage } from '@/pages/Auth/RegisterPage/RegisterPage';
import { LandingPage } from '@/pages/LandingPage/LandingPage';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { MainLayout } from './MainLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </>,
  ),
);

export function App() {
  return <RouterProvider router={router} />;
}
