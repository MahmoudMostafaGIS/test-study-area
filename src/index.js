import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
  
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('map')
);
