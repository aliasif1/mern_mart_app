import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthContextProviderComponent from './contexts/AuthContext';
import CartContextProviderComponent from './contexts/CartContext';
import {disableReactDevTools} from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') {
    disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProviderComponent>
        <CartContextProviderComponent>
            <App />
        </CartContextProviderComponent>
    </AuthContextProviderComponent>
);

