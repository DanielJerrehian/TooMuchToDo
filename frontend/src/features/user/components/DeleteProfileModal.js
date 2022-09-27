import React from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { deleteUser } from '../userSlice';

function DeleteProfileModal(props) {
    const { dispatch, user, modal, setModal } = props;
    const navigate = useNavigate();

    const handleDelete = () => {
        const firebaseUid = user?.user?.user?.firebaseUid
        dispatch(deleteUser(firebaseUid))
            .unwrap()
            .then(() => navigate('/'))
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <Modal
            open={modal}
            onClose={() => setModal(false)}
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
                <Box
                    display='flex'
                    alignitems='center'
                    flexDirection='column'
                    rowGap={2}
                >
                    <Typography
                        variant='h2'
                        component='div'
                        fontSize='2.5rem'
                        align='center'
                    >
                        Are You Sure?
                    </Typography>
                    <Typography
                        component='div'
                        align='center'
                        fontSize='1.25rem'
                        gutterBottom
                    >
                        By deleting your profile, all of your data will be permanently deleted and you will no longer be able to login without creating a new account.
                    </Typography>
                    <Box
                        display='flex'
                        justifyContent='center'
                        columnGap={2}
                    >
                        <Button
                            onClick={() => setModal(false)}
                            variant='contained'
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDelete}
                            variant='contained'
                            color='error'
                        >
                            Delete Profile
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default DeleteProfileModal