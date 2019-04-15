/*
Navicat MySQL Data Transfer

Source Server         : mlqaliy
Source Server Version : 50718
Source Host           : rm-uf6o6pl97i35t27emxo.mysql.rds.aliyuncs.com:3306
Source Database       : timecolor

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2018-07-15 10:16:23
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `bet`
-- ----------------------------
DROP TABLE IF EXISTS `bet`;
CREATE TABLE `bet` (
  `issue` varchar(13) NOT NULL,
  `uid` smallint(10) NOT NULL,
  `tth` text NOT NULL COMMENT '万',
  `tho` text NOT NULL COMMENT '千',
  `hun` text NOT NULL COMMENT '百',
  `ten` text NOT NULL COMMENT '百',
  `ind` text NOT NULL COMMENT '个位',
  `big` int(20) unsigned zerofill NOT NULL COMMENT '大',
  `small` int(20) unsigned zerofill NOT NULL COMMENT ' 小',
  `single` int(20) unsigned zerofill NOT NULL,
  `even` int(20) unsigned zerofill NOT NULL,
  `gain` int(20) NOT NULL DEFAULT '-1' COMMENT '赢取多少金额',
  `res` int(20) NOT NULL DEFAULT '0' COMMENT '输赢结果',
  PRIMARY KEY (`issue`,`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bet
-- ----------------------------

-- ----------------------------
-- Table structure for `lottery`
-- ----------------------------
DROP TABLE IF EXISTS `lottery`;
CREATE TABLE `lottery` (
  `issue` varchar(13) NOT NULL,
  `result` varchar(5) NOT NULL COMMENT '万千百十个',
  `date` datetime NOT NULL,
  PRIMARY KEY (`issue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lottery
-- ----------------------------

-- ----------------------------
-- Table structure for `masterinfo`
-- ----------------------------
DROP TABLE IF EXISTS `masterinfo`;
CREATE TABLE `masterinfo` (
  `uid` smallint(10) NOT NULL AUTO_INCREMENT,
  `account` varchar(20) NOT NULL,
  `password` varchar(32) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`uid`,`account`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of masterinfo
-- ----------------------------
INSERT INTO `masterinfo` VALUES ('1', 'master', 'e10adc3949ba59abbe56e057f20f883e', '2018-06-23 21:39:15');

-- ----------------------------
-- Table structure for `modifylottery`
-- ----------------------------
DROP TABLE IF EXISTS `modifylottery`;
CREATE TABLE `modifylottery` (
  `masterid` smallint(10) NOT NULL,
  `issue` varchar(13) NOT NULL,
  `date` datetime NOT NULL,
  `modify` varchar(5) NOT NULL COMMENT '万千百十个',
  PRIMARY KEY (`masterid`,`issue`,`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of modifylottery
-- ----------------------------

-- ----------------------------
-- Table structure for `recharge`
-- ----------------------------
DROP TABLE IF EXISTS `recharge`;
CREATE TABLE `recharge` (
  `userid` smallint(10) NOT NULL,
  `value` int(20) NOT NULL,
  `date` datetime NOT NULL,
  `masterid` smallint(10) NOT NULL,
  PRIMARY KEY (`userid`,`value`,`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of recharge
-- ----------------------------

-- ----------------------------
-- Table structure for `register`
-- ----------------------------
DROP TABLE IF EXISTS `register`;
CREATE TABLE `register` (
  `account` varchar(20) NOT NULL,
  `password` varchar(32) NOT NULL,
  `disktype` varchar(3) NOT NULL DEFAULT 'D',
  `date` datetime NOT NULL,
  `remark` text,
  PRIMARY KEY (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of register
-- ----------------------------

-- ----------------------------
-- Table structure for `userinfo`
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `uid` smallint(10) NOT NULL AUTO_INCREMENT COMMENT '用户id 自动增加',
  `account` varchar(20) NOT NULL COMMENT '账号',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `disktype` varchar(3) NOT NULL DEFAULT 'D' COMMENT '盘类',
  `quota` int(20) unsigned zerofill NOT NULL DEFAULT '00000000000000000000' COMMENT '额度',
  `date` datetime NOT NULL,
  PRIMARY KEY (`uid`,`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userinfo
-- ----------------------------

DROP TABLE IF EXISTS `giftsuserinfo`;
CREATE TABLE `giftsuserinfo` (
  `uid` smallint(10) NOT NULL AUTO_INCREMENT COMMENT '用户id 自动增加',
  `name` varchar(20) NOT NULL COMMENT '玩家姓名',
  `fightTimes` int(20) NOT NULL DEFAULT 0 COMMENT '参战次数',
  PRIMARY KEY (`uid`,`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--INSERT INTO `giftsUserInfo` VALUES ('1', 'No.23旋律军师', 0);

DROP TABLE IF EXISTS `giftsdetail`;
CREATE TABLE `giftsdetail` (
  `uid` smallint(10) NOT NULL AUTO_INCREMENT COMMENT '用户id 自动增加',
  `userId` smallint(10) NOT NULL COMMENT '玩家ID',
  `name` varchar(20) NOT NULL COMMENT '玩家姓名',
  `giftQuality` ENUM('传说','英雄','精英', '跨传说', '跨英雄', '跨精英') DEFAULT '精英',
  `date` datetime NOT NULL,
  PRIMARY KEY (`uid`,`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
--INSERT INTO `giftsdetail` VALUES ('1', 'No.23旋律军师', '传说', '2018-06-23 21:39:15');











