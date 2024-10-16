import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { applyMiddleware, compose } from 'redux'
import { configureStore } from "@reduxjs/toolkit";

import thunk from 'redux-thunk'

import reducer from './reducers/index.js'
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './functions/App.js';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({ reducer: reducer }, compose(applyMiddleware(thunk)))

root.render(
    <GoogleOAuthProvider clientId="132306028558-ip1jv3f6pj03amoj0fj0qg4fnivi8r2u.apps.googleusercontent.com">
        <Provider store={store}>
            <App />
        </Provider>,
    </GoogleOAuthProvider>,
);


