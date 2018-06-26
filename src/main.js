import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/index.jsx';
import { Link, Route, Switch, Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
const history = createHistory()
const rootElement = (
  <Router history={history}>
    <Main />
  </Router>
)
ReactDOM.render(rootElement, document.getElementById('root'));