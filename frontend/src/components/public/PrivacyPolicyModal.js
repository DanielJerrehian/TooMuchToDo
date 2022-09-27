import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import { getUser } from '../../features/user/userSlice';


function PrivacyPolicyModal(props) {
    const dispatch = useDispatch();
    const { privacyModal, setPrivacyModal } = props;
    const user = useSelector(getUser);

    return (
        <Modal
            open={privacyModal}
            onClose={() => dispatch(setPrivacyModal(false))}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '70%',
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    backgroundImage: user?.darkMode ? 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))' : null
                }}
            >
                <Box display='flex' alignitems='center' flexDirection='column'>
                    <Stack spacing={2}>
                        <Typography variant='h6' align='center'>
                            Privacy & Consent
                        </Typography>
                        <Typography align='center'>
                            By using <span style={{ textDecoration: 'underline', textDecorationColor: '#aa00ff', textUnderlineOffset: 3 }}>toomuchtodo.app</span>, you hereby consent to it's Privacy Policy and agree to it's terms.
                            If you have additional questions or require more information about the Privacy Policy, please do not hesitate to reach out:
                        </Typography>
                        <Typography align='center' sx={{ textDecoration: 'underline', textDecorationColor: '#aa00ff', textUnderlineOffset: 3 }}>
                            toomuchtodoapp@gmail.com
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    )
}

export default PrivacyPolicyModal