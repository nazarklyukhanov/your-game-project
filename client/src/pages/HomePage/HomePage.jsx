import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Добро пожаловать в "Свою игру"!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Проверьте свои знания в различных категориях
        </p>
        <Link
          to="/game"
          className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 hover:scale-110 transition"
        >
          Начать игру
        </Link>
      </div>
    </div>
  );
}

