// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Asegúrate de que App.jsx contenga tu componente ZenChatbot
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);