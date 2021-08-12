import express, { json, response } from "express";
import { createConnection } from "mysql";
import cors from "cors";

//  Per criptare le password da inserire nel datbase
import bcrypt from 'bcrypt';
const saltRounds = 10;

const app = express();

app.use(json()); 
app.use(cors());

const db = createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'ProgettoFilmTesi',
});

app.post('/registrati', (req,res)=>{
    const nomeUtente = req.body.nome;
    const cognomeUtente = req.body.cognome;
    const emailUtente = req.body.email;
    const passUtente = req.body.password;

    //  metodo per cripatare la password
    bcrypt.hash(passUtente, saltRounds, (err, hash) =>{
        if(err){
            console.log(err);
        }else{
            db.query('INSERT INTO utente (nome, cognome, email, password) VALUES (?,?,?,?)', 
                [nomeUtente, cognomeUtente, emailUtente, hash], 
                (err,result) => {
                    if(err){
                        console.log(err);
                    }else{
                        if(result){
                            res.send(result);
                        }else{
                            res.send({message: "Qualcosa è andato storto."});
                        }
                    }
                }
            );
        }
    });    
})

app.post('/login', (req,res)=>{
    const emailUtente = req.body.email;
    const passUtente = req.body.password;

    db.query('SELECT * FROM utente WHERE email = ?;', 
        emailUtente,
        (err,result) => {
            if(err){
                res.send({err: err});
            }

            if(result.length > 0){
                bcrypt.compare(passUtente, result[0].password, (err, response) =>{
                    if(response){
                        res.send(response);
                    }else{
                        res.send(response);
                    }
                })
            }else{
                res.send({message: result.length});
            }
        }
    );
})

app.listen(3001, () => {
    console.log('Server avviato sulla porta 3001');
})