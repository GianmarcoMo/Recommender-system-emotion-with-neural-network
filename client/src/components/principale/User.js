import {useEffect, useState} from 'react';
import React from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Form,Row, Col, Container, Table} from 'react-bootstrap';
import ListaFilmSetting from './ListaFilmSettings';

const User = ()=>{
    let history = useHistory();
    const [filmPreferitiLista, setFilmPreferiti] = useState();
    const [datiUtente, setDatiutente ] = useState();

    useEffect(() => {
        const fetchFilm = async () => {
            //  Richiesta per vedere se l'utente ha effettuato il LOGIN
            const rispostaLogin = await axios ('http://localhost:3001/isLoggedIn');

            if(rispostaLogin.data.loggedIn !== true){
                history.push('/');
            }else{
                //  richiesta per mostrare i film piaciuti 
                const filmPreferiti = await axios('http://localhost:3001/film/preferiti');
                setFilmPreferiti(filmPreferiti.data);

                const resDatiUtente = await axios('http://localhost:3001/datiUtente');
                setDatiutente(resDatiUtente.data[0]);

            }          
        }

        fetchFilm();        
    });

    return (
        <Container>
            {datiUtente && <Form >
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridNomeCognome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" disabled value={datiUtente.nome}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridNomeCognome">
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control type="text" disabled value={datiUtente.cognome}/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" disabled value={datiUtente.email}/> 
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Tipo Account</Form.Label>
                        <Form.Control type="text" disabled value='Normale'/> 
                    </Form.Group>
                </Row>

                <h3>I tuoi titoli preferiti </h3>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Titolo</th>
                            <th style={{'width': '70px'}}></th>
                        </tr>
                    </thead>
                    <ListaFilmSetting filmPreferitiLista={filmPreferitiLista}/>
                </Table>
                <br></br>
            </Form> }
        </Container>
    );
}

export default User;