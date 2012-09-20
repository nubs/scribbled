module.exports = function(mongoose) {
  var express = require('express');
  var app = express();

  app.use(express.json());

  var Slide = require('./models/slide')(mongoose);

  app.get('/', function(req, res) {
    Slide.find(function(err, slides) {
      res.send(slides);
    });
  });

  return app;
};
