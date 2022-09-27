import { configureStore } from '@reduxjs/toolkit';

import toDosReducer from '../features/toDo/toDoSlice';
import userReducer from '../features/user/userSlice';
import statsReducer from '../features/stats/statsSlice';
import utilitiesReducer from '../features/utilities/utilitiesSlice';

export const store = configureStore({
    reducer: {
        stats: statsReducer,
        toDos: toDosReducer,
        user: userReducer,
        utilities: utilitiesReducer
    },
});
