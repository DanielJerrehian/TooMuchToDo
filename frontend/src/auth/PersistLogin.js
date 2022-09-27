import { useState, useEffect } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { getUser } from '../features/user/userSlice';
import { refreshIdToken } from '../features/user/userSlice';
import { persistedLoginRedirectRoutes } from '../utils/persistedLoginRedirectRoutes';


const PersistLogin = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const [isLoading, setIsLoading] = useState(true);

    const verifyRefreshToken = async () => {
        dispatch(refreshIdToken())
            .unwrap()
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    useEffect(() => {
        !user?.idToken && user?.persistLogin ? verifyRefreshToken() : setIsLoading(false)
    }, [])

    return (
        <>
            {
                !user?.persistLogin
                    ? <Outlet />
                    : isLoading
                        ? <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                        : user?.user?.idToken && persistedLoginRedirectRoutes.includes(location.pathname)
                            ? <Navigate to='/home' state={{ from: location }} replace />
                            : <Outlet />
            }
        </>
    )
}

export default PersistLogin