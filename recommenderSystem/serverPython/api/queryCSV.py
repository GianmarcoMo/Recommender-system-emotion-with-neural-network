import json

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# import api as edifFilms

path_file = "../datasetProgetto/netflix_titles.csv"
netflix = pd.read_csv(path_file)

def costruisci_film(elencoFilm):
    df_noedit = pd.read_csv(path_file)
    
    df_noedit = df_noedit.drop('show_id', axis=1)
    df_noedit = df_noedit.drop('director', axis=1)
    df_noedit = df_noedit.drop('country', axis=1)
    df_noedit = df_noedit.drop('cast', axis=1)
    df_noedit = df_noedit.drop('date_added', axis=1)
    df_noedit = df_noedit.drop('release_year', axis=1)
    df_noedit = df_noedit.drop('rating', axis=1)
    df_noedit = df_noedit.drop('duration', axis=1)
    df_noedit = df_noedit.drop('description', axis=1)

    film_cercati = list()

    print('Stampa righe dei film cercati')
    for i in range(10):
        for k in range(len(df_noedit)):
            if(df_noedit.values[k][1] == elencoFilm[i]):
                film_cercati.append({df_noedit.values[k][1]: {df_noedit.values[k][0] : categoria_elemento(df_noedit.values[k][2])}})

    return film_cercati

def categoria_elemento(stringa_categorie):
    array_parole = stringa_categorie.split(",")
    return array_parole[0]

def film_nuovi():
    #   Film nuovi
    df = netflix['release_year'].sort_values(ascending=False)[:10].to_frame()
    film_nuovi = list()

    for i in df.index:
        film_nuovi.append(netflix['title'].iloc[i])

    film_nuovi = costruisci_film(film_nuovi)

    return film_nuovi

def film_base_emozione(emozione):
    #   Film nuovi
    df = netflix['release_year'].sort_values(ascending=False).to_frame()
    check_stop = 15

    if(emozione == 'triste'):
        film_drammatici = list()
        # check per contare i film
        check = 0

        for i in df.index:
            if(netflix['listed_in'].iloc[i].find('Dramas') != -1 or netflix['listed_in'].iloc[i].find('TV Dramas') != -1 and ( netflix['country'].iloc[i].find('United') != -1 or netflix['country'].iloc[i].find('Italy') != -1 )):
                check +=1
                film_drammatici.append(netflix['title'].iloc[i])
            # quando check arriva a 10, esce dal ciclo for
            if(check == check_stop):
                break
        film_drammatici = costruisci_film(film_drammatici)
        return film_drammatici

    #   Se l'umore e' felice 
    if(emozione == 'felice'):
        film_felici = list()
        # check per contare i film
        check = 0

        for i in df.index:
            if(netflix['listed_in'].iloc[i].find('Comedies') != -1 and ( netflix['country'].iloc[i].find('United') != -1 or netflix['country'].iloc[i].find('Italy') != -1 )):
                check +=1
                film_felici.append(netflix['title'].iloc[i])
            # quando check arriva a 10, esce dal ciclo for
            if(check == check_stop):
                break
        film_felici = costruisci_film(film_felici)
        return film_felici
