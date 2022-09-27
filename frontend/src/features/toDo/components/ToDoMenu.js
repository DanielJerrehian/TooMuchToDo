import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useMediaQuery from '@mui/material/useMediaQuery';

import { getToDos, selectToDos, changeActiveMenuTab, updateFilterBy, changeSortingMenuItem, updateOrderBy } from '../toDoSlice';
import orderByMapper from '../../../utils/orderByMapper';
import { getUser } from '../../user/userSlice';
import ToDoMenuDesktop from './ToDoMenuDesktop';
import ToDoMenuMobile from './ToDoMenuMobile';

function ToDoMenu() {
    const dispatch = useDispatch();
    const toDos = useSelector(selectToDos);
    const user = useSelector(getUser);
    const mediaQuery = useMediaQuery('(min-width:750px)');

    const handleChangeTab = (event, newActiveTab) => {
        dispatch(changeActiveMenuTab(newActiveTab));
        if (newActiveTab === 0) {
            dispatch(updateFilterBy({ deleted: false }));
        } else if (newActiveTab === 1) {
            dispatch(updateFilterBy({ deleted: false, completed: false }));
        } else if (newActiveTab === 2) {
            dispatch(updateFilterBy({ deleted: false, completed: true }));
        }
    };

    const handleSorting = (event) => {
        dispatch(changeSortingMenuItem(event.target.value));
        const orderBy = orderByMapper[event.target.value];
        dispatch(updateOrderBy(orderBy));
    }

    useEffect(() => {
        dispatch(getToDos({ user, filterBy: toDos?.filterBy, orderBy: toDos?.orderBy }));
    }, [dispatch, user, toDos?.filterBy, toDos?.orderBy])

    return (
        mediaQuery
            ? <ToDoMenuDesktop toDos={toDos} handleChangeTab={handleChangeTab} handleSorting={handleSorting} />
            : <ToDoMenuMobile toDos={toDos} handleSorting={handleSorting} />
    )
}

export default ToDoMenu


