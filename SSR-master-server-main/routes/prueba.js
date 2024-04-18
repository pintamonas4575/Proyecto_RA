var express = require('express');
var router = express.Router();
var mqtt = require("mqtt");
var client = mqtt.connect('mqtt://localhost');

//var wadl = require('wadl-js');

client.on('connect', function () {
    console.log('Connected to MQTT broker');
});

client.on('error', function (error) {
    console.error('Error:', error);
});

//-----------------------------------------------------------
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Data-Logger' });
});

//------------------------------------------------------------
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

//-----------------------------------------------------------------------------------------

router.post('/record', function(req, res, next) {
    var now = new Date();
    var topic = "Sensores";
    var payload = {
        ID_sensor: req.body.id_nodo,
        timestamp: now.getTime(),
        temperatura: req.body.temperatura,
        humedad: req.body.humedad,
        co2: req.body.co2,
        volatiles: req.body.volatiles
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

//-----------------------------------------------------------------------------------------

router.get('/wadl', function(req, res, next) {
//    res.sendFile('/home/alumno/Proyecto_RA/SSR-master-server-main/views/wadl.ejs');
   // file open, leer y hacer append, mandar

//----------------------------------------------------------------------------------------
module.exports = router;
