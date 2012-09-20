var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOHQ_URL);

var api = require('./api')(mongoose);

app.use(express.logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use('/vendor', express.static(__dirname + '/vendor'));
app.use('/api', api);

var port = process.env.PORT || 8000;
app.listen(port, function () {
    console.log('Listening on ' + port);
});
