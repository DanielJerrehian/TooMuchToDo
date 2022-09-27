import React from 'react'

import Typography from '@mui/material/Typography';

function ToDoTaskSecondaryText(props) {
    const { toDo } = props;
    const createdOnDate = new Date(`${toDo?.timestamp}Z`);

    return (
        toDo?.completed
            ? null
            : toDo?.loading
                ? null
                : <Typography
                    variant='span'
                    component='span'
                >
                    {createdOnDate.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})}
                </Typography>
    )
}

export default ToDoTaskSecondaryText