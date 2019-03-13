var mongoose = require('mongoose')
const config = require('../../config')

mongoose.set('useCreateIndex', true)

const pageSchema = new mongoose.Schema({
  name: { type: String, default: '', index: true },
  inCnt: { type: Number, default: 0 },
  lv: { type: Number, default: 0 }
})

const Page = mongoose.model('Page', pageSchema)

module.exports = Page