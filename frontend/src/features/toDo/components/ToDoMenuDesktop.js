import React from 'react';

import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function ToDoMenuDesktop(props) {
    const { toDos, handleChangeTab, handleSorting } = props;
    return (
        <Grid
            container
            marginY={3}
            display='flex'
            alignItems='center'
        >
            <Grid item xs={3} />
            <Grid
                item
                xs={6}
                display='flex'
                justifyContent='center'

            >
                <Tabs
                    value={toDos.activeMenuTab}
                    onChange={handleChangeTab}
                >
                    <Tab label="All" />
                    <Tab label="In Progress" />
                    <Tab label="Completed" />
                </Tabs>
            </Grid>
            <Grid
                item
                xs={3}
                display='flex'
                justifyContent='flex-end'
            >
                <FormControl
                    sx={{ minWidth: 150 }}
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
                        {toDos?.activeMenuTab === 0 && <MenuItem value='notCompleted'>In Progress</MenuItem>}
                        {toDos?.activeMenuTab === 0 && <MenuItem value='completed'>Complete</MenuItem>}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default ToDoMenuDesktop