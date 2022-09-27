import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { forgotPasswordValidationError, resetPassword } from '../../features/user/userSlice';

function PrivacyPolicyModal(props) {
    const dispatch = useDispatch();
    const { user, loginData, setLoginData, forgotPasswordModal, setForgotPasswordModal } = props;
    const [forgotPasswordModalData, setForgotPasswordModalData] = useState({ email: '' })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForgotPasswordModalData(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    };

    const handleSubmit = () => {
        !forgotPasswordModalData?.email && dispatch(forgotPasswordValidationError(true));
        if (forgotPasswordModalData?.email) {
            dispatch(resetPassword(forgotPasswordModalData?.email))
                .unwrap()
                .then(() => {
                    setForgotPasswordModalData({ email: '' })
                    setLoginData({ email: loginData?.email, password: '' })
                    dispatch(setForgotPasswordModal(false))
                })
                .catch(err => {
                    console.log(err)
                });
        }
    }

    return (
        <Modal
            open={forgotPasswordModal}
            onClose={() => dispatch(setForgotPasswordModal(false))}
        >
            <Box sx={{
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
            }}>
                <Box display='flex' alignitems='center' flexDirection='column'>
                    <Stack spacing={2}>
                        <Typography variant='h6' align='center'>
                            Reset Password
                        </Typography>
                        <Typography variant='p' align='center'>
                            Enter your E-Mail below to receive a link to reset your password:
                        </Typography>
                        <TextField
                            label='E-Mail'
                            variant='outlined'
                            name='email'
                            type='text'
                            value={forgotPasswordModalData?.email}
                            onChange={handleChange}
                            error={user?.forgotPasswordValidationError}
                            helperText={user.forgotPasswordValidationError ? "Enter an E-Mail" : null}
                        />
                        <Button
                            variant='contained'
                            type='submit'
                            onClick={handleSubmit}
                            disabled={user?.status === 'loading' ? true : false}
                        >
                            Reset Password
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    )
}

export default PrivacyPolicyModal