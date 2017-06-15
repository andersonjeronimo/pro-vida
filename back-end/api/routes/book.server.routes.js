var bookCtrl = require('../../api/controllers/book.server.controller.js');

module.exports = function (app) {        

    app.route('/api/books')
        .get(bookCtrl.list);
        //.post(bookCtrl.create)

    app.route('/api/books/:id')
        .get(bookCtrl.read);
        //.put(bookCtrl.update)
        //.delete(bookCtrl.delete);    
    //app.param('_id', bookCtrl.get_id);

    app.route('/api/books/search/:search_value')
        .get(bookCtrl.search);

};