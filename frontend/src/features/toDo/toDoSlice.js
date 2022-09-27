import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../api/axios';

const initialState = {
    toDos: [],
    filterBy: { deleted: false },
    orderBy: { timestamp: "asc" },
    sorting: 'oldest',
    status: 'idle',
    activeMenuTab: 0,
}

export const getToDos = createAsyncThunk('toDo/getToDos', async ({ user, filterBy, orderBy }) => {
    const response = await axiosPrivate.get(`/to-dos/${user?.user?.user?.firebaseUid}?filterBy=${JSON.stringify(filterBy)}&orderBy=${JSON.stringify(orderBy)}`);
    return response.data
})

export const addToDo = createAsyncThunk('toDo/addToDo', async ({ user, newToDo }) => {
    const response = await axiosPrivate.post('/to-dos/new', { userId: user?.user?.user?.id, firebaseUid: user?.user?.user?.firebaseUid, task: newToDo?.task })
    return response.data
})

export const updateToDo = createAsyncThunk('toDo/updateToDo', async ({ user, toDoId, updateAttributes }) => {
    const response = await axiosPrivate.put('/to-dos/update', { userId: user?.user?.user?.id, firebaseUid: user?.user?.user?.firebaseUid, toDoId: toDoId, updateAttributes })
    return response.data
})

export const toDosSlice = createSlice({
    name: 'toDos',
    initialState,
    reducers: {
        setToDosState: (state, action) => {
            state.status = action.payload
        },
        changeActiveMenuTab: (state, action) => {
            state.activeMenuTab = action.payload
            if ((state.sorting === 'completed' || state.sorting === 'notCompleted') && state.activeMenuTab !== 0) {
                state.sorting = 'oldest'
            }
        },
        updateFilterBy: (state, action) => {
            state.filterBy = action.payload
        },
        changeSortingMenuItem: (state, action) => {
            state.sorting = action.payload
        },
        updateOrderBy: (state, action) => {
            state.orderBy = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getToDos.fulfilled, (state, action) => {
                action.payload?.toDos.map(toDo => {
                    toDo.loading = false;
                    return toDo;
                })
                state.toDos = action.payload?.toDos
                state.status = 'succeeded'
            })
            .addCase(addToDo.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(addToDo.fulfilled, (state) => {
                state.status = 'succeeded'
            })
            .addCase(updateToDo.pending, (state, action) => {
                state.toDos.map(toDo => {
                    if (toDo?.id === action.meta.arg.toDoId) {
                        toDo.loading = true;
                        toDo.updateAttribute = Object.keys(action.meta.arg.updateAttributes)[0];
                        return toDo;
                    }
                    return null;
                })
            })
            .addCase(updateToDo.fulfilled, (state, action) => {
                state.toDos.map(toDo => {
                    if (toDo?.id === action.meta.arg.toDoId) {
                        toDo.loading = false;
                        return toDo;
                    }
                    return null;
                })
            })

    }
})

export const { setToDosState, changeActiveMenuTab, updateFilterBy, changeSortingMenuItem, updateOrderBy } = toDosSlice.actions;

export const selectToDos = (state) => state.toDos;

export default toDosSlice.reducer;