import { XMarkIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { closeQuestion } from '../../entities/round/slice/roundSlice';

export default function QuestionModal() {
  const dispatch = useDispatch();

  // 👉 берём активный вопрос из Redux
  const activeQuestion = useSelector((state) => state.round.activeQuestion);

  // 👉 если вопроса нет — модалка не рендерится
  if (!activeQuestion) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => dispatch(closeQuestion())}
      />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative bg-white max-w-xl w-full rounded-xl shadow-xl p-8 text-center">
          {/* CLOSE BUTTON */}
          <button
            onClick={() => dispatch(closeQuestion())}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          <p className="text-sm text-gray-500 mb-2">
            {activeQuestion.points} points
          </p>

          <h2 className="text-2xl font-bold text-gray-900">
            {activeQuestion.question}
          </h2>
        </div>
      </div>
    </>
  );
}
