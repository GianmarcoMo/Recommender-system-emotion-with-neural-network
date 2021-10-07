import {useState, useEffect} from 'react';
import React from 'react';
import Axios from 'axios';
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';

const ElementiNav = () =>{
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
        <div>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            {loginStatus && <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/come-funziona">Come funziona?</Nav.Link>
                </Nav>
                <Nav>
                    <NavDropdown title="Film" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/childerefamily">Animato</NavDropdown.Item>
                        <NavDropdown.Item href="/actionmovie">Azione</NavDropdown.Item>
                        <NavDropdown.Item href="/comedies">Commedia</NavDropdown.Item>
                        <NavDropdown.Item href="/drama">Drammatico</NavDropdown.Item>
                        <NavDropdown.Item href="/horror">Horror</NavDropdown.Item>
                        <NavDropdown.Item href="/thriller">Thriller</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Serie TV" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/teentv">Adolescenziale</NavDropdown.Item>
                        <NavDropdown.Item href="/tvaction">Azione</NavDropdown.Item>
                        <NavDropdown.Item href="/tvcomedies">Commedia</NavDropdown.Item>
                        <NavDropdown.Item href="/tvdrama">Drammatico</NavDropdown.Item>
                        <NavDropdown.Item href="/tvhorror">Horror</NavDropdown.Item>
                        <NavDropdown.Item href="/tvthriller">Thriller</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <Nav.Link href="/utente"><i className="far fa-user-circle"></i></Nav.Link>
                </Nav>
            </Navbar.Collapse>}
        </div>
    )
}

export default ElementiNav;