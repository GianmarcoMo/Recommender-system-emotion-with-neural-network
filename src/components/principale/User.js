import React from 'react';
import { Form,Row, Col, Button,Container } from 'react-bootstrap';

const User = ()=>{
    return (
        <Container>
            <Form action='/cambioDati'>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridNomeCognome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" disabled value='NomeProva'/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridNomeCognome">
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control type="text" disabled value='CognomeProva'/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" disabled value='emailProva@esempio.com'/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Tipo Account</Form.Label>
                        <Form.Control type="text" disabled value='Normale'/>
                    </Form.Group>
                </Row>

                <Button variant="outline-warning" type="submit">
                    Cambia dati
                </Button>
            </Form>
        </Container>
    );
}

export default User;