import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// If you're using Vite and have the base set in vite.config.js, you can use import.meta.env.BASE_URL
// For Create React App, you can use process.env.PUBLIC_URL or manually specify the basename as '/boards/'

// For Vite projects, relying on import.meta.env.BASE_URL
const basename = import.meta.env.VITE_BASE_URL;



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
