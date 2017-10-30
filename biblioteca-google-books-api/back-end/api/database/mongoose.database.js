var mongoose = require('mongoose');

var config = require('../../config/config');

module.exports = function () {

    mongoose.connect(config.connectionString);

    var dbConnection = mongoose.connection;

    dbConnection.on('error', console.error.bind(console, 'connection error:'));

    dbConnection.once('open', function () {
        console.log('Conexão iniciada com MongoDB...');
    });

};