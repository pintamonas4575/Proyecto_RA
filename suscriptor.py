
import paho.mqtt.client as mqtt
import random
import json
import mysql.connector
from datetime import datetime

mysql_host = "localhost"
mysql_user = "root"
mysql_password = "root1234"
mysql_database = "proyecto_RA"


def on_message(client, userdata, msg):
    print("Recibido: " + msg.topic+" "+str(msg.payload))
    db_connection = mysql.connector.connect(
	host = mysql_host,
	user = mysql_user,
	password = mysql_password,
	database = mysql_database)

    payload_json = json.loads(msg.payload.decode("utf-8"))
    id_sensor = payload_json["ID_sensor"]
    timestamp = payload_json["timestamp"]
    temperatura = payload_json["temperatura"]
    humedad = payload_json["humedad"]
    co2 = payload_json["co2"]
    volatiles = payload_json["volatiles"]

    timestamp = datetime.fromtimestamp(timestamp)

    #------------------------------------------------
    query = f"INSERT INTO megatabla VALUES (%s, %s, %s, %s, %s, %s)"

    cursor = db_connection.cursor()
    cursor.execute(query, (id_sensor, timestamp, temperatura, humedad, co2, volatiles))
    db_connection.commit()

    cursor.close()
    db_connection.close()


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


client = mqtt.Client()

client.connect("localhost", 1883, 60)

client.on_connect = on_connect
client.on_message = on_message


client.subscribe("Sensores")


client.loop_forever()
