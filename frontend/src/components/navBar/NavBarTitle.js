import React from 'react';
import { Link } from 'react-router-dom';

import Typography from '@mui/material/Typography';

function NavBarTitle(props) {
    const { user, mediaQuery } = props;
    return (
        <Link
            to={user?.user?.idToken ? '/home' : '/'}
            style={{ textDecoration: 'none' }}
        >
            <Typography
                variant='h6'
                component='div'
                sx={{ color: 'white' }}
                fontSize={mediaQuery ? 24 : 18}
            >
                Too Much To Do
            </Typography>
        </Link>
    )
}

export default NavBarTitle