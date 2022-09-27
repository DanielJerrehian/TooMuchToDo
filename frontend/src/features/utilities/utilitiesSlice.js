import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    privacyModal: false,
    forgotPasswordModal: false
}

export const utilitiesSlice = createSlice({
    name: 'utilities',
    initialState,
    reducers: {
        setPrivacyModal: (state, action) => {
            state.privacyModal = action.payload
        },
        setForgotPasswordModal: (state, action) => {
            state.forgotPasswordModal = action.payload
        }
    },
})

export const { setPrivacyModal, setForgotPasswordModal } = utilitiesSlice.actions;

export const getUtilities = (state) => state.utilities;

export default utilitiesSlice.reducer;