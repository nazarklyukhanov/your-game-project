import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store/store';
import { refreshTokensThunk } from '../entities/user/api/AuthApi';

import Header from '../components/layout/Header';
import HomePage from '../pages/HomePage/HomePage';
import GamePage from '../pages/GamePage/GamePage';
import Footer from '../components/layout/Footer';

import SignUpPage from '../pages/SignUpPage/SignUpPage';
import SignInPage from '../pages/SignInPage/SignInPage';
import SignOutPage from '../pages/SignOutPage/SignOutPage';

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const isInitialized = useSelector((state: RootState) => state.user.isInitialized);

  useEffect(() => {
    dispatch(refreshTokensThunk());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 flex">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/signOut" element={<SignOutPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
