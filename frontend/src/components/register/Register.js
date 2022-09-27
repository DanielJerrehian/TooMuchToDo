import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import isEmail from 'validator/lib/isEmail';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { getUser, registerUser, setShowPassword, setAlert, registrationValidationError } from '../../features/user/userSlice';
import { getUtilities, setPrivacyModal } from '../../features/utilities/utilitiesSlice';
import PrivacyPolicyModal from '../public/PrivacyPolicyModal';
import AlertUser from '../alert/AlertUser';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector(getUser);
    const utilities = useSelector(getUtilities);
    const [registrationData, setRegistrationData] = useState({ email: '', password: '', confirmPassword: '' })


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setRegistrationData(prevState => {
            return {
                ...prevState,
                [name]: type === "checkbox" ? checked : value
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        (!registrationData?.email || !isEmail(registrationData?.email)) && dispatch(registrationValidationError({ email: true }));
        !registrationData?.password && dispatch(registrationValidationError({ password: true }));
        !registrationData?.confirmPassword && dispatch(registrationValidationError({ password: true }))
        if (isEmail(registrationData?.email) && registrationData?.password.length > 5 && registrationData?.confirmPassword) {
            registrationData?.password === registrationData?.confirmPassword
                ? dispatch(registerUser(registrationData))
                    .unwrap()
                    .then(() => {
                        navigate('/login')
                        dispatch(
                            setAlert({
                                alert: 'User successfully created! Please confirm your E-Mail via the link sent to your inbox before logging in (it may have landed in your spam folder)', 
                                severity: 'success'
                            })
                        )
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    .finally(() => {
                        setRegistrationData({ email: '', password: '', confirmPassword: '' })
                    })
                : dispatch(setAlert({alert: 'Passwords do not match', severity: 'error'}))
        } else if (isEmail(registrationData?.email && registrationData?.password.length < 6)) {
            dispatch(setAlert({alert: 'Password must be at least 6 characters', severity: 'error'}))
        }
    }

    useEffect(() => {
        registrationData?.email && dispatch(registrationValidationError({ email: false }));
    }, [dispatch, registrationData?.email])

    useEffect(() => {
        (registrationData?.password || registrationData?.confirmPassword) && dispatch(registrationValidationError({ password: false }));
    }, [dispatch, registrationData?.password, registrationData?.confirmPassword])

    useEffect(() => {
        user?.alert && dispatch(setAlert(null));
    }, [dispatch, location])

    return (
        <Box sx={{ alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
            <Stack>
                <Typography align='center' variant='h4' style={{ marginBottom: '1rem' }}>Sign Up</Typography>
                { user?.alert && <AlertUser alert={user?.alert} /> }
                <form>
                    <FormGroup>
                        <Stack spacing={2} >
                            <Stack spacing={2}>
                                <TextField
                                    label='E-Mail'
                                    variant='outlined'
                                    name='email'
                                    type='email'
                                    required
                                    value={registrationData.email}
                                    onChange={handleChange}
                                    error={user?.registrationValidationError?.email}
                                    helperText={user?.registrationValidationError?.email ? "Enter an E-Mail" : null}

                                />
                                <TextField
                                    label='Password (6+ Characters)'
                                    variant='outlined'
                                    name='password'
                                    type={user.showPassword ? 'text' : 'password'}
                                    required
                                    value={registrationData.password}
                                    onChange={handleChange}
                                    error={user?.registrationValidationError?.password}
                                    helperText={user?.registrationValidationError?.password ? "Enter a password" : null}
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
                                <TextField
                                    label='Confirm Password'
                                    variant='outlined'
                                    name='confirmPassword'
                                    type={user.showPassword ? 'text' : 'password'}
                                    required
                                    value={registrationData.confirmPassword}
                                    onChange={handleChange}
                                    error={user?.registrationValidationError?.password}
                                    helperText={user?.registrationValidationError?.password ? 'Confirm your password' : null}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    aria-label='toggle password visibility'
                                                    onClick={() => { dispatch(setShowPassword(!user.showPassword)) }}
                                                    edge='end'
                                                >
                                                    {user.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Stack>
                            {console.log()}
                            <Typography
                                variant='p'
                                sx={{ color: user?.darkMode ? 'white' : 'rgba(0, 0, 0, 0.6)' }}
                            >
                                By signing up, you adhere to the <span onClick={() => dispatch(setPrivacyModal(!utilities.privacyModal))} style={{ cursor: 'pointer', textDecoration: 'underline', textDecorationColor: '#aa00ff', textUnderlineOffset: 3 }}> privacy policy</span>
                            </Typography>
                            <PrivacyPolicyModal privacyModal={utilities.privacyModal} setPrivacyModal={setPrivacyModal} />
                            <Button
                                variant='contained'
                                type='submit'
                                onClick={handleSubmit}
                                disabled={user?.status === 'loading' ? true : false}
                            >
                                Sign Up
                            </Button>
                            <Stack spacing={1} direction='column' sx={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant='p' sx={{ color: user?.darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)' }}>Already have an account?</ Typography>
                                <Typography variant='span'><Link to='/login' style={{ color: user?.darkMode ? 'white' : 'rgba(0, 0, 0, 0.6)' }}>Sign In</Link></ Typography>
                            </Stack>
                        </Stack>
                    </FormGroup>
                </form>
            </Stack>
        </Box>
    )
}

export default Register