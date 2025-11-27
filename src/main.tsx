import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';

// Asegurarse de que el elemento root existe
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("No se encontró el elemento root");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);