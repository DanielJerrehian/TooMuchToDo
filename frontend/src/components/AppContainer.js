import React from 'react'
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import App from '../App';
import NavBar from '../components/navBar/NavBar';
import Footer from './footer/Footer';
import { darkModeTheme, lightModeTheme } from '../utils/theme';
import { getUser } from '../features/user/userSlice';
import ScrollToTop from '../hooks/ScrollToTop';
import AlertUser from './alert/AlertUser';

function AppContainer() {
    const user = useSelector(getUser);

    return (
        <ThemeProvider theme={user?.darkMode ? darkModeTheme : lightModeTheme}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <Box sx={{ flex: 1, marginBottom: 15 }}>
                    <CssBaseline />
                    <NavBar />
                    {user?.alert && <AlertUser alert={user?.alert} />}
                    <ScrollToTop />
                    <App />
                </Box>
                <Footer />
            </Box>
        </ThemeProvider>
    )
}

export default AppContainer