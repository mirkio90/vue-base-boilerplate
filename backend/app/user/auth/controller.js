const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const config = require('../../../config');
const Users = require('../model');

/*Usuario Routes*/
exports.login = async (req, res) => {
  const user = await Users.findOne({ login: req.body.login });

  if (!user) {
    res.json({
      success: false,
      message: 'User not found',
      login: req.body.login
    });
  } else {
    bcrypt.compare(req.body.password, user.password, function(err, ok) {
      if (ok) {
        console.log('User Login: ' + user.nome + ' : ' + user.login);

        var beAToken = {};
        beAToken.login = user.login;
        beAToken._id = user._id;
        beAToken.name = user.name;
        beAToken.role = user.role;
        beAToken.avatar = user.avatar;

        console.log(beAToken);

        var token = jwt.sign(beAToken, config.secret, {
          expiresIn: '1d' // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Login succesfully!',
          token: token
        });
      } else {
        res.json({ success: false, message: 'User not found' });
      }
    });
  }
};
