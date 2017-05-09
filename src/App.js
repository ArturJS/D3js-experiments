import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {
  HomePage
} from './components/pages';
import './App.scss';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Redirect from="/*" to="/"/>
        </Switch>
      </BrowserRouter>
    );
  }
}
