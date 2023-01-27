const mongoose = require('mongoose')
//instantiate a new schema class
const Schema = mongoose.Schema
//crypto was only needed for resetting password
// const crypto =  require('crypto')
// bcrypt adds encryption to the jwt token
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
  timestamps: true
})

//pre-hook that gets triggered by any 'save' crud operation (not get)
//did NOT use a arrow function because need to use 'this' keyword for this specific instanced class.
// arrow function would not know what 'this' is because its out of scope.
UserSchema.pre('save', async function(next) {
  // the hashing will only coming in effect if the password was updated, or there was never one in the first place
  if (!this.isModified('password')) {
    next();
  }

  //salting
  const salt = await bcrypt.genSalt(10) //how many random characters to add. 10 is recommended by documentation
  // combine the salt with the password and encrypt
  this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model('User', UserSchema)
