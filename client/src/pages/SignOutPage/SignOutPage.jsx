import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { axiosInstance, setAccessToken } from '../../shared/lib/axiosInstance';

export default function SignOutPage({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        await axiosInstance.delete('/auth/signOut');
        setUser(null);
        setAccessToken('');
        
        navigate('/signIn');
      } catch (error) {
        console.log(error);
      }
    })();
  }, [setUser, navigate]);
}
