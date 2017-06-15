var fileCtrl = require('../../api/controllers/file.server.controller.js');

module.exports = function (app) {        

    app.route('/api/files')
        .get(fileCtrl.read_files);
        //.post(fileCtrl.create)

    app.route('/api/files/:id')
        .get(fileCtrl.read);
        //.put(fileCtrl.update)
        //.delete(fileCtrl.delete);    
    //app.param('_id', fileCtrl.get_id);

    app.route('/api/search/:search_value')
        .get(fileCtrl.search);

};