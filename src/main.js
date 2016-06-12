const PORT = 8080;

var express = require('express');
var dictionary = require('./dictionary_service.js');
var bodyParser = require('body-parser');
//require("scribe-js")();
//var console = process.console;

console.log("Starting... (huraaay!)");

var app = express();

// without this req.body. doesn't work when body is json or anything...
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/', express.static(__dirname + '/public'));

app.post('/api/translate/:word', function(req, res) {

    console.trace("request:", req);
    console.info("userId: ", req.body.userId, "word to translate: ", req.params.word);

    dictionary.translate(
        { from: 'en', to: 'cs',
          word: req.params.word,
          userId: req.body.userId },
       function (translation) {
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

function errorHandler(err, req, res, next) {
  console.error("Error handler: ", err);
  res.status(500).send({ "error": err.toString() });
}

app.use(errorHandler);

app.listen(PORT, function() {
  console.log('Listening on port', PORT, "!");
});
