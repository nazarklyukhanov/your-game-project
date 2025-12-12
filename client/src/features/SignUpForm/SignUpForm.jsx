import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { axiosInstance, setAccessToken } from '../../shared/lib/axiosInstance';

export default function SignUpForm({ setUser }) {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({});

  function onChangeHandler(event) {
    return setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  async function signUpHandler(event) {
    try {
      event.preventDefault();

      const response = await axiosInstance.post('./auth/signUp', inputs);

      setUser(response.data.data.user);
      setAccessToken(response.data.data.accessToken);

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="bg-white/70 backdrop-blur-lg p-10 rounded-2xl w-full max-w-md border border-gray-300 shadow-xl">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
          Create your account
        </h2>

        <form className="flex flex-col gap-4" onSubmit={signUpHandler}>
          <input
            name="name"
            type="text"
            placeholder="Name"
            required
            autoFocus={true}
            className="px-4 py-3 rounded-xl bg-white border border-gray-300 focus:border-indigo-600 outline-none shadow-sm"
            onChange={onChangeHandler}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            autoComplete="email"
            className="px-4 py-3 rounded-xl bg-white border border-gray-300 focus:border-indigo-600 outline-none shadow-sm"
            onChange={onChangeHandler}
          />

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
            autoComplete="current-password"
            className="px-4 py-3 rounded-xl bg-white border border-gray-300 focus:border-indigo-600 outline-none shadow-sm"
            onChange={onChangeHandler}
          />

          <button
            type="submit"
            className="mt-4 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-500 hover:scale-110 transition"
          >
            Sign Up
          </button>

          <div className="mt-6 text-center text-gray-600">
            Already have account?{' '}
            <Link
              to="/signIn"
              className="font-bold text-indigo-600 hover:text-indigo-500 underline underline-offset-2 transition-transform duration-150"
               
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
