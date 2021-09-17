import express, { json } from "express";
import { createConnection } from "mysql";
import cors from "cors";
import {film_nuovi, dati_film, film_preferito, dati_film_sql, invio_immagine, film_emozioni} from './api/api.js';
import { scattaFoto } from "./control/webcam.js";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";

import dotenv from 'dotenv';
const result = dotenv.config();
if (result.error) {
    throw result.error
}

//  Per criptare le password da inserire nel datbase
import bcrypt from 'bcrypt';

const saltRounds = 10;

const app = express();

app.use(json());
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    key: "userCookie",
    secret: process.env.SECRET_COOKIE,
    resave: true,
    saveUninitialized: false,
    cookie: {
        expires: 1000 * 60 * 15,
    }
}))

const db = createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'ProgettoFilmTesi',
});

app.post('/registrati', (req, res) => {
    const nomeUtente = req.body.nome;
    const cognomeUtente = req.body.cognome;
    const emailUtente = req.body.email;
    const passUtente = req.body.password;

    //  metodo per cripatare la password
    bcrypt.hash(passUtente, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        } else {
            db.query('INSERT INTO utente (nome, cognome, email, password) VALUES (?,?,?,?)',
                [nomeUtente, cognomeUtente, emailUtente, hash],
                (err, result) => {
                    if (err) {
                        res.send(false);
                    } else {
                        if (result) {
                            req.session.user = emailUtente
                            res.send(true);
                        } else {
                            res.send(false);
                        }
                    }
                }
            );
        }
    });
})

app.get('/emozioneUtente', (req,res) => {
    //  richista server python
    scattaFoto(req.session.user)
        .then((resFoto) => {
            //  invio immagine per essere analizzata
            (invio_immagine(resFoto))
                .then(emozione=>{      
                    res.send(emozione.emozioneUtente);         
                });
        });
//  fine scatta_foto()
});

app.get('/filmWebcam/:emozione', (req,res) => {
    if(req.params.emozione == "allontanati dal dispositivo"){
        res.send(null);
    }else{
        (film_emozioni(req.params.emozione))
            .then(film=>{
                //  richiesta API al sito online di film per la costruzione di oggetti
            dati_film(film.film_emozione)
                .then(dati=>{
                    //  Invio al client
                    res.send(dati);
                });
            });
    }
});

app.post('/login', (req, res) => {
    const emailUtente = req.body.email;
    const passUtente = req.body.password;

    db.query('SELECT * FROM utente WHERE email = ?;',
        emailUtente,
        (err, result) => {
            if (err) {
                res.send({
                    err: err
                });
            }

            if (result.length > 0) {
                bcrypt.compare(passUtente, result[0].password, (err, response) => {
                    if (response) {
                        req.session.user = result[0].email;
                        
                        res.send(response);
                    } else {
                        res.send(response);
                    }
                })
            } else {
                res.send(result);
            }
        }
    );
})

app.get('/isLoggedIn', (req,res)=>{
    if(req.session.user){
        res.send({loggedIn: true, user:req.session.user});
    }else{
        res.send({logginIn: false});
    }
});

app.get('/film/nuovi', (req,res) =>{
    //  richista server python
    film_nuovi()
        .then((response) => {
            //  richiesta API al sito online di film per la costruzione di oggetti
            dati_film(response.film_nuovi)
                .then(dati=>{
                    //  Invio al client
                    res.send(dati);
                });
        });
    //  fine film_nuovi()
});

app.get('/film/search/:titolo', (req,res) =>{
    //  richista server python
    film_preferito(req.params.titolo)
        .then((response) => {
            //  richiesta API al sito online di film per la costruzione di oggetti
            dati_film(response.film_raccomandati)
                .then(dati=>{
                    //  Invio al client
                    res.send(dati);
                });
        });
    //  fine film_preferito()

});

app.get('/datiUtente', (req,res) =>{
    db.query('SELECT nome,cognome,email FROM utente WHERE email = ?;',
        req.session.user,
        (err, result) => {
            if (err) {
                res.send({
                    err: err
                });
            }

            if (result.length > 0) {
                res.send(result)
            } else {
                res.send(result);
            }
        }
    );
})

app.get('/film/preferiti', (req, res) => {
    db.query('SELECT titoloFilm, genereFilm, tipoFilm FROM filmPreferitiUtente WHERE emailUtente = ? ORDER BY dataAggiunta DESC;',
        req.session.user,
        (err, result) => {
            if (err) {
                res.send({
                    err: err
                });
            }

            if (result.length > 0) {
                dati_film_sql(result)
                    .then(dati=>{
                        //  Invio al client
                        res.send(dati);
                    });
            } else {
                res.send(result);
            }
        }
    );
})

app.get('/film/preferenze', (req,res) =>{
    db.query('SELECT titoloFilm FROM filmPreferitiUtente WHERE emailUtente = ? ORDER BY dataAggiunta DESC;',
        req.session.user,
        (err, result) => {
            if (err) {
                res.send({
                    err: err
                });
            }

            if (result.length > 0) {
                res.send(result);
            } else {
                res.send(result);
            }
        }
    );
})

app.post('/filmPreferito', (req,res) => {
    let film = {
        titolo: req.body.film,
        genere: req.body.genere, 
        tipo : req.body.tipo
    }

    //  Controlla se il film esiste già
    db.query('SELECT titoloFilm FROM filmPreferitiUtente WHERE titoloFilm = ? AND emailUtente = ?;',
        [film.titolo, req.session.user],
        (err, result) => {
            if (err) {
                res.send({
                    err: err
                });
            }

            if (result.length > 0) {
                db.query(' DELETE FROM filmPreferitiUtente WHERE titoloFilm = ? AND emailUtente = ?;',[film.titolo, req.session.user],
                    (err, result) => {
                        if (err) {
                            res.send({
                                err: err
                            });
                        }
                        if (result) {
                            res.send('ok')
                        } else {
                            res.send('no');
                        }
                    }
                );
                
            
            //  Se il risultato è 0, ovvero non esiste il film, lo inserisce
            } else {
                db.query('INSERT INTO filmPreferitiUtente (emailUtente, titoloFilm, genereFilm, tipoFilm, dataAggiunta) VALUES (?,?,?,?,?)',
                    [req.session.user, film.titolo, film.genere, film.tipo, new Date()],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                            res.send(false);
                        } else {
                            if (result) {
                                console.log(result);
                                res.send(result);
                            } else {
                                console.log(result);
                                res.send(result);
                            }
                        }
                    }
                );
            }
        }
    );

})

app.post('/tempoLettura/:tempo/:titolo', (req,res) =>{
    const tempoLettura = req.params["tempo"];
    const titolo = req.params["titolo"];

    //  Controlla se il film esiste già
    db.query('SELECT titoloElemento FROM tempoLetturaTrama WHERE titoloElemento = ? AND emailUtente = ?;',
        [titolo, req.session.user],
        (err, result) => {
            if (err) {
                res.send({
                    err: err
                });
            }

            if (result.length > 0) {
                db.query('UPDATE tempoLetturaTrama SET tempo = ? WHERE (emailUtente = ?) and (titoloElemento = ?);',[tempoLettura, req.session.user, titolo],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                            res.send({
                                err: err
                            });
                        }
                        if (result) {
                            res.send('ok')
                        } else {
                            console.log(result);
                            res.send('no');
                        }
                    }
                );
                
            
            //  Se il risultato è 0, ovvero non esiste il film, lo inserisce
            } else {
                db.query('INSERT INTO tempoLetturaTrama (titoloElemento, tempo, emailUtente) VALUES (?,?,?)',
                    [titolo, tempoLettura, req.session.user],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                            res.send(false);
                        } else {
                            if (result) {
                                res.send(result);
                            } else {
                                console.log(result);
                                res.send(result);
                            }
                        }
                    }
                );
            }
        }
    );
});

app.listen(3001, () => {
    console.log('Server avviato sulla porta 3001');
})

