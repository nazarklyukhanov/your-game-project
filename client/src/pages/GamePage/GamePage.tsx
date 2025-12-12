import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { openQuestion } from '../../entities/round/slice/roundSlice';
import { getQuestionsThunk } from '../../entities/round/api/RoundApi';
import QuestionModal from '../../components/layout/Question';

const points = [200, 400, 600, 800, 1000];

const categories = [
  {
    id: 1,
    title: 'ФИЛОСОФЫ',
    questions: { 200: true, 400: true, 600: true, 800: true, 1000: true },
  },
  {
    id: 2,
    title: 'АГЕНТ 007',
    questions: { 200: true, 600: true, 800: true, 1000: true },
  },
  {
    id: 3,
    title: 'ШАХМАТЫ',
    questions: { 200: true, 400: true, 600: true, 800: true },
  },
  {
    id: 4,
    title: 'ЕВГЕНИЙ ОНЕГИН',
    questions: { 200: true, 400: true, 800: true, 1000: true },
  },
  {
    id: 5,
    title: 'СТРАНЫ И НАРОДЫ',
    questions: { 200: true, 400: true, 600: true, 800: true, 1000: true },
  },
  {
    id: 6,
    title: 'ЖЁЛТАЯ ТЕМА',
    questions: { 200: true, 400: true, 600: true, 800: true, 1000: true },
  },
];

export default function GamePage() {
  const dispatch = useDispatch();

  // ⬇️ берём всё нужное из Redux
  const { questions, activeQuestion, loading, error } = useSelector(
    (state) => state.round
  );

  // ⬇️ загружаем вопросы при входе на страницу
  useEffect(() => {
    dispatch(getQuestionsThunk());
  }, [dispatch]);

  // ⬇️ обработка загрузки
  if (loading) {
    return (
      <div className="min-h-screen bg-[#02045d] flex items-center justify-center text-yellow-400 text-xl">
        Загрузка вопросов…
      </div>
    );
  }

  // ⬇️ обработка ошибки
  if (error) {
    return (
      <div className="min-h-screen bg-[#02045d] flex items-center justify-center text-red-400 text-xl">
        Ошибка: {error}
      </div>
    );
  }

  // ⬇️ выбор вопроса из Redux
  function pickQuestion(cat, value) {
    const question = questions.find(
      (q) => q.categoryId === cat.id && q.points === value
    );

    if (!question) return;

    dispatch(openQuestion(question));
  }

  return (
    <div className="min-h-screen bg-[#02045d] flex items-center justify-center p-8">
      <div className="w-full max-w-6xl border-4 border-white">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="grid grid-cols-6 border-b border-white last:border-b-0"
          >
            {/* CATEGORY */}
            <div className="flex items-center justify-center border-r border-white text-yellow-400 font-bold text-lg py-6">
              {cat.title}
            </div>

            {/* POINTS */}
            {points.map((value) => {
              const exists = cat.questions[value];
              const key = `${cat.id}-${value}`;
              const isActive = activeQuestion?.id === key;

              return (
                <button
                  key={value}
                  disabled={!exists}
                  onClick={() => pickQuestion(cat, value)}
                  className={`
                    flex items-center justify-center
                    border-r border-white last:border-r-0
                    text-2xl font-bold transition-all
                    ${
                      !exists
                        ? 'bg-[#02045d]'
                        : isActive
                        ? 'bg-cyan-400 text-yellow-200'
                        : 'bg-[#02045d] text-yellow-400 hover:bg-blue-700'
                    }
                  `}
                >
                  {exists && value}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* модалка слушает Redux */}
      <QuestionModal />
    </div>
  );
}
