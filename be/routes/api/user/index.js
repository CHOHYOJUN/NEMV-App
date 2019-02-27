var express = require('express');
var createError = require('http-errors');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // const user = [
  //   {
  //     name: 'messi',
  //     age: 30
  //   },
  //   {
  //     name: 'ronaldo',
  //     age: 31
  //   }
  // ]
  // res.send( { users : user })
  res.send("get Api");
 });

router.post("/", ( req, res, next) => {
  res.send('post Api')
});

router.put("/", ( req, res, next) => {
  res.send('put Api')

});

router.delete("/", ( req, res, next) => {
  res.send('delete Api')

});



router.all('*', (req, res, next) => {
  console.log('잉?');
  next(createError(404, '해당 api 없음'));
});


module.exports = router;
