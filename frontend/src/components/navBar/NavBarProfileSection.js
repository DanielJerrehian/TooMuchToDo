import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuList from '@mui/material/MenuList';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';

import { logoutUser } from '../../features/user/userSlice';
import { setDarkMode } from '../../features/user/userSlice';

function NavBarProfileSection(props) {
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
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open Settings'>
                <IconButton onClick={handleOpen} color='inherit'>
                    <Avatar src={user?.user?.user?.profilePicture} />
                </IconButton>
            </Tooltip>
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
                                    <MenuItem
                                        onClick={() => handleNavigate('profile')}
                                    >
                                        <SettingsIcon />
                                        <Typography
                                            textAlign='center'
                                            sx={{ marginLeft: 2 }}
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
                                            sx={{ marginLeft: 2 }}
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
                                            sx={{ marginLeft: 2 }}
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
        </Box>
    )
}

export default NavBarProfileSection