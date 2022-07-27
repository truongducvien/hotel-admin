import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import createSagaMiddleware from '@redux-saga/core';

import { roomReducer } from './store/slices/roomSlice';
import { bookingReducer } from './store/slices/bookingSlice';
import rootSaga from './store/saga/rootSaga';

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

const store = configureStore({
  reducer: {
    roomReducer: roomReducer,
    bookingReducer: bookingReducer
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), ...middleware]
})

sagaMiddleware.run(rootSaga)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
