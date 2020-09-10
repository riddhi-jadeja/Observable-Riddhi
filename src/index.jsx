import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route,Switch,Link } from 'react-router-dom';
import {HomePage} from './HomePage/HomePage'

import { App } from './App';

render(
    (<Router>
        <div>
          <Switch>
            <Route exact path="/">
              <App />
            </Route>
            <Route path="/about">
              <HomePage />
            </Route>
            <Route path="/dashboard">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>),
    document.getElementById('app')
);