var drive = require('../../api/controllers/drive.server.controller.js');

module.exports = function (app) {
    app.route('/api/files')
        .get(drive.read_files);
        //.post(drive.create)


    app.route('/api/files/:id')
        .get(drive.read);
        //.put(drive.update)
        //.delete(drive.delete);

    //app.param('fileId', drive.get_id);
};