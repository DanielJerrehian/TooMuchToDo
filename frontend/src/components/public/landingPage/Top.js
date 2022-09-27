import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import SpaceshipVector from './SpaceshipVector';

function Top(props) {
    const { navigate, mediaQuery } = props;
    return (
        <Grid
            container
            spacing={5}
            justifyItems='center'
            alignItems='center'
        >
            <Grid
                item
                xs={12}
                md={6}
            >
                <Stack spacing={5}>
                    <Typography
                        variant='h1'
                        component='div'
                        align='center'
                        fontSize={mediaQuery ? '3.75rem' : '2.5rem'}
                    >
                        The best results start with a plan
                    </ Typography>
                    <Typography
                        variant='h2'
                        component='div'
                        align='center'
                        gutterBottom
                        fontSize={mediaQuery ? '1.75rem' : '1.25rem'}
                    >
                        A <span style={{ display: 'inline', fontWeight: 400, textDecoration: 'underline', textDecorationColor: '#aa00ff', textUnderlineOffset: 3 }}>free</span>, easy to use web application to help you keep track of your life.
                    </ Typography>
                    <Box
                        display='flex'
                        justifyContent='center'
                        columnGap={5}
                    >
                        <Button
                            onClick={() => navigate('/login')}
                            variant='contained'
                            sx={{ width: '40%' }}
                        >
                            Login
                        </Button>
                        <Button
                            onClick={() => navigate('/register')}
                            variant='contained'
                            sx={{ width: '40%' }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Stack>
            </Grid>
            <Grid
                item
                xs={12}
                md={6}
            >
                <Box
                    sx={{ width: '100%' }}
                >
                    <SpaceshipVector />
                </Box>
            </Grid>
        </Grid>
    )
}

export default Top

