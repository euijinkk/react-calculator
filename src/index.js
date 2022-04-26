import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ExpressionProvider } from './contexts/ExpressionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ExpressionProvider>
      <App />
    </ExpressionProvider>
  </React.StrictMode>
);
