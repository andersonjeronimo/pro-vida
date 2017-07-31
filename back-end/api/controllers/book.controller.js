var mongoose = require('mongoose');

//var bookModel = mongoose.model('BookModel');
var bookModel = require('../models/book.model');

var google_books = require('google-books-search');

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
    var options = {
        //key: "YOUR API KEY",
        field: 'title',
        offset: 0,
        limit: 10,
        type: 'books',
        order: 'relevance',
        lang: 'pt-BR'
    };

    var search_value = req.params["search_value"];
    google_books.search(search_value, options, function (error, results) {
        if (!error) {
            res.json(results);
        } else {
            res.send(error);
        }
    });

};