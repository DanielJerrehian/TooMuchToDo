import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CategoryIcon from '@mui/icons-material/Category';
import ContrastIcon from '@mui/icons-material/Contrast';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';


function UpperMiddleIconsMedium() {
    return (
        <>
            <Box
                component={Grid}
                item
                md={4}
                display={{ xs: 'none', md: 'flex' }}
                alignItems='center'
                flexDirection='column'
                justifyContent='center'
            >
                <CategoryIcon sx={{ fontSize: '4rem' }} />
            </Box>
            <Box
                component={Grid}
                item
                md={4}
                display={{ xs: 'none', md: 'flex' }}
                alignItems='center'
                flexDirection='column'
                justifyContent='center'
            >
                <MobileFriendlyIcon sx={{ fontSize: '4rem' }} />
            </Box>
            <Box
                component={Grid}
                item
                md={4}
                display={{ xs: 'none', md: 'flex' }}
                alignItems='center'
                flexDirection='column'
                justifyContent='center'
            >
                <ContrastIcon sx={{ fontSize: '4rem' }} />
            </Box>
            <Box
                component={Grid}
                item
                md={4}
                display={{ xs: 'none', md: 'flex' }}
                alignItems='center'
                flexDirection='column'
                justifyContent='center'
            >
                <Typography sx={{ fontSize: '1.75rem', }}>
                    Made Simple
                </Typography>
            </Box>
            <Box
                component={Grid}
                item
                md={4}
                display={{ xs: 'none', md: 'flex' }}
                alignItems='center'
                flexDirection='column'
                justifyContent='center'
            >
                <Typography sx={{ fontSize: '1.75rem' }}>
                    Mobile Friendly
                </Typography>
            </Box>
            <Box
                component={Grid}
                item
                md={4}
                display={{ xs: 'none', md: 'flex' }}
                alignItems='center'
                flexDirection='column'
                justifyContent='center'
            >
                <Typography sx={{ fontSize: '1.75rem' }}>
                    Light & Dark Mode
                </Typography>
            </Box>
            <Box
                component={Grid}
                item
                md={4}
                display={{ xs: 'none', md: 'block' }}
            >
                <Typography sx={{ fontSize: '1rem' }} color="text.secondary" align='center'>
                    <span style={{ textDecoration: 'underline', textDecorationColor: '#aa00ff', textUnderlineOffset: 3 }}>toomuchtodo.app</span> was built with user experience in mind - simple layouts and easy to use features, with 100% privacy
                </Typography>
            </Box>
            <Box
                component={Grid}
                item
                md={4}
                display={{ xs: 'none', md: 'block' }}
            >
                <Typography sx={{ fontSize: '1rem' }} color="text.secondary" align='center'>
                    Designed with all types of users in mind, the site works seemlessly on all devices, whether computer, tablet, or mobile phone.
                </Typography>
            </Box>
            <Box
                component={Grid}
                item
                md={4}
                display={{ xs: 'none', md: 'flex' }}
            >
                <Typography sx={{ fontSize: '1rem' }} color="text.secondary" align='center'>
                    Easily switch between different colorways throughout the day with one simple click. Your preferences are even saved for your next visit.
                </Typography>
            </Box>
        </>
    )
}

export default UpperMiddleIconsMedium 