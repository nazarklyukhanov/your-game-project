import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import logo from '../../assets/skeleton.png';

export default function Header({ user }) {
  return (
    <header className="backdrop-blur-xl bg-white/60 border-b border-gray-300 shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* LEFT — LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-10 w-auto hover:scale-110 transition" />
        </Link>

        {/* CENTER — MENU */}
        <div className="hidden sm:flex gap-6">
          <Link
            to="/"
            className="px-4 py-2 rounded-xl text-grey-600 font-semibold hover:text-indigo-700 hover:scale-110 transition"
          >
            Home
          </Link>
        </div>

        {/* RIGHT — LOGIN / PROFILE */}
        <div className="hidden sm:flex items-center gap-4">
          {user ? (
            <Link
              to="/signOut"
              className="flex items-center gap-1 px-4 py-2 text-grey-600 font-semibold hover:text-indigo-700 hover:scale-110 transition"
            >
              <span>Log out</span>
              <ArrowRightIcon className="size-5" />
            </Link>
          ) : (
            <Link
              to="/signIn"
              className="flex items-center gap-1 px-4 py-2 text-grey-600 font-semibold hover:text-indigo-700 hover:scale-110 transition"
            >
              <span>Log in</span>
              <ArrowLeftIcon className="size-5" />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
