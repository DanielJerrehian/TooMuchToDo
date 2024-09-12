import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPublic, axiosPrivate } from '../../api/axios';

const initialState = {
    status: 'idle',
    user: { firstName: '', lastName: '', profilePicture: null },
    showPassword: false,
    forgotPasswordEmail: '',
    forgotPasswordValidationError: false,
    alert: null,
    profileUpdated: false,
    registrationValidationError: { email: false, password: false },
    loginValidationError: { email: false, password: false },
    persistLogin: (JSON.parse(localStorage.getItem('persistLogin')) || false),
    darkMode: (JSON.parse(localStorage.getItem('darkMode')) || false),
}

export const registerUser = createAsyncThunk('user/registerUser', async (registrationData, { rejectWithValue }) => {
    try {
        const response = await axiosPublic.post('/register', registrationData);
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const loginUser = createAsyncThunk('user/loginUser', async (loginData, { rejectWithValue }) => {
    try {
        const response = await axiosPublic.post('/login', loginData);
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const updateProfile = createAsyncThunk('user/updateProfile', async ({ firebaseUid, updatedProfileData }, { rejectWithValue }) => {
    try {
        const response = await axiosPrivate.put(`/update-profile/${firebaseUid}`, updatedProfileData, { headers: { 'Content-Type': 'multipart/form-data' } })
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const fetchUser = createAsyncThunk('user/fetchUser', async (firebaseUid) => {
    const response = await axiosPrivate.get(`/user/${firebaseUid}`)
    return response.data
})

export const refreshIdToken = createAsyncThunk('user/refreshIdToken', async () => {
    const response = await axiosPrivate.get('/refresh-token');
    return response.data
})

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
    const response = await axiosPrivate.get('/logout');
    return response.data
})

export const deleteUser = createAsyncThunk('user/deleteProfile', async (firebaseUid) => {
    const response = await axiosPrivate.delete(`/delete-user/${firebaseUid}`)
    return response.data
})

export const resetPassword = createAsyncThunk('user/resetPassword', async (email, { rejectWithValue }) => {
    try {
        const response = await axiosPublic.get(`/reset-password/${email}`)
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAlert: (state, action) => {
            state.alert = action.payload
        },
        setShowPassword: (state, action) => {
            state.showPassword = action.payload
        },
        loginValidationError: (state, action) => {
            state.loginValidationError = {
                ...state.loginValidationError,
                ...action.payload
            }
        },
        forgotPasswordValidationError: (state, action) => {
            state.forgotPasswordValidationError = action.payload
        },
        registrationValidationError: (state, action) => {
            state.registrationValidationError = {
                ...state.registrationValidationError,
                ...action.payload
            }
        },
        setPersistLogin: (state, action) => {
            console.log("here")
            localStorage.setItem('persistLogin', action.payload)
            state.persistLogin = JSON.parse(localStorage.getItem('persistLogin'))
        },
        setDarkMode: (state, action) => {
            localStorage.setItem('darkMode', action.payload)
            state.darkMode = JSON.parse(localStorage.getItem('darkMode'))
        },
        setProfileUpdated: (state, action) => {
            state.profileUpdated = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
                state.alert = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.alert = { alert: action.payload.message, severity: 'error' };
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.alert = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.alert = null;
                state.status = 'succeeded';
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.alert = { alert: action.payload.message, severity: 'error' };
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user.user = action.payload.user
            })
            .addCase(updateProfile.pending, (state) => {
                state.status = 'loading';
                state.alert = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.alert = { alert: action.payload.message, severity: 'success' };
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.alert = { alert: action.payload.message, severity: 'error' };
            })
            .addCase(refreshIdToken.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(refreshIdToken.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = 'succeeded';
            })
            .addCase(refreshIdToken.rejected, (state) => {
                state.status = 'idle';
            })
            .addCase(logoutUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user.idToken = '';
                localStorage.removeItem('persistLogin');
                localStorage.removeItem('darkMode');
                state.persistLogin = (JSON.parse(localStorage.getItem('persistLogin')) || false)
                state.status = 'succeeded';
            })
            .addCase(deleteUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deleteUser.fulfilled, (state) => {
                localStorage.clear()
                state.user = { firstName: '', lastName: '', profilePicture: null }
                state.status = 'idle';
                state.showPassword = false;
                state.alert = null;
                state.registrationValidationError = { email: false, password: false }
                state.loginValidationError = { email: false, password: false }
            })
            .addCase(resetPassword.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.alert = { alert: action.payload.message, severity: 'success' };
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.status = 'failed';
                state.alert = { alert: action.payload.message, severity: 'error' };
            })
    }
})

export const {
    setAlert,
    setShowPassword,
    loginValidationError,
    registrationValidationError,
    setPersistLogin,
    setDarkMode,
    setUserProfilePicture,
    forgotPasswordValidationError,
    setProfileUpdated
} = userSlice.actions;

export const getUser = (state) => state.user;

export default userSlice.reducer;