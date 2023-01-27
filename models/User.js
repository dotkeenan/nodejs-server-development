const mongoose = require('mongoose')
//instantiate a new schema class
const Schema = mongoose.Schema

const UserSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
    maxLength: 20
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  // age: {
  //   type: Number,
  //   require: true
  // },
  gender: {
    type: String,
    enum: [
      'Male',
      'Female',
      'male',
      'female'
    ]
  },
  email: {
    type: String,
    require: true,
    unqiue: true
  },
  password: {
    type: String,
    require: true
  }
}, {
  timeStamps: true
})

module.exports = mongoose.model('User', UserSchema)
