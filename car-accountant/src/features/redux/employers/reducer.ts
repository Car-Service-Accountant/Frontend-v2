import { createAsyncThunk, createSlice, isRejected, PayloadAction } from '@reduxjs/toolkit'
import { employersSlice, employerTypeRequest } from './types'
import { addEmployer, deleteEmployer, fetchAlLEmployers } from '@/api/employers/action'

const initialState: employersSlice = {
  loading: false,
  isDoneLoading: false,
  isRejected: false,
  employers: null,
  error: null,
}

export const asyncFetchAllEmployers = createAsyncThunk(
  'employers/asyncFetchAllEmployers',
  async (companyID: string) => {
    const response = await fetchAlLEmployers(companyID)
    if (response?.status === 200) {
      return response.json()
    }
    const errMsg = await response?.json()
    return isRejected(errMsg || 'Somethings gone wrong with the server , please contact creator')
  },
)

export const asyncDeleteEmployer = createAsyncThunk('employers/deleteEmployer', async (companyID: string) => {
  const response = await deleteEmployer(companyID)
  if (response?.status === 200) {
    return response.json()
  }
  const errMsg = await response?.json()
  return isRejected(errMsg || 'Somethings gone wrong with the server , please contact creator')
})

export const asyncAddEmployers = createAsyncThunk('employers/asyncAddEmployers', async (data: employerTypeRequest) => {
  const response = await addEmployer(data)
  if (response?.status === 200) {
    return response.json()
  }
  const errMsg = await response?.json()
  return isRejected(errMsg || 'Somethings gone wrong with the server , please contact creator')
})

export const employerSlice = createSlice({
  name: 'employers',
  initialState,
  reducers: {},
  extraReducers: {
    [asyncFetchAllEmployers.pending.type]: (state) => {
      state.loading = true
      state.isDoneLoading = false
      state.error = null
    },
    [asyncFetchAllEmployers.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.loading = false
      state.isDoneLoading = true
      state.isRejected = false
      state.employers = action.payload
    },
    [asyncFetchAllEmployers.rejected.type]: (state, action: PayloadAction<any, string, any, any>) => {
      state.loading = false
      state.isDoneLoading = true
      state.isRejected = true
      state.error = action?.error?.message as string
    },
    [asyncDeleteEmployer.pending.type]: (state) => {
      state.loading = true
      state.isDoneLoading = false
      state.error = null
    },
    [asyncDeleteEmployer.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.loading = false
      state.isDoneLoading = true
      state.isRejected = false
      state.employers = state.employers?.filter((emp) => emp._id !== action.payload) || null
    },
    [asyncDeleteEmployer.rejected.type]: (state, action: PayloadAction<any, string, any, any>) => {
      state.loading = false
      state.isDoneLoading = true
      state.isRejected = true
      state.error = action?.error?.message as string
    },
    [asyncAddEmployers.pending.type]: (state) => {
      state.loading = true
      state.isDoneLoading = false
      state.error = null
    },
    [asyncAddEmployers.fulfilled.type]: (state) => {
      state.loading = false
      state.isDoneLoading = true
      state.isRejected = false
    },
    [asyncAddEmployers.rejected.type]: (state, action: PayloadAction<any, string, any, any>) => {
      state.loading = false
      state.isDoneLoading = true
      state.isRejected = true
      state.error = action?.error?.message as string
    },
  },
})

export default employerSlice.reducer
