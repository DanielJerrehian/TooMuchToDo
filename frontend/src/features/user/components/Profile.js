import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { getUser, fetchUser, setAlert, updateProfile, setProfileUpdated } from '../../user/userSlice';
import AlertUser from '../../../components/alert/AlertUser';
import DeleteProfileModal from './DeleteProfileModal';

function Profile() {
    const dispatch = useDispatch();
    const location = useLocation()
    const user = useSelector(getUser);
    const inputFile = useRef(null);
    const mediaQuery = useMediaQuery('(min-width:600px)');
    const [updatedProfile, setUpdatedProfile] = useState({ email: user?.user?.user?.email, firstName: user?.user?.user?.firstName || '', lastName: user?.user?.user?.lastName || '', profilePicture: user?.user?.user?.profilePicture });
    const [profilePictureTooLarge, setProfilePictureTooLarge] = useState(false);
    const [validationError, setValidationError] = useState(false);
    const [modal, setModal] = useState(false);

    useEffect(() => {  
        for (const [key, value] of Object.entries(user?.user?.user)) {
            if (Object.keys(updatedProfile).includes(key)) {
                if (updatedProfile[key] !== value && updatedProfile[key] !== '') {
                    dispatch(setProfileUpdated(true));
                }
            }
        }
    }, [updatedProfile, dispatch])

    const handleChange = (e) => {
        const { name, type, value, files } = e.target;
        setUpdatedProfile(prevState => {
            return {
                ...prevState,
                [name]: type === 'file'
                    ? files[0] ?
                        files[0].size <= 2000000
                            ? handleProfilePicture(files[0])
                            : handleProfilePictureTooLarge()
                        : user?.user?.user?.profilePicture
                    : value
            }
        });
    };

    const handleProfilePicture = (file) => {
        setProfilePictureTooLarge(false);
        return file
    }

    const handleProfilePictureTooLarge = () => {
        setProfilePictureTooLarge(true);
        dispatch(setProfileUpdated(false));
        return user?.user?.user?.profilePicture;
    }

    const handleSubmit = () => {
        const firebaseUid = user?.user?.user?.firebaseUid
        const updatedProfileData = {}

        for (const [key, value] of Object.entries(user?.user?.user)) {
            if (Object.keys(updatedProfile).includes(key)) {
                if (updatedProfile[key] !== value && updatedProfile[key] !== '') {
                    updatedProfileData[key] = updatedProfile[key]
                }
            }
        }

        dispatch(updateProfile({ firebaseUid, updatedProfileData }))
            .unwrap()
            .then(() => {
                dispatch(fetchUser(firebaseUid));
                dispatch(setProfileUpdated(false));
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                dispatch(setProfileUpdated(false));
            })
    }

    const handleModal = () => {
        setModal(true);
    };

    useEffect(() => {
        (updatedProfile.email || updatedProfile.confirmEmail) && setValidationError(false);
    }, [updatedProfile.email, updatedProfile.confirmEmail])

    useEffect(() => {
        user?.alert && dispatch(setAlert(null));
    }, [dispatch, location])

    useEffect(() => {
        profilePictureTooLarge && dispatch(setAlert({ alert: 'File too large, maximum file size of 2MB', severity: 'error' }))
    }, [dispatch, profilePictureTooLarge])

    useEffect(() => {
        user?.alert && !profilePictureTooLarge && dispatch(setAlert(null))
    }, [dispatch, profilePictureTooLarge])

    return (
        <Stack sx={{ marginTop: 5 }}>
            <Typography
                variant='h1'
                component='div'
                align='center'
                gutterBottom
                fontSize={mediaQuery ? '3.75rem' : '2.5rem'}
                sx={{ marginBottom: 5 }}
            >
                My Profile
            </Typography>
            <Card sx={{ boxShadow: 'rgba(0, 0, 0, 0.25) 0px 5px 15px' }}>
                <CardContent>
                    <Stack direction='column' spacing={2}>
                        { user?.alert && <AlertUser alert={user?.alert} /> }
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
                            <Avatar
                                src={
                                    (typeof updatedProfile.profilePicture === 'object' && updatedProfile.profilePicture !== null)
                                        ? URL.createObjectURL(updatedProfile.profilePicture)
                                        : updatedProfile.profilePicture
                                }
                                sx={{
                                    width: 150,
                                    height: 150,
                                    marginBottom: 3
                                }}
                                onClick={() => inputFile.current.click()}
                            >
                            </Avatar>
                            <input
                                hidden
                                name='profilePicture'
                                accept='image/*'
                                type='file'
                                ref={inputFile}
                                onChange={handleChange}
                            />
                            <Typography variant='p' component='div' align='center' color='text.secondary'>
                                {
                                    user?.user?.user?.profilePicture
                                        ? 'Click to Update Profile Picture (Max 2MB)'
                                        : 'Click to Upload Profile Picture (Max 2MB)'
                                }
                            </Typography>
                        </Box>
                        <TextField
                            label='E-Mail'
                            variant='outlined'
                            name='email'
                            required
                            value={updatedProfile?.email}
                            InputLabelProps={{ shrink: updatedProfile?.email ? true : false }}
                            onChange={handleChange}
                            error={Boolean(validationError)}
                            disabled={true}
                            helperText={
                                validationError
                                    ? validationError?.emailField
                                    : 'Your E-Mail will never be shared'
                            }
                        />
                        <TextField
                            label='First Name'
                            variant='outlined'
                            name='firstName'
                            value={updatedProfile?.firstName}
                            InputLabelProps={{ shrink: updatedProfile?.firstName ? true : false }}
                            onChange={handleChange}
                        />
                        <TextField
                            label='Last Name'
                            variant='outlined'
                            name='lastName'
                            value={updatedProfile?.lastName}
                            InputLabelProps={{ shrink: updatedProfile?.lastName ? true : false }}
                            onChange={handleChange}
                        />
                    </Stack>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between', marginLeft: 1, marginRight: 1, marginBottom: 1 }}>
                    <Button
                        onClick={handleSubmit}
                        variant='contained'
                        disabled={!user?.profileUpdated}
                    >
                        Update Profile
                    </Button>
                    <Button
                        onClick={handleModal}
                        variant='outlined'
                        color='error'
                    >
                        Delete Profile
                    </Button>
                    <DeleteProfileModal dispatch={dispatch} user={user} modal={modal} setModal={setModal} />
                </CardActions>
            </Card >
        </Stack >
    )
}

export default Profile