module.exports = function(mongoose) {
  var express = require('express');
  var api = express();

  api.use(express.json());

  return api;
};
