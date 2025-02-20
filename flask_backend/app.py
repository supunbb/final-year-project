from flask import Flask, request
from flask_cors import CORS
from prediction_service import predict_image

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=['POST'])
def predict_document():
    files = request.files
    file = files["file"]
    return predict_image(file), 200


if __name__ == '__main__':
    app.run()
