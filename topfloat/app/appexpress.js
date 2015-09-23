var express = require('express')
var app = express()
var fs = require('fs');
var bodyParser = require('body-parser')
var path = require("path");


app.get('/', function (req, res) {
  res.send('Hello World!')
})
app.post('/testform', function(req, res){
    console.log(req.body);
});
app.get('/index', function (req, res) {
    res.sendFile(path.join(__dirname+'/testhtml.html'));
});
app.get('/test', function (req, res) {
    var testobj = { name: "hello" };
    fs.writeFile("tmp/test.txt", "what do you think", function (err) {
        if (err) {
        }
    });
    res.send(testobj);
});

app.get(/^(.+)$/, function (req, res) {
    console.log('static file request : ' + req.params);
    res.sendfile(__dirname + req.params[0]);
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})