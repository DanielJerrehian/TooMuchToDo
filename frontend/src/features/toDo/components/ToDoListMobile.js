import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ToDoTaskSecondaryText from './ToDoTaskSecondaryText';
import { getUser } from '../../user/userSlice';

function ToDoListMobile(props) {
    const { handleChange, toDo } = props;
    const [modal, setModal] = useState(false);
    const user = useSelector(getUser);

    return (
        <ListItem>
            <ListItemButton
                onClick={() => setModal(!modal)}
            >
                <ListItemText
                    sx={{ textDecoration: toDo.completed ? 'line-through' : null }}
                    primary={toDo?.task}
                    primaryTypographyProps={{
                        style: {
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            align: 'center'
                        }
                    }}
                    secondary={<ToDoTaskSecondaryText toDo={toDo} />}
                />
                <Modal
                    open={modal}
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
                        <Stack spacing={2}>
                            <Typography
                                variant='h6'
                                sx={{ textDecoration: toDo.completed ? 'line-through' : null }}
                            >
                                {toDo?.task}
                            </Typography>
                            <LoadingButton
                                onClick={() => handleChange(toDo?.id, { 'completed': !toDo?.completed })}
                                loading={toDo?.loading}
                                endIcon={<CheckCircleIcon />}
                                variant='outlined'
                                sx={{ color: '#aa00ff' }}
                            >
                                Mark As {toDo.completed ? 'Incomplete' : 'Complete'}
                            </LoadingButton>
                            <LoadingButton
                                onClick={() => handleChange(toDo?.id, { 'deleted': !toDo?.deleted })}
                                loading={toDo?.loading}
                                endIcon={<DeleteIcon sx={{ color: user?.darkMode ? '#f44336' : 'rgba(0, 0, 0, 0.54)' }} />}
                                variant='text'
                                fullWidth={true}
                                color='error'
                            >
                                Delete
                            </LoadingButton>
                        </Stack>
                    </Box>
                </Modal>
            </ListItemButton>
        </ListItem >
    )
}

export default ToDoListMobile