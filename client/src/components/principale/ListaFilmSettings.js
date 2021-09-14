//import axios from 'axios';
import {React} from 'react';

import {Button} from 'react-bootstrap';

const Film = ({filmPreferitiLista}) => {   
    return(
        <tbody>
            {filmPreferitiLista.map((film) => (                
                <tr key={film.titoloFilm}>
                    <td>{film.titoloFilm}</td>
                    <td><Button variant="outline-danger"><i class="far fa-trash-alt"></i></Button></td>
                </tr>
            ))}                   
        </tbody>
    )
};

export default Film;
