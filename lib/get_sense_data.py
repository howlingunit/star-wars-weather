from sense_hat import SenseHat
import json

sense = SenseHat()

def getinfo():

    P = sense.get_pressure()
    T = sense.get_temperature() - 10
    H = sense.get_humidity()

    info = {
        'press': P,
        'Temp': T,
        'Hume': H,
    }

    with open('sense_data,json', "a") as outfile:
        json.dump(info, outfile)

getinfo()