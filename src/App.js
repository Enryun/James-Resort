import React from 'react';
import './App.css';

import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import SingleRoomPage from './pages/SingleRoomPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

import NavBar from './components/NavBar';

import {Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/rooms/" component={RoomsPage} />
        <Route exact path="/rooms/:slug" component={SingleRoomPage} />
        <Route component={ErrorPage} />
      </Switch>
    </div>
  );
}

export default App;
