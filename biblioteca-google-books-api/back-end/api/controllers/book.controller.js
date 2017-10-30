var mongoose = require('mongoose');

//var bookModel = mongoose.model('BookModel');
var bookModel = require('../models/book.model');

var google_books = require('google-books-search');
var config = require('../../config/config');

exports.create = function (req, res, next) {
    var book = new bookModel({
        //book attributes...
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
        key: config.googleApiKey,
        field: 'title',
        offset: 0,
        limit: 12,
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
/*
var b = { 
    "title": "Java, Java, Java", 
    "subtitle": "Object-oriented Problem Solving", 
    "authors": ["Ralph Morelli", "Ralph Walde"], 
    "publisher": "Prentice Hall", 
    "publishedDate": "2006-01", 
    "description": "\"Java, Java, Java, Third Edition systematically introduces the Java 1.5 language to the context of practical problem-solving and effective object-oriented design. Carefully and incrementally, the authors demonstrate how to decompose problems, use UML diagrams to design Java software that solves those problems, and transform their designs into efficient, robust code. Their \"objects-early\" approach reflects the latest pedagogical insights into teaching Java, and their examples help readers apply sophisticated techniques rapidly and effectively.\"--BOOK JACKET.", 
    "industryIdentifiers": [
        { "type": "ISBN_13", "identifier": "9780131474345" }, 
        { "type": "ISBN_10", "identifier": "0131474340" }
        ], 
    "pageCount": 862, 
    "printType": "BOOK", 
    "categories": ["Computers"],
    "averageRating": 4.5, 
    "ratingsCount": 2, 
    "maturityRating": "NOT_MATURE", 
    "language": "en", 
    "id": "k_a0pVRrFVkC",
    "link": "https://books.google.com/books/about/Java_Java_Java.html?hl=&id=k_a0pVRrFVkC", 
    "thumbnail": "http://books.google.com/books/content?id=k_a0pVRrFVkC&printsec=frontcover&img=1&zoom=1&source=gbs_api", 
    "images": {} 
};*/