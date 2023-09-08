import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { carRequest, carState } from './types'
import { addCar, deleteCar, fetchAllCars } from '@/api/cars/action'

const initialState: carState = {
  loading: false,
  isDoneLoading: false,
  cars: null,
  error: null,
}

export const asyncFetchAllCars = createAsyncThunk('cars/asyncFetchAllCars', async (companyId: string) => {
  const response: any = await fetchAllCars(companyId)
  if (response) {
    return response
  }
})

export const asyncDeleteCar = createAsyncThunk('cars/deleteCar', async (selectedId: string) => {
  const result = await deleteCar(selectedId)
  if (result) {
    return result
  }
})

export const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: {
    [asyncFetchAllCars.pending.type]: (state) => {
      state.loading = true
      state.isDoneLoading = false
      state.error = null
    },
    [asyncFetchAllCars.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.loading = false
      state.isDoneLoading = true
      state.cars = action.payload
    },
    [asyncFetchAllCars.rejected.type]: (state, action: PayloadAction<any, string, any, any>) => {
      state.loading = false
      state.isDoneLoading = true
      state.error = action?.error?.message as string
    },
    [asyncDeleteCar.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.cars = state.cars?.filter((car) => car._id !== action.payload) || null
    },
    [asyncDeleteCar.rejected.type]: (state, action: PayloadAction<any, string, any, any>) => {
      state.error = action?.error?.message as string
    },
  },
})

export default carSlice.reducer
