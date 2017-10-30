var bookCtrl = require('../controllers/book.controller.js');

module.exports = function (server) {        

    server.route('/api/books')
        .get(bookCtrl.list)
        .post(bookCtrl.create);

    server.route('/api/books/:id')
        .get(bookCtrl.read);
        //.put(bookCtrl.update)
        //.delete(bookCtrl.delete);            

    server.route('/api/books/search/:search_value')
        .get(bookCtrl.search);

};