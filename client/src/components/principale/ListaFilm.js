import {React, useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";

import {Container} from 'react-bootstrap';
import Film from './Film';
import axios from 'axios';


const ListaFilm = () =>{
    let history = useHistory();

    const [filmNuovi, setFilms] = useState();
    const [filmPreferitiPrimo, setPreferenzaPrimoFilm] = useState();
    
    let titoloPreferenzaUno = 'Bad Boys II'


    useEffect(() => {
        const fetchFilm = async () => {
            //  Richiesta per vedere se l'utente ha effettuato il LOGIN
            const rispostaLogin = await axios ('http://localhost:3001/isLoggedIn');

            if(rispostaLogin.data.loggedIn !== true){
                history.push('/');
            }else{
                //  Richiesta per ricevere i nuovi film
                const rispostaFilmNuovi = await axios('http://localhost:3001/film/nuovi');
                setFilms(rispostaFilmNuovi.data);

                //  Richiesta per ricevere i film raccomandati
                const rispostaFilmPreferitoUno = await axios('http://localhost:3001/film/'+titoloPreferenzaUno);
                setPreferenzaPrimoFilm(rispostaFilmPreferitoUno.data);
            }            
        }

        fetchFilm();        
    }, []);


    return(
        <div>
            <Container className='elencoFilm'>
                <Container>
                    {!filmNuovi && <h1>Caricamento nuove uscite..</h1>}
                    {filmNuovi && <h1>Nuove uscite...</h1>}
                    {filmNuovi && <br></br>}
                    {filmNuovi && <Film films={filmNuovi}/>}
                    
                    {filmPreferitiPrimo && <h1>Perchè ti piace <b>{titoloPreferenzaUno}</b> </h1> }
                    {filmPreferitiPrimo && <br></br>}
                    {filmPreferitiPrimo && <Film films={filmPreferitiPrimo}/> }
                </Container>
            </Container>
        </div>
    )
}

export default ListaFilm;