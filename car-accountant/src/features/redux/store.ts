import { configureStore, ThunkAction } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { Action } from 'redux'
import { authSlice } from './auth/reducer'
import { repairSlice } from './repairs/reducer'
import { carSlice } from './cars/reducer'
import { employerSlice } from './employers/reducer'
import { cashBoxSlice } from './cashBox/reducer'

const store = () =>
  configureStore({
    reducer: {
      auth: authSlice.reducer,
      repairs: repairSlice.reducer,
      cars: carSlice.reducer,
      employers: employerSlice.reducer,
      cashBox: cashBoxSlice.reducer,
    },
    devTools: true,
  })

export type RootStore = ReturnType<typeof store>
export type RootState = ReturnType<RootStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>

export const wrapper = createWrapper<RootStore>(store)
