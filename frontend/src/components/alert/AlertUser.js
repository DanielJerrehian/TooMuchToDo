import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

import { setAlert } from '../../features/user/userSlice';


function AlertUser(props) {
    const { alert } = props;
    console.log(alert)
    const dispatch = useDispatch();

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                dispatch(setAlert(null));
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [alert, dispatch]);

    return (
        <Box
            sx={{ marginTop: 3, marginLeft: 3, marginRight: 3 }}
        >
            <Alert
                severity={alert?.severity}
                onClose={() => {
                    dispatch(setAlert(null));
                }}
            >
                {alert?.alert}
            </Alert>
        </Box>
    )
}

export default AlertUser