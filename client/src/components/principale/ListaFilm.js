import {React, useEffect, useState} from 'react';

import Axios from 'axios';

import {Container} from 'react-bootstrap';
import Film from './Film';

/*<Container className='scelteFilm'>
                <Scelte />
            </Container>*/

const ListaFilm = () =>{
    const [films, setFilms] = useState();

    useEffect(() => {
        /*
        Axios.get("http://localhost:3001/isLoggedIn").then((response)=>{
            //console.log(response.data);
            if(response.data === true || response.data.loggedIn === true)
                history.push('/dashboard');
            else 
                history.push('/');
        });*/

        Axios.get("http://localhost:3001/film/nuovi").then((response)=>{
            setFilms(response.data);
        });
    }, []);


    return(
        <div>
            <Container className='elencoFilm'>
                {films && <h1>Nuove uscite...</h1>}
                {films && <br></br>}
                <Container>
                    {films && <Film films={films}/>}
                    {!films && <h1>Loading..</h1>}
                </Container>
            </Container>
        </div>
    )
}

export default ListaFilm;