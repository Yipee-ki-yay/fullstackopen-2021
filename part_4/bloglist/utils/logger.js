const morgan = require('morgan')

const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}

morgan.token(
  'data',
  // eslint-disable-next-line no-unused-vars
  function (req, res) {
    return JSON.stringify(
      { 'title': req.body.title }
    )
  }
)
const morganLogger = morgan(':method :url :status :res[content-length] - :response-time ms - :data')

module.exports = {
  info, error, morganLogger
}