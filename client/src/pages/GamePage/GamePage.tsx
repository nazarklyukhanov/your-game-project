import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  openQuestion,
  pauseGame,
  resumeGame,
} from '../../entities/round/slice/roundSlice';
import { getQuestionsThunk } from '../../entities/round/api/RoundApi';
import QuestionModal from '../../components/layout/Question';

const points = [200, 400, 600, 800, 1000];

const categories = [
  { id: 1, title: 'ФИЛОСОФЫ', questions: { 200: true, 400: true, 600: true, 800: true, 1000: true } },
  { id: 2, title: 'АГЕНТ 007', questions: { 200: true, 400: true, 600: true, 800: true, 1000: true } },
  { id: 3, title: 'ШАХМАТЫ', questions: { 200: true, 400: true, 600: true, 800: true, 1000: true } },
  { id: 4, title: 'ЕВГЕНИЙ ОНЕГИН', questions: { 200: true, 400: true, 600: true, 800: true, 1000: true } },
  { id: 5, title: 'СТРАНЫ И НАРОДЫ', questions: { 200: true, 400: true, 600: true, 800: true, 1000: true } },
  { id: 6, title: 'ЖЁЛТАЯ ТЕМА', questions: { 200: true, 400: true, 600: true, 800: true, 1000: true } },
];

export default function GamePage() {
  const dispatch = useDispatch();

  const {
    questions = [],
    activeQuestion,
    usedQuestionIds,
    score,
    paused,
    loading,
    error,
  } = useSelector((state) => state.round);

  useEffect(() => {
    dispatch(getQuestionsThunk());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#02045d] flex items-center justify-center text-yellow-400 text-xl">
        Загрузка вопросов…
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#02045d] flex items-center justify-center text-red-400 text-xl">
        Ошибка: {error}
      </div>
    );
  }

  function pickQuestion(cat, value) {
    if (paused) return;

    const question = questions.find(
      (q) => q.category_id === cat.id && q.points === value
    );

    if (!question) return;
    if (usedQuestionIds.includes(question.id)) return;

    dispatch(openQuestion(question));
  }

  return (
    <div className="flex-1 bg-[#02045d] p-8 relative">

      {/* 🔴 ПАНЕЛЬ УПРАВЛЕНИЯ */}
      <div className="absolute top-6 right-8 flex items-center gap-6">
        <div className="text-yellow-400 text-2xl font-bold">
          Score: {score}
        </div>

        <button
          onClick={() =>
            paused ? dispatch(resumeGame()) : dispatch(pauseGame())
          }
          className="px-4 py-2 rounded-md font-bold bg-yellow-400 text-[#02045d] hover:bg-yellow-300"
        >
          {paused ? '▶ Продолжить' : '⏸ Пауза'}
        </button>
      </div>

      <div className={`max-w-6xl mx-auto border-4 border-white ${paused ? 'opacity-50 pointer-events-none' : ''}`}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="grid grid-cols-6 border-b border-white last:border-b-0"
          >
            <div className="flex items-center justify-center border-r border-white text-yellow-400 font-bold text-lg py-6">
              {cat.title}
            </div>

            {points.map((value) => {
              const question = questions.find(
                (q) => q.category_id === cat.id && q.points === value
              );

              const isUsed = question
                ? usedQuestionIds.includes(question.id)
                : false;

              const isActive = activeQuestion?.id === question?.id;

              return (
                <button
                  key={value}
                  disabled={isUsed || paused}
                  onClick={() => pickQuestion(cat, value)}
                  className={`
                    flex items-center justify-center
                    border-r border-white last:border-r-0
                    text-2xl font-bold transition-all
                    ${
                      isUsed
                        ? 'bg-[#02045d] text-[#02045d]'
                        : isActive
                        ? 'bg-cyan-400 text-yellow-200'
                        : 'bg-[#02045d] text-yellow-400 hover:bg-blue-700'
                    }
                  `}
                >
                  {!isUsed && value}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <QuestionModal />
    </div>
  );
}
