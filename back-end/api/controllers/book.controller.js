var mongoose = require('mongoose');

//var bookModel = mongoose.model('BookModel');
var bookModel = require('../models/book.model');

exports.create = function (req, res, next) {
    var book = new bookModel({
        Title: 'Harry Potter and the Half-Blood Prince',
        Author: 'J.K.Rowling',
        ISBN: '972-23-3445-X',
        Publishing: 'Bloomsbury Publishing Plc'
    });
    book.save(function (err, book) {
        if (err) return console.error(err);
    });
};

exports.read = function (req, res, next) {
    var id = req.params["id"];
    bookModel.findById(id, function (error, doc) {
        if (error) {
            res.send({ error: 'Nao foi possivel retornar o livro.' });
        } else {
            res.json(doc);
        }
    });     
};

exports.list = function (req, res, next) {   
    bookModel.find({}, function (error, docs) {
        if (error) {
            res.send({ error: 'Nao foi possivel retornar os livros.' });
        } else {
            res.json(docs);
        }
    });    
};

exports.search = function (req, res, next) {
    return res.json([
        {
            Id: 1,
            Title: 'Angular 2 for Dummies',
            Author: 'Loiane Groner',
            ISBN: 'xxxxxxxxxxx',
            Publishing: 'Packt-Publishing'
        }
    ]);
};