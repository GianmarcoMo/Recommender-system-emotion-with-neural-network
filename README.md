# Web 5.0: Sistema di raccomandazione emoziona-le per la soddisfazione dell’utente

# Requisiti

1. [npm](https://www.npmjs.com/)
2. [git](https://git-scm.com/downloads)
3. [node.js](https://nodejs.org/it/download/)
4. [Python](https://www.python.org/downloads/) ≥ 3.8.8 
5. [MySQL](https://www.mysql.com/it/) o altro tool simile

## Installazione pacchetti Front-End

1. Aprire la cartella '*client*' da terminale
2. Digitare `npm install` 

Verranno installati tutti i pacchetti.

## Installazione pacchetti Back-end (node.js)

1. Aprire la cartella '*server*' da terminale
2. Digitare `npm install`

Verranno installati tutti i pacchetti.

## Istruzioni per Font Awesome

1. Andare sul sito [Font awesome](https://fontawesome.com/start)
2. Generare un kit e copiare il tag `<script>`
3. Incollare il tag script nel file: `client/public/index.html`

## Creazione database

1. Creare un nuovo **schema** con MySQL o un altro tool simile
2. Eseguire il file **.sql** per creare le **tables**.
3. Aprire il file '**index.js**' nella cartella '**server**'
4. Modificare i dati per creare la connessione al database:

```jsx
const db = createConnection({
    user: 'NOME_USER',
    host: 'NOME_HOST',
    password: 'PASSWORD_DATABASE',
    database: 'NOME_SCHEMA',
});
```

## Configurazione file .env

1. Creare nella cartella server un file SENZA NOME con estensione **.env**
2. Inserire nel file creato `SECRET_COOKIE=Segreto`
3. Andare sul sito [themoviedb.org](http://themoviedb.org) e creare un account
4. Richiedere una key per utilizzare le [API](https://www.themoviedb.org/documentation/api) 
5. Dopo aver generato la key per le API andare sul file .env e inserire `API_KEY_FILM=KEY_GENERATA`

## Pacchetti per Python

1. `python -m pip install --user numpy scipy matplotlib ipython jupyter pandas sympy nose`
2. `pip install Js2Py`
3. `pip install opencv-python`
4. `pip install tensorflow`
5. `pip install keras`
6. `pip install seaborn`
7. `pip install flask` (per avviare il server python)

# Avviare i server

## Server Python

1. Andare nella cartella `recommenderSystem/serverPython/api/` dal terminale
2. Digitare `python api.py`

### Server node.js

1. Andare nella cartella `server/` dal terminale
2. Digitare `npm run devStart`

### Front-end

1. Andare nella cartella client/ dal terminale
2. Digitare `npm start`
