var express = require('express');
var createError = require('http-errors');

// const mongoose = require('mongoose')

const User = require('../../../models/users')

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

    User.find()
    .then((result) => {
        res.send({ users: result });
      })
      .catch((err) => {
        console.error(err);
      })
 });

router.post("/", ( req, res, next) => {
  const { name, age } = req.body;
  const newUser = new User({ name, age });

  newUser.save()
    .then((result) => {
      res.send( { success: true , msg: result })
    })
    .catch((err) => {
      console.error(err)
      res.send( { success: false })
    })
});

router.put("/:id", ( req, res, next) => {
  const updateId = req.params.id
  const { name, age } = req.body
  User.updateOne({ _id: updateId }, { $set: { name , age }})
    .then((result) => {
      res.send({ success : true })
    })
    .catch((err) => {
      console.error(err.message);
      res.send({ success : false })
    })
});

router.delete("/:id", ( req, res, next) => {
  const  delete_id = req.params.id
  User.deleteOne( { _id: delete_id })
    .then((result) => {
      res.send({ success : true })
    })
    .catch((err) => {
      console.error(err.message);
      res.send({ success : false })
    })
});

router.all('*', (req, res, next) => {
  console.log('잉?');
  next(createError(404, '해당 api 없음'));
});

module.exports = router;
