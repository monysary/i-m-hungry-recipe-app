const jwt = require("jsonwebtoken");

module.exports = {
  signToken: ({ id, username, email, password }) => {
    const payload = { id, username, email, password };
    return jwt.sign(payload, process.env.SECRET, {
      expiresIn: process.env.EXPIRE,
    });
  },
};
