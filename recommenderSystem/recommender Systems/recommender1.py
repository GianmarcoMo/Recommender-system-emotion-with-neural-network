#   Importiamo le librerie
import networkx as nx
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import math as math
import time
plt.style.use('seaborn')
plt.rcParams['figure.figsize'] = [14, 14]

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from sklearn.cluster import MiniBatchKMeans


# Cerca i primi n film simili per descrizione
def cerca_simili(tfidf_matrix, index, top_n = 5):
    cosine_similarities = linear_kernel(tfidf_matrix[index:index + 1], tfidf_matrix).flatten()
    related_docs_indices = [i for i in cosine_similarities.argsort()[::-1] if i != index]
    return [index for index in related_docs_indices][0:top_n]


def get_tutti_nodi(list_in):
    sub_graph = set()
    for m in list_in:
        sub_graph.add(m)
        for e in G.neighbors(m):
            sub_graph.add(e)
    return list(sub_graph)


def disegna_grafo(sub_graph):
    subgraph = G.subgraph(sub_graph)
    colors = []
    for e in subgraph.nodes():
        if G.nodes[e]['label'] == "MOVIE":
            colors.append('blue')
        elif G.nodes[e]['label'] == "PERSON":
            colors.append('red')
        elif G.nodes[e]['label'] == "CAT":
            colors.append('green')
        elif G.nodes[e]['label'] == "COU":
            colors.append('yellow')
        elif G.nodes[e]['label'] == "SIMILAR":
            colors.append('orange')
        elif G.nodes[e]['label'] == "CLUSTER":
            colors.append('orange')

    nx.draw(subgraph, with_labels=True, font_weight='bold', node_color=colors)
    plt.show()


def raccomandazione(root):
    commons_dict = {}
    try:
        for e in G.neighbors(root):
            for e2 in G.neighbors(e):
                if e2 == root:
                    continue
                if G.nodes[e2]['label'] == "MOVIE":
                    commons = commons_dict.get(e2)
                    if commons == None:
                        commons_dict.update({e2: [e]})
                    else:
                        commons.append(e)
                        commons_dict.update({e2: commons})
    except:
        print("")

    movies = []
    weight = []
    for key, values in commons_dict.items():
        w = 0.0
        for e in values:
            w = w + 1 / math.log(G.degree(e))
        movies.append(key)
        weight.append(w)

    result = pd.Series(data=np.array(weight), index=movies)
    result.sort_values(inplace=True, ascending=False)
    
    return result;

def costruisci_film(elencoFilm):
    df_noedit = pd.read_csv('../datasetProgetto/netflix_titles.csv')
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
    for i in range(5):
        for k in range(len(df_noedit)):
            if(df_noedit.values[k][1] == elencoFilm[i]):
                film_cercati.append({df_noedit.values[k][1]: {df_noedit.values[k][0] : categoria_elemento(df_noedit.values[k][2])}})

    return film_cercati

def categoria_elemento(stringa_categorie):
    array_parole = stringa_categorie.split(",")
    return array_parole[0]

#   Recommender system con i grafi
"""
Viene calcolato la matrice TF-IDF, per ogni film vengono presi i primi 5 film simili per descrizione
 e viene creato un nodo.
"""

# Carichiamo i dati
df = pd.read_csv('../datasetProgetto/netflix_titles.csv')

df["date_added"] = pd.to_datetime(df['date_added'])
df['year'] = df['date_added'].dt.year
df['month'] = df['date_added'].dt.month
df['day'] = df['date_added'].dt.day

# Convertiamo le colonne in lista
df['directors'] = df['director'].apply(lambda l: [] if pd.isna(l) else [i.strip() for i in l.split(",")])
df['categories'] = df['listed_in'].apply(lambda l: [] if pd.isna(l) else [i.strip() for i in l.split(",")])
df['actors'] = df['cast'].apply(lambda l: [] if pd.isna(l) else [i.strip() for i in l.split(",")])
df['countries'] = df['country'].apply(lambda l: [] if pd.isna(l) else [i.strip() for i in l.split(",")])

# Clustering Kmeans con TF-IDF
start_time = time.time()
text_content = df['description']
vector = TfidfVectorizer(max_df=0.4,
                         min_df=1,  # usiamo le parole che compaiono x volte
                         stop_words='english',
                         lowercase=True,
                         use_idf=True,
                         norm=u'l2',  # normalizzazione
                         smooth_idf=True  # Preveniamo l'errore della divisione per zero
                         )

tfidf = vector.fit_transform(text_content)

# Clustering  K-means
k = 200
kmeans = MiniBatchKMeans(n_clusters=k)
kmeans.fit(tfidf)
centers = kmeans.cluster_centers_.argsort()[:, ::-1]
terms = vector.get_feature_names()

request_transform = vector.transform(df['description'])
# Colonne sottoposte al cluster basate sulla descrizione
df['cluster'] = kmeans.predict(request_transform)


#   Creazione del grafo
G = nx.Graph(label="MOVIE")
start_time = time.time()
for i, rowi in df.iterrows():
    if i % 1000 == 0:
        print(" iter {} -- {} seconds --".format(i, time.time() - start_time))

    G.add_node(rowi['title'], key=rowi['show_id'], label="MOVIE", mtype=rowi['type'], rating=rowi['rating'])
    for element in rowi['actors']:
        G.add_node(element, label="PERSON")
        G.add_edge(rowi['title'], element, label="ACTED_IN")
    for element in rowi['categories']:
        G.add_node(element, label="CAT")
        G.add_edge(rowi['title'], element, label="CAT_IN")
    for element in rowi['directors']:
        G.add_node(element, label="PERSON")
        G.add_edge(rowi['title'], element, label="DIRECTED")
    for element in rowi['countries']:
        G.add_node(element, label="COU")
        G.add_edge(rowi['title'], element, label="COU_IN")

    indices = cerca_simili(tfidf, i, top_n=5)
    snode = "Sim(" + rowi['title'][:15].strip() + ")"
    G.add_node(snode, label="SIMILAR")
    G.add_edge(rowi['title'], snode, label="SIMILARITY")
    for element in indices:
        G.add_edge(snode, df['title'].loc[element], label="SIMILARITY")

item = ""

while item != "esci":
    print("")
    print("Inserisci film o serie TV,\noppure scrivi 'esci' per uscire.")
    item = input()

    if item != "esci":
        """
        try:
            sub_graph = get_tutti_nodi(item)
            disegna_grafo(sub_graph)
        except:
            print('Film non trovato')
        """
        result = raccomandazione(item)
        costruisci_film(result.index.values.tolist())

        if result.empty:
            print("Nessun risultato trovato.")
        else:
            print("*" * 40 + "\n Racommandazioni per " + item + "\n" + "*" * 40)
            print(result.head())


exit()

# titolo-genere-tipo