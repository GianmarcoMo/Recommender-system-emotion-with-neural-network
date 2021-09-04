import {React, useState, useEffect} from 'react';
import Axios from 'axios';

import { Navbar, Container} from 'react-bootstrap';

import ElementiNav from './ElementiNav';

const NavbarDashboard = () =>{
    Axios.defaults.withCredentials = true;

    const [loginStatus, setLoginStatus] = useState(false);

    useEffect(() => {
        Axios.get("http://localhost:3001/isLoggedIn").then((response)=>{
            if(response.data === true || response.data.loggedIn === true){
                setLoginStatus(current => !current);
            }
        });
    }, []);
    
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/"><i className="fas fa-video icona-titolo"></i> MovRecommend</Navbar.Brand>
                {loginStatus && <ElementiNav/>}
            </Container>
        </Navbar>
    )
}

export default NavbarDashboard;