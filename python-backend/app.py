from flask import Flask, request, jsonify
import tensorflow as tf
from PIL import Image
import numpy as np
import io

app = Flask(__name__)

# model = tf.keras.models.load_model("SkinDisease.h5")
# model = tf.keras.models.load_model("D:\Reaserch new\test-backend-api\New folder\dog-diseases-\python-backend\SkinDisease.h5")
model = tf.keras.models.load_model("D:\\Reaserch new\\test-backend-api\\New folder\\dog-diseases-\\python-backend\\SkinDisease.h5")




# def preprocess_image(file):
#     img = Image.open(io.BytesIO(file)).resize((224, 224))
#     img_array = np.array(img) / 255.0
#     img_array = np.expand_dims(img_array, axis=0)
#     return img_array

def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((150, 150))  # Resize to match model's expected input
    img_array = np.array(img) / 255.0  # Normalize
    img_array = np.expand_dims(img_array, axis=0)  # Shape becomes (1, 150, 150, 3)
    return img_array


CLASS_NAMES = ["flea_allergy", "hotspot", "mange", "ringworm"]

# @app.route("/predict", methods=["POST"])
# def predict():
#     if "file" not in request.files:
#         return jsonify({"error": "No file provided"}), 400

#     file = request.files["file"]
#     img_array = preprocess_image(file.read())
#     prediction = model.predict(img_array)
#     result = prediction.tolist()

#     return jsonify({"prediction": result})

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    image_bytes = file.read()
    img_array = preprocess_image(image_bytes)

    prediction = model.predict(img_array)
    predicted_index = np.argmax(prediction[0])
    predicted_class = CLASS_NAMES[predicted_index]
    confidence = float(prediction[0][predicted_index])

    return jsonify({
        "prediction": prediction.tolist(),  # Optional: keep full probabilities
        "predicted_class": predicted_class,
        "confidence": confidence
    })


if __name__ == "__main__":
    app.run(port=5000)
