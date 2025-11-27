import React from 'react';
import ReactDOM from 'react-dom/client';
// APUNTAR AL ARCHIVO DE LA RAÍZ PARA EVITAR DUPLICADOS Y ERRORES
import App from '../App';
import '../App.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);