import time
import random
import requests

URL = 'http://10.100.0.104:3001/record?id_nodo=nodoPrueba1&temperatura=24.5&humedad=68.2&co2=293&volatiles=999'

while (True):
   response = requests.get(URL)
   time.sleep(0.2)
