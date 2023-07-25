import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { carState, } from './types';
import { fetchAllCars } from '@/api/cars/action';


const initialState: carState = {
    loading: false,
    isDoneLoading: false,
    cars: null,
    error: null,
};

export const asyncFetchAllCars = createAsyncThunk(
    'cars/asyncFetchAllCars',
    async (companyId: string) => {
        console.log("company id in async func");

        const response: any = await fetchAllCars(companyId);
        console.log("response in async func");

        if (response) {
            return response;
        }
    }
);


export const carSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {

    },
    extraReducers: {
        [asyncFetchAllCars.pending.type]: (state) => {
            state.loading = true;
            state.isDoneLoading = false;
            state.error = null;
        },
        [asyncFetchAllCars.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isDoneLoading = true;
            state.cars = action.payload;
        },
        [asyncFetchAllCars.rejected.type]: (state, action: PayloadAction<any, string, any, any>) => {
            state.loading = false;
            state.isDoneLoading = true;
            state.error = action?.error?.message as string;
        },
    },
});

export default carSlice.reducer;