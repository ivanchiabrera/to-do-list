// Requires
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Variables de entorno
require('dotenv').config();

var app = express();
// Cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,token");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});
// BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import routes
var userRoutes = require('./routes/user');
var taskRoutes = require('./routes/task');
var folderRoutes = require('./routes/folder');

//Connection bd
mongoose.connection.openUri(process.env.URL_MONGO, { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de datos online');

});

//statics routes
app.use(express.static(__dirname + '/dist'));

// routes
app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/folder', folderRoutes);

//
app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});



var port = process.env.PORT || 3000;

// listen request
app.listen(port, () => {
    console.log('Express server corriendo en el server ' + port);
})