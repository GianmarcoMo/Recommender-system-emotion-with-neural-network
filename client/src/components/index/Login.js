import {React, useState, useEffect} from 'react';
import { useHistory, Link } from "react-router-dom";
import {Form, Button, Modal} from 'react-bootstrap'
import Axios from 'axios';

const Login = () =>{
    Axios.defaults.withCredentials = true;

    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [loginStatus, setLoginStatus] = useState(false);

    const login = () =>{
        Axios.post('http://localhost:3001/login', {
            email: email,
            password: password
        }).then(function (response) {
            if(response.data === true || response.data.loggedIn === true){
                history.push('/dashboard'); 
            }else{
                alert("Email o password sbagliata.");
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/isLoggedIn").then((response)=>{
            if(response.data === true || response.data.loggedIn === true)
                history.push('/dashboard');
        });
    });

    function Consenso() {
        const [show, setShow] = useState(false);
      
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
      
        return (
          <>
            <Button variant="warning" onClick={handleShow}>
              Login
            </Button>
      
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title><b>ATTENZIONE</b></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Dopo aver effettuato il LOGIN il sistema acquisir&agrave; una sua foto 
                per consigliarle titoli in base alla sua emozione.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  Rifiuto
                </Button>
                <Button variant="success" onClick={login}>Accetto</Button>
              </Modal.Footer>
            </Modal>
          </>
        );
    }

    return (
        <div>
            <div className="account-form">        
                <h1 className="titoloHomepage">Login</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => {setEmail(e.target.value);}} required/>
                    <Form.Text className="text-muted">
                        La tua email non verrà condivisa con nessuno.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value);}} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Text className="text-muted">
                        Se non hai ancora un account, <Link to="/registrati">registrati ora!</Link>
                    </Form.Text>
                </Form.Group>
                <Consenso />
            </div>
        </div>
    )
}

export default Login;