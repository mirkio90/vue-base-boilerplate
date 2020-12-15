var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var path = require('path');
var cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

app.get('/api/', function(req, res, next) {
  res.json('online');
});

var config = require('./config');

// DB Initialization
var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect(
  config.database,
  {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true
  }
);

// Routes
/*Admin initialize*/
app.use('/api/fixture', require('./app/user/fixture'));


/*Users Login*/
app.use('/api/', require('./app/user/auth'));

/*Routes verified by JWT*/
var jwt = require('./core/jwt');
app.use('/api/v1', jwt);

/*JWT Middleware*/
jwt.use('/upload', require('./app/upload'));
jwt.use('/users', require('./app/user'));
jwt.use('/clients', require('./app/client'));

var id = Number(process.env.id);
var hit = 0;

var port = parseInt(config.initialPort);

server.listen(port, '127.0.0.1');
console.log('Server start: ' + port);
