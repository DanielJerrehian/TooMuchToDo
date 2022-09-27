import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';

import { addToDo, getToDos, selectToDos, changeActiveMenuTab, updateFilterBy } from '../toDoSlice';
import { getUser } from '../../user/userSlice';

function ToDoForm() {
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const toDos = useSelector(selectToDos);
    const [newToDo, setNewToDo] = useState({ task: '', completed: false })
    const [validationError, setValidationError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewToDo(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Here")

        if (newToDo.task.trim() === '') {
            setValidationError(true);
        } else {
            newToDo.task !== '' && dispatch(addToDo({ user, newToDo }))
                .then(() => {
                    dispatch(getToDos({ user, filterBy: toDos?.filterBy, orderBy: toDos?.orderBy }));
                    setNewToDo({ task: '', completed: false });
                    dispatch(changeActiveMenuTab(0));
                    dispatch(updateFilterBy({ deleted: false }));
                })
        }
    }

    useEffect(() => {
        newToDo.task && setValidationError(false);
    }, [newToDo.task])

    return (
        <form onSubmit={handleSubmit}>
            <FormGroup>
                <Stack spacing={2}>
                    <TextField
                        label='New To-Do'
                        variant='outlined'
                        name='task'
                        value={newToDo.task}
                        onChange={handleChange}
                        error={validationError}
                        helperText={validationError ? "Empty To-Do" : null}
                    />
                    <LoadingButton
                        variant='contained'
                        onClick={handleSubmit}
                        loading={Boolean(toDos.status === 'loading')}
                        disabled={toDos.status === 'loading' ? true : false}
                    >
                        Add To List
                    </LoadingButton>
                </Stack>
            </FormGroup>
        </form>
    )
}

export default ToDoForm;