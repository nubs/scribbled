module.exports = function(mongoose) {
  var express = require('express');
  var app = express();

  app.use(express.json());

  var Slideshow = require('./models/slideshow')(mongoose);

  app.get('/', function(req, res) {
    Slideshow.find(function(err, slides) {
      res.send(slides);
    });
  });

  app.get('/:id', function(req, res) {
    Slideshow.findOne({_id: req.params.id}, function(err, slideshow) {
      res.send(slideshow);
    });
  });

  app.post('/', function(req, res) {
    var slideshow = new Slideshow(req.body);
    slideshow.save(function(err, slideshow) {
      res.send(slideshow);
    });
  });

  app.put('/:id', function(req, res) {
    Slideshow.update({_id: req.params.id}, req.body, function(err, numberAffected, raw) {
      Slideshow.findOne({_id: req.params.id}, function(err, slideshow) {
        res.send(slideshow);
      });
    });
  });

  return app;
};
