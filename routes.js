module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('hello-world');
    });

    app.get('/layout', function(req, res) {
        //get layout details from parameters
    });
};