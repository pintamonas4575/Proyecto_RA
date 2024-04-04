var express = require('express');
var router = express.Router();
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Data-Logger' });
});

router.get('/record', function(req, res, next) {
	var now = new Date();
var logfile_name = __dirname+'/../public/logs/' +req.query.id_nodo+ "-"+ now.getFullYear() + "-"+ now.getMonth() + "-" + now.getDate() +'.csv'

fs.stat(logfile_name, function(err, stat) {
    if(err == null) {
        console.log('File %s exists', logfile_name);
		let content = req.query.id_nodo+';'+now.getTime()+";"+req.query.temperatura+";"+req.query.humedad+";"+req.query.co2+";"+req.query.volatiles+"\r\n";
		append2file(logfile_name, content);
		
    } else if(err.code === 'ENOENT') {
        // file does not exist
	let content ='id_nodo; timestamp; temperatura; humedad; CO2; volatiles\r\n'+req.query.id_nodo+';'+now.getTime()+";"+req.query.temperatura+";"+req.query.humedad+";"+req.query.co2+";"+req.query.volatiles+"\r\n";
       append2file(logfile_name, content);
    } else {
        console.log('Some other error: ', err.code);
    }
});




  //res.render('index', { title: 'Express' });
  res.send("Saving: "+req.query.id_nodo+';'+now.getTime()+";"+req.query.temperatura+";"+req.query.humedad+";"+req.query.co2+";"+req.query.volatiles+" in: "+logfile_name);
});

function append2file (file2append, content){
	fs.appendFile(file2append, content, function (err) {
    if (err) throw err;
    console.log("Saving: "+content+" in: "+file2append);
});
}

module.exports = router;
