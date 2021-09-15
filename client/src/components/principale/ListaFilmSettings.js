//import axios from 'axios';
import {React} from 'react';
import axios from 'axios';

import {Button} from 'react-bootstrap';

const Film = ({filmPreferitiLista}) => {   
    function saveFilm(titolo, genere, tipo){        
        const inviaFilm = async () =>{
            await axios.post('http://localhost:3001/filmPreferito', {film: titolo, genere: '', tipo: ''});
        }

        inviaFilm();
    }

    return(
        <tbody>
            {filmPreferitiLista.map((film) => (                
                <tr key={film.titoloFilm}>
                    <td>{film.titoloFilm}</td>
                    <td><Button variant="outline-danger" value={film.titoloFilm} onClick={() => saveFilm(film.titoloFilm)}><i className="far fa-trash-alt"></i></Button></td>
                </tr>
            ))}                   
        </tbody>
    )
};

export default Film;
