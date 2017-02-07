var express = require('express');
var router = express.Router();

var User = require('../models/user');
var logger = require('../logService');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('regist', {errMsg:""});
});


router.post('/',function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var newUser = new User({
      username : username,
      userpwd : password
    });
    //检查用户名是否已经存在
    newUser.userNum(newUser.username, function (err, results) {
      if (err) {
        logger.error(err);
        return res.json({
          msgCode: -1,
          message: '数据库操作失败'
        })
      }

      if (results.length != 0 && results[0]['num'] > 0) {
        return res.json({
          msgCode: -1,
          message: '用户名已存在'
        })
      }

      newUser.userSave(function(err,result){
        if(err){
          logger.error(err);
          return res.json({
            msgCode: -1,
            message: '数据库操作失败'
          })
        }

        res.json({
          msgCode: 0,
          message: '注册成功！'
        })
       });
    });
});

module.exports = router;
