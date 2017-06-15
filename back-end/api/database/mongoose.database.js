var mongoose = require('mongoose');

var config = require('../../config/config');

module.exports = function () {
    mongoose.connect(config.connectionString);

    var dbConnection = mongoose.connection;

    dbConnection.on('error', console.error.bind(console, 'connection error:'));

    dbConnection.once('open', function () {
        console.log('Conexão iniciada com MongoDB...');

        //Criar os modelos (Squemas) antes que as rotas sejam criadas no arquivo 'express.config.js '...
        //require('./models/book.model');
        bookSchema = mongoose.Schema({            
            Title: String,
            Author: String,
            ISBN: String,
            Publishing: String
        });

        var BookModel = mongoose.model('BookModel', bookSchema);
        module.exports = BookModel;

        var Book = new BookModel({
            Title: 'Harry Potter and the Half-Blood Prince',
            Author: 'J.K.Rowling',
            ISBN: '972-23-3445-X',
            Publishing: 'Bloomsbury Publishing Plc'
        });//mongoose.model('BookModel');

        Book.save(function (err, Book) {
            if (err) return console.error(err);
        });

    });

};

