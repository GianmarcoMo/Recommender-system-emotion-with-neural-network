import React from 'react';
import { Navbar, Container} from 'react-bootstrap';
import ElementiNav from './ElementiNav';

const NavbarDashboard = () =>{    
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/"><i className="fas fa-video icona-titolo"></i> MovRecommend</Navbar.Brand>
                <ElementiNav/>
            </Container>
        </Navbar>
    )
}

export default NavbarDashboard;