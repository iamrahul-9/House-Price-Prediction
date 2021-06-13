import pickle
import json
import numpy as np

#banglore
__locations = None
__data_columns = None
__model = None


def get_estimated_price(location, sqft, bhk, bath):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1

    if sqft <= 270 or None:
        return "Invalid Input"

    estimate_price = round(__model.predict([x])[0], 2)
    if estimate_price < 0:
        return "Oops! No Data"
    else:
        return f"{estimate_price} Lakh ₹"


def get_location_names():
    return __locations


def load_saved_artifacts():
    print("loading bangalore artifacts...start")
    global __data_columns
    global __locations

    with open("./artifacts/columns.json", 'r') as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[3:]  # first 3 columns are sqft, bath, bhk

    global __model
    with open("./artifacts/banglore_home_prices_model.pickle", 'rb') as f:
        __model = pickle.load(f)


if __name__ == '__main__':
    load_saved_artifacts()
    print(get_location_names())
    print(get_estimated_price('1st Phase JP Nagar', 1500, 3, 3))
    print(get_estimated_price('1st phase jp nagar', 1000, 1, 1))
