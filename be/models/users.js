const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String, default: '', unique: true, index: true
  },
  age: {
    type: Number, default: 1
  },
})

const User = mongoose.model("User", userSchema)


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