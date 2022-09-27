import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
import { setForgotPasswordModal  } from '../../features/utilities/utilitiesSlice';
import AlertUser from '../alert/AlertUser';
import ForgotPasswordModal from '../public/ForgotPasswordModal';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(getUser)
    const utilities = useSelector(getUtilities)
    const [loginData, setLoginData] = useState({ email: '', password: '' })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        !loginData?.email && dispatch(loginValidationError({ email: true }));
        !loginData?.password && dispatch(loginValidationError({ password: true }));
        if (loginData?.email && loginData?.password) {
            dispatch(loginUser(loginData))
                .unwrap()
                .then(() => {
                    navigate('/home');
                    dispatch(setShowPassword(false));
                    setLoginData({ email: '', password: '' })
                })
                .catch(err => {
                    console.log(err)
                });
        }
    }

    useEffect(() => {
        loginData?.email && dispatch(loginValidationError({ email: false }));
    }, [dispatch, loginData?.email])

    useEffect(() => {
        loginData?.password && dispatch(loginValidationError({ password: false }));
    }, [dispatch, loginData?.password])

    return (
        <Box sx={{ alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
            <Stack>
                <Typography align='center' variant='h4' style={{ marginBottom: '1rem' }}>Login</Typography>
                { user?.alert && <AlertUser alert={user?.alert} /> }
                <form>
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
                                                    onClick={() => { dispatch(setShowPassword(!user.showPassword)) }}
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
                                    sx={{ cursor: 'pointer', color: user?.darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)', textDecoration: 'underline', textDecorationColor: '#aa00ff', textUnderlineOffset: 3 }}>Forgot Your Password?</ Typography>
                                <FormGroup>
                                    <FormControlLabel
                                        sx={{ pointerEvents: 'none' }}
                                        control={
                                            <Checkbox
                                                onChange={() => {
                                                    dispatch(setPersistLogin(!user?.persistLogin))
                                                }}
                                                sx={{ pointerEvents: 'auto' }}
                                                checked={user?.persistLogin}
                                            />
                                        }
                                        label={
                                            <InputLabel
                                                onClick={() => {
                                                    dispatch(setPersistLogin(!user?.persistLogin))
                                                }}
                                                sx={{ cursor: 'pointer', pointerEvents: 'auto' }}
                                            >
                                                Remember Me?
                                            </InputLabel>}
                                    />
                                </FormGroup>
                            </Stack>
                            <Button
                                variant='contained'
                                type='submit'
                                onClick={handleSubmit}
                                disabled={user?.status === 'loading' ? true : false}
                            >
                                Login
                            </Button>
                            <Stack spacing={1} direction='column' sx={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant='p' sx={{ color: user?.darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)' }}>Need an Account?</ Typography>
                                <Typography variant='span'><Link to='/register' style={{ color: user?.darkMode ? 'white' : 'rgba(0, 0, 0, 0.6)' }}>Sign Up</Link></ Typography>
                            </Stack>
                        </Stack>
                    </FormGroup>
                </form>
                <ForgotPasswordModal user={user} loginData={loginData} setLoginData={setLoginData} forgotPasswordModal={utilities.forgotPasswordModal} setForgotPasswordModal={setForgotPasswordModal} />
            </Stack>
        </Box>
    )
}

export default Login