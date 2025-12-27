import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../../shared/lib/axiosInstance';

const ROUND_THUNK_TYPES = {
  QUESTIONS: '/questions/',
} as const;

export const getQuestionsThunk = createAsyncThunk(
  ROUND_THUNK_TYPES.QUESTIONS,
  async (_, rejectWithValue ) => {
    try {
      const response = await axiosInstance.get(ROUND_THUNK_TYPES.QUESTIONS);
      return response.data.data;
    } catch (error) {
      console.log(rejectWithValue );
    }
  },
);
