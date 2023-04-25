const { verifyToken } = require('../../../auth/auth')

export default function handler(req, res) {
    if (req.method === 'POST') {
        const verified = verifyToken(req.body.token)
        res.status(200).json(verified)
    } else {
        res.status(400).json({ message: 'Invalid request' })
    }
}