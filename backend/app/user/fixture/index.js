var express = require('express');
var route = express.Router();
var controller = require('./controller');
route.get('/user/:pass?', controller.users);
module.exports = route;
