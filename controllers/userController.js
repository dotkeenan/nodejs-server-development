const User = require('../models/User')

// first controller get all users
const getUsers = async (req, res, next) => {
  try {
    const result = await User.find()

    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json(result)
  } catch (error) {
    throw new Error(`Error getting all users: ${error.message}`)
  }
}

//second controller create a user
const createUser = async (req, res, next) => {
  try {
    const result = await User.create(req.body)

    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json(result)
  } catch (error) {
    throw new Error(`Error getting creating a user: ${error.message}`)
  }
}

// //third controller delete a user
// const deleteUser = async (req, res, next) => {

// }

// //third controller delete a user
// const getUser = async (req, res, next) => {

// }

module.exports = {
  getUsers,
  createUser
}
