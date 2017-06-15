var config = require('./config');
var express = require('express');
var morgan = require('morgan');
var compress = require('compression');
var path = require('path');
//var favicon = require('serve-favicon');
var methodOverride = require('method-override');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

module.exports = function () {

    var app = express();

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.all('*', function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(methodOverride());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));
    
    require('../api/routes/file.server.routes')(app);
    require('../api/routes/book.server.routes')(app);

    app.use(express.static(path.join(__dirname, '../public')));    

    return app;
}