process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express');

//var db = mongoose();
//var connection = db.connection;
//connection.once('open', function () {
//	console.log('Conexão iniciada com MongoDB...');
//});
var app = express();
app.listen(3000);
module.exports = app;

console.log('Servidor iniciado em http://localhost:3000');