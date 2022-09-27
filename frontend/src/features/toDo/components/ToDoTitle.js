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
            fontSize={mediaQuery ? '3.75rem' : '2.5rem'}
            sx={{marginBottom: 5}}
        >
            My To-Do List
        </Typography>
    )
}

export default ToDoTitle