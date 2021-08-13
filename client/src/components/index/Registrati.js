import {React, useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";

import Axios from 'axios';
import {Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom';

const Registrati = () =>{
    Axios.defaults.withCredentials = true;

    let history = useHistory();
    const [nome, setNome] = useState('');
    const [cognome, setCognome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [loginStatus, setLoginStatus] = useState({logginIn: false});

    const registrati = () =>{
        Axios.post('http://localhost:3001/registrati', {
            nome: nome, 
            cognome: cognome,
            email: email,
            password: password
        }).then(function (response) {
            if(response.data === true || response.data.loggedIn === true){
                history.push('/dashboard');
            }else{
                alert("L'email utilizzata è esistente.");
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/isLoggedIn").then((response)=>{
            console.log(response.data);
            if(response.data === true || response.data.loggedIn === true)
                history.push('/dashboard');
            else 
                history.push('/');
        });
    }, []);
    
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