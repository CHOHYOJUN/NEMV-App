var express = require('express');
var createError = require('http-errors');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send( { msg : 'API PAGE' }); // 제이슨 형태 리턴
});

router.use('/user', require('./user'))


router.all('*', (req, res, next) => {
  console.log('잉?');
  next(createError(404, '해당 api 없음'));
});


module.exports = router;
