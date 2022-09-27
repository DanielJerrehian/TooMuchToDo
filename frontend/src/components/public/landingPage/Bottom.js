import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import PeopleIcon from '@mui/icons-material/People';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import PersonWithClock from '../../../images/PersonWithClock.jpg'

function Bottom(props) {
    const { stats } = props;

    return (
        <Grid
            container
            spacing={5}
        >
            <Grid
                item
                xs={12}
            >
                <Box>
                    <Typography
                        variant='h3'
                        align='center'
                        component='div'
                        gutterBottom
                        sx={{ fontSize: '2.5rem', fontWeight: 300, textDecoration: 'underline', textDecorationColor: '#aa00ff', textUnderlineOffset: 3 }}
                    >
                        Take Control of Your Life
                    </Typography>
                    <Typography variant='h4' sx={{ fontSize: '1.75rem', fontWeight: 300, fontStyle: 'italic' }} color="text.secondary" align='center' gutterBottom>
                        “Only you can control your future.”
                    </Typography>
                    <Typography variant='h4' sx={{ fontSize: '1.25rem', fontWeight: 300, }} color="text.secondary" align='center' gutterBottom>
                        - Dr. Seuss
                    </Typography>
                </Box>

            </Grid>
            <Grid
                item
                xs={12}
                md={6}
            >
                <Stack
                    spacing={3}
                >
                    <Typography
                        variant='h3' sx={{ fontSize: '1.75rem', fontWeight: 400 }} align='center' component='div' gutterBottom
                    >
                        A powerful and flexible tool for everyone
                    </Typography>
                    <Typography
                        variant='h4' sx={{ fontSize: '1.5rem', fontWeight: 300, }} color="text.secondary" align='center' gutterBottom
                    >
                        Whether you're a student, working individual, or anywhere in-between, <span style={{ textDecoration: 'underline', textDecorationColor: '#aa00ff', textUnderlineOffset: 3 }}>toomuchtodo.app</span> helps you take control of your life and future, giving you more time to do what you love.
                    </Typography>
                    <Stack
                        spacing={3}
                    >
                        <Box
                            display='flex'
                            alignItems='center'
                            flexDirection='column'
                        >
                            <PeopleIcon sx={{ fontSize: '4rem' }} />
                            <Typography
                                color='primary'
                                sx={{ fontSize: '1.75rem', fontWeight: 300 }}
                            >
                                {stats?.stats?.totalUsers} 
                                {
                                    stats?.stats?.totalUsers === 1
                                        ? ' Total User'
                                        : ' Total Users'
                                }
                            </Typography>
                        </Box>
                        <Box
                            display='flex'
                            alignItems='center'
                            flexDirection='column'
                        >
                            <FormatListBulletedIcon sx={{ fontSize: '4rem' }} />
                            <Typography
                                sx={{ fontSize: '1.75rem', fontWeight: 300, }}
                                color='primary'
                            >   
                                {stats?.stats?.totalToDos}
                                {
                                    stats?.stats?.totalToDos === 1
                                    ? ' To-Do Made'
                                    : ' To-Dos Made'
                                }
                            </Typography>
                        </Box>
                        <Box
                            display='flex'
                            alignItems='center'
                            flexDirection='column'
                        >
                            <TaskAltIcon sx={{ fontSize: '4rem' }} />
                            <Typography
                                sx={{ fontSize: '1.75rem', fontWeight: 300, }}
                                color='primary'
                            >
                                {stats?.stats?.totalCompletedToDos}
                                {
                                    stats?.stats?.totalCompletedToDos === 1
                                    ? ' To-Do Completed'
                                    : ' To-Dos Completed'
                                }
                            </Typography>
                        </Box>
                    </Stack>

                </Stack>
            </Grid>
            <Grid
                item
                xs={12}
                md={6}
            >
                <img
                    src={PersonWithClock}
                    style={{ borderRadius: 10, height: 'auto', width: '100%' }}
                    alt='Person looking at a clock'
                />
            </Grid>
        </Grid>
    )
}

export default Bottom