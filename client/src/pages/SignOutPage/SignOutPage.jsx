import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../shared/hooks/reduxHooks';
import { signOutThunk } from '../../entities/user/api/AuthApi';

export default function SignOutPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(signOutThunk()).then(() => {
      navigate('/signIn');
    });
  }, [dispatch, navigate]);
}
