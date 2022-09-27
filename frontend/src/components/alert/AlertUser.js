import React from 'react'
import { useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';

import { setAlert } from '../../features/user/userSlice';


function AlertUser(props) {
    const dispatch = useDispatch();
    const {alert} = props;

    return (
        <Alert
            sx={{ marginBottom: 3 }}
            severity={alert?.severity}
            onClose={() => {
                dispatch(setAlert(null));
            }}
        >
            {alert?.alert}
        </Alert>
    )
}

export default AlertUser