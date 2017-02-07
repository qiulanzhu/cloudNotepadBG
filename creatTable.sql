CREATE DATABASE IF NOT EXISTS cloudNotepad CHARACTER SET UTF8;

USE cloudNotepad;

SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `userinfo`;

CREATE TABLE `userinfo` (
`userid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
`username` varchar(64) NOT NULL COMMENT '用户名',
`userpwd` varchar(64) NOT NULL COMMENT '用户密码',
PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息表';