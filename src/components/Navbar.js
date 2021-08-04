import React from 'react';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { FormControl } from 'react-bootstrap';

const NavbarSito = () =>{
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/"><i class="fas fa-video icona-titolo"></i> MovRecommend</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown title="Film" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/film/adolescenziale">Adolescenziale</NavDropdown.Item>
                        <NavDropdown.Item href="/film/animato">Animato</NavDropdown.Item>
                        <NavDropdown.Item href="/film/azione">Azione</NavDropdown.Item>
                        <NavDropdown.Item href="/film/commedia">Commedia</NavDropdown.Item>
                        <NavDropdown.Item href="/film/drammatico">Drammatico</NavDropdown.Item>
                        <NavDropdown.Item href="/film/horror">Horror</NavDropdown.Item>
                        <NavDropdown.Item href="/film/thriller">Thriller</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Serie TV" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/serie/adolescenziale">Adolescenziale</NavDropdown.Item>
                        <NavDropdown.Item href="/serie/animato">Animato</NavDropdown.Item>
                        <NavDropdown.Item href="/serie/azione">Azione</NavDropdown.Item>
                        <NavDropdown.Item href="/serie/commedia">Commedia</NavDropdown.Item>
                        <NavDropdown.Item href="/serie/drammatico">Drammatico</NavDropdown.Item>
                        <NavDropdown.Item href="/serie/horror">Horror</NavDropdown.Item>
                        <NavDropdown.Item href="/serie/thriller">Thriller</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/popolari">Popolari</Nav.Link>
                    <Nav.Link href="/come-funziona">Come funziona?</Nav.Link>
                </Nav>
                <Nav>
                <Form className="d-flex">
                    <FormControl
                        type="search"
                        placeholder="Cerca qualcosa"
                        className="mr-2 searchInput"
                        aria-label="Cerca"
                    />
                    <Button variant="outline-light">Cerca</Button>
                    </Form>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarSito;