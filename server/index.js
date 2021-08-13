import express, { json, response } from "express";
import { createConnection } from "mysql";
import cors from "cors";

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
        expires: 60*60*24,
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
                            res.send(req.session.user);
                        } else {
                            console.log(result);
                            res.send(result);
                        }
                    }
                }
            );
        }
    });
})

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

app.listen(3001, () => {
    console.log('Server avviato sulla porta 3001');
})