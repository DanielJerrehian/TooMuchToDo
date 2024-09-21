import { createTheme } from '@mui/material/styles';

export const darkModeTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#aa00ff'
        }
    },
    components: {
        MuiAlert: {
            styleOverrides: {
                standardSuccess: {
                    backgroundColor: "rgb(30, 70, 32)",
                    color: "rgb(237, 247, 237)",
                },
                standardInfo: {
                    backgroundColor: "rgb(1, 67, 97)",
                    color: "rgb(229, 246, 253)",
                },
                standardWarning: {
                    backgroundColor: "rgb(102, 60, 0)",
                    color: "rgb(255, 244, 229)",
                },
                standardError: {
                    backgroundColor: "rgb(95, 33, 32)",
                    color: "rgb(253, 237, 237)",
                },
            }
        },
    }
});

export const lightModeTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#aa00ff',
        }
    },
    components: {
        MuiAlert: {
            styleOverrides: {
                standardSuccess: {
                    backgroundColor: "rgb(237, 247, 237)",
                    color: "rgb(30, 70, 32)",
                },
                standardInfo: {
                    backgroundColor: "rgb(229, 246, 253)",
                    color: "rgb(1, 67, 97)",
                },
                standardWarning: {
                    backgroundColor: "rgb(255, 244, 229)",
                    color: "rgb(102, 60, 0)",
                },
                standardError: {
                    backgroundColor: "rgb(253, 237, 237)",
                    color: "rgb(95, 33, 32)",
                },
            }
        },
    }
});





