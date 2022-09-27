import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import UpperMiddleIconsMedium from './UpperMiddleIconsMedium';
import UpperMiddleIconsExtraSmall from './UpperMiddleIconsExtraSmall';

function Middle() {
    return (
        <Grid
            container
            spacing={5}
            alignItems='center'
            justifyContent="center"
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
                        Track Your Progress
                    </Typography>
                    <Typography variant='h4' sx={{ fontSize: '1.75rem', fontWeight: 300, }} color="text.secondary" align='center' gutterBottom>
                        Create tasks on the fly and mark them as complete with the click of a button. Filter and sort your tasks in a variety of ways to see tasks from different perspectives.
                    </Typography>
                </Box>
            </Grid>
            <UpperMiddleIconsMedium />
            <UpperMiddleIconsExtraSmall />

        </Grid>
    )
}

export default Middle