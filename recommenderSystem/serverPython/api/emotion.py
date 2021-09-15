import numpy as np
import cv2
from cv2 import *
from keras.models import Sequential, load_model
from keras.layers import Dense, Dropout, Flatten, Conv2D, MaxPooling2D
from keras.preprocessing import image
from keras.preprocessing.image import ImageDataGenerator
import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.optimizers import Adam
from keras.preprocessing.image import ImageDataGenerator
from IPython.display import display, Javascript
from base64 import b64decode

import tensorflow as ff

"""
Altri pacchetti:
- SciPy
    python -m pip install --user numpy scipy matplotlib ipython jupyter pandas sympy nose
- PIL
    pip install pillow
- Js2Py
    pip install Js2Py

"""

def identifica_emozione(emozioni):
    valore_max = emozioni[0]
    emozioni_nomi = ['felice','triste', 'neutrale']
    indice_max = 0

    for i in range(3):
        if(emozioni[i] > valore_max):
            valore_max = emozioni[i]
            indice_max = i

    return emozioni_nomi[indice_max]



def emotion_analysis(emotions):
    objects = ('angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral')
    y_pos = np.arange(len(objects))

    plt.bar(y_pos, emotions, align='center', alpha=0.5)
    plt.xticks(y_pos, objects)
    plt.ylabel('percentage')
    plt.title('emotion')

    plt.show()

def facecrop(image):
    facedata = 'dataset/haarcascade_frontalface_alt.xml'
    cascade = cv2.CascadeClassifier(facedata)

    img = cv2.imread(image)

    try:
        minisize = (img.shape[1], img.shape[0])
        miniframe = cv2.resize(img, minisize)

        faces = cascade.detectMultiScale(miniframe)

        for f in faces:
            x, y, w, h = [v for v in f]
            cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)

            sub_face = img[y:y + h, x:x + w]

            cv2.imwrite(image+'Modificata.jpg', sub_face)
            #print("Immagine creata: " + image)
    except Exception as e:
        print(e)

def sposta_immagine(directoryImmagine):
    from shutil import move

    move(directoryImmagine,
        '/home/gianmarchito/Documenti/Programmazione/progettoTesi/recommenderSystem/serverPython/api')

def elimina_immagini(nomeFileOriginale, nomeFileModificato):
    import os
    os.remove(nomeFileOriginale) 
    if os.path.isfile(nomeFileModificato):
        os.remove(nomeFileModificato) 

def predizione_emozione(fotoUtente):
    import os.path
    sposta_immagine('/home/gianmarchito/Documenti/Programmazione/progettoTesi/server/images/'+fotoUtente)
    
    emotion_model = load_model('model.h5')

    facecrop(fotoUtente)
    
    file = fotoUtente+'Modificata.jpg'
    if os.path.isfile(file):
        img = image.load_img(file, color_mode="grayscale", target_size=(48, 48))
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)

        x /= 255

        custom = emotion_model.predict(x)
        # custom[0][3] happy --- custom[0][4] sad --- custom[0][5] neutral
        emozioni = list()
        # happy
        emozioni.append(custom[0][3])
        # sad
        emozioni.append(custom[0][4])
        # netrual
        emozioni.append(custom[0][5])

        #   plot delle emozioni
        #emotion_analysis(custom[0])

        elimina_immagini(fotoUtente, fotoUtente+'Modificata.jpg')
        return(identifica_emozione(emozioni))
    else:
        elimina_immagini(fotoUtente, fotoUtente+'Modificata.jpg')
        return('allontanati dal dispositivo')
    

    
    
