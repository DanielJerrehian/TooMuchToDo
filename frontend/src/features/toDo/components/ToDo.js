import React from 'react';
import Stack from '@mui/material/Stack';

import ToDoTitle from './ToDoTitle';
import ToDoForm from './ToDoForm';
import ToDoMenu from './ToDoMenu';
import ToDoList from './ToDoList';

function ToDo() {

    return (
        <Stack sx={{ marginTop: 5 }}>
            <ToDoTitle />
            <ToDoForm />
            <ToDoMenu />
            <ToDoList />
        </Stack>
    )
}

export default ToDo