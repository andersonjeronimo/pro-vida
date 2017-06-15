exports.read = function (req, res, next) {
    return res.json([
        {
            Id: req.params["id"],
            Name: 'anderson'
        }
    ]);
};

exports.read_files = function (req, res, next) {
    return res.json([
        {
            Id: 1,
            Name: 'anderson'            
        },
        {
            Id: 2,
            Name: 'anderson'            
        },
        {
            Id: 3,
            Name: 'anderson'            
        }
    ]);
};

exports.search = function (req, res, next) {
    return res.json([
        {
            Id: req.params["id"],
            Name: 'anderson'
        }
    ]);
};