var express = require('express');
var router = express.Router();
var _ = require('lodash');

/* GET home page. */
router.get('/', function(req, res, next) {
  var user = req.session.user;

  if(_.isUndefined(user)){
    res.json({
      msgCode: -1,
      message: '用户未登陆'
    });
  }else {
    res.json({
      msgCode: 0,
      message: { username:user.username}
    });
  }
});

module.exports = router;
