from flask import Flask, render_template
import socket
from sense_hat import SenseHat
app = Flask(__name__)

sense = senseHat()

def getinfo():
   
    P = sense.get_pressure()
    T = sense.get_temperature() - 10
    H = sense.get_humidity()

    return P, T, H

@app.route("/")
@app.route("/main")
def home():
    P, T, H = getinfo()
    T = round(float(T), 1)
    return render_template("SWWeather.html", title="star wars weather", T=T)

@app.route("/about")
def about():
    return render_template("about.html",title="about")

@app.route("/raw")
def SSWeather():
    P, T, H = getinfo()
    return render_template("raw.html",title="raw data", P=P, T=T, H=H)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
    print('running')