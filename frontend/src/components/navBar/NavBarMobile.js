import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import SettingsIcon from '@mui/icons-material/Settings';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuList from '@mui/material/MenuList';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

import { logoutUser } from '../../features/user/userSlice';
import { setDarkMode } from '../../features/user/userSlice';


function NavBarMobile(props) {
    const { user, dispatch, navigate, handleNavigate, breakPointMedium } = props;
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        dispatch(logoutUser())
            .unwrap()
            .then(() => {
                navigate('/')
                setAnchorEl(null)
            })
            .catch(err => {
                console.log(err)
            });
    }

    useEffect(() => {
        setAnchorEl(null);
    }, [breakPointMedium])

    return (
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Tooltip title='Open Settings'>
                <IconButton
                    size="large"
                    onClick={handleOpen}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
            </Tooltip>
            {
                user?.user?.idToken
                    ? (
                        <Popper
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            role={undefined}
                            placement='bottom-start'
                            transition
                        >
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{
                                        transformOrigin:
                                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                                    }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                                            <MenuList
                                                onClose={() => setAnchorEl(null)}
                                            >
                                                <MenuItem onClick={() => handleNavigate('home')}>
                                                    <TaskAltIcon />
                                                    <Typography
                                                        textAlign='center'
                                                        sx={{ marginLeft: 2, fontSize: '.9rem' }}
                                                    >
                                                        My To-Do List
                                                    </Typography>
                                                </MenuItem>
                                                <MenuItem onClick={() => handleNavigate('about')}>
                                                    <InfoIcon />
                                                    <Typography
                                                        textAlign='center'
                                                        sx={{ marginLeft: 2, fontSize: '.9rem' }}
                                                    >
                                                        About
                                                    </Typography>
                                                </MenuItem>
                                                < MenuItem
                                                    onClick={() => handleNavigate('profile')}
                                                >
                                                    <SettingsIcon />
                                                    <Typography
                                                        textAlign='center'
                                                        sx={{ marginLeft: 2, fontSize: '.9rem' }}
                                                    >
                                                        My Profile
                                                    </Typography>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => { dispatch(setDarkMode(!user?.darkMode)) }}
                                                >
                                                    {
                                                        user?.darkMode
                                                            ? <Brightness7Icon />
                                                            : <Brightness4Icon />
                                                    }
                                                    <Typography
                                                        textAlign='center'
                                                        sx={{ marginLeft: 2, fontSize: '.9rem' }}
                                                    >
                                                        {
                                                            user?.darkMode
                                                                ? 'Light'
                                                                : 'Dark'
                                                        } Mode
                                                    </Typography>
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => handleLogout()}
                                                >
                                                    <LogoutIcon />
                                                    <Typography
                                                        textAlign='center'
                                                        sx={{ marginLeft: 2, fontSize: '.9rem' }}
                                                    >
                                                        Logout
                                                    </Typography>
                                                </MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    )
                    : (
                        <Popper
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            role={undefined}
                            placement='bottom-start'
                            transition
                        >
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{
                                        transformOrigin:
                                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                                    }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                                            <MenuList
                                                onClose={() => setAnchorEl(null)}
                                            >
                                                <MenuItem onClick={() => handleNavigate('about')}>
                                                    <InfoIcon />
                                                    <Typography
                                                        textAlign='center'
                                                        sx={{ marginLeft: 2, fontSize: '.9rem' }}
                                                    >
                                                        About
                                                    </Typography>
                                                </MenuItem>
                                                <MenuItem onClick={() => handleNavigate('login')}>
                                                    <LoginIcon />
                                                    <Typography
                                                        textAlign='center'
                                                        sx={{ marginLeft: 2, fontSize: '.9rem' }}
                                                    >
                                                        Login
                                                    </Typography>
                                                </MenuItem>
                                                <MenuItem onClick={() => handleNavigate('register')}>
                                                    <AppRegistrationIcon />
                                                    <Typography
                                                        textAlign='center'
                                                        sx={{ marginLeft: 2, fontSize: '.9rem' }}
                                                    >
                                                        Sign Up
                                                    </Typography>
                                                </MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    )
            }
        </Box >
    )
}

export default NavBarMobile