import sqlite3
import time
import uuid

from sense_hat import SenseHat
sense = SenseHat()

def getinfo():

    conn = sqlite3.connect('./database/sense_data.sqlite')
    c = conn.cursor()

    P = sense.get_pressure()
    T = sense.get_temperature() - 10 # adjustment for accuracy 
    H = sense.get_humidity()


    c.execute("INSERT INTO data(id, date, temp, humid, press) VALUES ('{}', '{}', '{}', '{}', '{}')".format(str(uuid.uuid4()), time.time_ns(), T, H, P))
    conn.commit()
    conn.close()



while True:
    getinfo()
    print('done')
    time.sleep(1800) # 1800 seconds = 30 minutes
