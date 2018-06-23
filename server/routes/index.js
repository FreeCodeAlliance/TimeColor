var express = require('express');
var router = express.Router();
var user = require('../bin/logic/user');

/* GET home page. */
router.get('/getInfo', (req, res, next) => {
    user.getInfo(req, res);
});

module.exports = router;
