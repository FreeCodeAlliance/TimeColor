var express = require('express');
var router = express.Router();
var register = require('../bin/logic/register');
var login = require('../bin/logic/login');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 注册
router.get('/register', (req, res) => {
    register.execute(req, res);
});

// 登录
router.get('/login', (req, res) => {

});
module.exports = router;
