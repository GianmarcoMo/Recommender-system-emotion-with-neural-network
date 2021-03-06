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

//  Effettua richiesta al server python per ricevere i film
//  dopo aver interrogato il dataset
export const film_preferito = async (titolo_film) => {
    let response;

    //  richiesta api
    try {
        response = await axios.get('http://127.0.0.1:5000/film?titolo='+titolo_film);
        //  Se la richiesta è andata a buon fine
        if(response.status === 200)
            return response.data;
        
        return response.status;
    } catch (e) {
        // errore
        throw new Error(e.message)
    }
}

export const film_emozioni = async (emozione) => {
    let response;

    try {
        response = await axios.get('http://127.0.0.1:5000/filmemo?emozione='+emozione);
        //  Se la richiesta è andata a buon fine
        if(response.status === 200)
            return response.data;
        
        return response.status;
    }catch (e) {
        // errore
        throw new Error(e.message)
    }
}

//  Utilizzando i titoli dei film
//  utilizza le api di un altro sito e crea degli oggetti di film con locandina, titolo e trama.
export const dati_film = async (lista_film) =>{
    let response, responseTrailer;
    //  Array che conterrà gli oggetti dei film
    const films = [];

    let i = 0;
    //  Per ogni titolo di film invia una richiesta API
    for (const film of lista_film){
        let valore = Object.values(film);

        try {
            if(Object.keys(valore[0]) == 'TV Show'){
                response = await axios.get('https://api.themoviedb.org/3/search/tv?api_key='+process.env.API_KEY_FILM+'&query=' + Object.keys(film));

                //console.log("FILM: "+ film + " RISULTATI: "+ response.data.total_results);
                //  Se esiste un risultato, lo registra
                if(response.data.total_results != 0 && response.data.results[0].poster_path != null){
                    //  Effettua la richiesta per il trailer del titolo
                    responseTrailer = await axios.get('https://api.themoviedb.org/3/tv/'+response.data.results[0].id+'/videos?api_key='+process.env.API_KEY_FILM+'&language=en-US');

                    if(responseTrailer.data.results.length != 0){
                        //  Istanza con i dati dei film
                        let filmObj = {
                            locandina: "https://image.tmdb.org/t/p/w500"+response.data.results[0].poster_path,
                            titolo : response.data.results[0].name,
                            trama : response.data.results[0].overview,
                            genere : Object.values(valore[0]),
                            tipo: Object.keys(valore[0]),
                            trailer: 'https://www.youtube.com/embed/'+responseTrailer.data.results[0].key
                        }
                        i++;
                        films.push(filmObj);
                        /*
                        //  Se non esiste la locandina, non inserire il film
                        if(response.data.results[0].poster_path != null){
                            i++;
                            films.push(filmObj);
                        }*/
                    }
                }

            }else{
                response = await axios.get('https://api.themoviedb.org/3/search/movie?api_key='+process.env.API_KEY_FILM+'&query=' + Object.keys(film));

                //  Se esiste un risultato, lo registra
                if(response.data.total_results != 0 && response.data.results[0].poster_path != null){
                    //  Effettua la richiesta per il trailer del titolo
                    responseTrailer = await axios.get('https://api.themoviedb.org/3/movie/'+response.data.results[0].id+'/videos?api_key='+process.env.API_KEY_FILM+'&language=en-US');

                    if(responseTrailer.data.results.length != 0){
                        //  Istanza con i dati dei film
                        let filmObj = {
                            locandina: "https://image.tmdb.org/t/p/w500"+response.data.results[0].poster_path,
                            titolo : response.data.results[0].title,
                            trama : response.data.results[0].overview,
                            genere : Object.values(valore[0]),
                            tipo: Object.keys(valore[0]),
                            trailer: 'https://www.youtube.com/embed/'+responseTrailer.data.results[0].key
                        }
                        i++;
                        films.push(filmObj);
                    }
                }
            }
            if(i == 10)
                break;
        } catch (e) {
            console.log(e.message);
            return e;            
        }        
    };
    return films;
}

export const dati_film_sql = async (lista_film) =>{
    let response, responseTrailer;
    //  Array che conterrà gli oggetti dei film
    const films = [];
    
    //  Per ogni titolo di film invia una richiesta API
    for (const film of lista_film){
        try {
            if(film.tipoFilm == 'TV Show'){
                response = await axios.get('https://api.themoviedb.org/3/search/tv?api_key='+process.env.API_KEY_FILM+'&query=' + film.titoloFilm);

                //  Se esiste un risultato, lo registra
                if(response.data.total_results != 0 && response.data.results[0].poster_path != null){
                    //  Effettua la richiesta per il trailer del titolo
                    responseTrailer = await axios.get('https://api.themoviedb.org/3/tv/'+response.data.results[0].id+'/videos?api_key='+process.env.API_KEY_FILM+'&language=en-US');

                    if(responseTrailer.data.results.length != 0){
                        //  Istanza con i dati dei film
                        let filmObj = {
                            locandina: "https://image.tmdb.org/t/p/w500"+response.data.results[0].poster_path,
                            titolo : film.titoloFilm,
                            trama : response.data.results[0].overview,
                            genere : film.genereFilm,
                            tipo: film.tipoFilm,
                            trailer: 'https://www.youtube.com/embed/'+responseTrailer.data.results[0].key
                        }
                        films.push(filmObj);
                    }
                }

            }else{
                response = await axios.get('https://api.themoviedb.org/3/search/movie?api_key='+process.env.API_KEY_FILM+'&query=' + film.titoloFilm);

                //console.log("FILM: "+ film + " RISULTATI: "+ response.data.total_results);
                //  Se esiste un risultato, lo registra
                if(response.data.total_results != 0 && response.data.results[0].poster_path != null){
                    //  Effettua la richiesta per il trailer del titolo
                    responseTrailer = await axios.get('https://api.themoviedb.org/3/movie/'+response.data.results[0].id+'/videos?api_key='+process.env.API_KEY_FILM+'&language=en-US');

                    if(responseTrailer.data.results.length != 0){
                        //  Istanza con i dati dei film
                        let filmObj = {
                            locandina: "https://image.tmdb.org/t/p/w500"+response.data.results[0].poster_path,
                            titolo : film.titoloFilm,
                            trama : response.data.results[0].overview,
                            genere : film.genereFilm,
                            tipo: film.tipoFilm,
                            trailer: 'https://www.youtube.com/embed/'+responseTrailer.data.results[0].key
                        }
                        films.push(filmObj);
                    }
                }
            }
        } catch (e) {
            // catch error
            throw new Error(e.message)
        }        
    };
    return films;
}

export const invio_immagine = async (imgUtente) => {
    let response;
    //  richiesta api
    try {
        response = await axios.get('http://127.0.0.1:5000/emozione?nomeFile='+imgUtente);
        //  Se la richiesta è andata a buon fine
        if(response.status === 200)
            return response.data;
        
        return response.status;
    } catch (e) {
        // errore
        throw new Error(e.message)
    }
}
