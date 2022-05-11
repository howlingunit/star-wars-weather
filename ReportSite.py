from sense_hat import SenseHat
import json

sense = senseHat()

def getinfo():
   
    P = sense.get_pressure()
    T = sense.get_temperature() - 10
    H = sense.get_humidity()

    info = {
        press: P,
        temp: T,
        hume: H,
    }

    with open('sense_data,json', "a") as outfile:
        json.dump(info, outfile)

getinfo()