// this file is basically index.js from learningfuze.  the backend routes.

const express = require('express');
const router = express.Router()

const {
  getUsers,
  createUser
} = require('../controllers/userController')

router.route('/')
      .get(getUsers)
      .post(createUser)

module.exports = router
