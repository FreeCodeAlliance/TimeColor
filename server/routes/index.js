var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  tc.gf.send(res, "success", {text:"hello"});
});

module.exports = router;
