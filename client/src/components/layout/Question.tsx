import { XMarkIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  closeQuestion,
  answerCorrect,
  answerWrong,
} from '../../entities/round/slice/roundSlice';

const QUESTION_TIME = 15; // ⏱️ секунд на вопрос

export default function QuestionModal() {
  const dispatch = useDispatch();

  const { activeQuestion, paused } = useSelector((state) => state.round);

  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);

  // 👉 сбрасываем таймер при новом вопросе
  useEffect(() => {
    if (activeQuestion) {
      setTimeLeft(QUESTION_TIME);
      setUserAnswer('');
    }
  }, [activeQuestion]);

  // 👉 таймер (УВАЖАЕТ ПАУЗУ)
  useEffect(() => {
    if (!activeQuestion || paused) return;

    if (timeLeft === 0) {
      dispatch(answerWrong());
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, activeQuestion, paused, dispatch]);

  if (!activeQuestion) return null;

  function submitAnswer() {
    if (paused) return;

    const user = userAnswer.trim().toLowerCase();
    const correct = activeQuestion.answer.trim().toLowerCase();

    if (!user) return;

    if (user === correct) {
      dispatch(answerCorrect());
    } else {
      dispatch(answerWrong());
    }

    setUserAnswer('');
  }

  function handleClose() {
    if (paused) {
      dispatch(closeQuestion());
    } else {
      dispatch(answerWrong());
    }
  }

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={handleClose}
      />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative bg-white max-w-xl w-full rounded-xl shadow-xl p-8 text-center">
          {/* CLOSE BUTTON */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          {/* TIMER */}
          <div
            className={`mb-2 text-lg font-bold ${
              timeLeft <= 5 ? 'text-red-500' : 'text-gray-700'
            }`}
          >
            ⏱ {timeLeft} сек.
            {paused && ' (пауза)'}
          </div>

          <p className="text-sm text-gray-500 mb-2">
            {activeQuestion.points} points
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {activeQuestion.question}
          </h2>

          <input
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Ваш ответ"
            className="w-full border px-4 py-2 rounded-md mb-4 text-center"
            disabled={paused || timeLeft === 0}
          />

          <button
            onClick={submitAnswer}
            disabled={paused || timeLeft === 0}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
          >
            Ответить
          </button>
        </div>
      </div>
    </>
  );
}
