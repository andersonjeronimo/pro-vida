var mongoose = require('mongoose');
//modelo para conexão com Mongo DB.
bookSchema = mongoose.Schema({
    Title: String,
    Author: String,
    ISBN: String,
    Publishing: String
});

var BookModel = mongoose.model('BookModel', bookSchema);
module.exports = BookModel;