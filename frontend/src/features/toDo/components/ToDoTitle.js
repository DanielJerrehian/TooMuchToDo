import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';

function ToDoTitle() {
    const mediaQuery = useMediaQuery('(min-width:600px)');

    return (
        <Typography
            variant='h1'
            component='div'
            align='center'
            gutterBottom
            fontSize={mediaQuery ? '3rem' : '2rem'}
        >
            My To-Do List
        </Typography>
    )
}

export default ToDoTitle