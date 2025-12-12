import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { axiosInstance, setAccessToken } from '../shared/lib/axiosInstance';

import Header from '../components/layout/Header';

import Footer from '../components/layout/Footer';

import SignUpPage from '../pages/SignUpPage/SignUpPage';
import SignInPage from '../pages/SignInPage/SignInPage';
import SignOutPage from '../pages/SignOutPage/SignOutPage';

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get('/auth/');

        setUser(response.data.data.user);
        setAccessToken(response.data.data.accessToken);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user} />

      <main className="flex-1 flex">
        <Routes>
          <Route path="/signUp" element={<SignUpPage setUser={setUser} />} />
          <Route path="/signIn" element={<SignInPage setUser={setUser} />} />
          <Route path="/signOut" element={<SignOutPage setUser={setUser} />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
