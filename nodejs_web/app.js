var express = require('express');
var bodyParser= require('body-parser')
var cookieParser = require('cookie-parser');
var session = require('express-session');
var router = require('./controllers');
var mongoose = require('mongoose');
var multer  = require('multer');
var morgan = require('morgan');
var fs = require('fs')
var path = require('path');
var rfs = require('rotating-file-stream');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/mydb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

var logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
var accessLogStream = rfs('my.log', {
  interval: '1d', // rotate daily
  path: logDirectory
});
app.use(morgan('combined', {stream: accessLogStream}));

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));

app.use('/',router)

var server = app.listen(3000, function(){
  var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
 });