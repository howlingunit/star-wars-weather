import sqlite3
import time
import uuid

import random

# from sense_hat import SenseHat
# sense = SenseHat()

def getinfo():

    conn = sqlite3.connect('../database/sense_data.sqlite')
    c = conn.cursor()

    # P = sense.get_pressure()
    # T = sense.get_temperature() - 10 
    # H = sense.get_humidity()

    # test data
    P = random.uniform(0.2, 30)
    T = random.uniform(0.2, 30)
    H = random.uniform(0.2, 30)

    id = 'hi'

    c.execute("INSERT INTO data(id, date, temp, humid, press) VALUES ('{}', '{}', '{}', '{}', '{}')".format(str(uuid.uuid4()), time.time_ns(), T, H, P))
    conn.commit()
    conn.close()



while True:
    getinfo()
    print('done')
    time.sleep(30)
