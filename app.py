from flask import Flask, request, jsonify
import util
import util_2
import util_3

app =  Flask(__name__)


# bangalore
@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bhk = int(request.form['bhk'])
    bath = int(request.form['bath'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(location, total_sqft, bhk, bath)
    })

    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

#mumbai
@app.route('/get_location_names_m', methods=['GET'])
def get_location_names_m():
    response = jsonify({
        'locations': util_2.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_home_price_m', methods=['POST'])
def predict_home_price_m():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bhk = int(request.form['bhk'])
    bath = int(request.form['bath'])

    response = jsonify({
        'estimated_price': util_2.get_estimated_price(location, total_sqft, bhk, bath)
    })

    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

#delhi
@app.route('/get_location_names_d', methods=['GET'])
def get_location_names_d():
    response = jsonify({
        'locations': util_3.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_home_price_d', methods=['POST'])
def predict_home_price_d():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bhk = int(request.form['bhk'])
    bath = int(request.form['bath'])

    response = jsonify({
        'estimated_price': util_3.get_estimated_price(location, total_sqft, bhk, bath)
    })

    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    util_2.load_saved_artifacts()
    util_3.load_saved_artifacts()
    app.run()
