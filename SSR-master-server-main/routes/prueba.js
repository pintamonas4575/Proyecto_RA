var express = require('express');
var router = express.Router();

var mqtt = require("mqtt");
//var client = mqtt.connect('mqtt://10.100.0.104');
var client = mqtt.connect('mqtt://localhost');

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
    var topic = "Sensores";
    var payload = {
        ID_sensor: req.query.id_nodo,
        timestamp: now.getTime(),
        temperatura: req.query.temperatura,
        humedad: req.query.humedad,
	co2: req.query.co2,
	volatiles: req.query.volatiles
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

//router.post('/record', function(req, res, next){


module.exports = router;
