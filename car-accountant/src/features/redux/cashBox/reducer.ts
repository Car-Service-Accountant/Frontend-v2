import { createAsyncThunk, createSlice, isRejected, PayloadAction } from '@reduxjs/toolkit'
import { fetchCashBox, updateCashBox } from '@/api/cashBox/actipon'
import { cashBoxInterface, cashBoxType } from './types'

const initialState: cashBoxInterface = {
  loading: false,
  isDoneAuthenticated: false,
  upToDate: true,
  isRejected: false,
  cashBox: null,
  error: null,
}

export const asyncFetchCashBox = createAsyncThunk('cashBox/fetchCashBox', async (id: string) => {
  const response = await fetchCashBox(id)

  if (response?.status == 200) {
    const result = await response.json()
    return result
  }
  const errMsg = await response?.json()
  return isRejected(errMsg || 'Somethings gone wrong with the server , please contact creator')
})

export const asyncUpdateCashBox = createAsyncThunk(
  'cashbox/updateCashBox',
  async ({ cashboxID, data }: { cashboxID: string; data: cashBoxType }) => {
    const response = await updateCashBox(cashboxID, data)

    if (response.status === 200) {
      const result = await response.json()
      return result
    }
    const errMsg = await response?.json()
    return isRejected(errMsg || 'Somethings gone wrong with the server , please contact creator')
  },
)

export const cashBoxSlice = createSlice({
  name: 'cashBox',
  initialState,
  reducers: {},
  extraReducers: {
    [asyncFetchCashBox.pending.type]: (state) => {
      state.loading = true
      state.upToDate = false
      state.error = null
    },
    [asyncFetchCashBox.fulfilled.type]: (state, action: PayloadAction<cashBoxType>) => {
      state.loading = false
      state.upToDate = true
      state.isRejected = false
      state.cashBox = action.payload
    },
    [asyncFetchCashBox.rejected.type]: (state, action: PayloadAction<cashBoxType, string, any, any>) => {
      state.loading = false
      state.upToDate = false
      state.isRejected = true
      state.error = action?.error?.message as string
    },

    [asyncUpdateCashBox.pending.type]: (state) => {
      state.loading = true
      state.upToDate = false
      state.error = null
    },
    [asyncUpdateCashBox.fulfilled.type]: (state, action: PayloadAction<cashBoxType>) => {
      state.loading = false
      state.upToDate = true
      state.isRejected = false
      state.cashBox = action.payload
    },
    [asyncUpdateCashBox.rejected.type]: (state, action: PayloadAction<cashBoxType, string, any, any>) => {
      state.loading = false
      state.upToDate = false
      state.isRejected = true
      state.error = action?.error?.message as string
    },
  },
})

export default cashBoxSlice.reducer
