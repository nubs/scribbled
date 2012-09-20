module.exports = function(mongoose) {
  var express = require('express');
  var api = express();

  var slide = require('./slide')(mongoose);
  var slideshow = require('./slideshow')(mongoose);

  api.use(express.json());
  api.use('/slides', slide);
  api.use('/slideshows', slideshow);

  return api;
};
