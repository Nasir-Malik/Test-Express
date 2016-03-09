var express = require('express');
var bookRoute = express.Router();

// define the home page route
bookRoute.get('/', function(req, res) {
  res.send('Birds home page');
});

// define the about route
bookRoute.get('/about', function(req, res) {
  res.send('About books');
});

module.exports = bookRoute;