/*User Model*/
'use strict';
const User = require('../model');
const config = require('../../../config');
const moment = require('moment');
const async = require('async');

/*User Routes*/
exports.users = function(req, res) {
  if (req.params.pass != config.passFixture) {
    res.json('denied!');
  } else {
    User.findOne({ login: 'admin' }, function(err, user) {
      if (!user) {
        user = new User();
        user.password = 'admin';
        user.login = 'admin';

        user.save(function(err, user) {
          if (err) {
            res.json(err);
          } else {
            res.json(user);
          }
        });
      } else {
        res.json('admin already registered!');
      }
    });
  }
};
