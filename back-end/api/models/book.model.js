var mongoose = require('mongoose');

bookSchema = mongoose.Schema({
    Title: String,
    Author: String,
    ISBN: String,
    Publishing: String
});

var BookModel = mongoose.model('BookModel', bookSchema);
module.exports = BookModel;