const jwt = require('jsonwebtoken')

module.exports = {
  signToken: ({ id, username, email, password }) => {
    const payload = { id, username, email, password }
    return jwt.sign(payload, process.env.SECRET, {
      expiresIn: process.env.EXPIRE,
    })
  },

  // middleware to check if user is logged in
  isAuthenticated: (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers.authorization

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim()
    }

    if (!token) {
      return req
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: '2h' })
      req.user = data
    } catch {
      console.log('Invalid token')
    }

    return req
  },
}
