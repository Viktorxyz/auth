import error from '../util/error.js'
import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {

	const authHeader = req.headers['authorization'] || req.headers['Authorization']

	if (!authHeader?.startsWith('Bearer ')) return next(error(401, 'Unauthorized'))

	const accessToken = authHeader.split(' ')[1]

	jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) return next(error(403, 'Forbidden'))
		req.username = decoded.username
		req.roles = decoded.roles
		next()
	})
}
export default verifyToken
