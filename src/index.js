// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App'; // Your main App component
import store from './redux/store';

ReactDOM.render(
   <Provider store={store}>
       <App />
   </Provider>,
   document.getElementById('root')
);
