var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { startingClassAmount: 8 });
});

module.exports = router;
