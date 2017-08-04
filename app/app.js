import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers/index.js';
const store = createStore(
  reducer,
  applyMiddleware(
      thunkMiddleware
  )
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
