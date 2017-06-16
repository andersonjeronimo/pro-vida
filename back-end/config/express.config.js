var express = require('express');
var morgan = require('morgan');
var compress = require('compression');
var path = require('path');
//var favicon = require('serve-favicon');
var methodOverride = require('method-override');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./config');

module.exports = function () {

    var server = express();

    // uncomment after placing your favicon in /public
    //server.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

    if (process.env.NODE_ENV === 'development') {
        server.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        server.use(compress());
    }

    server.all('*', function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
    });

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(cookieParser());
    server.use(methodOverride());

    server.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));   

    server.use(express.static(path.join(__dirname, '../public')));

    //======================================================

    //1-Conectar com banco de dados...
    require('../api/database/mongoose.database.js')();

    //2-Criar modelos
    //require('../api/models/book.model');
    
    //3-Configurar rotas
    require('../api/routes/book.routes')(server);

    return server;
}