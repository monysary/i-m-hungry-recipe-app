const isAuthenticated = (req, res, next) => {
  if (!localStorage.getItem('auth_token')) {
    res.redirect('/login')
  } else {
    next()
  }
}

module.exports = isAuthenticated
