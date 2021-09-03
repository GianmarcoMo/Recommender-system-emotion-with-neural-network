//  axios per richieste API
import axios from "axios";
//  dotenv per prelevare la key dell'api 
import dotenv from 'dotenv';
const result = dotenv.config();
if (result.error) {
    throw result.error
}

//  Effettua richiesta al server python per ricevere i film
//  dopo aver interrogato il dataset
export const film_nuovi = async () => {
    let response;

    //  richiesta api
    try {
        response = await axios.get('http://127.0.0.1:5000/film/nuovi');
        //  Se la richiesta è andata a buon fine
        if(response.status === 200)
            return response.data;
        
        return response.status;
    } catch (e) {
        // errore
        throw new Error(e.message)
    }
}

//  Utilizzando i titoli dei film
//  utilizza le api di un altro sito e crea degli oggetti di film con locandina, titolo e trama.
export const dati_film = async (lista_film) =>{
    let response;
    //  Array che conterrà gli oggetti dei film
    const films = [];

    //  Per ogni titolo di film invia una richiesta API
    for (const film of lista_film){
        try {
            response = await axios.get('https://api.themoviedb.org/3/search/movie?api_key='+process.env.API_KEY_FILM+'&query=' + film);

            //console.log("FILM: "+ film + " RISULTATI: "+ response.data.total_results);
            //  Se esiste un risultato, lo registra
            if(response.data.total_results != 0){
                //  Istanza con i dati dei film
                let filmObj = {
                    locandina: "https://image.tmdb.org/t/p/w500"+response.data.results[0].poster_path,
                    titolo : response.data.results[0].title,
                    trama : response.data.results[0].overview
                }

                films.push(filmObj);
            }
        } catch (e) {
            // catch error
            throw new Error(e.message)
        }        
    };
    //console.log(films);
    return films;
}
