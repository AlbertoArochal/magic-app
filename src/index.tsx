import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/styles/index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { MagicRouter } from './router/magicrouter';
import { UserProvider } from './contexts/user/provider';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <UserProvider>
            <BrowserRouter>
                <MagicRouter />
            </BrowserRouter>
        </UserProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
