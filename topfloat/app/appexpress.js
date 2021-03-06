var express = require('express')
var app = express()
var fs = require('fs');
var bodyParser = require('body-parser')
var path = require("path");
app.use(bodyParser.json());

app.post('/testform', function (req, res) {
    console.log(req.body);
    fs.writeFile("datastorage/data.txt", JSON.stringify(req.body), function (err) {
        if (err) {
            console.log(err);
        }
    });
    res.send();
});
app.post('/getsavedform', function (req, res) {
    fs.readFile('datastorage/data.txt', function (err, data) {
        if (err) {
            console.log(err);
            res.json(null);
        };
        res.json(JSON.parse(data));
    });
});

var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port
    console.log('Example app listening at http://%s:%s', host, port)

})