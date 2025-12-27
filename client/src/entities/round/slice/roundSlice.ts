import { createSlice } from '@reduxjs/toolkit';
import { getQuestionsThunk } from '../api/RoundApi';

const initialState = {
  activeQuestion: null,
  questions: [],
  usedQuestionIds: [],
  score: 0,
  paused: false,
  loading: false,
  error: null,
};

const roundSlice = createSlice({
  name: 'round',
  initialState,
  reducers: {
    openQuestion(state, action) {
      state.activeQuestion = action.payload;
    },

    closeQuestion(state) {
      state.activeQuestion = null;
    },

    answerCorrect(state) {
      if (!state.activeQuestion) return;

      state.score += state.activeQuestion.points;
      state.usedQuestionIds.push(state.activeQuestion.id);
      state.activeQuestion = null;
    },

    answerWrong(state) {
      if (!state.activeQuestion) return;

      state.score -= state.activeQuestion.points;
      state.usedQuestionIds.push(state.activeQuestion.id);
      state.activeQuestion = null;
    },

    pauseGame(state) {
      state.paused = true;
      state.activeQuestion = null;
    },

    resumeGame(state) {
      state.paused = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getQuestionsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuestionsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(getQuestionsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  openQuestion,
  closeQuestion,
  answerCorrect,
  answerWrong,
  pauseGame,
  resumeGame,
} = roundSlice.actions;


export const roundReducer = roundSlice.reducer;
