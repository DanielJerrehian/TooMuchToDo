import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { getUser } from '../../features/user/userSlice';
import { getUtilities, setPrivacyModal } from '../../features/utilities/utilitiesSlice';
import PrivacyPolicyModal from '../public/PrivacyPolicyModal';

function Footer() {
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const utilities = useSelector(getUtilities)

    return (
        <footer style={{ margin: 0, bottom: 0 }}>
            <Box
                bgcolor={user?.darkMode ? '#121212' : '#aa00ff'}
                color='white'
                px={{ xs: 3, sm: 5 }}
                py={{ xs: 3, sm: 5 }}
                sx={{ backgroundImage: user?.darkMode ? 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))' : null }}
            >
                <Grid container spacing={5}>
                    <Grid item xs={12} lg={4}>
                        <Stack spacing={1}>
                            <Box borderBottom={1} borderColor='white'>
                                <Typography>
                                    Mission
                                </Typography>
                            </Box>
                            <Box>
                                <Typography>
                                    <span
                                        style={{
                                            textDecoration: 'underline',
                                            textDecorationColor: user?.darkMode ? '#aa00ff' : 'white',
                                            textUnderlineOffset: 3
                                        }}
                                    >
                                        toomuchtodo.app
                                    </span> is a simple & easy to use web application that helps you keep track of your life. Simply sign up with your E-Mail and watch your productivity soar. Best of all, the website is completely free - and no, I don't sell your data.
                                </Typography>
                            </Box>
                        </ Stack>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Stack spacing={1}>
                            <Box borderBottom={1} borderColor='white'>
                                <Typography>
                                    Help
                                </Typography>
                            </Box>
                            <Typography>
                                <a href='mailto:contact@toomuchtodo.app' style={{ color: 'white', textDecoration: 'None' }}>
                                    Contact
                                </a>
                            </Typography>
                            <Typography>
                                <Link to='/about' style={{ color: 'white', textDecoration: 'None' }}>
                                    About
                                </Link>
                            </Typography>
                            <Typography onClick={() => dispatch(setPrivacyModal(!utilities.privacyModal))} sx={{ cursor: 'pointer' }}>
                                Privacy
                            </Typography>
                            <PrivacyPolicyModal privacyModal={utilities.privacyModal} setPrivacyModal={setPrivacyModal} />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Stack spacing={1}>
                            <Box borderBottom={1} borderColor='white'>
                                <Typography>
                                    Connect
                                </Typography>
                            </Box>
                            <Stack
                                direction='row'
                                spacing={1}
                                display='flex'
                                justifyContent='flex-start'
                            >
                                <a
                                    href='https://www.facebook.com/toomuchtodoapp/'
                                    target='_blank'
                                    rel="noreferrer"
                                    style={{ color: 'white' }}
                                >
                                    <FacebookIcon />
                                </a>
                                <a
                                    href='https://www.instagram.com/toomuchtodoapp/'
                                    target='_blank'
                                    rel="noreferrer"
                                    style={{ color: 'white' }}
                                >
                                    <InstagramIcon />
                                </a>
                                <a
                                    href='https://www.twitter.com/toomuchtodoapp'
                                    target='_blank'
                                    rel="noreferrer"
                                    style={{ color: 'white' }}
                                >
                                    <TwitterIcon />
                                </a>
                                <a
                                    href='https://www.buymeacoffee.com/toomuchtodoapp'
                                    target='_blank'
                                    rel="noreferrer"
                                    style={{ color: 'white' }}
                                >
                                    <AttachMoneyIcon />
                                </a>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
                <Box
                    textAlign='center'
                    pt={{ xs: 3, sm: 5 }}
                    style={{
                        textDecoration: 'underline',
                        textDecorationColor: user?.darkMode ? '#aa00ff' : 'white',
                        textUnderlineOffset: 3
                    }}
                >
                    toomuchtodo.app &reg; {new Date().getFullYear()}
                </Box>
            </Box>
        </footer>
    )
}

export default Footer