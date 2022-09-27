import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { getStats, fetchStats } from '../../../features/stats/statsSlice';
import Top from './Top';
import Middle from './Middle';
import Bottom from './Bottom';

function LandingPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const stats = useSelector(getStats);
    const mediaQuery = useMediaQuery('(min-width:600px)');

    useEffect(() => {
        dispatch(fetchStats());
    }, [])

    return (
        <Box>
            <Box
                sx={{ marginTop: 5 }}
            >
                <Top mediaQuery={mediaQuery} navigate={navigate} />
            </Box>
            <Divider sx={{ marginTop: 5 }} />
            <Box
                sx={{ marginTop: 5 }}
            >
                <Middle />
            </Box>
            <Divider sx={{ marginTop: 5 }} />
            <Box
                sx={{ marginTop: 5 }}
            >
                <Bottom stats={stats} />
            </Box>
        </Box >
    )
}

export default LandingPage