import {React, useState} from 'react';
import { useHistory } from "react-router-dom";


import Axios from 'axios';
import {Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom';

const Registrati = () =>{
    let history = useHistory();
    const [nome, setNome] = useState('');
    const [cognome, setCognome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registrati = () =>{
        Axios.post('http://localhost:3001/registrati', {
            nome: nome, 
            cognome: cognome,
            email: email,
            password: password
        }).then(function (response) {
            //console.log(response);
            history.push('/dashboard')   
        }).catch(function (error) {
            console.log(error);
        });
    }
    
    return (
        <div>
            <div className="account-form account-form-registrati">        
                <h1 className="titoloHomepage">Registrati</h1>
                <Form.Group className="mb-3" controlId="formBasicNome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" name='nome' placeholder="Nome" onChange={(e) => {setNome(e.target.value);}} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicNome">
                    <Form.Label>Cognome</Form.Label>
                    <Form.Control type="text" name='cognome' placeholder="Cognome" onChange={(e) => {setCognome(e.target.value);}} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Email" onChange={(e) => {setEmail(e.target.value);}} required/>
                    <Form.Text className="text-muted">
                        La tua email non verrà condivisa con nessuno.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" onChange={(e) => {setPassword(e.target.value);}} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Conferma password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Resta collegato" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Text className="text-muted">
                        Se hai gi&agrave; un account, <Link to="/login">accedi ora!</Link>
                    </Form.Text>
                </Form.Group>
                <Button variant="warning" onClick={registrati}>
                    Registrati
                </Button>
            </div>
        </div>
    )
}

export default Registrati;