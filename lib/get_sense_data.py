# from sense_hat import SenseHat
import json

# sense = SenseHat()

def getinfo():

    # P = sense.get_pressure()
    # T = sense.get_temperature() - 10 
    # H = sense.get_humidity()

    # test data
    P = 10
    T = 20
    H = 30


    info = {
        'press': P,
        'temp': T,
        'hume': H,
    }

    with open('./lib/sense_data.json', "w") as outfile:
        json.dump(info, outfile)
    print("done!")

getinfo()