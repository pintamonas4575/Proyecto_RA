var express = require('express');
var router = express.Router();
var fs = require('fs');

var mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost', // Cambia esto por la dirección de tu servidor MySQL
    user: 'root',
    password: 'root1234',
    database: 'proyecto_RA'
});

//-----------------------------------------------------------

router.get('/', function(req, res, next) {

   // Conectarse a la base de datos
connection.connect(function(err) {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');

    // Ejemplo de consulta a la base de datos

   var QUERY = 'SELECT ' +
		    'AVG(temperatura) AS media_temperatura, ' +
		    'AVG(humedad) AS media_humedad, ' +
		    'AVG(co2) AS media_co2, ' +
		    'AVG(volatiles) AS media_volatiles ' +
	       'FROM megatabla';

    connection.query(QUERY, function(err, results, fields) {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            return;
        }
        //console.log('Resultados de la consulta:', results);
	var MENSAJE = '<b>Media temperatura:</b> ' + results[0].media_temperatura +
		      '<br><b>Media humedad:</b> ' + results[0].media_humedad +
	              '<br><b>Media co2:</b> ' + results[0].media_co2 +
		      '<br><b>Media volatiles:</b> ' + results[0].media_volatiles;

	res.send(MENSAJE);
    });
});

   // res.send('Valores TABLA: ' + resultados);
});



//------
module.exports = router;
