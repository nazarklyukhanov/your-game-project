import { createSlice } from '@reduxjs/toolkit';
import { getQuestionsThunk } from '../api/RoundApi';

const initialState = {
  activeQuestion: null,
  questions: [],
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
  },
  extraReducers: (builder) => {
    builder.addCase(getQuestionsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getQuestionsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.questions = action.payload;
    });
    builder.addCase(getQuestionsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const roundReducer = roundSlice.reducer;
export const { openQuestion, closeQuestion } = roundSlice.actions;
