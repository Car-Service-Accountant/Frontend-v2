import { createAsyncThunk, createSlice, isRejected, PayloadAction } from '@reduxjs/toolkit'
import { payedRepairData, repairRequest, repairState } from './types'
import { fetchAllRepairs, payRepair, sendRepair } from '@/api/repairs/action'

const initialState: repairState = {
  loading: false,
  isDoneLoading: false,
  isRejected: false,
  repairs: null,
  error: null,
}

export const asyncFetchAllRepairs = createAsyncThunk('repairs/asyncFetchAllRepairs', async (companyId: string) => {
  const response = await fetchAllRepairs(companyId)

  if (response) {
    return response
  }
})

export const asyncSetRepair = createAsyncThunk(
  'repairs/asyncSetRepair',
  async ({ carId, data }: { carId: string; data: repairRequest }) => {
    const response = await sendRepair({ carId, data })

    if (response.status === 200) {
      return response.json()
    }
    const errMsg = await response.json()
    return isRejected(errMsg)
  },
)

export const asyncPayRepair = createAsyncThunk(
  'repairs/asyncPayRepair',
  async ({ repID, data }: { repID: string; data: payedRepairData }) => {
    const response = await payRepair({ repID, data })
    console.log('response =>', response)

    if (response.status === 200) {
      return response.json()
    }
    const errMsg = await response.json()
    return isRejected(errMsg)
  },
)

export const repairSlice = createSlice({
  name: 'repairs',
  initialState,
  reducers: {},
  extraReducers: {
    [asyncFetchAllRepairs.pending.type]: (state) => {
      state.loading = true
      state.isDoneLoading = false
      state.error = null
    },
    [asyncFetchAllRepairs.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.loading = false
      state.isDoneLoading = true
      state.isRejected = false
      state.repairs = action.payload
    },
    [asyncFetchAllRepairs.rejected.type]: (state, action: PayloadAction<any, string, any, any>) => {
      state.loading = false
      state.isDoneLoading = true
      state.isRejected = true
      state.error = action?.error?.message as string
    },
    [asyncSetRepair.fulfilled.type]: (state) => {
      state.loading = false
      state.isDoneLoading = true
      state.isRejected = false
      state.error = null
    },
    [asyncSetRepair.rejected.type]: (state) => {
      state.loading = false
      state.isDoneLoading = true
      state.isRejected = true
      state.error = 'Something gone wrong with request'
    },
    [asyncPayRepair.fulfilled.type]: (state) => {
      state.loading = false
      state.isDoneLoading = true
      state.isRejected = false
      state.error = null
    },
    [asyncPayRepair.rejected.type]: (state) => {
      state.loading = false
      state.isDoneLoading = true
      state.isRejected = true
      state.error = 'Something gone wrong with request'
    },
  },
})

export default repairSlice.reducer
