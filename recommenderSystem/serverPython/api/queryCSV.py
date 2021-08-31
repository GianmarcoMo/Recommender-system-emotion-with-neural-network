import json

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

path_file = "../datasetProgetto/netflix_titles.csv"
netflix = pd.read_csv(path_file)


def film_nuovi():
    print("\n Film nuovi")
    #   Film nuovi
    df = netflix['release_year'].sort_values(ascending=False)[:10].to_frame()
    film_nuovi = list()

    for i in df.index:
        film_nuovi.append(netflix['title'].iloc[i])

    return film_nuovi

