process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express.config');

var server = express();
server.listen(3000);
module.exports = server;

console.log('Servidor iniciado em http://localhost:3000');