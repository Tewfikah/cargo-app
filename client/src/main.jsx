// main.jsx

import React from 'react'; // <-- ADD THIS LINE
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import "leaflet/dist/leaflet.css";
import './i18n';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter >
    <App />
    </BrowserRouter>
  </React.StrictMode>
);
