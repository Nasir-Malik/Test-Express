var port = 3031;
var express = require('express');
var app = express();

var books = require('./app/book');
app.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

app.use('/books', books);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

app.get('/download', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.download('D:\\Project data\\Fee Service\\temp\\up150904.csv');
});

app.listen(port);
console.log('Staring server http://localhost:' + port);
