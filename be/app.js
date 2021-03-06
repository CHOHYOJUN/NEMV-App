var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const history = require('connect-history-api-fallback');
const cors = require('cors')

const mongoose = require('mongoose')
const User = require('./models/users')
const Page = require('./models/pages')

const jwt = require('jsonwebtoken')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// fe에서 be와 통신할수 있다.
app.use(cors());
// * api 미들웨어
app.use('/api', require('./routes/api'))

app.use(history()) //fe의 라우터로 빠지게
app.use(express.static(path.join(__dirname, '../', 'fe', 'dist')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ msg: err.message });
});

const cfg = require('../config');
mongoose.connect(cfg.dbUrl, {useNewUrlParser: true},(err) => {
  if(err) return console.log(err);
  console.log('mongoose connected');

  // console.log('ㅡㅡ user ㅡㅡ');
  User.find()
  .then((result) => console.log(result))
  .catch((err) => console.error(err))
  // console.log('ㅡㅡ page ㅡㅡ');
  // Page.find()
  // .then((result) => console.log(result))
  // .catch((err) => console.error(err))

});

//ㅡㅡㅡㅡㅡㅡㅡ token ㅡㅡㅡㅡㅡㅡㅡㅡ
// const key = '어머나어머니'
// const token = jwt.sign({ id:'memi', email:'lion@naver.com'}, key)
// console.log(token);

// const decoded = jwt.verify(token, key)
// console.log ( new Date(decoded.iat * 1000));

// console.log(decoded);


  module.exports = app;