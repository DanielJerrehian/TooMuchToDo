import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { getUser, loginUser, setAlert, setShowPassword, loginValidationError, setPersistLogin } from '../../features/user/userSlice';
import { getUtilities } from '../../features/utilities/utilitiesSlice';
import { setForgotPasswordModal } from '../../features/utilities/utilitiesSlice';
import ForgotPasswordModal from '../public/ForgotPasswordModal';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(getUser)
    const utilities = useSelector(getUtilities)
    const [loginData, setLoginData] = useState({ email: '', password: '' })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!loginData?.email || !loginData?.password) {
            if (!loginData?.email) dispatch(loginValidationError({ email: true }));
            if (!loginData?.password) dispatch(loginValidationError({ password: true }));
            return;
        }
        dispatch(loginUser(loginData))
            .unwrap()
            .then(() => {
                navigate('/home');
                dispatch(setShowPassword(false));
                setLoginData({ email: '', password: '' });
                dispatch(setAlert({
                    alert: 'Logged in',
                    severity: 'success'
                }));
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        loginData?.email && dispatch(loginValidationError({ email: false }));
    }, [dispatch, loginData?.email]);

    useEffect(() => {
        loginData?.password && dispatch(loginValidationError({ password: false }));
    }, [dispatch, loginData?.password]);

    return (
        <Box sx={{ alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
            <Stack>
                <Typography align='center' variant='h4' style={{ marginBottom: '1rem' }}>Login</Typography>
                <FormGroup>
                    <Stack spacing={2}>
                        <Stack spacing={2}>
                            <TextField
                                label='E-Mail'
                                variant='outlined'
                                name='email'
                                type='text'
                                value={loginData.email}
                                onChange={handleChange}
                                error={user?.loginValidationError?.email}
                                helperText={user?.loginValidationError?.email ? "Enter an E-Mail" : null}
                            />
                            <TextField
                                label='Password'
                                variant='outlined'
                                name='password'
                                type={user.showPassword ? 'text' : 'password'}
                                value={loginData.password}
                                onChange={handleChange}
                                error={user?.loginValidationError?.password}
                                helperText={user?.loginValidationError?.password ? "Enter a password" : null}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => dispatch(setShowPassword(!user.showPassword))}
                                                edge="end"
                                            >
                                                {user.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Typography
                                variant='p'
                                onClick={() => dispatch(setForgotPasswordModal(true))}
                                sx={{ cursor: 'pointer', color: user?.darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)', textDecoration: 'underline', textDecorationColor: '#aa00ff', textUnderlineOffset: 3 }}
                            >
                                Forgot Your Password?
                            </Typography>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={(e) => {
                                            e.stopPropagation(); // Prevent checkbox from triggering form submission
                                            dispatch(setPersistLogin(!user?.persistLogin));
                                        }}
                                        checked={user?.persistLogin}
                                    />
                                }
                                label={
                                    <InputLabel
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(setPersistLogin(!user?.persistLogin));
                                        }}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        Remember Me
                                    </InputLabel>
                                }
                            />
                        </Stack>
                        <Button
                            variant='contained'
                            type='submit'
                            disabled={user?.status === 'loading' ? true : false}
                            onClick={handleSubmit}
                        >
                            Login
                        </Button>
                        <Stack spacing={1} direction='column' sx={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant='p' sx={{ color: user?.darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)' }}>Need an Account?</Typography>
                            <Typography variant='span'><Link to='/register' style={{ color: user?.darkMode ? 'white' : 'rgba(0, 0, 0, 0.6)' }}>Sign Up</Link></Typography>
                        </Stack>
                    </Stack>
                </FormGroup>
                <ForgotPasswordModal user={user} loginData={loginData} setLoginData={setLoginData} forgotPasswordModal={utilities.forgotPasswordModal} setForgotPasswordModal={setForgotPasswordModal} />
            </Stack>
        </Box>
    )
}

export default Login;
