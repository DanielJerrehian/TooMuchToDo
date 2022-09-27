import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import NavBarProfileSection from './NavBarProfileSection';

function NavBarDesktop(props) {
    const { user, dispatch, navigate, handleNavigate, mediaQuery, breakPointMedium } = props;

    return (
        <Box
            sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'row' }}
        >
            <Button
                onClick={() => handleNavigate('home')}
                sx={{ color: 'white' }}
            >
                My To-Do List
            </Button>
            <Button onClick={() => handleNavigate('about')} sx={{ color: 'white' }}>About</Button>
            {
                user?.user?.idToken
                    ? <NavBarProfileSection user={user} dispatch={dispatch} navigate={navigate} handleNavigate={handleNavigate} mediaQuery={mediaQuery} breakPointMedium={breakPointMedium} />
                    : <>
                        <Button onClick={() => handleNavigate('login')} sx={{ color: 'white' }}>Login</Button>
                        <Button
                            onClick={() => handleNavigate('register')}
                            sx={{
                                color: 'white',
                            }}
                        >
                            Sign Up
                        </Button>
                    </>
            }
        </Box>
    )
}

export default NavBarDesktop