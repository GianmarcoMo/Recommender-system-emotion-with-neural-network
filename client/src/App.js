import './general.css'
import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//  COMPONENTI GENERALI
import ContainerIndex from './components/index/ContainerIndex';
import NavbarDashboard from './components/principale/NavbarDashboard';
import FooterHome from './components/index/FooterHomepage'
import Login from './components/index/Login';
import Registrati from './components/index/Registrati';

import ComeFunziona from './components/principale/ComeFunziona';
import User from './components/principale/User';
import ListaFilm from './components/principale/ListaFilm';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="homepage">
            <NavbarDashboard />
            <ContainerIndex />
          </div> 
        </Route>
        <Route path="/login">
          <NavbarDashboard />
          <Login/>
        </Route>
        <Route path="/registrati">
          <NavbarDashboard />
          <Registrati/>
        </Route>
      </Switch>

      <Switch>
        <Route path="/dashboard">
          <NavbarDashboard />
          <ListaFilm />
        </Route>
        <Route path="/come-funziona">
          <NavbarDashboard />
          <ComeFunziona/>
        </Route>
        <Route path='/utente'>
          <NavbarDashboard />
          <User/>
        </Route>
      </Switch>
      <FooterHome /> 
    </Router>
  );
}

export default App;
