import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import { getUser } from '../../features/user/userSlice';
import NavBarTitle from './NavBarTitle';
import NavBarDesktop from './NavBarDesktop';
import NavBarMobile from './NavBarMobile';

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(getUser);
    const mediaQuery = useMediaQuery('(min-width:600px)');
    const breakPointMedium = useMediaQuery('(min-width:900px)');

    const handleNavigate = (route) => {
        navigate(`/${route}`)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}>
                        <NavBarTitle user={user} mediaQuery={mediaQuery} />
                    </Box>
                    <NavBarDesktop user={user} dispatch={dispatch} navigate={navigate} handleNavigate={handleNavigate} mediaQuery={mediaQuery} breakPointMedium={breakPointMedium} />
                    <NavBarMobile user={user} dispatch={dispatch} navigate={navigate} handleNavigate={handleNavigate} breakPointMedium={breakPointMedium} />
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavBar