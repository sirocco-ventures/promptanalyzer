import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css'; // Import your styles


// Render the App component into the root div
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root') // This should match the ID in index.html
);