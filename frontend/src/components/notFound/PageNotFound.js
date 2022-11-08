import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function PageNotFound() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
            <Typography align='center' variant='h4' style={{ marginBottom: '2rem' }}>Error: 404 😐</Typography>
            <Typography align='center' variant='h6' style={{ marginBottom: '2rem' }}>The page you're looking for doesn't exist</Typography>
            <Button variant='contained' style={{ marginBottom: '6rem' }}><Link to='/' style={{ color: 'white', textDecoration: 'none' }}>Back to Home</Link></Button>
        </Box>
    )
}

export default PageNotFound