import './general.css'
import {React, useState, useEffect} from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//  COMPONENTI GENERALI
import ContainerHomepage from './components/index/ContainerIndex';
import NavbarDashboard from './components/principale/NavbarDashboard';
import FooterHome from './components/index/FooterHomepage'
import Login from './components/index/Login';
import Registrati from './components/index/Registrati';

import Film from './components/principale/Film';
import ComeFunziona from './components/principale/ComeFunziona';
import User from './components/principale/User';
import UserCambia from './components/principale/UserCambia'


function App() {
  return (
    <Router>
      <NavbarDashboard />
      <Switch>
        <Route exact path="/">
          <div className="homepage">
            <ContainerHomepage />
          </div> 
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/registrati">
          <Registrati/>
        </Route>
      </Switch>

      <Switch>
        <Route path="/dashboard">
          <Film />
        </Route>
        <Route path="/come-funziona">
          <ComeFunziona/>
        </Route>
        <Route path='/utente'>
          <User/>
        </Route>
        <Route path='/cambioDati'>
          <UserCambia/>
        </Route>
      </Switch>
      <FooterHome /> 
    </Router>
  );
}

export default App;
