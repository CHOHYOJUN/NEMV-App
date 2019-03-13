var mongoose = require('mongoose')
const config = require('../../config')

mongoose.set('useCreateIndex', true)


const userSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  age: { type: Number, default: 1 },
  id: { type: String, default: '', unique: true, index: true },
  pwd: { type: String, default: '' },
  lv: { type: Number, default: 2 }, // 권한 0:관리자, 1:슈퍼유저 , 2:일반유저, 3:손님
  inCnt: { type: Number, default: 0 }, // login 횟수
  retry: { type: Number, default: 0 } //retry(재시도 횟수)
})

const User = mongoose.model("User", userSchema)

// User.collection.dropIndexes({ name: 'admin' })

// 서버 구동시 프라미스 체인을 이용해서 id를 찾고 없으면 만들기
User.findOne({ id: config.admin.id })
  .then(( result ) => {
    if(!result) {
      console.log('admin 생성');
      return User.create({
        id: config.admin.id,
        pwd: config.admin.pwd,
        name: config.admin.name,
        lv: 0
      })
    }
    return Promise.resolve(null)
  })
  .then((result) => {
    if (result) console.log(`admin:${result.id} created!`);
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


  // User.deleteOne({ id: 'admin' })
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