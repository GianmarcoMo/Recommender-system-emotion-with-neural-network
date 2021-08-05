import './general.css'
import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// https://preview.themeforest.net/item/movflx-video-production-and-movie-html5-template/full_screen_preview/31469954?ref=digital_square

//  COMPONENTS
import ContainerHomepage from './components/index/ContainerIndex';
import NavbarDashboard from './components/principale/NavbarDashboard';
import FooterHome from './components/index/FooterHomepage'

import Login from './components/index/Login';
import Registrati from './components/index/Registrati';

//  COMPONENTI BOOTSTRAP

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">    
          <div className="homepage">
            <ContainerHomepage />
          </div>
          <FooterHome />  
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
          <NavbarDashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
