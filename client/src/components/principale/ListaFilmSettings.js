import {useEffect} from 'react';
import React from 'react';
import axios from 'axios';

import {Button} from 'react-bootstrap';

const Film = ({filmPreferitiLista}) => {   
    function cancellaTitolo(titolo, genere, tipo){        
        const inviaFilm = async () =>{
            await axios.post('http://localhost:3001/filmPreferito', {film: titolo, genere: genere, tipo: tipo});
        }

        inviaFilm();
    }

    useEffect(() => {

    }, [cancellaTitolo]);

    return(
        <tbody>
            {filmPreferitiLista.map((film) => (                
                <tr key={film.titolo}>
                    <td>{film.titolo}</td>
                    <td><Button variant="outline-danger"  value={film.titolo} onClick={() => cancellaTitolo(film.titolo, film.genere, film.tipo)}><i className="far fa-trash-alt"></i></Button></td>
                </tr>
            ))}                   
        </tbody>
    )
};

export default Film;
