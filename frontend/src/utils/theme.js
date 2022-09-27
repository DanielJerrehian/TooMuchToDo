import { createTheme } from '@mui/material/styles';

export const darkModeTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#aa00ff'
        }
    }
});

export const lightModeTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#aa00ff',
        }
    }
});

