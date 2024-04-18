var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var serveIndex = require('serve-index');

var http = require('http');
var http_proxy = require('http-proxy');

var indexRouter = require('./routes/prueba');
var usersRouter = require('./routes/users');

var contador_servidores = 0;
var servidores = [
    {'url': 'http://localhost:3001'},
    {'url': 'http://localhost:3002'}
    ];

var balanceador = http_proxy.createProxy();

require('http').createServer(function(req, res){
  var servidor = servidores[contador_servidores];

  proxy.web(req, res,
    {target: servidor.url},
    function(e){
      console.log(e);
    }
  );
  contador_servidores = contador_servidores == 2 ? 0: contador_servidores+1;
}).listen(8080);

var app = express();
var app2 = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/logs', serveIndex(path.join(__dirname, 'public/logs'))); // shows you the file list
app.use('/logs', express.static(path.join(__dirname, 'public/logs'))); // serve the actual files
//-----------------------------------------------------
app2.set('views', path.join(__dirname, 'views'));
app2.set('view engine', 'ejs');

app2.use(logger('dev'));
app2.use(express.json());
app2.use(express.urlencoded({ extended: false }));
app2.use(cookieParser());
app2.use(express.static(path.join(__dirname, 'public')));

app2.use('/', indexRouter);
app2.use('/users', usersRouter);
app2.use('/logs', serveIndex(path.join(__dirname, 'public/logs'))); // shows you the file list
app2.use('/logs', express.static(path.join(__dirname, 'public/logs'))); // serve the actual files

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//-------------------------------------------------
app2.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app2.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app2.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(3001, () => {
  console.log(`Server is running in port 3001`);
});

app2.listen(3002, () => {
  console.log("Server is running in port 3002");
});

module.exports = app;
module.exports = app2;
