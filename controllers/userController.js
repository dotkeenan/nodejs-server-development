const User = require('../models/User')

// first controller get all users
const getUsers = async (req, res, next) => {
  try {
    // query parameter
    // const filter = {}
    const options = {}

    // check if the req query is empty?
    // sets options properties if these optional queries do exist (the 1,2, or 3 arguments for find())
    if (Object.keys(req.query).length) {
      const {
        sortByFirstName, //this value will either be 'asc' or 'dsc' for ascend/descend
        limit
      } = req.query

      //set up our pagination.  also need to check for edge cases
      if (limit) options.limit = limit
      //the sort is an object since it can have multiple ways to sort
      if (sortByFirstName) options.sort = {
        firstName: sortByFirstName === 'asc' ? 1 : -1 // can use 'asc' or 'dsc' but tony just likes using 1 or -1 to indicate an ascend or descend
      }
    }

    // const result = await User.find({}, {}, options, filter)
    const result = await User.find({}, {}, options)

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
    // console.log(req.body)
    // const result = await User.create(req.body)
    const user = await User.create(req.body)
    //create the token
    const token = user.getSignedJwtToken()

    //options for the cookie
    const options = {
      // add expire for cookie
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 1000 * 60)
    }

    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .cookie('token', token, options)
    // .json(result)
    //send the result and token
    .json({success: true, token, user})
  } catch (error) {
    throw new Error(`Error creating a user: ${error.message}`)
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
