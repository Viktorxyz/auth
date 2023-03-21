import error from '../util/error.js'

const verifyRoles = (...reqRoles) => {
	return (req, res, next) => {
		if (!req?.roles) return next(401, 'No roles in request')

		if (req.roles.includes('ADMIN')) return next()

		const roles = [...reqRoles]
		const check = (roles.length === req.roles.length) && (roles.every(role => req.roles.includes(role)))
		if (!check) return next(401, 'No required roles')
		next()
	}
}
export default verifyRoles
