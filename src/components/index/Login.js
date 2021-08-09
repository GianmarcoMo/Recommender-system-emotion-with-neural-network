import React from 'react';

import {Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom';

const Login = () =>{
    return (
        <div>
            <div className="account-form">        
                <h1 className="titoloHomepage">Login</h1>
                <Form action="/dashboard">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required/>
                        <Form.Text className="text-muted">
                            La tua email non verrà condivisa con nessuno.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Resta collegato" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Text className="text-muted">
                            Se non hai ancora un account, <Link to="/registrati">registrati ora!</Link>
                        </Form.Text>
                    </Form.Group>
                    <Button variant="warning" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Login;