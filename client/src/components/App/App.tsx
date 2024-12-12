import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage } from '@/pages/Auth/LoginPage/LoginPage';
import { RegisterPage } from '@/pages/Auth/RegisterPage/RegisterPage';
import { LandingPage } from '@/pages/LandingPage/LandingPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
