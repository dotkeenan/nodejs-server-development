const logger = (req, res, next) => {
  console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`)
  //if you don't have next() it gets hung up and doenst know where to go from there.
  // definitely look into this and code trace it to understand why
  next()
}

module.exports = logger
