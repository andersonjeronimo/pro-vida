exports.read = function (req, res, next) {
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

exports.list = function (req, res, next) {
    return res.json([
        {
            Id: 1,
            Title: 'Angular 2 for Dummies',
            Author: 'Loiane Groner',
            ISBN: 'xxxxxxxxxxx',
            Publishing: 'Packt-Publishing'
        },
        {
            Id: 2,
            Title: 'Angular 2 for Dummies',
            Author: 'Loiane Groner',
            ISBN: 'xxxxxxxxxxx',
            Publishing: 'Packt-Publishing'
        },
        {
            Id: 3,
            Title: 'Angular 2 for Dummies',
            Author: 'Loiane Groner',
            ISBN: 'xxxxxxxxxxx',
            Publishing: 'Packt-Publishing'
        }
    ]);
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