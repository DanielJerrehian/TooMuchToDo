import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPublic } from '../../api/axios';

const initialState = {
    stats: { 'totalUsers': null, 'totalToDos': null, 'totalCompletedToDos': null },
    status: null
}

export const fetchStats = createAsyncThunk('statsSlice/fetchStats', async () => {
    const response = await axiosPublic.get('/site-statistics');
    return response.data;
})

export const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchStats.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchStats.fulfilled, (state, action) => {
                state.stats = action.payload.stats;
                state.status = 'success';
            })
            .addCase(fetchStats.rejected, (state) => {
                state.stats.totalUsers = 'Hundreds of'
                state.stats.totalToDos = 'Over 10,000'
                state.stats.totalCompletedToDos = 'Over 5,000'
                state.status = 'failed';
            })
    }
})

export const { setStatus } = statsSlice.actions;

export const getStats = (state) => state.stats;

export default statsSlice.reducer;