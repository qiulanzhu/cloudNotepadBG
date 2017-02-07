var express = require('express');
var router = express.Router();

var User = require('../models/user');
var logger = require('../logService');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{ errMsg: '' });
});

router.post("/",function(req, res) {
    //获取form表单提交的登录数据
    var username = req.body.username;
    var password = req.body.password;
    var loginUser = new User({
      username : username,
      userpwd : password
    });
    //通过用户名取到用户信息
    loginUser.userInfo(function(err,result){
      if(err){
        logger.error(err);
        return res.json({
          msgCode: -1,
          message: '数据库操作失败'
        })
      }
      if(result.length === 0){
        return res.json({
          msgCode: -2,
          message: '用户名不存在'
        })
      }
      else{
        //判断用户密码是否填写正确  演示没做加密，等有时间再加
        if(result[0]['userpwd'] == password){
          req.session.user = {'username':username}; //保存用户session信息

          return res.json({
            msgCode: 0,
            message: '登录成功！'
          })
        }
        else{
          res.json({
            msgCode: -3,
            message: '密码错误！'
          })
        }
      }
     });
});

module.exports = router;
