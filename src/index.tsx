import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//Importing the provider from react-redux
import {Provider} from "react-redux";

//Importing the redux store
import {store} from "./app/store"

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root')
);

