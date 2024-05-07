
import paho.mqtt.client as mqtt
import random
import time
import json

def on_connect(client, userdata, flags, rc, properties=None):
    print("Conectado con mqtt "+str(rc))

def on_publish(client, userdata, mid, reasoncode=None, properties=None):
    print("Mensaje publicado")

client = mqtt.Client()

client.connect("localhost", 1883, 60)

client.on_connect = on_connect
client.on_publish = on_publish

# --------------------------------------------

# Valores de ejemplo
id_sensor = "sensor123"
timestamp = int(time.time())
temperatura = 25.5
humedad = 60
co2 = 123
volatiles = 50

# Publicación del mensaje MQTT en el topic "Sensores"
payload = {
    "ID_sensor": id_sensor,
    "timestamp": timestamp,
    "temperatura": temperatura,
    "humedad": humedad,
    "co2": co2,
    "volatiles": volatiles
}


while True:

   #co2 = random.uniform(120.0, 200.0)
   payload = {
       "ID_sensor": id_sensor,
       "timestamp": timestamp,
       "temperatura": temperatura,
       "humedad": humedad,
       "co2": co2,
       "volatiles": volatiles
   }

   client.publish("Sensores", json.dumps(payload))
   time.sleep(2)





