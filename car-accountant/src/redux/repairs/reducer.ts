import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { repairState, } from './types';
import { fetchAllRepairs } from '@/api/repairs/action';


const initialState: repairState = {
    loading: false,
    isDoneLoading: false,
    repairs: null,
    error: null,
};

export const asyncFetchAllRepairs = createAsyncThunk(
    'repairs/asyncFetchAllRepairs',
    async (companyId: string) => {
        const response: any = await fetchAllRepairs(companyId);

        if (response) {
            return response;
        }
    }
);


export const repairSlice = createSlice({
    name: 'repairs',
    initialState,
    reducers: {

    },
    extraReducers: {
        [asyncFetchAllRepairs.pending.type]: (state) => {
            state.loading = true;
            state.isDoneLoading = false;
            state.error = null;
        },
        [asyncFetchAllRepairs.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isDoneLoading = true;
            state.repairs = action.payload;
        },
        [asyncFetchAllRepairs.rejected.type]: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.isDoneLoading = true;
            state.error = action?.error?.message as string;
        },
    },
});

export default repairSlice.reducer;