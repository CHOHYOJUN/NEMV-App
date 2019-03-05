var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const jwToken = require('jsonwebtoken');
const config = require('../../../../config');
const User = require('../../../models/users');


// id, age + secretKey 로 token 만들기
const signToken = (id, age) => {
  return new Promise((resolve, reject) => {
    jwToken.sign({ id, age }, config.secretKey, (error, token) => {
      if(error) {
        console.log('token 발행 문제');
        reject(error)
      }
      console.log('token 발행 완료');
        resolve(token)
    }) // jwToken.sign()
  })//Promise
}

router.post('/in', (req, res) => {
  const { id, password } = req.body
  if(!id) return res.send({ success: false , msg: '아이디가 없습니다.'})
  if(!password) return res.send({ success: false , msg: '비밀번호가 없습니다.'})

  console.log(`입력 받은 값 : ${id} , ${password}`);

  User.findOne({ id })
    .then((result) => {
      if (!result) throw new Error('존재하지 않는 아이디 입니다.')
      if (result.password !== password) throw new Error('비밀번호가 틀립니다.')
      return signToken(result.id, result.age)
    })
    .then((result) => {
      res.send({ success : true, token: result })
    })
    .catch((error) => {
      res.send({ success: false, msg: error.message })
    })
})

router.post('/out', (req,res) => {
  res.send({ success: false, msg: '아직 준비 안됨'})
})


router.all('*', (req, res, next) => {
  next(createError(404, '해당 api 페이지 없음'))
})

module.exports = router;