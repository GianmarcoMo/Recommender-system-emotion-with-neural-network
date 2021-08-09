import React from 'react';

import { useState } from 'react';

import { FormControl, Navbar, Nav, NavDropdown, Container, Button, Form, Modal} from 'react-bootstrap';

function Example() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Button className="btnCerca" onClick={handleShow}>
            <i class="fas fa-search"></i>
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
            <Form className="d-flex">
                <FormControl
                    type="search"
                    placeholder="Cerca qualcosa"
                    className="mr-2 searchInput "
                    aria-label="Search"
                />
                <Button variant="outline-warning"><i class="fas fa-search"></i></Button>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
        </>
    );
}

const NavbarDashboard = () =>{
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/dashboard"><i class="fas fa-video icona-titolo"></i> MovRecommend</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown title="Film" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/dashboard">Adolescenziale</NavDropdown.Item>
                        <NavDropdown.Item href="/dashboard">Animato</NavDropdown.Item>
                        <NavDropdown.Item href="/dashboard">Azione</NavDropdown.Item>
                        <NavDropdown.Item href="/dashboard">Commedia</NavDropdown.Item>
                        <NavDropdown.Item href="/dashboard">Drammatico</NavDropdown.Item>
                        <NavDropdown.Item href="/dashboard">Horror</NavDropdown.Item>
                        <NavDropdown.Item href="/dashboard">Thriller</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Serie TV" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/dashboard">Adolescenziale</NavDropdown.Item>
                        <NavDropdown.Item href="/dashboard">Animato</NavDropdown.Item>
                        <NavDropdown.Item href="/dashboard">Azione</NavDropdown.Item>
                        <NavDropdown.Item href="/dashboard">Commedia</NavDropdown.Item>
                        <NavDropdown.Item href="/dashboard">Drammatico</NavDropdown.Item>
                        <NavDropdown.Item href="/dashboard">Horror</NavDropdown.Item>
                        <NavDropdown.Item href="/dashboard">Thriller</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/popolari">Popolari</Nav.Link>
                    <Nav.Link href="/come-funziona">Come funziona?</Nav.Link>
                </Nav>
                <Nav>
                    <Example/>
                </Nav>
                <Nav>
                    <Nav.Link href="/utente"><i class="far fa-user-circle"></i></Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarDashboard;