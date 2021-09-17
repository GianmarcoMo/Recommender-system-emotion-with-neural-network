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
    const [filmUmore, setFilmUmore] = useState();

    useEffect(() => {
        const fetchFilm = async () => {
            //  Richiesta per vedere se l'utente ha effettuato il LOGIN
            const rispostaLogin = await axios ('http://localhost:3001/isLoggedIn');

            if(rispostaLogin.data.loggedIn !== true){
                history.push('/');
            }else{
                const resEmozioneUtente = await axios('http://localhost:3001/emozioneUtente');
                let emozioneUtente = resEmozioneUtente.data;
                
                if(emozioneUtente !== null && emozioneUtente !== 'neutro'){
                    const rispostaWebcam = await axios('http://localhost:3001/filmWebcam/'+emozioneUtente);
                    setFilmUmore(rispostaWebcam.data);
                }
                
                
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
                            if(filmPreferitiLet[i].titolo !== undefined){
                                const rispostaFilmPreferitoUno = await axios('http://localhost:3001/film/search/'+filmPreferitiLet[i].titolo);
                                if(Array.isArray(rispostaFilmPreferitoUno.data))
                                    setFilmsPreferitiUno(filmsPreferitiUno => [...filmsPreferitiUno, ...rispostaFilmPreferitoUno.data]);
                            }
                            
                        }
                    }

                }

                switch(emozioneUtente){
                    case 'triste': 
                        document.body.style.backgroundImage = "linear-gradient(to bottom right, #716F81, #12151e)";
                        break;
                    case 'felice':  
                        document.body.style.backgroundImage = "linear-gradient(to bottom right, #B5DEFF, #12151e)";
                        document.body.style.color = "#212529";
                        break;
                    case 'neutro': 
                        document.body.style.backgroundImage = "linear-gradient(to bottom right, #082032, #12151e)";
                        document.body.style.color = "#6c757d";
                        break;
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

                    {ultimoCaricamento && filmUmore && <h1>In base alla tua<b> emozione</b> </h1> }
                    {ultimoCaricamento && filmUmore && <br></br>}
                    {ultimoCaricamento && filmUmore && <Film films={filmUmore}/> }
                    
                    {ultimoCaricamento && filmPreferitiLista && <h1>I tuoi titoli <b> preferiti</b> </h1> }
                    {ultimoCaricamento && filmPreferitiLista && <br></br>}
                    {ultimoCaricamento && filmPreferitiLista && <Film films={filmPreferitiLista}/> }

                    {ultimoCaricamento && <h1>Nuove uscite...</h1>}
                    {ultimoCaricamento && <br></br>}
                    {ultimoCaricamento && <Film films={filmNuovi}/>}
                    

                    {ultimoCaricamento && filmsPreferitiUno && <h1>In base ai tuoi titoli <b>preferiti</b> </h1> }
                    {ultimoCaricamento && filmsPreferitiUno && <br></br>}
                    {ultimoCaricamento && filmsPreferitiUno && <Film films={filmsPreferitiUno}/> }
                </Container>
            </Container>
        </div>
    )
}

export default ListaFilm;