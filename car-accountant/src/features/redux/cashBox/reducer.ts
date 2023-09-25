import { createAsyncThunk, createSlice, isRejected, PayloadAction } from '@reduxjs/toolkit'
import { fetchCashBox } from '@/api/cashBox/actipon'
import { cashBoxInterface } from './types'

const initialState: cashBoxInterface = {
  loading: false,
  isDoneAuthenticated: false,
  cashBox: null,
  error: null,
}

export const asyncFetchCashBox = createAsyncThunk('cashBox/fetchCashBox', async (id: string) => {
  const response = await fetchCashBox(id)

  if (response?.status === 200) {
    console.log('cashbox => ', await response.json())
    return await response.json()
  }
  const errMsg = await response?.json()
  return isRejected(errMsg || 'Somethings gone wrong with the server , please contact creator')
})

export const cashBoxSlice = createSlice({
  name: 'cashBox',
  initialState,
  reducers: {},
  extraReducers: {
    [asyncFetchCashBox.pending.type]: (state) => {
      state.loading = true
      state.error = null
    },
    [asyncFetchCashBox.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.loading = false
      state.cashBox = action.payload
    },
    [asyncFetchCashBox.rejected.type]: (state, action: PayloadAction<any, string, any, any>) => {
      state.loading = false
      state.error = action?.error?.message as string
    },
  },
})

export default cashBoxSlice.reducer
