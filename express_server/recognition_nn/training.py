from sklearn.model_selection import train_test_split
from keras.models import Sequential
from keras.layers import Dense, Dropout, Conv2D, MaxPooling2D, Flatten, Input, GlobalAveragePooling2D
from keras.utils import to_categorical
from random import randint
import numpy as np
from PIL import Image
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'


N = 30000
N_EPOCHS = 5

files = ['apple.npy', 'banana.npy', 'grapes.npy', 'pineapple.npy', 'asparagus.npy', 'blackberry.npy',
         'blueberry.npy', 'mushroom.npy', 'onion.npy', 'peanut.npy', 'pear.npy', 'peas.npy',
         'potato.npy', 'steak.npy', 'strawberry.npy']


N_ITEMS = 15
ITEMS = {}
for i, file_name in enumerate(files[0:], start=0):
    ITEMS[i] = file_name.split('.')[0].replace(' ', '_').capitalize()

print(ITEMS)


def load(dir, files, reshaped):
    "Load .npy or .npz files from disk and return them as numpy arrays. \
    Takes in a list of filenames and returns a list of numpy arrays."

    data = []
    for file in files:
        f = np.load(dir + file)
        if reshaped:
            new_f = []
            for i in range(len(f)):
                x = np.reshape(f[i], (28, 28))
                x = np.expand_dims(x, axis=0)
                x = np.reshape(f[i], (28, 28, 1))
                new_f.append(x)
            f = new_f
        data.append(f)
    return data


def normalize(data):
    "Takes a list or a list of lists and returns its normalized form"

    return np.interp(data, [0, 255], [-1, 1])


def denormalize(data):
    "Takes a list or a list of lists and returns its denormalized form"

    return np.interp(data, [-1, 1], [0, 255])


def visualize(array):
    "Visulaze a 2D array as an Image"

    img = Image.fromarray(array)
    img.show(title="Visulizing array")


def set_limit(arrays, n):
    "Limit elements from each array up to n elements and return a single list"
    new = []
    for array in arrays:
        i = 0
        for item in array:
            if i == n:
                break
            new.append(item)
            i += 1
    return new


def make_labels(N1, N2):
    "make labels from 0 to N1, each repeated N2 times"
    labels = []
    for i in range(N1):
        labels += [i] * N2
    return labels




# Load items from the dataset directory
items = load("dataset/", files, True)

items = set_limit(items, N)

items = list(map(normalize, items))

labels = make_labels(N_ITEMS, N)

x_train, x_test, y_train, y_test = train_test_split(items, labels, test_size = 0.05)

Y_train = to_categorical(y_train, N_ITEMS)
Y_test = to_categorical(y_test, N_ITEMS)


# CNN Model
cnn_model = Sequential([
    Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(28, 28, 1)),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D(pool_size=(2, 2)),
    Dropout(0.25),
    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(N_ITEMS, activation='softmax')
])

cnn_model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

# ResNet Model
def resnet_layer(inputs, num_filters=16, kernel_size=3, strides=1, activation='relu', batch_normalization=True, conv_first=True):
    conv = Conv2D(num_filters, kernel_size=kernel_size, strides=strides, padding='same', kernel_initializer='he_normal', kernel_regularizer=l2(1e-4))
    x = inputs
    if conv_first:
        x = conv(x)
        if batch_normalization:
            x = BatchNormalization()(x)
        if activation is not None:
            x = Activation(activation)(x)
    else:
        if batch_normalization:
            x = BatchNormalization()(x)
        if activation is not None:
            x = Activation(activation)(x)
        x = conv(x)
    return x

def resnet_v1(input_shape, depth, num_classes=15):
    if (depth - 2) % 6 != 0:
        raise ValueError('depth should be 6n+2 (eg 20, 32, 44 in [a])')
    num_filters = 16
    num_res_blocks = int((depth - 2) / 6)
    inputs = Input(shape=input_shape)
    x = resnet_layer(inputs=inputs)
    for stack in range(3):
        for res_block in range(num_res_blocks):
            strides = 1
            if stack > 0 and res_block == 0:
                strides = 2
            y = resnet_layer(inputs=x, num_filters=num_filters, strides=strides)
            y = resnet_layer(inputs=y, num_filters=num_filters, activation=None)
            if stack > 0 and res_block == 0:
                x = resnet_layer(inputs=x, num_filters=num_filters, kernel_size=1, strides=strides, activation=None, batch_normalization=False)
            x = Add()([x, y])
            x = Activation('relu')(x)
        num_filters *= 2
    x = AveragePooling2D(pool_size=7)(x)
    y = Flatten()(x)
    outputs = Dense(num_classes, activation='softmax', kernel_initializer='he_normal')(y)
    model = Model(inputs=inputs, outputs=outputs)
    return model

resnet_model = resnet_v1(input_shape=(28,28,1), depth=20)

resnet_model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

# MLP Model
mlp_model = Sequential([
    Flatten(input_shape=(28, 28, 1)),
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(64, activation='relu'),
    Dropout(0.5),
    Dense(N_ITEMS, activation='softmax')
])

mlp_model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

# Training
cnn_history = cnn_model.fit(np.array(x_train), Y_train, batch_size=32, epochs=N_EPOCHS, validation_data=(np.array(x_test), Y_test))
resnet_history = resnet_model.fit(np.array(x_train), Y_train, batch_size=32, epochs=N_EPOCHS, validation_data=(np.array(x_test), Y_test))
mlp_history = mlp_model.fit(np.array(x_train), Y_train, batch_size=32, epochs=N_EPOCHS, validation_data=(np.array(x_test), Y_test))

