
import paho.mqtt.client as mqtt
import random
import time
import json

def on_connect(client, userdata, flags, rc, properties=None):
    print("Conectado con mqtt "+str(rc))

def on_publish(client, userdata, mid, reasoncode=None, properties=None):
    print("Mensaje publicado")

# client_id = f'python-mqtt-{random.randint(0, 1000)}'
client = mqtt.Client()

client.connect("test.mosquitto.org", 1883, 60)

client.on_connect = on_connect
client.on_publish = on_publish

# --------------------------------------------

while True:
    client.publish("ETSISI/hola", "Publicador1")
    time.sleep(5)





