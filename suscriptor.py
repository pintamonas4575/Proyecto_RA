
import paho.mqtt.client as mqtt
import random
import json

# V1 también para ejercicio 5
def on_message(client, userdata, msg):
    print("Recibido: " + msg.topic+" "+str(msg.payload))
# V2D
"""def on_message(client, userdata, msg):
    print("Recibido: " + msg.topic+" "+str(msg.payload))
    # topic = msg.topic
    m_decode = str(msg.payload.decode("utf-8", "ignore"))
    print("data Received type", type(m_decode))
    print("data Received", m_decode)
    print("Converting from Json to Object")
    m_in = json.loads(m_decode)  # decode json data
    print(type(m_in))
    print("data_to_send = ", m_in["data_to_send"])"""
# ---------------------------------------------------------
def on_connect(client, userdata, flags, rc, properties=None):  # properties=None
    print("Conectado con mqtt " + str(rc))

# client_id = f'python-mqtt-{random.randint(0, 1000)}'
client = mqtt.Client(
    # client_id=client_id,
    # clean_session=True,
    # userdata=None,
    # protocol=MQTTv311,
    # transport='tcp'
)
client.connect("test.mosquitto.org", 1883, 60, "")

client.on_connect = on_connect
client.on_message = on_message


client.subscribe("ETSISI/hola")


client.loop_forever()
