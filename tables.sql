CREATE TABLE utente (
    nome VARCHAR(30) NOT NULL,
    cognome VARCHAR(35),
    email VARCHAR(100) NOT NULL,
    password CHAR(100) NOT NULL,
    PRIMARY KEY(email)
);

CREATE TABLE utente (
    emailUtente VARCHAR(100) NOT NULL,
    titoloFilm VARCHAR(100) NOT NULL,
    genereFilm VARCHAR(60) NOT NULL,
    tipoFilm VARCHAR(60) NOT NULL,
    dataAggiunta DATE NOT NULL,
    PRIMARY KEY(emailUtente),
    PRIMARY KEY(titoloFilm)
);

CREATE TABLE utente (
    titoloElemento VARCHAR(100) NOT NULL,
    emailUtente VARCHAR(100) NOT NULL,
    tempo TIME NOT NULL,
    PRIMARY KEY(titoloElemento),
    PRIMARY KEY(emailUtente)
);
