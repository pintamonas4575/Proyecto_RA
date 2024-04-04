var express = require('express');
var router = express.Router();
var mqtt = require('mqtt'); //Importa la biblioteca MQTT, que permite la comunicación con un servidor MQTT.

// Conexión al broker MQTT
var client = mqtt.connect('mqtt://10.100.0.104:1883'); // Reemplaza 'localhost' con la dirección del broker MQTT

client.on('connect', function () {
    console.log('Connected to MQTT broker');
});

client.on('error', function (error) {
    console.error('Error:', error);
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Data-Logger' });
});

router.get('/record', function(req, res, next) {
    var now = new Date();
    var topic = "Temperatura"; // Define el tema MQTT utilizando el ID del nodo
    var payload = {
        timestamp: now.getTime(),
        temperatura: req.query.temperatura
    };

    client.publish(topic, JSON.stringify(payload), function (error) {
        if (error) {
            console.error('Failed to publish MQTT message:', error);
            res.status(500).send('Failed to publish MQTT message');
        } else {
            console.log('Published MQTT message:', payload);
            res.send('Published: ' + JSON.stringify(payload) + ' on topic: ' + topic);
        }
    });
});

module.exports = router;
