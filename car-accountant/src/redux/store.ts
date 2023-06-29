import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { Action } from 'redux';
import { authSlice } from './auth/reducer';


const makeStore = () => configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  devTools: true
});

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;

export const wrapper = createWrapper<RootStore>(makeStore);