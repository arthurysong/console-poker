import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import thunk from 'redux-thunk';
import wsMiddleware from './redux/wsMiddleware';
import reducer from './redux/reducer';
import WebSocketConnection from './components/WebSocketConnection';

// const middleware = [wsMiddleware, thunk]
const store = createStore (reducer, applyMiddleware(thunk))
window.store = store;

// const Root = ({store}) => (
//   <Router>
    
//   </Router>
// )

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
