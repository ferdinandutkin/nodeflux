import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import {persistor, store} from './state/store'

import {Provider} from 'react-redux'
import {setUpInterceptor} from "./api/interceptor";
import {PersistGate} from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

setUpInterceptor(store)
root.render(
    <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                <App/>
        </PersistGate>
    </Provider>
);

