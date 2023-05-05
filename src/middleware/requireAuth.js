const isAuthenticated = (req, res, next) => {
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
}

module.exports = isAuthenticated
