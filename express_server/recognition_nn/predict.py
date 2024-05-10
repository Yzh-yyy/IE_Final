from keras.models import load_model
from PIL import Image
import numpy as np
import sys
import os
import json

IMAGE = 'recognition_nn/sketch_images/out.png'
# Load the model
MODEL = load_model('recognition_nn/models/resnet_model.keras')

ITEMS = {0: 'Apple', 1: 'Banana', 2: 'Grapes', 3: 'Pineapple', 4: 'Asparagus', 5: 'Blackberry', 6: 'Blueberry',
          7: 'Mushroom', 8: 'Onion', 9: 'Peanut', 10: 'Pear', 11: 'Peas', 12: 'Potato', 13: 'Steak', 14: 'Strawberry'}

def normalize(data):
    "Takes a list or a list of lists and returns its normalized form"

    return np.interp(data, [0, 255], [-1, 1])


def load_and_preprocess_image():
    # Load image
    x = Image.open(IMAGE)
    # Convert image to grayscale
    x = x.convert('L')
    # Resize image to (28, 28)
    x = x.resize((28, 28))
    # Convert image to NumPy array
    x = np.array(x)
    # Add channel dimension
    x = np.expand_dims(x, axis=-1)
    # invert the colors
    x = np.invert(x)
    # brighten the image by 60%
    for i in range(len(x)):
        for j in range(len(x)):
            if x[i][j] > 50:
                x[i][j] = min(255, x[i][j] + x[i][j] * 0.60)
    x = normalize(x)
    return x


# def visualize2(array):
#     array = np.reshape(array, (32, 32))
#     img = Image.fromarray(array.astype('uint8'))  # Convert array to unsigned integer
#     return img

# image_array = load_and_preprocess_image('steak.png')
# visualize2(image_array)




def get_prediction():
    # Load and preprocess the image
    x = load_and_preprocess_image()
    prediction = MODEL.predict(np.array([x]), verbose=0)
    # Get the predicted class index
    predicted_fruit_index = np.argmax(prediction)
    predicted_fruit_name = ITEMS[predicted_fruit_index]  # Convert predicted fruit name to lowercase
    return predicted_fruit_name

if __name__ == "__main__":
    prediction_result = get_prediction()
    print(prediction_result)
