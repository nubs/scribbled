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

  app.get('/:id', function(req, res) {
    Slide.findOne({_id: req.params.id}, function(err, slide) {
      res.send(slide);
    });
  });

  app.post('/', function(req, res) {
    var slide = new Slide(req.body);
    slide.save(function(err, slide) {
      res.send(slide);
    });
  });

  app.put('/:id', function(req, res) {
    Slide.update({_id: req.params.id}, req.body, function(err, numberAffected, raw) {
      Slide.findOne({_id: req.params.id}, function(err, slide) {
        res.send(slide);
      });
    });
  });

  return app;
};
