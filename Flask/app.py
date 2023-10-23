from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)
model = pickle.load(open('model.pkl','rb'))
@app.route('/predict', methods = ['POST'])
def predict(): 
    req_json = request.json
    features=[]
    for values in req_json.values():
        features.append(values)
    features = [np.array(features)]
    prediction = model.predict(features)
    resp = int(prediction[0])
    if resp == 0:
        resp ="You are healthy!"
    else:
        resp = "You have diabetes"
    return jsonify({"prediction":resp})

@app.route('/test', methods=['GET', 'POST'])
def test():
    if request.method == "GET":
        return jsonify({"response":"it works"})
    elif request.method == "POST":
        req = request.json
        name = req['name']
        return jsonify({"response":"hi "+name})

@app.route('/')
def hello():
    return "hello world !"


if __name__ == "__main__":
    app.run(debug=True)












