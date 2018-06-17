var express = require('express');
var router = express.Router();
var register = require('../bin/logic/login/register');

/* GET masters listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// 注册
router.post('/register', (req, res) => {
    res.send("test");
});

// 注册审核
router.get('/registerCheck', (req, res) => {
    register.registerCheck(req, res);
});

// 获取注册审核列表
router.get('/checkList', (req, res) => {
    register.getlist(req, res);
});

module.exports = router;
