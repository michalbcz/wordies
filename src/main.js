const PORT = 8080;

var express = require('express');
var dictionary = require('./dictionary.js');
//require("scribe-js")();
//var console = process.console;

console.log("Starting... (huraaay!)");

var app = express();

app.use('/', express.static(__dirname + '/public'));

app.post('/api/translate/:word', function(req, res) {

    console.trace("word to translate: ", req.params.word);
    console.trace("request body: ", req.body)

    dictionary.translate({ from: 'en', to: 'cs', word: req.params.word }, function(translation) {
        res.send(translation);
    });

});

app.get('/oauth/*', function(req, res) {

    console.log(req);

    var output = "";
    output += "Base URL:</br>";
    output += req.baseUrl;
    output += "</br>Query:</br>";
    output += JSON.stringify(req.query);
    output += "</br></br>Path:</br>";
    output += JSON.stringify(req.path);
    output += "</br></br>Params: </br>";
    output += JSON.stringify(req.params);

    res.set('Content-Type', 'text/html');
    res.status(200).send(output);

});

app.listen(PORT, function() {
  console.log('Listening on port', PORT, "!");
});
