const { User } = require('../db/model/');
const jwt = require('jsonwebtoken')

export default async function handleDecodeJWT(token) {
	const decodedToken = jwt.verify(token, process.env.SECRET)
	const userId = decodedToken.id
	const user = await User.findByPk(userId)
	return { userId, user }
}