import { configureStore } from '@reduxjs/toolkit';
import { roundReducer } from '../../entities/round/slice/roundSlice';
import { userReducer } from '../../entities/user/slice/userSlice';

export const store = configureStore({
  reducer: {
    round: roundReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
