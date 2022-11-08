import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';

import PersistLogin from './auth/PersistLogin';
import RequireAuth from './auth/RequireAuth';
import LandingPage from './components/public/landingPage/LandingPage';
import About from './components/public/About';
import Login from './components/login/Login';
import Register from './components/register/Register';
import ToDo from './features/toDo/components/ToDo';
import Profile from './features/user/components/Profile';
import PageNotFound from './components/notFound/PageNotFound';

function App() {

    return (
        <Container sx={{ marginBottom: 30 }}>
            <Routes>
                <Route element={<PersistLogin />}>
                    <Route path='/' element={<LandingPage />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route element={<RequireAuth />}>
                        <Route path='/home' element={<ToDo />} />
                        <Route path='/profile' element={<Profile />} />
                    </Route>
                    <Route path='*' element={<PageNotFound />} />
                </Route>
            </Routes>
        </Container>
    );
}

export default App;
