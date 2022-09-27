import React from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { changeActiveMenuTab, updateFilterBy } from '../toDoSlice';


function ToDoMenuMobile(props) {
    const { toDos, handleSorting } = props;
    const dispatch = useDispatch();

    const handleChangeTab = (event) => {
        const selectedValue = event.target.value
        dispatch(changeActiveMenuTab(selectedValue));
        if (selectedValue === 0) {
            dispatch(updateFilterBy({ deleted: false }));
        } else if (selectedValue === 1) {
            dispatch(updateFilterBy({ deleted: false, completed: false }));
        } else if (selectedValue === 2) {
            dispatch(updateFilterBy({ deleted: false, completed: true }));
        }
    };

    return (
        <Box
            display='grid'
            gridTemplateColumns='1fr 1fr'
            marginY={3}
            columnGap={1}
        >
            <Box
                display='flex'
                justifyContent='center'
            >
                <FormControl
                    sx={{ width: '100%' }}
                    size="small"
                >
                    <InputLabel id="filter-by">Filter By</InputLabel>
                    <Select
                        labelId="filter-by"
                        value={toDos.activeMenuTab}
                        label="Filter By"
                        onChange={handleChangeTab}
                    >
                        <MenuItem value={0}>All</MenuItem>
                        <MenuItem value={1}>In Progress</MenuItem>
                        <MenuItem value={2}>Completed</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box
                display='flex'
                justifyContent='center'
            >
                <FormControl
                    sx={{ width: '100%' }}
                    size="small"
                >
                    <InputLabel id="sort-by">Sort By</InputLabel>
                    <Select
                        labelId="sort-by"
                        value={toDos?.sorting}
                        label="Sort By"
                        onChange={handleSorting}
                    >
                        <MenuItem value='oldest'>Oldest</MenuItem>
                        <MenuItem value='newest'>Newest</MenuItem>
                        {
                            toDos?.activeMenuTab === 0 && <MenuItem value='notCompleted'>In Progress</MenuItem>

                        }
                        {
                            toDos?.activeMenuTab === 0 && <MenuItem value='completed'>Complete</MenuItem>
                        }
                    </Select>
                </FormControl>
            </Box>
        </Box >
    )
}

export default ToDoMenuMobile