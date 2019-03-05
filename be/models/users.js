const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)

const config = require('../../config')

const userSchema = new mongoose.Schema({
  name: { type: String, default: '', index: true },
  age: { type: Number, default: 1 },
  id: { type: String, default: '', unique: true, index: true },
  password: { type: String, default: '' },
  retry: { type: Number, default: 0 } //retry(재시도 횟수)
})

const User = mongoose.model("User", userSchema)

// User.collection.dropIndexes({ name: 1 })

// 서버 구동시 프라미스 체인을 이용해서 id를 찾고 없으면 만들기
User.findOne({ id: config.admin.id })
  .then(( result ) => {
    if(!result) {
      console.log('amin 생성');
      return User.create({
        id : config.admin.id,
        password : config.admin.password,
        name : config.admin.name,
      })
    }
    return Promise.resolve(null)
  })
  .catch((error) => {
    console.error(error.message)
  })



  // User.create({ name: 'ronaldo', age: 30 })
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   })


  // User.find()
  //   .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     })



  // User.updateOne({ _id: '5c76ae2242eeec0414df5595' }, { $set: { age: 40 }})
  // .then((result) => {
  //   console.log(result);

  //   return User.find()
  // })
  // .then((result) => {
  //   console.log(result);
  // })
  // .catch((err) => {
  //   console.error(err);
  // })


  // User.deleteOne({ name: 'ronaldo' })
  //  .then((result) => {
  //   console.log(result);
  //   return User.find()
  // })
  // .then((result) => {
  //     console.log(result);
  //   })
  // .catch((err) => {
  //   console.error(err);
  // })


module.exports = User