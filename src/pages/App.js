import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { FooterComp, NavbarComp } from '../components';
import ListSurah from './ListSurah';
import Surah from './Surah';

function App() {

  

  return (
    <Fragment>
      <Router>
        <NavbarComp />
        <Switch>
          <Route exact path="/">
            <ListSurah />
          </Route>
          <Route path="/surah/:id">
            <Surah />
          </Route>
        </Switch>
        <FooterComp />
      </Router>
    </Fragment>
  );
}

export default App;
