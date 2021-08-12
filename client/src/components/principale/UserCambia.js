import React from 'react';
import { Form,Row, Col, Button,Container } from 'react-bootstrap';

const UserCambia = ()=>{
    return (
        <Container>
            <Form action='/dashboard'>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridNomeCognome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder='NomeProva'/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridNomeCognome">
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control type="text" placeholder='CognomeProva'/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder='emailProva@esempio.com'/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Tipo Account</Form.Label>
                        <Form.Control type="text" disabled value='Normale'/>
                    </Form.Group>
                </Row>

                <Button variant="warning" type="submit">
                    Invia modifiche
                </Button>
            </Form>
        </Container>
    );
}

export default UserCambia;