import React from 'react';

import {Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom';

const Registrati = () =>{
    return (
        <div>
            <div className="account-form account-form-registrati">        
                <h1 className="titoloHomepage">Registrati</h1>
                <Form action="/dashboard">
                    <Form.Group className="mb-3" controlId="formBasicNome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Nome" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicNome">
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control type="text" placeholder="Cognome" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" required/>
                        <Form.Text className="text-muted">
                            La tua email non verrà condivisa con nessuno.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Conferma password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Resta collegato" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Text className="text-muted">
                            Se hai gi&agrave; un account, <Link to="/login">accedi ora!</Link>
                        </Form.Text>
                    </Form.Group>
                    <Button variant="warning" type="submit">
                        Registrati
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Registrati;