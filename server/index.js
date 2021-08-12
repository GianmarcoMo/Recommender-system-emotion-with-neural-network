const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json()); 
app.use(cors());

const db = mysql.createConnection({
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

    db.query('INSERT INTO utente (nome, cognome, email, password) VALUES (?,?,?,?)', 
        [nomeUtente, cognomeUtente, emailUtente, passUtente], 
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
})

app.post('/login', (req,res)=>{
    const emailUtente = req.body.email;
    const passUtente = req.body.password;

    db.query('SELECT * FROM utente WHERE email = ? AND password = ?', 
        [emailUtente, passUtente], 
        (err,result) => {
            if(err){
                res.send({err: err});
            }

            if(result.length > 0){
                res.send(result);
            }else{
                res.send({message: "Email o password sbagliata."});
            }
        }
    );
})

app.listen(3001, () => {
    console.log('Server avviato sulla porta 3001');
})