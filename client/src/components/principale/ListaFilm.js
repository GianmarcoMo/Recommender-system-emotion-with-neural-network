import {React, useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";

import {Container} from 'react-bootstrap';
import Film from './Film';
import axios from 'axios';
import loadingFilm from './../../media/loadingFilms.gif';



const ListaFilm = () =>{
    let history = useHistory();
    let filmPreferitiLet = [];
    const [ultimoCaricamento, setUltimoCaricamento] = useState(false);

    const [filmNuovi, setFilms] = useState();
    const [filmPreferitiLista, setFilmPreferiti] = useState();
    const [filmsPreferitiUno, setFilmsPreferitiUno] = useState([]);

    useEffect(() => {
        const fetchFilm = async () => {
            //  Richiesta per vedere se l'utente ha effettuato il LOGIN
            const rispostaLogin = await axios ('http://localhost:3001/isLoggedIn');

            if(rispostaLogin.data.loggedIn !== true){
                history.push('/');
            }else{
                const rispostaWebcam = await axios('http://localhost:3001/');
                console.log(rispostaWebcam);
                
                //  richiesta per mostrare i film piaciuti 
                const filmPreferiti = await axios('http://localhost:3001/film/preferiti');
                setFilmPreferiti(filmPreferiti.data);
                filmPreferitiLet = filmPreferiti.data;
                

                //  Richiesta per ricevere i nuovi film
                const rispostaFilmNuovi = await axios('http://localhost:3001/film/nuovi');
                setFilms(rispostaFilmNuovi.data);

                //  Richiesta per ricevere i film raccomandati
                if(filmPreferitiLet.length > 0){
                    for(let i= 0; i<8; i++){
                        if(filmPreferitiLet[i] != null){
                            const rispostaFilmPreferitoUno = await axios('http://localhost:3001/film/search/'+filmPreferitiLet[i].titolo);
                            if(Array.isArray(rispostaFilmPreferitoUno.data))
                                setFilmsPreferitiUno(filmsPreferitiUno => [...filmsPreferitiUno, ...rispostaFilmPreferitoUno.data]);
                        }
                    }

                }

                setUltimoCaricamento(true);
            }            
        }

        fetchFilm();        
    }, []);


    return(
        <div>
            <Container className='elencoFilm'>
                <Container>
                    <div className='loadingLogo'>
                        {!ultimoCaricamento && <h1>Caricamento titoli...</h1>} 
                        {!ultimoCaricamento && <img src={loadingFilm} alt="loading..." />}
                    </div>
                    
                    {ultimoCaricamento && <h1>I tuoi<b> titoli</b> </h1> }
                    {ultimoCaricamento && <br></br>}
                    {ultimoCaricamento && <Film films={filmPreferitiLista}/> }

                    {ultimoCaricamento && <h1>Nuove uscite...</h1>}
                    {ultimoCaricamento && <br></br>}
                    {ultimoCaricamento && <Film films={filmNuovi}/>}
                    

                    {ultimoCaricamento && <h1>In base ai tuoi titoli <b>preferiti</b> </h1> }
                    {ultimoCaricamento && <br></br>}
                    {ultimoCaricamento && <Film films={filmsPreferitiUno}/> }
                </Container>
            </Container>
        </div>
    )
}

export default ListaFilm;