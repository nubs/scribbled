module.exports = function(mongoose) {
  var express = require('express');
  var api = express();

  var slide = require('./slide')(mongoose);

  api.use(express.json());
  api.use('/slides', slide);

  return api;
};
