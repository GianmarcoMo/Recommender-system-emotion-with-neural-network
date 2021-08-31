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


def emotion_analysis(emotions):
    objects = ('angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral')
    y_pos = np.arange(len(objects))

    plt.bar(y_pos, emotions, align='center', alpha=0.5)
    plt.xticks(y_pos, objects)
    plt.ylabel('percentage')
    plt.title('emotion')

    plt.show()


def take_photo(CV_WINDOW_AUTOSIZE=None):
    cam = VideoCapture(0)  # 0 -> index of camera
    s, img = cam.read()
    if s:  # frame captured without any errors
        namedWindow("cam-test", CV_WINDOW_AUTOSIZE)
        imshow("cam-test", img)
        destroyWindow("cam-test")
        imwrite("fotoUtente.jpg", img)  # save image
        print("Foto scattata.")
    else:
        print(s)


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

            cv2.imwrite('fotoUtenteModificata.jpg', sub_face)
            print("Immagine creata: " + image)

    except Exception as e:
        print(e)


train_dir = 'dataset/train'
val_dir = 'dataset/test'
train_datagen = ImageDataGenerator(rescale=1. / 255)
val_datagen = ImageDataGenerator(rescale=1. / 255)

train_generator = train_datagen.flow_from_directory(
    train_dir,
    target_size=(48, 48),
    batch_size=64,
    color_mode="grayscale",
    class_mode='categorical')

validation_generator = val_datagen.flow_from_directory(
    val_dir,
    target_size=(48, 48),
    batch_size=64,
    color_mode="grayscale",
    class_mode='categorical')

emotion_model = Sequential()
emotion_model.add(Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(48, 48, 1)))
emotion_model.add(Conv2D(64, kernel_size=(3, 3), activation='relu'))
emotion_model.add(MaxPooling2D(pool_size=(2, 2)))
emotion_model.add(Dropout(0.25))
emotion_model.add(Conv2D(128, kernel_size=(3, 3), activation='relu'))
emotion_model.add(MaxPooling2D(pool_size=(2, 2)))
emotion_model.add(Conv2D(128, kernel_size=(3, 3), activation='relu'))
emotion_model.add(MaxPooling2D(pool_size=(2, 2)))
emotion_model.add(Dropout(0.25))
emotion_model.add(Flatten())
emotion_model.add(Dense(1024, activation='relu'))
emotion_model.add(Dropout(0.5))
emotion_model.add(Dense(7, activation='softmax'))

"""
emotion_model.compile(loss='categorical_crossentropy',optimizer=Adam(lr=0.0001, decay=1e-6),metrics=['accuracy'])
emontion_model_info = emotion_model.fit_generator(
        train_generator,
        steps_per_epoch=28709 // 64,
        epochs=50,
        validation_data=validation_generator,
        validation_steps=7178 // 64)

#Saving the model
emotion_model.save('model.h5')
"""
emotion_model = load_model('model.h5')

input_utente = ""
while input_utente != 'esci':
    print("Digita 'esci' per uscire oppure 'scatta' per scattare foto: ")
    input_utente = input()

    if input_utente == 'scatta':
        #take_photo()
        facecrop('fotoUtente.jpg')
        file = 'fotoUtenteModificata.jpg'
        true_image = image.load_img(file)
        img = image.load_img(file, color_mode="grayscale", target_size=(48, 48))

        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)

        x /= 255

        custom = emotion_model.predict(x)
        emotion_analysis(custom[0])

        x = np.array(x, 'float32')
        x = x.reshape([48, 48]);

        plt.imshow(true_image)
        plt.show()

