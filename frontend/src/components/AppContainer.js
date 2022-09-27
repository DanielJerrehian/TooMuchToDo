import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import App from '../App';
import NavBar from '../components/navBar/NavBar';
import Footer from './footer/Footer';
import { darkModeTheme, lightModeTheme } from '../utils/theme';
import { getUser } from '../features/user/userSlice';
import ScrollToTop from '../hooks/ScrollToTop';

function AppContainer() {
    const user = useSelector(getUser);

    return (
        <ThemeProvider theme={user?.darkMode ? darkModeTheme : lightModeTheme}>
            <CssBaseline />
            <NavBar />
            <ScrollToTop />
            <App />
            <Footer />
        </ThemeProvider>
    )
}

export default AppContainer