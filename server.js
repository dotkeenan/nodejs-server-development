const express = require('express')
const dotenv = require('dotenv')
//import the mongodb connection module
const connectDB = require('./config/db')

//configure the path for dotenv so that application can read from it
dotenv.config({path: './config/config.env'})

// connect to mongoDB before intializing the express app()
connectDB()

const app = express();

const PORT = process.env.PORT || 5001

const server = app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`)
})

process.on('unhandledRejection', (err) => {
	console.log(`Error: ${err.message}`)
  server.close(() => process.exit(1))
})
