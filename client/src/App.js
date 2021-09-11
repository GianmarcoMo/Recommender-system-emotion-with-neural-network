import './general.css'
import {React} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//  COMPONENTI GENERALI
import ContainerIndex from './components/index/ContainerIndex';
import NavbarDashboard from './components/principale/NavbarDashboard';
import FooterHome from './components/index/FooterHomepage'
import Login from './components/index/Login';
import Registrati from './components/index/Registrati';

import ComeFunziona from './components/principale/ComeFunziona';
import User from './components/principale/User';
import UserCambia from './components/principale/UserCambia'
import ListaFilm from './components/principale/ListaFilm';

function App() {
  return (
    <Router>
      <NavbarDashboard />
      <Switch>
        <Route exact path="/">
          <div className="homepage">
            <ContainerIndex />
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
            <ListaFilm />
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
