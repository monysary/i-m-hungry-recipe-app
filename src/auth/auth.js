const jwt = require('jsonwebtoken');

module.exports = {
    verifyToken: (token) => {
        try {
            const decoded = jwt.verify(token, process.env.SECRET, { maxAge: process.env.EXPIRE })
            return decoded
        } catch (err) {
            console.log('Invalid token');
            return err
        }

    },
    signToken: ({ id, username, email, password }) => {
        const payload = { id, username, email, password }
        return jwt.sign(payload, process.env.SECRET, { expiresIn: process.env.EXPIRE })
    }
}