import sqlite3
import time
import uuid
import random

def getinfo():

    conn = sqlite3.connect('./database/sense_data.sqlite')
    c = conn.cursor()

    P = random.randint(1,5000)
    T = 100 # adjustment for accuracy 
    H = random.randint(1,5000)


    c.execute("INSERT INTO data(id, date, temp, humid, press) VALUES ('{}', '{}', '{}', '{}', '{}')".format(str(uuid.uuid4()), time.time_ns(), T, H, P))
    conn.commit()
    conn.close()



getinfo()
print('done')
