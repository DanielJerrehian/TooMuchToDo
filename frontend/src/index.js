import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './app/store';
import { injectApiStore } from './api/axios';
import AppContainer from './components/AppContainer';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

injectApiStore(store);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

