var express = require('express');
var router = express.Router();
var mqtt = require("mqtt");
var client = mqtt.connect('mqtt://localhost');

var fs = require('fs');

var TokenBucket = require('./TokenBucket'); // Importa la clase TokenBucket
// Crea un nuevo cubo de tokens con una capacidad de 1000 y 10 tokens agregado por segundo
const tokenBucket = new TokenBucket(1000, 10);

//---------------------------------------------------------

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
    if (!tokenBucket.takeToken()) {
        // Si no hay tokens disponibles, responde con un código 429 (Too Many Requests)
        res.status(429).send('Too Many Requests');
        return;
    }
    var now = new Date();
    var now_aux = Math.floor(now.getTime() / 1000);
    var topic = "Sensores";

    var payload = {
        ID_sensor: req.query.id_nodo,
        //timestamp: now_aux.getTime(),
        timestamp: now_aux,
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
    if (!tokenBucket.takeToken()) {
        // Si no hay tokens disponibles, responde con un código 429 (Too Many Requests)
        res.status(429).send('Too Many Requests');
        return;
    }
    var now = new Date();
    var now_aux = Math.floor(now.getTime() / 1000);
    var topic = "Sensores";
    var payload = {
        ID_sensor: req.body.id_nodo,
        timestamp: now_aux,
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

const {readFile} = require('fs/promises');

router.get('/wadlNONONO', function(req, res, next) {

   var path = '/home/alumno/Proyecto_RA/SSR-master-server-main/views/wadl.txt';
   fs.readFile(path, 'utf8', function(err, data){
      if (err){
         console.error('ERROR', err);
         res.status(500).send('Error al leer');
      } else {
         res.send('hola');
      }
   });
});
//------------------------------------------------------------------------
router.get('/wadl', function(req, res, next) {
   res.sendFile('/home/alumno/Proyecto_RA/SSR-master-server-main/views/wadl.ejs');
});

//--------------------------------------------------------------------------------
module.exports = router;
