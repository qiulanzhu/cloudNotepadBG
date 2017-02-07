var mysql = require('mysql');
var config = require('../config.json');

//创建连接池 createPool(Object)
// Object和createConnection参数相同。
var pool = mysql.createPool(config.mysql);

//可以监听connection事件，并设置session值
pool.on('connnection',function(connection){
  console.log("pool on");
  connection.query('SET SESSION auto_increment_increment=1')
});

function User(user){
  this.username = user.username;
  this.userpwd = user.userpwd;
}

User.prototype.userSave = function save(callback){
  var user = {
    username : this.username,
    userpwd : this.userpwd
  };
  var INSERT_USER= "INSERT INTO userinfo (userid,username,userpwd) VALUES (0,?,?)";
  pool.getConnection(function(err,connection){
    connection.query(INSERT_USER,[user.username,user.userpwd],function(err,result){
      if(err){
        console.log("INSERT_USER Error: " + err.message);
        return;
      }
      connection.release();
      callback(err,result);
    });
  });
};


//根据用户名得到用户数量
User.prototype.userNum = function(username, callback) {
  pool.getConnection(function(err,connection){
    console.log("getConnection");
    console.log("getUserNumByName");
    var QUERY_Num = "SELECT COUNT(1) AS num FROM userinfo WHERE username = ?";
    connection.query(QUERY_Num, [username], function (err, result) {
      if (err) {
        console.log("SELECT_NUM Error: " + err.message);
        return;
      }
      connection.release();
      callback(err,result);
    });
  });
};

User.prototype.userInfo = function(callback){
  var user = {
    username : this.username,
    userpwd : this.userpwd
  };
  var QUERY_LOGIN ="SELECT * FROM userinfo WHERE username = ?";
  pool.getConnection(function(err,connection){
    connection.query(QUERY_LOGIN,[user.username],function(err,result){
      if (err) {
        console.log("SELECT_LOGIN Error: " + err.message);
        return;
      }
      connection.release();
      callback(err,result);
    });
  });
};
module.exports = User;
