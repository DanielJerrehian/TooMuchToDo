import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';

import { getToDos, updateToDo, selectToDos } from '../toDoSlice';
import { getUser } from '../../user/userSlice';
import ToDoListDesktop from './ToDoListDesktop';
import ToDoListMobile from './ToDoListMobile';

function ToDoList() {
    const dispatch = useDispatch();
    const toDos = useSelector(selectToDos);
    const user = useSelector(getUser);
    const mediaQuery = useMediaQuery('(min-width:600px)');

    const handleChange = (toDoId, updateAttributes) => {
        dispatch(updateToDo({ user, toDoId, updateAttributes }))
            .then(() => { return dispatch(getToDos({ user, filterBy: toDos?.filterBy, orderBy: toDos?.orderBy })) })
    }

    return (
        <Stack spacing={2}>
            <Divider sx={{ marginTop: 0 }} />
            <Grid xs={4} item>
                {toDos?.toDos?.length ?
                    <Box>
                        <List>
                            {
                                toDos?.toDos?.map((toDo) => (
                                    mediaQuery
                                        ? <ToDoListDesktop key={toDo?.id} handleChange={handleChange} toDo={toDo} />
                                        : <ToDoListMobile key={toDo?.id} handleChange={handleChange} toDo={toDo} />

                                ))
                            }
                        </List>
                    </Box>
                    : toDos?.status === 'idle' || user?.status === 'loading'
                        ? <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                            <CircularProgress />
                        </Box>
                        : <Typography align='center' variant="h6" component="div" mt={2}>No To-Dos</Typography>
                }
            </Grid >
        </Stack >
    )
}

export default ToDoList