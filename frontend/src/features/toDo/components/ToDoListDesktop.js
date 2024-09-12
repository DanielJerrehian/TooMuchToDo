import React from 'react'

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import LinearProgress from '@mui/material/LinearProgress';
import Spinner from '../../../components/spinner/Spinner';

import ToDoTaskSecondaryText from './ToDoTaskSecondaryText';

function ToDoListDesktop(props) {
    const { handleChange, toDo } = props;

    return (
        <ListItem
            secondaryAction={
                <IconButton
                    edge="end"
                    onClick={() => handleChange(toDo?.id, { 'deleted': !toDo?.deleted })}
                    disabled={toDo?.loading}
                >
                    <DeleteIcon />
                    {
                        toDo?.updateAttribute === 'deleted' &&
                        <Spinner />
                    }
                </IconButton>
            }
        >
            <ListItemButton onClick={() => handleChange(toDo?.id, { 'completed': !toDo?.completed })}>
                <ListItemIcon>
                    <Checkbox
                        name={toDo.task}
                        checked={toDo.completed}
                        edge='start'
                        disabled={toDo?.loading}
                    />
                </ListItemIcon>
                <ListItemText
                    sx={{ textDecoration: toDo.completed ? 'line-through' : null }}
                    primary={toDo?.loading ? <LinearProgress /> : toDo?.task}
                    primaryTypographyProps={{
                        style: {
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }
                    }}
                    secondary={<ToDoTaskSecondaryText toDo={toDo} />}
                />
            </ListItemButton>
        </ListItem>
    )
}

export default ToDoListDesktop