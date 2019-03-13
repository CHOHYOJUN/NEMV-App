var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const jwt = require('jsonwebtoken')
const config = require('../../../config');

router.use('/sign', require('./sign'))
router.use('/manage', require('./manage'))


const verifyToken = (t) => {
  return new Promise((resolve, reject) => {
    console.log(t);
    if (!t) {
    console.log('111')
      resolve({ id: 'gueset', name: '손님', lv: 3 })
    }

    if ((typeof t) !== 'string') {
    console.log('222')

      reject(new Error('문자가 아닌 토근 입니다.'))
    }

    if (t.length < 10) {
    console.log('333')

      resolve({ id: 'guest', name: '손님', lv: 3 })
    }

    jwt.verify(t, config.secretKey, (error, value) => {
     console.log('if error 문')
      if (error) reject(error)
      resolve(value)

    })
    console.log('index.js 21 line')
  })
}
// 토근검사
router.all('*', (req, res, next) => {
  console.log('토큰검사 / api.index');
  const token = req.headers.authorization
  console.log(token);
  verifyToken(token)
    .then(result => {
      console.log('token 결과 then');
      req.user = result
      console.log('777');
      console.log(req.user);
      next()
    })
    .catch((error) => {
      console.log('token 결과 catch');
      res.send({ success: false, msg: error.message })
    })
})

router.use('/page', require('./page'))

router.all('*', function(req, res, next) {
  // 또 검사해도 됨
  if (req.user.lv > 2) return res.send({ success: false, msg: '권한이 없습니다.' })
  next()
})

module.exports = router;
